import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { SignUpComponent } from './components/sign-up/sign-up.component';
import { HeaderComponent } from './components/header/header.component';
import{FormsModule, ReactiveFormsModule} from '@angular/forms';
import { FooterComponent } from './components/footer/footer.component'
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { MyListsComponent } from './components/user/my-lists/my-lists.component';
import { MyProfileComponent } from './components/user/my-profile/my-profile.component';
import { HomeComponent } from './components/home/home.component';
import { GetallListComponent } from './components/admin/getall-list/getall-list.component';
import { AdminhomeComponent } from './components/admin/adminhome/adminhome.component';
import {JwtModule,JwtModuleOptions} from '@auth0/angular-jwt';
import { UserHomeComponent } from './components/user/user-home/user-home.component';
import { CreateListComponent } from './components/user/create-list/create-list.component'
import { AdminAuthGuard } from './services/admin-auth.guard';
import { UserAuthGuard } from './services/user-auth.guard';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatCardModule} from '@angular/material/card';
import {MatTableModule} from '@angular/material/table';
import { UpdateListComponent } from './components/user/update-list/update-list.component';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    SignUpComponent,
    HeaderComponent,
    FooterComponent,
    MyListsComponent,
    MyProfileComponent,
    HomeComponent,
    GetallListComponent,
    AdminhomeComponent,
    UserHomeComponent,
    CreateListComponent,
    UpdateListComponent, 
    
  ],
  imports: [
    FormsModule,
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    BrowserAnimationsModule,MatCardModule,MatTableModule
    
  ],
  providers: [AdminAuthGuard,UserAuthGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
