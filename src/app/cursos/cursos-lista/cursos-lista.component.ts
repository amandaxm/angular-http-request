import { Component, OnInit } from '@angular/core';
import { CursosService } from '../cursos.service';
import { Curso } from '../curso';
import { empty, Observable, Subject } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { AlertModalComponent } from '../../shared/alert-modal/alert-modal.component';


@Component({
  selector: 'app-cursos-lista',
  templateUrl: './cursos-lista.component.html',
  styleUrls: ['./cursos-lista.component.scss']
})
export class CursosListaComponent implements OnInit {
 
  bsModalRef: BsModalRef;
  cursos$: Observable<Curso[]>;//$ é um observable
  error$ = new Subject<boolean>();
  //subject consegue emitir valores
 
  constructor(
    private service: CursosService,
    private modalService: BsModalService ) { }

  ngOnInit(): void {
   // this.service.list().subscribe(dados => this.cursos = dados);//se inscrever e ficar escutando as mudanças
 //de uma maneira mais prática
    //para utilizar o async
    this.onRefresh();
  }

  onRefresh(){
    this.cursos$ = this.service.list()
    .pipe(catchError(error => {
      console.error(error);
     // this.error$.next(true);
     this.handleError();
      return empty();


    }));
    this.service.list().subscribe(
      dados=>{
        console.log(dados);
      },
      error => console.error(error),
      ()=>console.log('Observable completo')
    );
  }
  handleError(){
    this.bsModalRef= this.modalService.show(AlertModalComponent);
    this.bsModalRef.content.type = 'danger';
    this.bsModalRef.content.message = 'Erro ao carregar cursos, tente novamente mais tarde';
  }

}
