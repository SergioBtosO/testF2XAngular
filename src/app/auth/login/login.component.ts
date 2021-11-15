import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {AuthService} from './../../services/auth.service';
import {ILoginRequest} from './../../models/i-login-request';
import { ILoginResponse } from 'src/app/models/i-login-response';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit(): void {
    
  }

  onLogin(formLogin: { value: ILoginRequest; }): void{
    this.authService.login(formLogin.value).subscribe((res: ILoginResponse)=>{
      this.router.navigateByUrl('/auth');
    })
  }

}
