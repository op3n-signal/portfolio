import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss']
})
export class ContactComponent implements OnInit {
  value: string = 'Phone';

  constructor(private router: Router) { 
    window.scrollTo(0, 0);
  }

  ngOnInit(): void {
  }

  goback(): void {
    this.router.navigate(['/']);
  }

  showphone(): void {
    this.value = '(850)300-8126';
  }

}
