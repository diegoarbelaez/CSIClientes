import { Component, OnInit } from '@angular/core';
import { NoticiasService } from '../../services/noticias.service';
import { proximosServicios } from '../../interfaces/index';
import { defineCustomElements } from '@ionic/pwa-elements/loader';



@Component({
  selector: 'app-proximamente',
  templateUrl: './proximamente.page.html',
  styleUrls: ['./proximamente.page.scss'],
})
export class ProximamentePage implements OnInit {

  serviciosRecibidos:proximosServicios[] = [];
  

  constructor( private noticas:NoticiasService) { }

  ngOnInit() {
    this.noticas.obtenerArticulos().subscribe(respuesta => {
      this.serviciosRecibidos = respuesta;
      }
    )
  }

}
