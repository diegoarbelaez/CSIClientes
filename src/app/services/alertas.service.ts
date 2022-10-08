import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Storage } from '@ionic/storage-angular';
import { alertas } from '../interfaces';
import { Agente } from '../interfaces';

const urlService = environment.urlServices;

@Injectable({
  providedIn: 'root'
})
export class AlertasService {
  id_usuario;
  constructor(private http: HttpClient,private storage: Storage) {
    this.id_usuario=this.cargarIdUsuario2();
   }
  obtenerAlertas(lat,long) {
    const URL: string = urlService + 'consultarAlertasCercanas.php';
    console.log("obtenerAlertas: recibió"+lat+" "+long+" id_usuario:"+this.id_usuario);
    return this.http.get<alertas[]>(URL,{
      params:{
        latitud:lat,
        longitud:long,
        id_usuario:this.id_usuario
      }});
    }
    obtenerAgentes(lat,long) {
      const URL: string = urlService + 'consultarAgentesCercanos.php';
      console.log("obtenerAgentes: recibió"+lat+" "+long);
      return this.http.get<Agente[]>(URL,{
        params:{
          latitud:lat,
          longitud:long,
          id_usuario:this.id_usuario
        }});
      }

      async cargarIdUsuario() {
        this.storage.create();
        this.id_usuario = await this.storage.get('id_usuario');
        console.log("curd::cargarIdUsuario id_usuario" + this.id_usuario);
      }
    
      cargarIdUsuario2(){ 
        return this.storage.get('id_usuario');
      }
    
  };
