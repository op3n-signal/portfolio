import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { GeneralService } from '../../shared/services/general.service';
import { LoginModel } from '../../models/loginModel';
import { ClientSerivce } from 'src/app/shared/services/client.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  login: LoginModel = {
    username: '',
    email: '',
    password: ''
  };
  success: string = '';

  constructor(private sClient: ClientSerivce, private genService: GeneralService) { 
  }

  ngOnInit(): void {
  }

  logIn(f: NgForm): void {
    this.sClient.signIn(this.login);
    f.reset();
  }

  back(): void {
    this.genService.goBack();
  }
}
