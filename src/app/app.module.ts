import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';



import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';

//Storage
import { IonicStorageModule } from '@ionic/storage-angular';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

//Para hacer peticiones http
import { HttpClientModule } from '@angular/common/http';

//GPS
import { Geolocation } from '@awesome-cordova-plugins/geolocation/ngx';
//import { Camera } from '@capacitor/camera';

//Camara
//import { Camera } from '@awesome-cordova-plugins/camera/ngx';

//LaunchNavigator
import { LaunchNavigator } from '@awesome-cordova-plugins/launch-navigator/ngx';

//GOOGLE MAPS
import { NativeGeocoder } from '@ionic-native/native-geocoder/ngx';




@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, IonicModule.forRoot(), AppRoutingModule,IonicStorageModule.forRoot(),ReactiveFormsModule, FormsModule, HttpClientModule],
  //providers: [Geolocation, Camera, { provide: RouteReuseStrategy, useClass: IonicRouteStrategy }],
  providers: [NativeGeocoder, Geolocation, LaunchNavigator, { provide: RouteReuseStrategy, useClass: IonicRouteStrategy }],
  bootstrap: [AppComponent]
  
})
export class AppModule {}
