import { Component, OnInit } from '@angular/core';
import { CrudContactosService } from '../../services/crud-contactos.service';
import { LoadingController } from '@ionic/angular';
import { Storage } from '@ionic/storage-angular';
import { NotificacionesService } from '../../services/notificaciones.service';
import { HttpClient } from '@angular/common/http';
import { Geolocation } from '@awesome-cordova-plugins/geolocation/ngx';
import { environment } from 'src/environments/environment';

const urlService = environment.urlServices;


@Component({
  selector: 'app-panico',
  templateUrl: './panico.page.html',
  styleUrls: ['./panico.page.scss'],
})
export class PanicoPage implements OnInit {

  estadoServicio:boolean=true;
  zonaSegura:boolean = true;
  id_usuario;
  latitudCapturada;
  logintudCapturada;


  constructor(private crud:CrudContactosService,private storage: Storage, private loadingCtrl: LoadingController, private notificaciones:NotificacionesService, private geolocation:Geolocation, private http:HttpClient) {
    this.cargarIdUsuario();
    this.notificaciones.inicializar();
    this.registrarPosicion();
  }
  async cargarIdUsuario() {

    const loading = await this.loadingCtrl.create({
      message: 'Cargando...',
    });
    await loading.present();


    this.id_usuario = await this.crud.cargarIdUsuario2();
    console.log("botonPanico::cargarIdUsuario -> id_usuario:" + this.id_usuario);
    //cargamos el estado del servicio
    this.crud.getEstadoServicio(this.id_usuario).subscribe(resp => {
      this.estadoServicio = resp;
    })

    loading.dismiss();

  }

  ngOnInit() {
    //this.cargarIdUsuario();
  }

  async registrarPosicion(){
    //Registra la posición del usuario para poder luego pintar en el mapa
    console.log("Enviando Posición...");
    const loading_alerta = await this.loadingCtrl.create({
      message: 'Cargando...',
    });
    await loading_alerta.present();
    
    //Aquí está el código para enviar las coordenadas y lo que se obtenga de los eventos
    this.geolocation.getCurrentPosition().then((resp) => {
      // resp.coords.latitude
      // resp.coords.longitude
      console.log("Latitud" + resp.coords.latitude);
      console.log("Longitud" + resp.coords.longitude);
      this.latitudCapturada = resp.coords.latitude;
      this.logintudCapturada = resp.coords.longitude;
      //envia la alerta al servidor
      const data = {
        id_usuario: this.id_usuario,
        latitud: this.latitudCapturada,
        longitud: this.logintudCapturada,
      }
      console.log(data);

      const URL: string = urlService + 'registrarPosicion.php';

      return new Promise(resolve => {
        this.http.post(URL, data)
          .subscribe(async resp => {
            console.log("Respuesta Servidor " + resp['actualizado']);
            if (resp['actualizado']) {
              console.log("recibió la posición bien");
              //Enviar la imagen adjunta
              //en resp['actualizado'] está true o false dependiendo del resultado del algoritmo de la zona segura
              this.zonaSegura = resp['actualizado'];
              


              loading_alerta.dismiss();
              resolve(true);
            } else {
              console.log("Error en el servidor" + resp["message"]);
              this.zonaSegura = false;
              loading_alerta.dismiss();
              resolve(false);
            }
          });
      });

    }).catch((error) => {
      console.log('Error getting location', error);
    });

  }

}
