
export interface proximosServicios {
    id_articulo: number,
    titulo: string,
    descripcion: string,
    url_imagen: string,
    url_link: string,
    fecha_publicacion: string
}

export interface alertas {
    id_coordenadas: number,
    latitud: string,
    longitud: string,
    tipo_evento: string,
    fecha: string,
    fk_id_usuario: string,
    comentario: string,
    ruta: string,
    id_nombre: string,
    descripcion: string,
    distancia:string,
    dias:number,
    reacciones:number
}


//Interfaz para cargar los agentes cercanos
export interface Marker {
    position: {
      lat: any,
      lng: any,
    };
    title: string;
    icon: {
      size: any,
      anchor: any,
      url: string
      text: {
        content: string,
        color: string,
        size: string,
        weight: string,
        position: any,
      }
    }
  }

  export interface Agente{
    id_posicion:number;
    fk_id_usuario:number,
    id_dispositivo:String,
    latitud:String,
    longitud:String,
    origen:String,
    fecha:String
  }