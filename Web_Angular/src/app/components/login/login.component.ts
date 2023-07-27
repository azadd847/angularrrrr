// login.component.ts
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  username: string = "";
  password: string = "";

  constructor(private router: Router, private http: HttpClient) {} // Router and HttpClient injection

  onLogin() {
    // Check if username and password are provided
    console.log('Login button clicked');
    console.log('Username:', this.username);
    console.log('Password:', this.password);
    if (this.username && this.password) {
      console.log('Kullanıcı adı:', this.username);
      console.log('Şifre:', this.password);

      // Create a payload with the username and password
      const loginData = {
        username: this.username,
        password: this.password
      };

      // Send a POST request to the server for login
      this.http.post<any>('http://127.0.0.1:8000/login', loginData).subscribe(
        (response) => {
          if (response.status) {
            // Login successful, navigate to the "other" page
            this.router.navigate(['/other']);
          } else {
            // Login failed, display an error message
            alert(response.message);
          }
        },
        (error) => {
          console.log(error);
          alert('Error during login. Please try again.');
        }
      );
    } else {
      alert('Lütfen kullanıcı adı ve şifre alanlarını doldurun.');
    }
  }

  onSignUp() {
    this.router.navigate(['/signup']); // Navigate to the signup page
  } 
}
