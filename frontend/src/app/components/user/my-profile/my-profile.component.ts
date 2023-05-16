import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UserserviceService } from 'src/app/services/userservice.service';

@Component({
  selector: 'app-my-profile',
  templateUrl: './my-profile.component.html',
  styleUrls: ['./my-profile.component.css']
})
export class MyProfileComponent implements OnInit {

  constructor(private route:ActivatedRoute,private userservice:UserserviceService) { }
  my_Info:any=[]
  ngOnInit(): void {
    let my_id = this.route.snapshot.paramMap.get('id')
    this.userservice.getMyProfile(my_id).subscribe((data:any)=>{
     this.my_Info=data
     console.warn(this.my_Info)
    })
    

  }

}
