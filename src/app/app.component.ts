import { CommonModule } from '@angular/common';
import { Component, input, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormArray } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { PersonService } from './person.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule, HttpClientModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  providers: [PersonService]
})
export class AppComponent  implements OnInit {
  title = 'Homes';
  formPerson!: FormGroup;

  constructor(private personService: PersonService) {}

  ngOnInit() {
    this.formPerson = new FormGroup({
      Nome: new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(35)]),
      Apelido: new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(10)]),
      Nascimento: new FormControl('', [Validators.required]),
      Stack: new FormArray([new FormControl('', [Validators.required, Validators.minLength(2), Validators.maxLength(20)])
      ]),
    });
  }

  async sendData() {
    if (this.formPerson.valid) {
      try {
        console.log(this.formPerson.value);
        const res = await this.personService.enviarPessoa(this.formPerson.value).toPromise();
        console.log('Dados enviados com sucesso:', res);
      } catch (err) {
        console.error('Erro ao enviar dados:', err);
      }
    }
  }

  get stackControls() {
    return (this.formPerson.get('Stack') as FormArray).controls;
  }

  addStack() {
    (this.formPerson.get('Stack') as FormArray).push(new FormControl('', Validators.required));
  }
  
  removeStack(index: number) {
    (this.formPerson.get('Stack') as FormArray).removeAt(index);
  }
}