import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { getAuth, provideAuth } from '@angular/fire/auth';

@NgModule({
  declarations: [],
  imports: [CommonModule, provideAuth(() => getAuth())],
})
export class FirebaseAuthModule {}
