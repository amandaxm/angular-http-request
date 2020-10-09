import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CursosService } from '../cursos.service';
import { AlertModalService } from '../../shared/alert-modal.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-cursos-form',
  templateUrl: './cursos-form.component.html',
  styleUrls: ['./cursos-form.component.scss'],
})
export class CursosFormComponent implements OnInit {
  form: FormGroup; // raiz do formulario funciona como uma arvore
  submitted: boolean = false; //flag para saber se o formulario foi submetido
 
  constructor(
     //para criar de forma reativa precisamos do FormBuilder
    private fb: FormBuilder,
    private cursoService: CursosService,
    private modal: AlertModalService,
    private location: Location
    ) {}
 
  ngOnInit(): void {
    //criar formulário, grupo de campos nao importa quantos
    this.form = this.fb.group({
      nome: [null, [Validators.required]], //inicialmente vai ser null, array de validação
    });
  }

  hasError(field: string) {
    return this.form.get(field).errors; //pega possiveis erros
  }

  onSubmit() {
    this.submitted = true;
    if (this.form.valid) {//se o formulario for valido
      this.cursoService.create(this.form.value).subscribe(
        sucess=> {
          this.modal.showAlertSuccess('Curso criado com sucesso!');
          this.location.back();//voltar para onde estava

        },
        error=> this.modal.showAlertDanger('Erro ao criar curso, tente novamente'),
        ()=> console.log('request ok 200')
      );
    }
  }
  onCancel() {
    this.submitted = false;
    this.form.reset(); //resetar formulario
  }
}
