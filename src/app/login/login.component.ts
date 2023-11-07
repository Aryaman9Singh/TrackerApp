//import { HttpClientModule } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http'; // Import HttpClient to make HTTP requests
import { Router } from '@angular/router'; // Import Router for navigation
import { CheckService } from '../Services/check.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})

export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  loginFailed: boolean | undefined;

  constructor(
    private fb: FormBuilder,
    private http: HttpClient,
    private router: Router, // Inject Router for navigation
    private checkService:CheckService
  ) {
    this.loginForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  ngOnInit(): void {}

   onSubmit(): void {
    
    if (this.loginForm.valid) {
      const username = this.loginForm.value.username;
      const password = this.loginForm.value.password;

      
      this.http
        .post<any>('http://localhost:8089/admin/authenticate', { username, password }).subscribe(
          (response) => {
            if (response.jwt && response.jwt !== 'No') {
            
            localStorage.setItem('username', username);
            let token = 'Bearer ' + response.jwt;
            sessionStorage.setItem('token', token);
            console.log('Login successful', response);
            console.log(token);
            alert("Welcome "+username+",\nYou Logged In Successfully..!")
            

            let decodedJWT = JSON.parse(window.atob(token.split('.')[1]));
            let role: string = decodedJWT.role;
            let user:string=decodedJWT.sub;
              sessionStorage.setItem('user',user.trim());
            sessionStorage.setItem('role',role);
            console.log("decoded username",user);
            console.log("decoded role", role);
           const check=this.checkService.checkMentor();
              if(check){
                this.router.navigate(['/dashboard']); // Replace with your route
                return;
              }
              else if(this.checkService.checkAdmin()){
                this.router.navigate(['/adminDashboard'])
                return;

              }

            // Redirect to a dashboard or any other page upon successful login
            }else{
              this.loginFailed = true;
            }
          },
          (error) => {
            console.error('Login failed', error);
            this.loginFailed = true;
          }
        );
    }

   }

}

 