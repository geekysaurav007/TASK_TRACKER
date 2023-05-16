import { Injectable } from '@angular/core';
import { Logintype } from '../datatypes/logintype';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, take } from 'rxjs';
import jwt_decode from "jwt-decode"
import { Router } from '@angular/router';
import { createList } from '../datatypes/list';



@Injectable({
  providedIn: 'root'
})
export class UserserviceService {
  // baseUrl='localhost:3000/api/user'
  ngOnInit() {

  }


  constructor(private http: HttpClient, private router: Router) { }
  public id: any = ''
  public id2:any=''


  isAdmin: any
  isUser: any
  // Login service api call------------------------
  loginService(data: Logintype) {
    this.http.post("http://localhost:3000/api/user/login", data).subscribe((res: any) => {
      if (res) {
        console.warn(res.token)
        var decoded_data: any = jwt_decode(res.token);
        this.id = decoded_data._id
        

        if (decoded_data.isAdmin) {
          localStorage.setItem("auth", res.token)
          this.isAdmin = true
          this.isUser = false
          localStorage.setItem("admin", "yes")
          console.warn("yoooorrrrr valuessss", this.isAdmin, this.isUser)
          this.router.navigate(['home'])
        }
        else {
          localStorage.setItem('auth', res.token)
          this.isUser = true
          this.isAdmin = false
          localStorage.setItem("user", "yes")
          localStorage.setItem("user_Id",this.id)
          console.warn("yoooorrrrr valuessss", this.isAdmin, this.isUser)
          this.router.navigate(['user/mylist'])
        }
      }
    }, (error) => {
      console.warn(error.error.error)
      window.alert(`you have error=> ${error.error.error}`)
    })

  }
  // --------------------------------------------------------------



  // for keeping safe data of user logged in--------------------------------
  reloadUser() {
    if (localStorage.getItem("user")) {
      this.isUser = true
     
      this.router.navigate(['user/mylist'])
    }
  }
  // ------------------------------------------------------------

  // for keeping safe data of admin logged in
  reloadAdmin() {
    if (localStorage.getItem("admin")) {
      this.isAdmin = true
      this.router.navigate(['admin/getalllist'])
    }
  }
  // --------------------------------------------------------

  // for getting auth token------------------------------
  getToken(): any {
    const token: string | null = localStorage.getItem('auth')
    return new HttpHeaders().set("Authorization", "Bearer " + token);
  }
  // -------------------------------------------------------

  // for getting a particular person all lists----------
  getMylist(id: any) {
    return this.http.get(`http://localhost:3000/api/user/mylist/${id}`, { headers: this.getToken() })
  }
  // ----------------------------------------------------- 
                
  getMyProfile(id:any){
    return this.http.get(`http://localhost:3000/api/user/my-profile/${id}`, { headers: this.getToken() })
  }
// ----------------------------------->>>>>>>>>>>>>>>>
createList(data:createList){
  return this.http.post("http://localhost:3000/api/lists/create",data,{ headers: this.getToken() })
}
// ------------------------------------------------------------------


// ----------------------------------------
deleteMylist(id:any){
  return this.http.delete(`http://localhost:3000/api/user/deletemylist/${id}`,{ headers: this.getToken() })
}

updateMyList(id:any,data:any){
  return this.http.put(`http://localhost:3000/api/user/${id}/mylist-update`,data,
  { headers: this.getToken() })
}

getMySingleList(id:any){
  return this.http.get(`http://localhost:3000/api/lists/getmylist/${id}`,{ headers: this.getToken() })
}

}


