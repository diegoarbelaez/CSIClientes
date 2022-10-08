import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { NavController } from '@ionic/angular';
import { UsuarioService } from 'src/app/services/usuario.service';
import { HerramientasUIService } from '../../services/herramientas-ui.service';

@Component({
  selector: 'app-olvido-contrasena',
  templateUrl: './olvido-contrasena.page.html',
  styleUrls: ['./olvido-contrasena.page.scss'],
})


export class OlvidoContrasenaPage implements OnInit {

  validador: FormGroup;

    //esto es para no tener que ingresar usuario y contraseña mientras estemos en pruebas
  //creamos un objeto para guardar los valores default y luego con ngModel los dejamos como default
  credenciales = {
    correo : "",
  }

  mensajesValidacion = {
    correo: [
      { type: "required", message: "Por favor ingrese su correo" },
      { type: "pattern", message: "Este correo no es válido" }
    ]
  }


  constructor(public formbuider: FormBuilder, public servicios: UsuarioService, public navCtrl: NavController, public herramientasUI: HerramientasUIService) {


  }

  ngOnInit() {
    this.validador = this.formbuider.group({
      correo: new FormControl('', Validators.compose([
        Validators.required,
        Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')
      ]))
    })
  }

  
  enviarCorreo(credenciales){
    this.servicios.enviarCorreo(credenciales.correo);
    this.herramientasUI.mostrarAlerta("Correo enviado","Se ha enviado un correo de recordatorio al usuario. Por favor revise su bandeja de entrada");
    console.log("Correo a recuperar:"+credenciales.correo);
  }

}
