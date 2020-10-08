import { Component, OnInit } from '@angular/core';
import { CursosService } from '../cursos.service';
import { Curso } from '../curso';
import { empty, Observable, Subject } from 'rxjs';
import { catchError } from 'rxjs/operators';


@Component({
  selector: 'app-cursos-lista',
  templateUrl: './cursos-lista.component.html',
  styleUrls: ['./cursos-lista.component.scss']
})
export class CursosListaComponent implements OnInit {
  cursos$: Observable<Curso[]>;//$ é um observable
 
  error$ = new Subject<boolean>();
  //subject consegue emitir valores
 
  constructor(private service: CursosService) { }

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
      this.error$.next(true);
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

}
