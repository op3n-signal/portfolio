import { Injectable, OnInit } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot } from '@angular/router';
import { EmailService } from '../../shared/services/email.service';

@Injectable()

export class AuthGuard implements CanActivate, OnInit {

    constructor(private emailService: EmailService) {}

    ngOnInit(): void {
        
    }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
        return false;
    }

}