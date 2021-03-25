import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';
import { ActivatedRoute, Router } from '@angular/router';
import { FilmesService } from 'src/app/core/filmes.service';
import { AlertaComponent } from 'src/app/shared/components/alerta/alerta.component';
import { Alerta } from 'src/app/shared/models/alerta';
import { Filme } from 'src/app/shared/models/filme';

@Component({
  selector: 'dio-visualizar-filmes',
  templateUrl: './visualizar-filmes.component.html',
  styleUrls: ['./visualizar-filmes.component.scss']
})
export class VisualizarFilmesComponent implements OnInit {

  filme:Filme;
  id: number;
  readonly semFoto = 'https://www2.camara.leg.br/atividade-legislativa/comissoes/comissoes-permanentes/cindra/imagens/sem.jpg.gif/image' 


  constructor(private ActivatedRoute: ActivatedRoute,
    private filmeService: FilmesService,
    public dialog: MatDialog,
    private router: Router) { }

  ngOnInit() {
    this.id= this.ActivatedRoute.snapshot.params['id'];
    this.visualizar();
  }

  excluir(): void{

    const config={
      data:{
        titulo: 'Quer deletar?',
        descricao:'Certeza mesmo ?',
        corBtnCancelar: 'primary',
        corBtnSucesso:'warn',
        possuirBtnFechar : true
      } as Alerta
    };
    const dialogRef = this.dialog.open(AlertaComponent, config);
    dialogRef.afterClosed().subscribe((opcao: boolean) =>{
      if(opcao){
        this.filmeService.excluir(this.id)
        .subscribe(()=> this.router.navigateByUrl('/filmes'));
      }
    });
  }

  private visualizar(): void{
    this.filmeService.visualizar(this.id).subscribe((filme: Filme) => this.filme = filme)

  }

}
