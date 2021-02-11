import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { tap } from 'rxjs/operators';
import { LoginForm } from '../interfaces/login-form.interface';
import { User } from '../models/user.model';
import { Observable } from 'rxjs';

const base_url = environment.base_url;

@Injectable({
  providedIn: 'root'
})
export class UserService {

  public user: User;

  constructor(private http: HttpClient,
    private router: Router) { }


  get token(): string {
    return localStorage.getItem('token') || '';
  }

  saveLocalStorage(token: string){
    localStorage.setItem("token", token);
  }

  login(formData: LoginForm): Observable<any> {
    return this.http.post(`${base_url}/auth/login`, formData)
    .pipe(
      tap((resp: any) => {
        const { 
          document_number, 
          document_type, 
          email, 
          email_verified_at, 
          id, is_administrator, name
        } = resp.user;
        this.user = new User( 
          id, 
          document_type, 
          document_number, 
          name,
          email, 
          email_verified_at, 
          is_administrator, 
        );
        this.saveLocalStorage(resp.token.access_token);
      })
    );
  }


  logout(): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${this.token}`
    })
    return this.http.get(`${base_url}/auth/logout`, { headers: headers })
    .pipe(
      tap((resp: any) => {
        console.log(resp);
        this.user = null;
        localStorage.removeItem("token");
        this.router.navigateByUrl('/login');
      })
    );
  }

  validateToken(): boolean {
    if(this.user){
      return true;
    }else{
      return false;
    }
  }

}
