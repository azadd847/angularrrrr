import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent {
  username: string = "";
  password: string = "";
  email: string = "";
  isSignUpSuccessful: boolean = false;

  constructor(private router: Router, private http: HttpClient) {}

  onSignUp() {
    if (this.username && this.password && this.email) {
      // Tüm alanlar doldurulmuşsa kayıt işlemini gerçekleştir
      const userData = {
        username: this.username,
        password: this.password,
        email: this.email
      };

      // Send the user registration data to the server
      this.http.post<any>('http://127.0.0.1:8000/create-user', userData)
        .subscribe(
          (response) => {
            if (response.status) {
              this.isSignUpSuccessful = true;
              setTimeout(() => {
                this.isSignUpSuccessful = false;
                alert("Kayıt başarıyla oluşturuldu.");
                this.router.navigate(['/login']);
              }, 1000); // 1 saniye sonra login sayfasına yönlendirme yapılır
            } else {
              alert("Kayıt oluşturulamadı.");
            }
          },
          (error) => {
            console.error('Error during user registration:', error);
            alert("Bir hata oluştu. Kayıt oluşturulamadı.");
          }
        );
    } else {
      // Tüm alanlar doldurulmamışsa uyarı ver
      alert("Lütfen tüm alanları doldurunuz!");
    }
  }
}
