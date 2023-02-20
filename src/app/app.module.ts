import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { ToastrModule } from 'ngx-toastr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { UsuarioModule } from './components/usuario/usuario.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HomeOutComponent } from './components/home-out/home-out.component';
import { HeaderComponent } from './components/header/header.component';


@NgModule({
  declarations: [
    AppComponent,
    HomeOutComponent,
    HeaderComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    UsuarioModule,
    FormsModule,
    ReactiveFormsModule,
    ToastrModule.forRoot({
      timeOut: 7000,
      positionClass: 'toast-bottom-right',
      preventDuplicates: true,
    }),
    BrowserAnimationsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
