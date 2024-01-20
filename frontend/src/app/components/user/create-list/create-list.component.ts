import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import {FormControl,FormGroup,Validators} from '@angular/forms'
import { Router } from '@angular/router';
import { UserserviceService } from 'src/app/services/userservice.service';

@Component({
  selector: 'app-create-list',
  templateUrl: './create-list.component.html',
  styleUrls: ['./create-list.component.css']
})
export class CreateListComponent implements OnInit {

  constructor(private userservive:UserserviceService,private router:Router) { }
  user:any=''

  submitForm=new FormGroup({
    title:new FormControl('',Validators.required),
    description:new FormControl('',Validators.required),
    user:new FormControl("",Validators.required)

  })
  ngOnInit(): void {
    this.user=localStorage.getItem('user_Id')
  }
  
Submit(data:any){
 this.userservive.createList(data).subscribe((res:any)=>{
 if(!res['error']){
  this.router.navigate(['user/mylist'])
 }
 else{
  alert(`${res['error']}`)
 }
 },(err)=>{
  alert("you have error")
 })
}

}
