import { Component } from '@angular/core';
import { DeseosService } from '../../services/deseos.service';
import { Lista } from '../../models/lista.model';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {

  constructor(public _deseos: DeseosService, private _router: Router, public alertController: AlertController) {
    /* console.log(this.listaDeseos); */
  }

  async agregarLista() {
    /*   */
    const alert = await this.alertController.create({
      header: 'Nueva lista',
      inputs: [
        {
          name: 'titulo',
          type: 'text',
          placeholder: 'Nombre de la lista'
        },
      ],
      message: '',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          handler: () => {
            console.log('Cancelar'); 
          }
        },
        {
          text: 'Crear',
          handler: (data) => {
            if(data.titulo == ''){
              return
            }else{
              let idLista = this._deseos.crearLista(data.titulo);
              this._router.navigateByUrl('/tabs/tab1/agregar/'+idLista);
            }
          }
        }
      ]
    });
    await alert.present();
  }

  /* irAgregarItems(id:string | number){
    this._router.navigateByUrl('/tabs/tab1/agregar/'+id);
  } */

}
