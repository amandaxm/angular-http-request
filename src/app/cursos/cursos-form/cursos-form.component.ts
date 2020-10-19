import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CursosService } from '../cursos.service';
import { AlertModalService } from '../../shared/alert-modal.service';
import { Location } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { map, switchMap } from 'rxjs/operators';

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
    private location: Location,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    const curso = this.route.snapshot.data['curso'];

    //criar formulário, grupo de campos nao importa quantos
    this.form = this.fb.group({
      id:curso.id,
      nome: [curso.nome, [Validators.required]], //inicialmente vai ser null, array de validação
    });
  }

  hasError(field: string) {
    return this.form.get(field).errors; //pega possiveis erros
  }

  onSubmit() {
    this.submitted = true;
    if (this.form.valid) {
      //se o formulario for valido
      if (this.form.value.id) {
        this.cursoService.save(this.form.value).subscribe(
          (sucess) => {
            this.modal.showAlertSuccess('Curso atualizado com sucesso!');
            this.location.back(); //voltar para onde estava
          },
          (error) =>
            this.modal.showAlertDanger('Erro ao atualizar curso, tente novamente'),
          () => console.log('request ok 200')
        );
      } else {
        this.cursoService.save(this.form.value).subscribe(
          (sucess) => {
            this.modal.showAlertSuccess('Curso criado com sucesso!');
            this.location.back(); //voltar para onde estava
          },
          (error) =>
            this.modal.showAlertDanger('Erro ao criar curso, tente novamente'),
          () => console.log('request ok 200')
        );
      }
    }
  }
  onCancel() {
    this.submitted = false;
    this.form.reset(); //resetar formulario
  }
}
