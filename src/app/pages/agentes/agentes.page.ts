import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { environment } from '../../../environments/environment.prod';
import { NgZone } from '@angular/core';
import { NativeGeocoder, NativeGeocoderResult, NativeGeocoderOptions } from '@ionic-native/native-geocoder/ngx';

import { IonModal } from '@ionic/angular';
import { OverlayEventDetail } from '@ionic/core/components';
import { LoadingController } from '@ionic/angular';

import { Geolocation } from '@awesome-cordova-plugins/geolocation/ngx';
import { Marker, Agente } from '../../interfaces/index';
import { AlertasService } from '../../services/alertas.service';







declare var google;





@Component({
  selector: 'app-agentes',
  templateUrl: './agentes.page.html',
  styleUrls: ['./agentes.page.scss'],
})
export class AgentesPage implements OnInit {

  @ViewChild('map', { static: false }) mapElement: ElementRef;
  @ViewChild(IonModal) modal: IonModal;
  map: any;
  address: string;
  lat: string;
  long: string;
  autocomplete: { input: string; };
  autocompleteItems: any[];
  location: any;
  placeid: any;
  GoogleAutocomplete: any;
  markerUsuario: Marker;
  mostrarList: boolean = false;
  latitudCapturada;
  logintudCapturada;
  agentesRecibidos: Agente[] = [];
  sinAgentes: Boolean = false;
  marcador: Marker;





  constructor(
    private geolocation: Geolocation,
    private nativeGeocoder: NativeGeocoder,
    public zone: NgZone,
    private loadingCtrl: LoadingController,
    private alertas: AlertasService
  ) {
    this.GoogleAutocomplete = new google.maps.places.AutocompleteService();
    this.autocomplete = { input: '' };
    this.autocompleteItems = [];
  }

  //AGREGAMOS MARKERS
  addMarker(marker: Marker) {
    return new google.maps.Marker({
      position: marker.position,
      map: this.map,
      title: marker.title,
      icon: marker.icon
    });
  }

  //AGREGAMOS EL MARKER DEL LOCATION DEL USUARIO
  addMarkerUsuario(marker: Marker) {
    return new google.maps.Marker({
      position: marker.position,
      map: this.map,
      title: marker.title,
      icon: marker.icon
    });
  }


  //CREAMOS ALGUNAS MARKERS

  async obtenerAgentesCercanos() {

    console.log("Buscando Agentes...");
    const loading_alerta = await this.loadingCtrl.create({
      message: 'Consultando nuestra central... seguridad en camino',
    });
    await loading_alerta.present();
    //Lanzamos la alerta
    //Aquí está el código para enviar las coordenadas y lo que se obtenga de los eventos
    this.geolocation.getCurrentPosition().then((resp) => {
      // resp.coords.latitude
      // resp.coords.longitude
      console.log("Agentes Recibidos: Latitud" + resp.coords.latitude);
      console.log("Agentes Recibidos: Longitud" + resp.coords.longitude);
      this.latitudCapturada = resp.coords.latitude;
      this.logintudCapturada = resp.coords.longitude;
      //Con las coordenadas capturadas, llamamos las alertas
      this.alertas.obtenerAgentes(this.latitudCapturada, this.logintudCapturada).subscribe(
        resp => {
          this.agentesRecibidos = resp

          //AGREGAMOS LOS AGENTES AL MAPA
          console.log("Entro a Render Markers y va a desplegar los siguientes agentes");
          console.log(this.agentesRecibidos);

          

          this.agentesRecibidos.forEach(agente => {

            //Convierte las coordenadas a numeros, porque el JSON viene en String
            let latConvert = Number( agente.latitud);
            let longConvert = Number (agente.longitud);

            this.marcador =
            {
              position: {
                lat: latConvert,
                lng: longConvert
              },
              title: 'Agente CSI',
              icon: {
                size: new google.maps.Size(48, 59),
                anchor: new google.maps.Point(24, 59),
                url: '/assets/pointer.png',
                text: {
                  content: '!',
                  color: '#fff',
                  size: '24px',
                  weight: '700',
                  position: [25, 24]
                }
              }
            }
            console.log("Marcador...")
            console.log(this.marcador);
            this.addMarker(this.marcador);
          }
          );




          if (this.agentesRecibidos.length == 0) {
            this.sinAgentes = true;
          }
          console.log("A continuación los Agentes Recibidos");
          console.log(resp); //Imprime los agentes recibidos
        }
      )
      console.log("fin...");
      this.loadingCtrl.dismiss();
    }).catch((error) => {
      console.log('Error getting location', error);
    });


  }


  /*

  markers: Marker[] = [
    {
      position: {
        lat: 4.658383846282959,
        lng: -74.09394073486328,
      },
      title: 'Parque Simón Bolivar',
      icon: {
        size: new google.maps.Size(48, 59),
        anchor: new google.maps.Point(24, 59),
        url: '/assets/pointer.png',
        text: {
          content: '!',
          color: '#fff',
          size: '24px',
          weight: '700',
          position: [25, 24]
        }
      }
    },
    {
      position: {
        lat: 4.667945861816406,
        lng: -74.09964752197266,
      },
      title: 'Jardín Botánico',
      icon: {
        size: new google.maps.Size(48, 59),
        anchor: new google.maps.Point(24, 59),
        url: '/assets/pointer.png',
        text: {
          content: '!',
          color: '#fff',
          size: '24px',
          weight: '700',
          position: [25, 24]
        }
      }

    },
    {
      position: {
        lat: 4.676802158355713,
        lng: -74.04825592041016,
      },
      title: 'Parque la 93',
      icon: {
        size: new google.maps.Size(48, 59),
        anchor: new google.maps.Point(24, 59),
        url: '/assets/pointer.png',
        text: {
          content: '!',
          color: '#fff',
          size: '24px',
          weight: '700',
          position: [25, 24]
        }
      }
    },
    {
      position: {
        lat: 4.6554284,
        lng: -74.1094989,
      },
      title: 'Maloka',
      icon: {
        size: new google.maps.Size(48, 59),
        anchor: new google.maps.Point(24, 59),
        url: '/assets/pointer.png',
        text: {
          content: '!',
          color: '#fff',
          size: '24px',
          weight: '700',
          position: [25, 24]
        }
      }
    },
  ];
  */

  //RENDERIZAMOS LAS MARKERS
  async renderMarkers() {
    // console.log("Entro a Render Markers y va a desplegar los siguientes agentes");
    // console.log(this.agentesRecibidos);
    // await this.agentesRecibidos.forEach(agente => {
    //   this.marcador = 
    //     {
    //       position: {
    //         lat: agente.latitud,
    //         lng: agente.longitud,
    //       },
    //       title: 'Agente CSI',
    //       icon: {
    //         size: new google.maps.Size(48, 59),
    //         anchor: new google.maps.Point(24, 59),
    //         url: '/assets/pointer.png',
    //         text: {
    //           content: '!',
    //           color: '#fff',
    //           size: '24px',
    //           weight: '700',
    //           position: [25, 24]
    //         }
    //       }
    //     } 
    //   console.log("Marcador...")  
    //   console.log(this.marcador);
    //   this.addMarker(this.marcador);
    // }
    // );
  }



  //CARGAMOS EL MAPA EN ONINIT
  ngOnInit() {
    this.loadMap();
  }

  //CARGAR EL MAPA TIENE DOS PARTES 
  async loadMap() {

    //CARGAMOS EL LOADER
    const loading_alerta = await this.loadingCtrl.create({
      message: 'Triangulando CSI Cercanos...',
    });
    await loading_alerta.present();

    //OBTENEMOS LAS COORDENADAS DESDE EL TELEFONO.
    this.geolocation.getCurrentPosition().then((resp) => {
      let latLng = new google.maps.LatLng(resp.coords.latitude, resp.coords.longitude);
      let mapOptions = {
        center: latLng,
        zoom: 15,
        mapTypeId: google.maps.MapTypeId.ROADMAP
      }
      //Creamos el Marker para el usuario
      this.markerUsuario = {
        position: {
          lat: resp.coords.latitude,
          lng: resp.coords.longitude,
        },
        title: 'Tu ubicación actual',
        icon: {
          size: new google.maps.Size(48, 59),
          anchor: new google.maps.Point(24, 59),
          url: '/assets/pointerUser.png',
          text: {
            content: '!',
            color: '#fff',
            size: '24px',
            weight: '700',
            position: [25, 24]
          }
        }
      }

      this.addMarkerUsuario(this.markerUsuario);

      //CUANDO TENEMOS LAS COORDENADAS SIMPLEMENTE NECESITAMOS PASAR AL MAPA DE GOOGLE TODOS LOS PARAMETROS.

      this.getAddressFromCoords(resp.coords.latitude, resp.coords.longitude);
      this.map = new google.maps.Map(this.mapElement.nativeElement, mapOptions);
      this.map.addListener('tilesloaded', () => {
        console.log('accuracy', this.map, this.map.center.lat());
        this.getAddressFromCoords(this.map.center.lat(), this.map.center.lng())
        this.lat = this.map.center.lat()
        this.long = this.map.center.lng()
      });
      this.obtenerAgentesCercanos();


      //


      this.addMarkerUsuario(this.markerUsuario);

      this.map.addListener
    }).catch((error) => {
      console.log('Error getting location', error);
    });
    //Termina la carga
    this.loadingCtrl.dismiss();
  }


  getAddressFromCoords(lattitude, longitude) {
    console.log("getAddressFromCoords " + lattitude + " " + longitude);
    let options: NativeGeocoderOptions = {
      useLocale: true,
      maxResults: 5
    };
    this.nativeGeocoder.reverseGeocode(lattitude, longitude, options)
      .then((result: NativeGeocoderResult[]) => {
        this.address = "";
        let responseAddress = [];
        for (let [key, value] of Object.entries(result[0])) {
          if (value.length > 0)
            responseAddress.push(value);
        }
        responseAddress.reverse();
        for (let value of responseAddress) {
          this.address += value + ", ";
        }
        this.address = this.address.slice(0, -2);
      })
      .catch((error: any) => {
        this.address = "Address Not Available!";
      });
  }

  //FUNCION DEL BOTON INFERIOR PARA QUE NOS DIGA LAS COORDENADAS DEL LUGAR EN EL QUE POSICIONAMOS EL PIN.
  ShowCords() {
    this.mostrarList = !this.mostrarList;
  }



  //FUNCION QUE LLAMAMOS DESDE EL ITEM DE LA LISTA.
  SelectSearchResult(item) {
    //AQUI PONDREMOS LO QUE QUERAMOS QUE PASE CON EL PLACE ESCOGIDO, GUARDARLO, SUBIRLO A FIRESTORE.
    //HE AÑADIDO UN ALERT PARA VER EL CONTENIDO QUE NOS OFRECE GOOGLE Y GUARDAMOS EL PLACEID PARA UTILIZARLO POSTERIORMENTE SI QUEREMOS.
    alert(JSON.stringify(item))
    this.placeid = item.place_id
  }


  //LLAMAMOS A ESTA FUNCION PARA LIMPIAR LA LISTA CUANDO PULSAMOS IONCLEAR.
  ClearAutocomplete() {
    this.autocompleteItems = []
    this.autocomplete.input = ''
  }

  //EJEMPLO PARA IR A UN LUGAR DESDE UN LINK EXTERNO, ABRIR GOOGLE MAPS PARA DIRECCIONES. 
  GoTo() {
    return window.location.href = 'https://www.google.com/maps/search/?api=1&query=Google&query_place_id=' + this.placeid;
  }



  //EVENTOS DEL MODAL

  //VARIALBES PARA EL MODAL

  message = 'This modal example uses triggers to automatically open a modal when the button is clicked.';
  name: string;

  ///
  cancel() {
    this.modal.dismiss(null, 'cancel');
  }

  confirm() {
    this.modal.dismiss(this.name, 'confirm');
  }

  onWillDismiss(event: Event) {
    const ev = event as CustomEvent<OverlayEventDetail<string>>;
    if (ev.detail.role === 'confirm') {
      this.message = `Hello, ${ev.detail.data}!`;
    }
  }

}