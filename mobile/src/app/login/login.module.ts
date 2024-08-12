import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login.component';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { LoginRoutingModule } from './login-routing.module';

@NgModule({
  imports: [CommonModule, FormsModule, IonicModule, LoginRoutingModule],
  declarations: [LoginComponent],
})
export class LoginModule {}
