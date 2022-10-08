import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { proximosServicios } from '../interfaces';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';


const urlService = environment.urlServices;

@Injectable({
  providedIn: 'root'
})

//Interface para manejo de articulos
//que sirven para traer la información de los próximos servicios



export class NoticiasService {
  constructor(private http: HttpClient) { }

  obtenerArticulos() {
    const URL: string = urlService + 'listarArticulos.php';

    return this.http.get<proximosServicios[]>(URL);

  };

}


