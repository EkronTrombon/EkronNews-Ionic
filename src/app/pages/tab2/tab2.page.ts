import { Component } from '@angular/core';
import { NoticiasService } from '../../services/noticias.service';
import { Article } from 'src/app/interfaces/interfaces';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {

  categorias = ['business', 'entertainment', 'general', 'health', 'science', 'sports', 'technology'];
  catSel = '';

  noticias: Article[] = [];

  constructor(private noticiasService: NoticiasService) {}

  seleccionaCat(evento) {
    this.catSel = evento.detail.value;
    this.noticias = [];
    // this.noticiasService.getNewsFromCategory(this.catSel).subscribe(resp => this.noticias.push(...resp.articles));
    this.cargarNoticias(this.catSel);
  }

  loadNoticias(evento) {
    this.cargarNoticias(this.catSel, evento);
  }

  cargarNoticias(categoriaSeleccionada: string, evento?) {
    this.noticiasService.getNewsFromCategory(categoriaSeleccionada).subscribe(resp => {
      if (resp.articles.length === 0) {
        evento.target.disabled = true;
        evento.target.complete();
        return;
      }
      this.noticias.push(...resp.articles);
    });
    if (evento) {
      evento.target.complete();
    }
  }

}