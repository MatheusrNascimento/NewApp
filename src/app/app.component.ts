import { CommonModule } from '@angular/common';
import { Component, input, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormArray } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule, HttpClientModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent  implements OnInit {
  title = 'Homes';
  formPerson!: FormGroup;

  ngOnInit() {
    this.formPerson = new FormGroup({
      name: new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(35)]),
      nickname: new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(10)]),
      birthdate: new FormControl('', [Validators.required],),
      stack: new FormArray([
        new FormControl('', [Validators.required, Validators.minLength(2), Validators.maxLength(20)]),
      ]),
    });
  }

    sendData() {
      if (this.formPerson.valid) {
        console.log('Formulário enviado:', this.formPerson.value);
    }
  }

  get stackControls() {
    return (this.formPerson.get('stack') as FormArray).controls;
  }

  addStack() {
    (this.formPerson.get('stack') as FormArray).push(new FormControl('', Validators.required));
  }
  
  removeStack(index: number) {
    (this.formPerson.get('stack') as FormArray).removeAt(index);
  }
}