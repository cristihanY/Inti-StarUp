import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from '../../../core/models/user.model';

import { AuthService } from './../../../core/services/auth.service';

import {HeaderComponent} from  '../../../shared/components/header/header.component'



@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  showPassword = false;
  form: FormGroup;
  token="";
  profile:User| null=null;
  password = '';
  errorMessage='';

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private authService: AuthService,
    //private headComponent: HeaderComponent
  ) {
    this.buildForm();
  }

  ngOnInit() {
  }

  login(event: Event) {
    //console.log("Aqui solicitando1");
    event.preventDefault();
    if (this.form.valid) {
      //console.log("Aqui solicitandod3");
      const value = this.form.value;
      this.authService.loginm(value.email, value.password)
      .subscribe(name=>{
        this.token=name.jwt;
        //console.log(this.token);
        this.router.navigate(['/home'])
        //this.headComponent.getProfile();
      },(error)=>{
        //console.log("hola",error);
        this.errorMessage='Error al autenticar vuelva a ingresar los datos correctos'
        this.form.reset();
      })
     ;
 
    }
  }

  getProfile(){

    this.authService.profile(this.token)
    .subscribe(user=>{
      this.profile=user;
    });
  }

  private buildForm() {
    this.form = this.formBuilder.group({
      email: ['', [Validators.required]],
      password: ['', [Validators.required]],
    });
  }


  togglePassword() {
    this.password=this.form.get('password').value;
    this.showPassword = !this.showPassword;
  }
}
