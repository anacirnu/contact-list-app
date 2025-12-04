import { Component, ChangeDetectorRef } from '@angular/core';
import { FormGroup, FormControl, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { HttpClient } from '@angular/common/http';
import { Contact } from './contact.interface';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, HttpClientModule],
  templateUrl: './app.html',
  styleUrls: ['./app.css'],
})
export class App {
  contacts: Contact[] = [];

  constructor(private http: HttpClient, private cdr: ChangeDetectorRef) {}

  private readonly phonePattern = /^\d{10}$/;

  contactForm = new FormGroup({
    name: new FormControl('', [Validators.required, Validators.minLength(2)]),

    phone: new FormControl('', [Validators.required, Validators.pattern(this.phonePattern)]),
  });

  onSubmit() {
    if (this.contactForm.valid) {
      const newContact: Contact = {
        name: this.contactForm.value.name as string,
        phone: this.contactForm.value.phone as string,
        joke: 'Loading a joke...',
      };

      this.contacts.push(newContact);

      this.http.get<any>('https://api.chucknorris.io/jokes/random').subscribe({
        next: (res) => {
          newContact.joke = res.value;
          this.cdr.detectChanges();
        },
        error: (err) => {
          console.error('Failed to fetch joke', err);
          newContact.joke = 'Failed to load joke.';
        },
      });

      this.contactForm.reset();

      console.log('Contact saved:', newContact.name);
    } else {
      console.error('Form is invalid. Submission prevented by button disabling.');
    }
  }

  deleteContact(phone: string) {
    this.contacts = this.contacts.filter((contact) => contact.phone !== phone);
  }

  isFibonacci(n: number): boolean {
    const isPerfectSquare = (x: number) => {
      const s = Math.sqrt(x);
      return s === Math.floor(s);
    };

    // A number n is Fibonacci if 5*n^2 + 4 or 5*n^2 - 4 is a perfect square
    return isPerfectSquare(5 * n * n + 4) || isPerfectSquare(5 * n * n - 4);
  }
}
