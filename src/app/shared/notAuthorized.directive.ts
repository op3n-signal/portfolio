import { Directive, ElementRef, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { EmailService } from './services/email.service';
import { Status, Display } from './status.enum';

@Directive({
    selector: '[notAuthorized]'
})
export class NotAuthorizedDirective implements OnInit {

    constructor(private el: ElementRef, private emailService: EmailService, private route: ActivatedRoute) {}

    ngOnInit(): void {
        /* const accessAllowed = this.emailService.access;
        console.log(accessAllowed);
        if(accessAllowed == 0) { */
        console.log(this.route.snapshot);
        if(1 < 2)
            this.el.nativeElement.style.background = 'blue';
        console.log(this.el);
            
    }
}