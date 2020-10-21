import { Component, OnInit, ViewChild } from '@angular/core';
import { CursosService } from '../cursos.service';
import { Curso } from '../curso';
import { empty, Observable, Subject } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { AlertModalService } from '../../shared/alert-modal.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-cursos-lista',
  templateUrl: './cursos-lista.component.html',
  styleUrls: ['./cursos-lista.component.scss'],
})
export class CursosListaComponent implements OnInit {
  @ViewChild('deleteModal', { static: true }) deleteModal;

  deleteModalRef: BsModalRef;
  bsModalRef: BsModalRef;
  cursos$: Observable<Curso[]>; //$ é um observable
  error$ = new Subject<boolean>();
  cursoSelecionado: Curso;
  //subject consegue emitir valores

  constructor(
    private modalService: BsModalService,
    private service: CursosService,
    private alertService: AlertModalService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    // this.service.list().subscribe(dados => this.cursos = dados);//se inscrever e ficar escutando as mudanças
    //de uma maneira mais prática
    //para utilizar o async
    this.onRefresh();
  }

  onRefresh() {
    this.cursos$ = this.service.list().pipe(
      catchError((error) => {
        console.error(error);
        // this.error$.next(true);
        this.handleError();
        return empty();
      })
    );
    this.service.list().subscribe(
      (dados) => {
        console.log(dados);
      },
      (error) => console.error(error),
      () => console.log('Observable completo')
    );
  }
  handleError() {
    this.alertService.showAlertDanger(
      'Erro ao carregar cursos. Tente novamente mais tarde'
    );
  }
  onEdit(id) {//recebe curso.id para saber qual iremos editar
    this.router.navigate(['editar',id],{relativeTo: this.route});
  }
  onDelete(curso){
    this.cursoSelecionado=curso;
    this.deleteModalRef = this.modalService.show(this.deleteModal, {class: 'modal-sm'});
  }

  onConfirmDelete() {
    this.service.remove(this.cursoSelecionado.id)
    .subscribe(
      success => {
        this.onRefresh();
        this.deleteModalRef.hide();
      },
      error => {
        this.alertService.showAlertDanger('Erro ao remover curso. Tente novamente mais tarde.');
        this.deleteModalRef.hide();
      }
    );
  }

  onDeclineDelete() {
    this.deleteModalRef.hide();
  }

}
