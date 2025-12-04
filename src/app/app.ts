import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { FormGroup, FormControl, Validators, ReactiveFormsModule } from '@angular/forms'; 
import { CommonModule } from '@angular/common'; 
import { HttpClientModule } from '@angular/common/http';

import { Contact } from './contact.interface';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, HttpClientModule], 
  templateUrl: './app.html',
  styleUrls: ['./app.css']
})
export class App {
  contacts: Contact[] = [];

  private readonly phonePattern = /^\d{10}$/;

  contactForm = new FormGroup({
  name: new FormControl('', [
    Validators.required,
    Validators.minLength(2)
  ]),

  phone: new FormControl('', [
    Validators.required,
    Validators.pattern(this.phonePattern) 
  ]),
});

  onSubmit() {
    console.log('Form Submitted!');
  }
}
