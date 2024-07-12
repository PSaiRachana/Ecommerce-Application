import { Component, Input, output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { EventEmitter } from 'stream';

@Component({
  selector: 'app-login' ,
  standalone: true,
  imports: [],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  // enteredTitle = '';

  // @Output() add = new EventEmitter<{title: string}>();
  // add = output<{title: string}>();

  // onSubmit(titleElement: HTMLInputElement, form: HTMLFormElement) {
  //   const enteredTitle = titleElement.value;
  //   console.log('SUBMITTED!');
  //   console.log(titleElement);
  //   console.log('ENTERED TITLE: ' + enteredTitle);
  //   form.reset();
  // }

  // onSubmit() {
  //   this.add.emit({ title: this.enteredTitle });
  // }

}

