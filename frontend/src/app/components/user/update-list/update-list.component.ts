import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserserviceService } from 'src/app/services/userservice.service';
import {FormControl,FormGroup,Validators} from '@angular/forms'

@Component({
  selector: 'app-update-list',
  templateUrl: './update-list.component.html',
  styleUrls: ['./update-list.component.css']
})
export class UpdateListComponent implements OnInit {

  constructor(private route:ActivatedRoute,private userservivce:UserserviceService,private router:Router) { }
  my_list:any
  user_Id:any
  list_id:any
  updateForm=new FormGroup({
    title:new FormControl("",Validators.required),
    description:new FormControl("",Validators.required),
    // user:new FormControl("",Validators.required)
  })
  ngOnInit(): void {
    this.user_Id=localStorage.getItem('user_Id')
      this.list_id = this.route.snapshot.paramMap.get('id')
    this.userservivce.getMySingleList(this.list_id).subscribe((res:any)=>{
     this.my_list=res
     console.log(this.my_list)
    })
    
  }
  
  Update(data:any){
    this.userservivce.updateMyList(this.list_id,data).subscribe((res:any)=>{
     console.warn(res)
     this.router.navigate(['user/mylist'])
    })
  }

}
