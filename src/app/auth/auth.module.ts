import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthRoutingModule } from './auth-routing.module';
import { LoginComponent } from './login/login.component';
import { LogoutComponent } from './logout/logout.component';
import { RegisterComponent } from './register/register.component';
import {
  NbAlertModule,
  NbButtonModule,
  NbCheckboxModule,
  NbIconModule,
  NbInputModule,
  NbSpinnerModule
} from '@nebular/theme';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FirebaseAuthModule } from '../features/firebase/firebase-auth/firebase-auth.service';

@NgModule({
  declarations: [
    LoginComponent,
    LogoutComponent,
    RegisterComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,

    NbAlertModule,
    NbInputModule,
    NbButtonModule,
    NbCheckboxModule,
    NbIconModule,
    NbSpinnerModule,

    FirebaseAuthModule,
    AuthRoutingModule,
  ]
})
export class AuthModule { }
