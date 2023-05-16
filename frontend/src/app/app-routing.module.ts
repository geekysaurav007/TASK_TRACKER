import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminhomeComponent } from './components/admin/adminhome/adminhome.component';
import { GetallListComponent } from './components/admin/getall-list/getall-list.component';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { MyListsComponent } from './components/user/my-lists/my-lists.component';
import { MyProfileComponent } from './components/user/my-profile/my-profile.component';
import { UserHomeComponent } from './components/user/user-home/user-home.component';
import { AuthGuard } from './services/auth.guard';
import { CreateListComponent } from './components/user/create-list/create-list.component';
import { AdminAuthGuard } from './services/admin-auth.guard';
import { UserAuthGuard } from './services/user-auth.guard';
import { UpdateListComponent } from './components/user/update-list/update-list.component';


const routes: Routes = [
  {path:"login",component:LoginComponent},
  {path:'home',component:HomeComponent},
  {path:"",component:HomeComponent},

  {path:"user",canActivateChild:[UserAuthGuard],children:[
    {path:"mylist",component:MyListsComponent},
    {path:"myprofile/:id",component:MyProfileComponent},
    {path:"create",component:CreateListComponent},
    {path:"updatelist/:id",component:UpdateListComponent,pathMatch:"full"}
  ],},

  {path:"admin",canActivateChild:[AdminAuthGuard],children:[
    {path:"getalllist",component:GetallListComponent,
    }
  ]}
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
