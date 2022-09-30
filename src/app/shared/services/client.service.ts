import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { LoginModel } from "src/app/models/loginModel";
import { environment as env } from 'src/environments/environment';

@Injectable({
    providedIn: 'root'
})

export class ClientSerivce {

    constructor(private http: HttpClient) {}

    signIn(login: LoginModel): void {
        this.http.post(`${env.api}user/login`, login).subscribe((res: any) => {
            sessionStorage.setItem("jwt", res.token);
        }, (err) => console.log(err));
    }
}