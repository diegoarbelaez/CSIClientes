import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-terminos2',
  templateUrl: './terminos2.page.html',
  styleUrls: ['./terminos2.page.scss'],
})
export class Terminos2Page implements OnInit {

  constructor(private navCtrl:NavController) { }

  ngOnInit() {
  }

  regresar(){
    this.navCtrl.navigateRoot('/login');
  }

}
