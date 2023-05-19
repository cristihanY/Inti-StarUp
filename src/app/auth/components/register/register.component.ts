import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { AuthService } from './../../../core/services/auth.service';
import { UserService} from './../../../core/services/user.service';
import { MyValidators } from 'src/app/utils/validators';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})


export class RegisterComponent implements OnInit {

  
  form: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private authService: AuthService,
    private userService: UserService
  ) {
    this.buildForm();
  }
  buttonPressed = false;

  ngOnInit() {
    let nextId=0;
   function generateId() {
      return nextId++;
    }
  }
 imprimir(){
  console.log(this.form.value);
 }




 //generador de id

 getRandomLetters(): string {
  const letters = '0ab1cd2efgh3ijklm4no5pq6rst7uv8wx9yz';
  let randomLetters = '';

  for (let i = 0; i < 3; i++) {
    const randomIndex = Math.floor(Math.random() * letters.length);
    randomLetters += letters[randomIndex];
  }

  return randomLetters;
}


 //generador de id


  register() {
    if (this.form.valid) {
      const value = this.form.value;
      //console.log(value);
      this.userService.create(value)
      .subscribe(newClient=>{
        //console.log(newClient);
        this.router.navigate(['/auth/login']);
      });
    }
  }

  private buildForm() {
    this.form = this.formBuilder.group({
      id: [''],
      name: ['', [Validators.required]],
      lastName: ['', [Validators.required]],
      email: ['', [Validators.required]],
      password: ['', [Validators.required, Validators.minLength(6), MyValidators.validPassword]],
      confirmPassword: ['', [Validators.required]],
      rolClient: ['', [Validators.required]],
      companyName:['',[Validators.required]],
      conditionCliente:['true']
    },{
      validators: MyValidators.matchPassword
    });

    this.typeFiel.valueChanges
      .subscribe(value=>{
        if(value==='user'){

          this.companyNameFiel.setValidators([Validators.required]);
        } else{
          this.companyNameFiel.setValidators(null);
        }
        this.companyNameFiel.updateValueAndValidity();

      })

     this.idValue.setValue(this.getRandomLetters()) 
  }

  get idValue(){
    return this.form.get('id');
  }

  get typeFiel(){
    return this.form.get('rolClient');
  }

  get companyNameFiel(){
    return this.form.get('companyName');
  }

  password = '';
  password1 = '';
  showPassword = false;
  showPassword1 = false;


  togglePassword() {
    this.password=this.form.get('password').value;
    this.showPassword = !this.showPassword;
  }
  togglePassword1() {
    this.password1=this.form.get('confirmPassword').value;
    this.showPassword1 = !this.showPassword1;
  }



  //generador de id
  


}


