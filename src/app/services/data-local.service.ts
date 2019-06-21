import { Injectable } from '@angular/core';
import { Article } from '../interfaces/interfaces';
import { Storage } from '@ionic/storage';

@Injectable({
  providedIn: 'root'
})
export class DataLocalService {

  noticiasFavoritas: Article[] = [];

  constructor(private storage: Storage) {
    this.cargarNoticiasFavoritas();
  }

  guardarNoticiaFavorita(noticia: Article) {
    const existe = this.noticiasFavoritas.find(noti => noti.title === noticia.title);
    if (!existe) {
      this.noticiasFavoritas.unshift(noticia);
      this.storage.set('favoritos', this.noticiasFavoritas);
    }
  }

  async cargarNoticiasFavoritas() {
    const favoritos = await this.storage.get('favoritos');
    if (favoritos) {
      this.noticiasFavoritas = favoritos;
    }
  }

  borrarNoticiaFavorita(noticia: Article) {
    this.noticiasFavoritas = this.noticiasFavoritas.filter(noti => noti.title !== noticia.title);
    this.storage.set('favoritos', this.noticiasFavoritas);
  }
}
