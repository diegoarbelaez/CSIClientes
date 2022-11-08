import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { PanicoGuard } from './guards/panico.guard';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'panico',
    pathMatch: 'full'
  },
  {
    path: 'login',
    loadChildren: () => import('./pages/login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: 'signup',
    loadChildren: () => import('./pages/signup/signup.module').then( m => m.SignupPageModule)
  },
  {
    path: 'forgot',
    loadChildren: () => import('./pages/forgot/forgot.module').then( m => m.ForgotPageModule)
  },
  {
    path: 'home',
    loadChildren: () => import('./pages/home/home.module').then( m => m.HomePageModule)
  },
  {
    path: 'informacion',
    loadChildren: () => import('./pages/informacion/informacion.module').then( m => m.InformacionPageModule)
  },
  {
    path: 'panico',
    loadChildren: () => import('./pages/panico/panico.module').then( m => m.PanicoPageModule),
    canLoad : [ PanicoGuard ]
  },
  {
    path: 'iniciosesion',
    loadChildren: () => import('./pages/iniciosesion/iniciosesion.module').then( m => m.IniciosesionPageModule)
  },
  {
    path: 'submenu1',
    loadChildren: () => import('./pages/submenu1/submenu1.module').then( m => m.Submenu1PageModule)
  },
  {
    path: 'submenu2',
    loadChildren: () => import('./pages/submenu2/submenu2.module').then( m => m.Submenu2PageModule)
  },
  {
    path: 'agregar-contacto',
    loadChildren: () => import('./pages/agregar-contacto/agregar-contacto.module').then( m => m.AgregarContactoPageModule)
  },
  {
    path: 'timer',
    loadChildren: () => import('./pages/timer/timer.module').then( m => m.TimerPageModule)
  },
  {
    path: 'confirmacion',
    loadChildren: () => import('./pages/confirmacion/confirmacion.module').then( m => m.ConfirmacionPageModule)
  },
  {
    path: 'editarperfil',
    loadChildren: () => import('./pages/editarperfil/editarperfil.module').then( m => m.EditarperfilPageModule)
  },
  {
    path: 'olvido-contrasena',
    loadChildren: () => import('./pages/olvido-contrasena/olvido-contrasena.module').then( m => m.OlvidoContrasenaPageModule)
  },
  {
    path: 'info-segura',
    loadChildren: () => import('./pages/info-segura/info-segura.module').then( m => m.InfoSeguraPageModule)
  },
  {
    path: 'proximamente',
    loadChildren: () => import('./pages/proximamente/proximamente.module').then( m => m.ProximamentePageModule)
  },
  {
    path: 'alertas',
    loadChildren: () => import('./pages/alertas/alertas.module').then( m => m.AlertasPageModule)
  },
  {
    path: 'agentes',
    loadChildren: () => import('./pages/agentes/agentes.module').then( m => m.AgentesPageModule)
  },
  {
    path: 'eliminacuenta',
    loadChildren: () => import('./pages/eliminacuenta/eliminacuenta.module').then( m => m.EliminacuentaPageModule)
  },
  {
    path: 'terminos',
    loadChildren: () => import('./pages/terminos/terminos.module').then( m => m.TerminosPageModule)
  },
  {
    path: 'carga',
    loadChildren: () => import('./pages/carga/carga.module').then( m => m.CargaPageModule)
  },
  {
    path: 'terminos2',
    loadChildren: () => import('./pages/terminos2/terminos2.module').then( m => m.Terminos2PageModule)
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
