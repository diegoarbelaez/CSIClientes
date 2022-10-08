import { Injectable } from '@angular/core';
import { Platform } from '@ionic/angular';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Storage } from '@ionic/storage-angular';


const urlService = environment.urlServices;

//Notificaciones PUSH
import {
  ActionPerformed,
  PushNotificationSchema,
  PushNotifications,
  Token,
} from '@capacitor/push-notifications';
@Injectable({
  providedIn: 'root'
})
export class NotificacionesService {

  
  id_usuario;

  constructor(private platform: Platform, private http:HttpClient, private storage:Storage) { }

  inicializar() {
    this.id_usuario = this.cargarIdUsuario();
    if (this.platform.is('capacitor')) {
      console.log('Initializing HomePage');

      // Request permission to use push notifications
      // iOS will prompt user and return if they granted permission or not
      // Android will just grant without prompting
      PushNotifications.requestPermissions().then(result => {
        if (result.receive === 'granted') {
          // Register with Apple / Google to receive push via APNS/FCM
          PushNotifications.register();
        } else {
          // Show some error
        }
      });

      // On success, we should be able to receive notifications
      PushNotifications.addListener('registration',
        (token: Token) => {
          //alert('Push registration success, token: ' + token.value);

          //Envía al servidor el TOKEN para poder enviar PUSH Notifications, 
          //1. recupera el id_usuario del storage
          //2. hace la solicitud http al endpoint 
          //this.id_usuario = this.cargarIdUsuario2();  
          
          console.log("pushNotification: id_usuario ->"+this.id_usuario);

          const data = { 
            id_usuario: this.id_usuario,
            token_usuario: token.value
           }
          const URL: string = urlService+'agregarIdDispositivo.php';

          console.log(JSON.stringify(data));
          console.log("PushNotification:URL ->"+URL);
          //alert("PushNotification:URL ->"+URL);
          


          return new Promise(resolve => {
            this.http.post(URL, data)
              .subscribe(async resp => {
                console.log("Respuesta Servidor " + resp['message']);
                //alert('Respuesta Servidor: '+resp['message']);
                if (resp['actualizado']) {
                  console.log('Actualiado Exitosamente');
                  //alert('Respuesta Servidor: '+resp['actualizado']);
                  resolve(true);
                } else {
                  console.log('No actualizado!');
                  console.log(resp['sql']);
                  //alert('Respuesta Servidor: '+resp['sql']);
                  resolve(false);
                }
              });
          });



          


          






        }
      );

      // Some issue with our setup and push will not work
      PushNotifications.addListener('registrationError',
        (error: any) => {
          //alert('Error on registration: ' + JSON.stringify(error));
        }
      );

      // Show us the notification payload if the app is open on our device
      PushNotifications.addListener('pushNotificationReceived',
        (notification: PushNotificationSchema) => {
          //alert('Push received: ' + JSON.stringify(notification));
        }
      );

      // Method called when tapping on a notification
      PushNotifications.addListener('pushNotificationActionPerformed',
        (notification: ActionPerformed) => {
          //alert('Push action performed: ' + JSON.stringify(notification));
        }
      );
    } else {
      console.log('PushNotifications.requestPermission() -> no es movil');
    }
  }

  cargarIdUsuario2(){ 
    return this.storage.get('id_usuario'); 
  }
  async cargarIdUsuario() {
    this.storage.create();
    this.id_usuario = await this.storage.get('id_usuario');
    console.log("pushNotifications::cargarIdUsuario id_usuario -->" + this.id_usuario);
    //alert("pushNotifications::cargarIdUsuario id_usuario -->" + this.id_usuario);
  }
}
