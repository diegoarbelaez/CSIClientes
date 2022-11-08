import { Component, OnInit } from '@angular/core';
import {
  Camera,
  CameraResultType,
  CameraSource,
  Photo,
} from '@capacitor/camera';
import { Filesystem, Directory } from '@capacitor/filesystem';
import { Platform, LoadingController, NavController, AlertController } from '@ionic/angular';
import { HttpClient } from '@angular/common/http';
import { finalize } from 'rxjs/operators';
import { ToastController } from '@ionic/angular';


// import { ConexionService } from '../../services/conexion.service'; ***AQUI IMPORTAR EL SERVICIO QUE AYUDA LA CARGA
import { CrudContactosService } from 'src/app/services/crud-contactos.service';
import { Alert } from 'selenium-webdriver';
import { environment } from 'src/environments/environment';

const IMAGE_DIR = 'stored-images';

const url = environment.urlServices;


interface LocalFile {
  name: string;
  path: string;
  data: string;
}





@Component({
  selector: 'app-carga',
  templateUrl: './carga.page.html',
  styleUrls: ['./carga.page.scss'],
})
export class CargaPage implements OnInit {

  endPoint = url;

  id_usuario;

  errores:number;

  images: LocalFile[] = [];

  imagenesRecuperadas: LocalFile[] = [];

  contadorImagenes = 0;

  previews: boolean[] = [false, false, false];

  imagenesPreview: any[] = [
    '../../../assets/documento1.png',
    '../../../assets/documento2.png',
    '../../../assets/documento3.png',
    '../../../assets/documento4.png',
  ];

  constructor(
    private platform: Platform,
    private loadingCtrl: LoadingController,
    private http: HttpClient,
    private toastCtrl: ToastController,
    //private servicios:ConexionService, //IMPORTAR EL SERVICIO
    private crudContactosService:CrudContactosService,
    private navController:NavController,
    private alertController:AlertController
  ) {}

  async ngOnInit() {
    this.loadFiles();
  }

  // Little helper
  async presentToast(text) {
    const toast = await this.toastCtrl.create({
      message: text,
      duration: 3000,
    });
    toast.present();
  }

  async seleccionarImagen1() {
    const image = await Camera.getPhoto({
      quality: 60,
      allowEditing: false,
      resultType: CameraResultType.Uri,
      source: CameraSource.Photos, // Camera, Photos or Prompt!
    });

    console.log(image);

    if (image) {
      this.saveImage1(image);
    }
  }

  async saveImage1(photo: Photo) {
    const base64Data = await this.readAsBase64(photo);
    console.log(base64Data);

    const fileName = 'documento1.png';
    const savedFile = await Filesystem.writeFile({
      path: `${IMAGE_DIR}/${fileName}`,
      data: base64Data,
      directory: Directory.Data,
    });

    console.log("saveImage1:estado de images:");
    console.log(this.images);

    //Leemos el documento para ponerlo en la posición 0 del array imagenesrecuperadas
    const readFile = await Filesystem.readFile({
      path: `${IMAGE_DIR}/${fileName}`,
      directory: Directory.Data,
    });

    this.imagenesRecuperadas[0] = {
      name: fileName,
      path: `${IMAGE_DIR}/${fileName}`,
      data: `data:image/jpeg;base64,${readFile.data}`,
    };

    console.log('guardado en disco documento 1: ' + savedFile);
    this.previews[0] = true;
    console.log(
      'ImagenesRecuperadas:SaveImage1 ' +
        JSON.stringify(this.imagenesRecuperadas)
    );
    //this.loadFiles();
  }

  async seleccionarImagen2() {
    const image = await Camera.getPhoto({
      quality: 60,
      allowEditing: false,
      resultType: CameraResultType.Uri,
      source: CameraSource.Photos, // Camera, Photos or Prompt!
    });

    console.log(image);

    if (image) {
      this.saveImage2(image);
    }
  }

  async saveImage2(photo: Photo) {
    const base64Data = await this.readAsBase64(photo);
    console.log(base64Data);

    const fileName = 'documento2.png';
    const savedFile = await Filesystem.writeFile({
      path: `${IMAGE_DIR}/${fileName}`,
      data: base64Data,
      directory: Directory.Data,
    });

    console.log("saveImage2:estado de images:");
    console.log(this.images);

    //Leemos el documento para ponerlo en la posición 0 del array imagenesrecuperadas
    const readFile = await Filesystem.readFile({
      path: `${IMAGE_DIR}/${fileName}`,
      directory: Directory.Data,
    });

    this.imagenesRecuperadas[1] = {
      name: fileName,
      path: `${IMAGE_DIR}/${fileName}`,
      data: `data:image/jpeg;base64,${readFile.data}`,
    };


    console.log('guardado en disco documento 2: ' + savedFile);
    this.previews[1] = true;
    console.log(
      'ImagenesRecuperadas:SaveImage2 ' +
        JSON.stringify(this.imagenesRecuperadas)
    );

    this.loadFiles();
  }

  async seleccionarImagen3() {
    const image = await Camera.getPhoto({
      quality: 60,
      allowEditing: false,
      resultType: CameraResultType.Uri,
      source: CameraSource.Photos, // Camera, Photos or Prompt!
    });

    console.log(image);

    if (image) {
      this.saveImage3(image);
    }
  }

  async saveImage3(photo: Photo) {
    const base64Data = await this.readAsBase64(photo);
    console.log(base64Data);

    const fileName = 'documento3.png';
    const savedFile = await Filesystem.writeFile({
      path: `${IMAGE_DIR}/${fileName}`,
      data: base64Data,
      directory: Directory.Data,
    });

    console.log("saveImage3:estado de images:");
    console.log(this.images);

    //Leemos el documento para ponerlo en la posición 0 del array imagenesrecuperadas
    const readFile = await Filesystem.readFile({
      path: `${IMAGE_DIR}/${fileName}`,
      directory: Directory.Data,
    });

    this.imagenesRecuperadas[2] = {
      name: fileName,
      path: `${IMAGE_DIR}/${fileName}`,
      data: `data:image/jpeg;base64,${readFile.data}`,
    };


    console.log('guardado en disco documento 3: ' + savedFile);
    this.previews[2] = true;
    console.log(
      'ImagenesRecuperadas:SaveImage3 ' +
        JSON.stringify(this.imagenesRecuperadas)
    );

    this.loadFiles();
  }

  async seleccionarImagen4() {
    const image = await Camera.getPhoto({
      quality: 60,
      allowEditing: false,
      resultType: CameraResultType.Uri,
      source: CameraSource.Photos, // Camera, Photos or Prompt!
    });

    console.log(image);

    if (image) {
      this.saveImage4(image);
    }
  }

  async saveImage4(photo: Photo) {
    const base64Data = await this.readAsBase64(photo);
    console.log(base64Data);

    const fileName = 'documento3.png';
    const savedFile = await Filesystem.writeFile({
      path: `${IMAGE_DIR}/${fileName}`,
      data: base64Data,
      directory: Directory.Data,
    });
    console.log("saveImage4:estado de images:");
    console.log(this.images);

    //Leemos el documento para ponerlo en la posición 0 del array imagenesrecuperadas
    const readFile = await Filesystem.readFile({
      path: `${IMAGE_DIR}/${fileName}`,
      directory: Directory.Data,
    });

    this.imagenesRecuperadas[2] = {
      name: fileName,
      path: `${IMAGE_DIR}/${fileName}`,
      data: `data:image/jpeg;base64,${readFile.data}`,
    };


    console.log('guardado en disco documento 3: ' + savedFile);
    this.previews[2] = true;
    console.log(
      'ImagenesRecuperadas:SaveImage1 ' +
        JSON.stringify(this.imagenesRecuperadas)
    );

    this.loadFiles();
  }

  async loadFiles() {
    this.images = [];

    const loading = await this.loadingCtrl.create({
      message: 'Loading data...',
    });
    await loading.present();

    Filesystem.readdir({
      path: IMAGE_DIR,
      directory: Directory.Data,
    })
      .then(
        (result) => {
          this.loadFileData(result.files);
          console.log('Archivos: ' + JSON.stringify(result.files));
          //console.log(result.files[0].uri);
          console.log(result.files);
        },
        async (err) => {
          // Folder does not yet exists!
          await Filesystem.mkdir({
            path: IMAGE_DIR,
            directory: Directory.Data,
          });
        }
      )
      .then((_) => {
        loading.dismiss();
      });
  }

  async loadFileData(fileNames: any[]) {
    for (let f of fileNames) {
      const filePath = `${IMAGE_DIR}/${f.name}`;

      console.log('Ruta Archivo: ' + filePath);

      const readFile = await Filesystem.readFile({
        path: filePath,
        directory: Directory.Data,
      });

      this.images.push({
        name: f,
        path: filePath,
        data: `data:image/jpeg;base64,${readFile.data}`,
      });
      //this.imagenesPreview[this.contadorImagenes]=filePath;
      console.log(readFile);
    }
    console.log('Contador Imagenes:' + this.contadorImagenes);
    //console.log("preview Imagenes");
    //console.log(this.imagenesPreview);
    console.log('Previews');
    console.log(this.previews);
    // this.previews[this.contadorImagenes]=true;
    // this.contadorImagenes ++;
    console.log('Vamos a ver Images (abajo)');
    console.log(this.images);
  }

  private async readAsBase64(photo: Photo) {
    if (this.platform.is('hybrid')) {
      const file = await Filesystem.readFile({
        path: photo.path,
      });

      return file.data;
    } else {
      // Fetch the photo, read as a blob, then convert to base64 format
      const response = await fetch(photo.webPath);
      const blob = await response.blob();

      return (await this.convertBlobToBase64(blob)) as string;
    }
  }

  // Helper function
  convertBlobToBase64 = (blob: Blob) =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onerror = reject;
      reader.onload = () => {
        resolve(reader.result);
      };
      reader.readAsDataURL(blob);
    });

  //

  //cargar los archivos al servidor *NO USADO*
  /*
  iniciarCarga() {
    this.imagenesRecuperadas.forEach(async function (archivo) {
      // console.log(archivo.name);
      // console.log(archivo.data);
      // console.log(archivo.path);
      console.log('Inicia carga de ' + archivo.name);
      const response = await fetch(archivo.data);
      console.log(response);
      const blob = await response.blob();
      console.log(blob);
      const formData = new FormData();
      formData.append('file', blob, archivo.name);
      console.log('FormData');
      console.log(formData);
      this.uploadData(formData);
      console.log(formData);
    });
  }
  */

  async iniciarCarga2() {
    //Lee el id del usuario para poder nombrar los archivos adecuadamente
    //this.id_usuario = await this.servicios.leerDisco("id_usuario");
    
    this.id_usuario = await this.crudContactosService.cargarIdUsuario3();
    console.log("Id Usuario a Cargar:.."+this.id_usuario);
    let contador=1;
    for (let i = 0; i < this.images.length; i++) {
      const file = this.imagenesRecuperadas[i];
      const response = await fetch(file.data);
      console.log(response);
      const blob = await response.blob();
      const formData = new FormData();
      formData.append('file', blob, this.id_usuario+'-'+file.name);
      this.uploadData(formData);
    }
    
    //Comprueba si hubo errores en la carga para iniciar el proceso nuevamente
    if(this.errores>0){
      const encabezado = 'Fallo en la Carga';
      const mensaje = 'Algunos archivos no fueron cargados, intenta nuevamente';
      const alert = await this.alertController.create({
        header: encabezado,
        message: mensaje,
        buttons: ['REINTENTAR']
      });
      await alert.present();
    }
    else {
      const encabezado = 'Carga Completa';
      const mensaje = 'Tus archivos fueron exitosamente cargados';
      const alert = await this.alertController.create({
        header: encabezado,
        message: mensaje,
        buttons: ['OK']
      });
      await alert.present();
      this.navController.navigateRoot('/terminos2');
    }
  }

  // async startUpload(file: LocalFile) {
  //   const response = await fetch(file.data);
  //   console.log(response);
  //   const blob = await response.blob();
  //   const formData = new FormData();
  //   formData.append('file', blob, file.name);
  //   this.uploadData(formData);
  // }

  // Upload the formData to our API
  async uploadData(formData: FormData) {
    console.log('entró a upload...');
    console.log('va a cargar...');
    console.log(formData);

    const loading = await this.loadingCtrl.create({
      message: 'Cargando imagen',
    });
    await loading.present();

    // Use your own API!
    const url = this.endPoint+'cargarDocumentos.php';

    this.http
      .post(url, formData)
      .pipe(
        finalize(() => {
          loading.dismiss();
        })
      )
      .subscribe((res) => {
        if (res['carga']) {
          this.presentToast('Cargó archivo exitosamente');
          console.log('Cargó archivo exitosamente');
          loading.dismiss();
        } else {
          this.presentToast('Error Cargando archivo..');
          console.log('Error Cargando archivo..');
          this.errores ++;
          loading.dismiss();
        }
      });
  }

  async deleteImage(file: LocalFile) {
    await Filesystem.deleteFile({
      directory: Directory.Data,
      path: file.path,
    });
    this.loadFiles();
    //this.presentToast('File removed.');
    console.log('Archivo Borrado');
  }
}
