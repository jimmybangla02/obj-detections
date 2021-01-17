import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {UnauthorizedComponent} from './view/pages/unauthorized/unauthorized.component';
import {LogoutComponent} from './view/pages/logout/logout.component';
import {LoginComponent} from './view/pages/login/login.component';
import {ImageDetectionComponent} from './view/pages/object-detection/image-detection/image-detection.component';
import {VideoDetectionComponent} from './view/pages/object-detection/video-detection/video-detection.component';


const routes: Routes = [
  {
    path: '',
    redirectTo: 'image-detection',
    pathMatch: 'full'
  },
  {
    path: 'image-detection',
    component: ImageDetectionComponent
  },
  {
    path: 'video-detection',
    component: VideoDetectionComponent
  },
  {
    path: 'unauthorized',
    component: UnauthorizedComponent
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'logout',
    component: LogoutComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
