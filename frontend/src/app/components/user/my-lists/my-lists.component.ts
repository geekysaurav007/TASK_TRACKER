import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserserviceService } from 'src/app/services/userservice.service';

@Component({
  selector: 'app-my-lists',
  templateUrl: './my-lists.component.html',
  styleUrls: ['./my-lists.component.css']
})
export class MyListsComponent implements OnInit {
  id: any
  my_list!: any
  constructor(private userservice: UserserviceService,private route:Router) { }
  // getMylist() {
  //   this.userservice.getMylist(this.id).subscribe((res) => {
  //     this.my_list=res
  //     console.warn(res)
  //   })
  // }


  ngOnInit(): void {
  
    this.userservice.reloadUser()
    this.id = localStorage.getItem("user_Id")
    console.warn(this.id)
    this.userservice.getMylist(this.id).subscribe((res: any) => {
      this.my_list = res
      console.warn(this.my_list)
    })

  }
  // --------------------------------------------------------------
  deleteMylist(id: any) {
    alert("list will be deleted")
    this.userservice.deleteMylist(id).subscribe((res) => {

    }, (err) => {
      alert(err.error.error)
    })
  }

  
  updateMylist(id:any){
    this.route.navigate([`user/updatelist/${id}`])
  }
  

}
