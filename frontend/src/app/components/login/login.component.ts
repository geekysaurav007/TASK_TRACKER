import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import jwtDecode from 'jwt-decode';
import { Logintype } from 'src/app/datatypes/logintype';

import { UserserviceService } from '../../services/userservice.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  errorMessage: any = '';

  constructor(
    private Loginservice: UserserviceService,
    public router: Router
  ) {}

  ngOnInit(): void {}
  loginForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required]),
  });

  Login(data: Logintype) {
    this.Loginservice.loginService(data);
  }

  clickerr() {
    const check=document.getElementById('checkbox') as HTMLInputElement;
    console.log()
    const pass = document.getElementById('Password') as HTMLInputElement;
    if (check.checked) {
      pass.type = 'text';
    } else {
      pass.type = 'password';
    }
  }
  clickerr2(data:any){
    console.log(data)
  }
}
