import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-cursos-form',
  templateUrl: './cursos-form.component.html',
  styleUrls: ['./cursos-form.component.scss']
})
export class CursosFormComponent implements OnInit {
  form: FormGroup;// raiz do formulario funciona como uma arvore
  submitted: boolean = false;//flag para saber se o formulario foi submetido
  constructor(
    private fb: FormBuilder
  ) { }
  //para criar de forma reativa precisamos do FormBuilder
  ngOnInit(): void {
    //criar formulário, grupo de campos nao importa quantos
    this.form = this.fb.group({
      nome: [null, [Validators.required]],//inicialmente vai ser null, array de validação
    })
  }

  hasError(field:string) {
    return this.form.get(field).errors;//pega possiveis erros

  }

  onSubmit() {
    this.submitted = true;
    if (this.form.valid) {//se o formulario for valido

    }
  }
  onCancel() {
    this.submitted = false;
    this.form.reset();//resetar formulario

  }


}
