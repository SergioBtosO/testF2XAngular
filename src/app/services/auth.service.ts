import { Injectable } from '@angular/core';
import {HttpClient } from '@angular/common/http';
import { IUser } from '../models/i-user';
import { ILoginRequest } from '../models/i-login-request';
import { ILoginResponse } from '../models/i-login-response';
import {tap} from 'rxjs/operators';
import {Observable,BehaviorSubject} from 'rxjs';


@Injectable()

export class AuthService {

  AUTH_SERVER: string= 'https://testf2x.azurewebsites.net/api'
  authSubject = new BehaviorSubject(false);
  private token: string | null = null;

  constructor(private httpClient: HttpClient) { }

  register(user: IUser): Observable<ILoginResponse> {
    return this.httpClient.post<ILoginResponse>(`${this.AUTH_SERVER}/Account/register`,
    user).pipe(tap(
      (res: ILoginResponse)=>{
        if(res){
         this.saveToken(res.data.jwToken);
        }
      }
    ));
  }

  login(request: ILoginRequest): Observable<ILoginResponse> {
    return this.httpClient.post<ILoginResponse>(`${this.AUTH_SERVER}/Account/authenticate`,
    request).pipe(tap(
      (res: ILoginResponse)=>{
        if(res){
          //guardar token
          this.saveToken(res.data.jwToken);
        }
      }
    ));
  }

  logout(): void{
    this.token = '';
    localStorage.removeItem("ACCESS_TOKEN");
  }

  private saveToken(token: string): void{
    localStorage.setItem("ACCESS_TOKEN",token);
    this.token = token;
  }

  private getToken(): string | null {
    if(!this.token){
      this.token = localStorage.getItem("ACCESS_TOKEN");
    }
    return this.token;
  }

}
