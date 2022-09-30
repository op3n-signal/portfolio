import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { Email } from '../../footer/email';
import { LoginModel } from '../../models/loginModel';
import { environment } from 'src/environments/environment';

@Injectable({
    providedIn: 'root'
})

export class EmailService {


    constructor(private http: HttpClient) {}

    sendEmail(user: Email) {
        return this.http.post(`${environment.api}/other`, user);
    }

}