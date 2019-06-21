import { Component, OnInit, Input } from '@angular/core';
import { Article } from '../../interfaces/interfaces';
import { InAppBrowser } from '@ionic-native/in-app-browser/ngx';
import { ActionSheetController, ToastController } from '@ionic/angular';
import { SocialSharing } from '@ionic-native/social-sharing/ngx';
import { DataLocalService } from '../../services/data-local.service';

@Component({
  selector: 'app-noticia',
  templateUrl: './noticia.component.html',
  styleUrls: ['./noticia.component.scss'],
})
export class NoticiaComponent implements OnInit {

  @Input() noticia: Article;
  @Input() i: number;
  @Input() enFavoritos;

  constructor(private iab: InAppBrowser,
              public actionSheetCtrl: ActionSheetController,
              private socialSharing: SocialSharing,
              private dataLocalService: DataLocalService,
              public toastCtrl: ToastController) { }

  ngOnInit() {}

  abrirNoticia() {
    // Abrimos el URL en el navegador nativo del móvil.
    const browser = this.iab.create(this.noticia.url, '_system');
  }

  async lanzarMenu() {
    let guardarBorrarBtn;
    if (this.enFavoritos) {
      guardarBorrarBtn = {
        text: 'Borrar Favorito',
        icon: 'trash',
        cssClass: 'action-dark',
        handler: () => {
          this.dataLocalService.borrarNoticiaFavorita(this.noticia);
          this.mostrarMensajeFavorito('Noticia eliminada de favoritos!');
        }
      };
    } else {
      guardarBorrarBtn = {
        text: 'Favorito',
        icon: 'star',
        cssClass: 'action-dark',
        handler: () => {
          this.dataLocalService.guardarNoticiaFavorita(this.noticia);
          this.mostrarMensajeFavorito('Noticia guardada en favoritos!');
        }
      };
    }
    const actionSheet = await this.actionSheetCtrl.create({
      buttons: [{
        text: 'Compartir',
        icon: 'share',
        cssClass: 'action-dark',
        handler: () => {
          this.compartirNoticia();
        }
      },
      guardarBorrarBtn,
      {
        text: 'Cancelar',
        icon: 'close',
        cssClass: 'action-dark',
        role: 'cancel',
        handler: () => {
          console.log('Cancelar clicked');
        }
      }]
    });
    await actionSheet.present();
  }

  compartirNoticia() {
    this.socialSharing.share(this.noticia.title, this.noticia.source.name, '', this.noticia.url);
  }

  async mostrarMensajeFavorito(mensaje: string) {
    const toast = await this.toastCtrl.create({
      message: mensaje,
      position: 'top',
      duration: 2000
    });
    toast.present();
  }

}
