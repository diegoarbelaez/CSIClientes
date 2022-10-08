import { Component, OnInit } from '@angular/core';
import { AlertasService } from '../../services/alertas.service';
import { alertas } from '../../interfaces/index';
import { environment } from 'src/environments/environment';
import { Geolocation } from '@awesome-cordova-plugins/geolocation/ngx';
import { LaunchNavigator, LaunchNavigatorOptions } from '@awesome-cordova-plugins/launch-navigator/ngx';
import { CrudContactosService } from '../../services/crud-contactos.service';
import { Storage } from '@ionic/storage';
import { LoadingController } from '@ionic/angular';
import { Share } from '@capacitor/share';



const urlService = environment.urlServices;

@Component({
  selector: 'app-alertas',
  templateUrl: './alertas.page.html',
  styleUrls: ['./alertas.page.scss'],
})
export class AlertasPage implements OnInit {


  urlEvidencia = urlService;
  latitudCapturada;
  logintudCapturada;
  // gps: number[] = [4.26213,-75.9318] //destino
  gps: number[] = [];
  alertasRecibidas: alertas[] = [];
  id_usuario;
  sinAlertas: boolean = false;

  constructor(private alertas: AlertasService, private geolocation: Geolocation, private navegador: LaunchNavigator, private crud: CrudContactosService, private storage: Storage, private loadingCtrl: LoadingController) {
    this.cargarIdUsuario();
  }

  ionViewWillEnter() {
    // this.obtenerCoordenadas();
  }

  ngOnInit() {
    this.obtenerCoordenadas();
    this.gps[this.latitudCapturada, this.logintudCapturada];
    // this.alertas.obtenerAlertas(this.latitudCapturada, this.logintudCapturada).subscribe(
    //   resp => {
    //     this.alertasRecibidas = resp
    //     console.log(resp);
    //   }
    // )
  }


  reaccionar(latitud, longitud, id_alerta) {

    // let options: LaunchNavigatorOptions = {
    //   start: 'London, ON',
    //   app: this.navegador.APPS.UBER
    // }
    this.gps = [latitud, longitud];

    alert("Gracias por asistir a un CSI, hoy por él mañana por ti, justo a tiempo! CSI …seguro. Tu me cuidas, yo te cuido!");

    console.log("gps[" + this.latitudCapturada + "],[" + this.logintudCapturada + "]");

    this.navegador.navigate(this.gps, {
      start: this.latitudCapturada + "," + this.logintudCapturada,
      app: this.navegador.APP.GOOGLE_MAPS
    }).then((res) => {
      alert(res);
      console.log("Promesa Resuelta!")
    }, (err) => {
      alert(JSON.stringify(err));
      console.log(JSON.stringify(err));
      console.log("Promesa Resuelta con errores :(")
    }
    );


    this.crud.cargarIdUsuario2();
    //Envia la notificación de que reaccionó al evento
    this.crud.reaccionarAnteAlerta(this.id_usuario, id_alerta, this.latitudCapturada, this.logintudCapturada);


  }

  //Para cargar el ID del usuario
  async cargarIdUsuario() {
    await this.storage.create();
    this.id_usuario = await this.storage.get('id_usuario') || null;
  }

  async obtenerCoordenadas() {

    console.log("Enviando Alerta...");
    const loading_alerta = await this.loadingCtrl.create({
      message: 'Consultando nuestra central... seguridad en camino',
    });
    await loading_alerta.present();
    //Lanzamos la alerta
    //Aquí está el código para enviar las coordenadas y lo que se obtenga de los eventos
    this.geolocation.getCurrentPosition().then((resp) => {
      // resp.coords.latitude
      // resp.coords.longitude
      console.log("Latitud" + resp.coords.latitude);
      console.log("Longitud" + resp.coords.longitude);
      this.latitudCapturada = resp.coords.latitude;
      this.logintudCapturada = resp.coords.longitude;
      //Con las coordenadas capturadas, llamamos las alertas
      this.alertas.obtenerAlertas(this.latitudCapturada, this.logintudCapturada).subscribe(
        resp => {
          this.alertasRecibidas = resp
          if (this.alertasRecibidas.length == 0) {
            this.sinAlertas = true;
          }
          console.log(resp);
        }
      )
      console.log("fin...");
      this.loadingCtrl.dismiss();
    }).catch((error) => {
      console.log('Error getting location', error);
    });



  }

  async obtenerCoordenadasActualizar(event) {

    console.log("Enviando Alerta...");
    const loading_alerta = await this.loadingCtrl.create({
      message: 'Consultando nuestra central... seguridad en camino',
    });
    await loading_alerta.present();
    //Lanzamos la alerta
    //Aquí está el código para enviar las coordenadas y lo que se obtenga de los eventos
    this.geolocation.getCurrentPosition().then((resp) => {
      // resp.coords.latitude
      // resp.coords.longitude
      console.log("Latitud" + resp.coords.latitude);
      console.log("Longitud" + resp.coords.longitude);
      this.latitudCapturada = resp.coords.latitude;
      this.logintudCapturada = resp.coords.longitude;
      //Con las coordenadas capturadas, llamamos las alertas
      this.alertas.obtenerAlertas(this.latitudCapturada, this.logintudCapturada).subscribe(
        resp => {
          this.alertasRecibidas = resp
          console.log(resp);
        }
      )
      console.log("fin...");
      this.loadingCtrl.dismiss();
      event.target.complete();
    }).catch((error) => {
      console.log('Error getting location', error);
    });



  }

  compartir(descripcion, comentario, ruta, distancia, dias,id_coordenadas) {
    let complemento:String;
    let cuando:String;
    let dias_cuenta;
    if (dias == 0) {
      cuando = 'Esto está pasando'
      dias_cuenta = 'en este momento';
      complemento = '';
      dias = '';
    }
    else {
      cuando = 'Esto pasó hace'
      dias_cuenta = 'dias'; 
      complemento = 'ten cuidado';
    }
    Share.share({
      title: descripcion,
      text: 'Hola! Te reporto esta alerta de seguridad para que tengas cuidado: '+comentario + ' a ' + distancia + 'mts de donde me encuentro, aquí están las coordenadas para que mires en el mapa y mires la foto. '+cuando+' '+dias+' ' + dias_cuenta+ ' '+complemento,
      url: 'https://csi.mipgenlinea.com/alertas/visualizarAlerta.php?id_coordenadas='+id_coordenadas,
      dialogTitle: 'Compartir con tus amigos',
    });
  }

}
