import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ConfigService } from 'src/app/config/services/config.service';
import { AuthUseCase } from 'src/app/core/application/auth.usecase';
import { Auth } from 'src/app/core/domain/auth.interface';
import { Token } from 'src/app/core/domain/token.interface';

@Component({
  selector: 'f2x-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  group: FormGroup;

  constructor(
    private readonly configService: ConfigService,
    private readonly router: Router,
    private readonly authUseCase: AuthUseCase
  ) {
    this.configService.configuration = {
      layout: {
        header: {
          hidden: true,
        },
        menu: {
          hidden: true,
        },
      },
    };

    const regexEmail = /^(?:(?:[\w`~!#$%^&*\-=+;:{}'|,?\/]+(?:(?:\.(?:"(?:\\?[\w`~!#$%^&*\-=+;:{}'|,?\/\.()<>\[\] @]|\\"|\\\\)*"|[\w`~!#$%^&*\-=+;:{}'|,?\/]+))*\.[\w`~!#$%^&*\-=+;:{}'|,?\/]+)?)|(?:"(?:\\?[\w`~!#$%^&*\-=+;:{}'|,?\/\.()<>\[\] @]|\\"|\\\\)+"))@(?:[a-zA-Z\d\-]+(?:\.[a-zA-Z\d\-]+)*|\[\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}\])$/;

    this.group = new FormGroup({
      email: new FormControl(null, [
        Validators.required,
        Validators.pattern(regexEmail),
      ]),
      password: new FormControl(null, Validators.required),
    });
  }

  ngOnInit(): void {}

  login() {
    console.log("login");
    const auth: Auth = this.group.value;
    this.authUseCase.login(auth).subscribe((response: Token) => {
      console.log(response);
      this.authUseCase.setStorage('accessToken', response.data.jwToken);
      this.authUseCase.changeStatusUser(true);
      this.router.navigate(['/recaudos']);
    });
  }
}
