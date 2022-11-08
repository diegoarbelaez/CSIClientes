import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { NavController, ToastController } from '@ionic/angular';
import { UsuarioService } from 'src/app/services/usuario.service';
import { HerramientasUIService } from '../../services/herramientas-ui.service';
import { Camera, CameraResultType, CameraSource, Photo } from '@capacitor/camera';
import { Filesystem, Directory } from '@capacitor/filesystem';
import { Platform, LoadingController } from '@ionic/angular';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { finalize } from 'rxjs/operators';
import { Storage } from '@ionic/storage';



//Directorio de almacenamiento local
//Interfaz para manejo de imagenes
const IMAGE_DIR = 'CSIUsersImaages';
interface LocalFile {
  name: string;
  path: string;
  data: string;
}

const urlService = environment.urlServices;


@Component({
  selector: 'app-signup',
  templateUrl: './signup.page.html',
  styleUrls: ['./signup.page.scss'],
})
export class SignupPage implements OnInit {

  validador: FormGroup;
  imagen:LocalFile;
  images: LocalFile[] = [];
  imagenAdjunta: boolean = false;
  id_usuario;
  token: string = null;
  valido:Boolean;
  cargarImagenUsuario:Boolean = false;

  //esto es para no tener que ingresar usuario y contraseña mientras estemos en pruebas
  //creamos un objeto para guardar los valores default y luego con ngModel los dejamos como default
  datosRegistro = {
    correo : '',
    cedula : '',
    nombres: '',
    apellidos : '',
    direccion: '',
    telefono: '',
    password: '',
    password2: ''
  }

  /*

    datosRegistro = {
    correo : "diegoarbelaez.co@gmail.com",
    cedula : '94287419',
    nombres: 'Diego Fernando',
    apellidos : 'Arbeláez Montoya',
    direccion: 'Cra 46 # 48 - 65',
    telefono: '3218001896',
    password: 'Kuzavy46',
    password2: 'Kuzavy56'
  }

  */

  mensajesValidacion = {
    correo: [
      { type: "required", message: "Por favor ingrese su correo" },
      { type: "pattern", message: "Este correo no es válido" }
    ],
    cedula: [
      { type: "required", message: "Por favor ingrese su correo" },
      { type: "minlength", message: "Esta cédula no es válida" }
    ],
    nombres: [
      { type: "required", message: "Por favor ingrese su nombre" },
      { type: "minlength", message: "Este nombre no es válido" }
    ],
    apellidos: [
      { type: "required", message: "Por favor ingrese su apellido" },
      { type: "minlength", message: "Este apellido no es válido" }
    ],
    direccion: [
      { type: "required", message: "Por favor ingrese su dirección" },
      { type: "minlength", message: "Esta dirección no es válida" }
    ],
    telefono: [
      { type: "required", message: "Por favor ingrese su teléfono" },
      { type: "minlength", message: "Este teléfono no es válido" }
    ],
    password: [
      { type: "required", message: "Por favor ingrese su contraseña" },
      { type: "minlength", message: "Este correo no es válido" }
    ],
    password2: [
      { type: "required", message: "Por ingrese la misma contraseña" },
      { type: "minlength", message: "La contraseña es demasiado corta" }

    ]
  }

  constructor(
    public formbuider: FormBuilder, 
    public servicios:UsuarioService, 
    public navCtrl:NavController, 
    public herramientasUI:HerramientasUIService,
    private http:HttpClient,
    private storage:Storage,
    private platform:Platform,
    private loadingCtrl:LoadingController,
    private toastCtrl:ToastController,
    
    ) { }
        
  async registrar(datosRegistro) {
    console.log("Estoy logeado");
    console.log(datosRegistro);
    console.log("Correo:" + datosRegistro.correo);
    console.log("Password:" + datosRegistro.password);

    //Llama el Servicio y envía el Usuario y Password
    //Envia los datos al servidor

    //const valido = await this.servicios.registrar(datosRegistro.correo,datosRegistro.cedula,datosRegistro.nombres,datosRegistro.apellidos,datosRegistro.direccion,datosRegistro.telefono,datosRegistro.password,datosRegistro.password2);

    

    const data = { 
      correo: datosRegistro.correo, 
      cedula: datosRegistro.cedula, 
      nombres: datosRegistro.nombres, 
      apellidos: datosRegistro.apellidos, 
      direccion: datosRegistro.direccion, 
      telefono: datosRegistro.telefono, 
      password: datosRegistro.password,

    }

    const URL: string = urlService + 'register.php';


    return new Promise(resolve => {
      this.http.post(URL, data)
        .subscribe(async resp => {
          console.log("Respuesta Servidor " + resp);
          if (resp['creado']) {
            await this.guardarToken(resp['token'], resp['id_usuario']);
            console.log('Creado Exitosamente');
            this.id_usuario = resp['id_usuario'];
            //Carga la imagen del usuario cuando lo ha registrado exitosamente
            if (this.imagenAdjunta) {
              this.startUpload(this.images[0]);
            }
            this.navCtrl.navigateRoot('/carga', {animated:true});
            resolve(true);
          } else {
            console.log('No creado!');
            this.herramientasUI.mostrarAlerta("Ya registrado","Ya existe un usuario con ese número de cédula registrado.");
            resolve(false);
          }
        });
    });

  }
  ngOnInit() {

    //Cuando inicia por primera vez carga este metodo
    this.loadFilesFirstTime();

    this.validador = this.formbuider.group({
      correo: new FormControl('', Validators.compose([
        Validators.required,
        Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')
      ])),
      cedula: new FormControl('', Validators.compose([
        Validators.required,
        Validators.minLength(6)
      ])),
      nombres: new FormControl('', Validators.compose([
        Validators.required,
        Validators.minLength(5)
      ])),
      apellidos: new FormControl('', Validators.compose([
        Validators.required,
        Validators.minLength(5)
      ])),
      direccion: new FormControl('', Validators.compose([
        Validators.required,
        Validators.minLength(5)
      ])),
      telefono: new FormControl('', Validators.compose([
        Validators.required,
        Validators.minLength(5)
      ])),
      password: new FormControl('', Validators.compose([
        Validators.required,
        Validators.minLength(5)
      ])),
      password2: new FormControl('', Validators.compose([
        Validators.required,
        Validators.minLength(5)
      ]))
    })



  }

  async guardarToken(token: string, id_usuario: string) {
    await this.storage.create();
    this.token = token;
    await this.storage.set('token', token);
    await this.storage.set('id_usuario', id_usuario);
  }

  async cargarFotoPerfil() {
    const image = await Camera.getPhoto({
      quality: 60,
      allowEditing: false,
      resultType: CameraResultType.Uri,
      source: CameraSource.Photos // Camera, Photos or Prompt!
    });

    console.log(image);
    this.cargarImagenUsuario = true;

    if (image) {
      this.saveImage(image)
    }

  }















//Metodos para cargar imagenes al servidor

async saveImage(photo: Photo) {
  const base64Data = await this.readAsBase64(photo);
  console.log(base64Data);
  const fileName = 'fotoUsuario.jpeg';
  const savedFile = await Filesystem.writeFile({
    path: `${IMAGE_DIR}/${fileName}`,
    data: base64Data,
    directory: Directory.Data
  });
  console.log('saved: ' + JSON.stringify(savedFile));
  console.log(savedFile);
  this.loadFiles();
}

private async readAsBase64(photo: Photo) {
  if (this.platform.is('hybrid')) {
    const file = await Filesystem.readFile({
      path: photo.path
    });

    return file.data;
  }
  else {
    // Fetch the photo, read as a blob, then convert to base64 format
    const response = await fetch(photo.webPath);
    const blob = await response.blob();

    return await this.convertBlobToBase64(blob) as string;
  }
}

// Helper function
convertBlobToBase64 = (blob: Blob) => new Promise((resolve, reject) => {
  const reader = new FileReader;
  reader.onerror = reject;
  reader.onload = () => {
    resolve(reader.result);
  };
  reader.readAsDataURL(blob);
});

async loadFiles() {
  this.images = [];
  const loading = await this.loadingCtrl.create({
    message: 'Loading data...',
  });
  await loading.present();

  Filesystem.readdir({
    path: IMAGE_DIR,
    directory: Directory.Data,
  }).then(result => {
    console.log("Directorio exisita, se busca el archivo");
    this.loadFileData(result.files);
    console.log("Archivos: " + JSON.stringify(result.files));
    //console.log(result.files[0].uri);
    console.log(result.files);
  },
    async (err) => {
      // Folder does not yet exists!
      console.log("No existia el directorio, se crea");
      await Filesystem.mkdir({
        path: IMAGE_DIR,
        directory: Directory.Data,
      });
    }
  ).then(_ => {
    loading.dismiss();
  });

}

//Este método se diferencia de loadFiles porque solo es llamado una sola vez
//crea el directorio si no existe y si existe, no hace nada
async loadFilesFirstTime() {
  this.images = [];
  const loading = await this.loadingCtrl.create({
    message: 'Loading data...',
  });
  await loading.present();

  Filesystem.readdir({
    path: IMAGE_DIR,
    directory: Directory.Data,
  }).then(result => {
    console.log("Directorio exisita, se busca el archivo");
    //this.loadFileData(result.files);
    console.log("Archivos: " + JSON.stringify(result.files));
    //console.log(result.files[0].uri);
    console.log(result.files);
  },
    async (err) => {
      // Folder does not yet exists!
      console.log("No existia el directorio, se crea");
      await Filesystem.mkdir({
        path: IMAGE_DIR,
        directory: Directory.Data,
      });
    }
  ).then(_ => {
    loading.dismiss();
  });

}


async loadFileData(fileNames: any[]) {
  let f = fileNames[0];
 //for (let f of fileNames) {
    const filePath = `${IMAGE_DIR}/${f.name}`;

    console.log("Ruta Archivo a recuperar: " + filePath);

    const readFile = await Filesystem.readFile({
      path: filePath,
      directory: Directory.Data,
    });

    this.images.push({
      name: f,
      path: filePath,
      data: `data:image/jpeg;base64,${readFile.data}`,
    });
    console.log(readFile);
 // }
  console.log("Vamos a ver Images (abajo)");
  console.log(this.images);
  this.imagenAdjunta = true;
}



async startUpload(file: LocalFile) {
  const response = await fetch(file.data);
  console.log(response);
  const blob = await response.blob();
  const formData = new FormData();
  //formData.append('file', blob, file.name);
  //El nombre del archivo a cargar tiene el identificador del usuario
  
  //const nombreArchivo = this.id_usuario + '-' + new Date().getTime() + '.jpeg';
  const nombreArchivo = this.id_usuario + '-foto_perfil.jpeg';
  
  formData.append('file', blob, nombreArchivo);
  this.uploadData(formData);
  console.log(formData);
}


//Elimina el archivo para que cuando ingrese no lo cargue
async eliminarArchivos() {
  const fileName = 'fotoUsuario.jpeg';
  await Filesystem.deleteFile({
    path: `${IMAGE_DIR}/${fileName}`,
    directory: Directory.Data,
  }); 
};




// Upload the formData to our API
async uploadData(formData: FormData) {
  const loading = await this.loadingCtrl.create({
    message: 'Registrando Usuario...',
  });
  await loading.present();

  // Use your own API!
  //const url = 'http://localhost/ionic/camera/api/upload.php';
  const url = urlService + 'uploadFotoPerfil.php'
  console.log(url);
  console.log(formData);


  this.http.post(url, formData)
    .pipe(
      finalize(() => {
        loading.dismiss();
      })
    )
    .subscribe(res => {
      if (res['success']) {
        this.presentToast('Perfil Creado');
        // this.navCtrl.navigateRoot('/confirmacion');
        console.log('File upload complete.');
      } else {
        this.presentToast('Error reportando....')
        console.log('File upload failed.');
      }
    });

}

// Little helper
async presentToast(text) {
  const toast = await this.toastCtrl.create({
    message: text,
    duration: 3000,
    position: 'top'
  });
  toast.present();
}



}
