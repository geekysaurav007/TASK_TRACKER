import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserserviceService } from 'src/app/services/userservice.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  my_info:any
  id:any
  my_name:any

  constructor(public userservice:UserserviceService,private router:Router) { }
  
  ngOnInit(): void {
    
    this.userservice.reloadUser()
    this.id=localStorage.getItem("user_Id") 
    
  }
 
  getTokengo():boolean{
    if(localStorage.getItem('user')){
     return true
    }
    else{
      return false
    }
  }


  logOut(){
    if(localStorage.getItem('auth') ){
      localStorage.clear()
     
      this.router.navigate(['/login'])

    }
  }
  
 
   

}
