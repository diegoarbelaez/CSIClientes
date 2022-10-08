import { Component, OnInit } from '@angular/core';
import { UsuarioService } from '../../services/usuario.service';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Storage } from '@ionic/storage';
import { LoadingController, NavController } from '@ionic/angular';
import { CrudContactosService } from '../../services/crud-contactos.service';

const urlService = environment.urlServices;


@Component({
  selector: 'app-eliminacuenta',
  templateUrl: './eliminacuenta.page.html',
  styleUrls: ['./eliminacuenta.page.scss'],
})
export class EliminacuentaPage implements OnInit {

  id_usuario;

  constructor(private servicios: UsuarioService, private storage: Storage, private http: HttpClient, private loadingCtrl: LoadingController, private crud: CrudContactosService, private navCtrl:NavController) {
    this.cargarIdUsuario();
  }

  ngOnInit() {
  }

  async cargarIdUsuario() {

    const loading = await this.loadingCtrl.create({
      message: 'Cargando...',
    });
    await loading.present();


    this.id_usuario = await this.crud.cargarIdUsuario2();
    console.log("eliminarCuenta::cargarIdUsuario -> id_usuario:" + this.id_usuario);

    loading.dismiss();

  }

  async eliminarUsuario() {
    //Registra la posición del usuario para poder luego pintar en el mapa
    console.log("Eliminar Usuario....");
    const loading_alerta = await this.loadingCtrl.create({
      message: 'Procesando...',
    });
    await loading_alerta.present();

    //envia la alerta al servidor
    const data = {
      id_usuario: this.id_usuario,
    }
    console.log(data);

    const URL: string = urlService + 'eliminarUsuario.php';

    return new Promise(resolve => {
      this.http.post(URL, data)
        .subscribe(async resp => {
          console.log("Respuesta Servidor " + resp['actualizado']);
          if (resp['actualizado']) {
            console.log("Usuario Eliminado Exitosamente");
            
            
              this.storage.clear();
              this.navCtrl.navigateRoot('/login');
            
            loading_alerta.dismiss();
            resolve(true);
          } else {
            console.log("Error en el servidor" + resp["message"]);
            loading_alerta.dismiss();
            resolve(false);
          }
        });
    });

  }


}
