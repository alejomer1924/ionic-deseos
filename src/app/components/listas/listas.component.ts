import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController, IonList } from '@ionic/angular';
import { DeseosService } from '../../services/deseos.service';

@Component({
  selector: 'app-listas',
  templateUrl: './listas.component.html',
  styleUrls: ['./listas.component.scss'],
})
export class ListasComponent implements OnInit {

  constructor(public _deseos:DeseosService, private _router:Router, public alertController: AlertController) { }

  @Input() tabNum:number;
  @ViewChild(IonList) lista:IonList

  ngOnInit() {}

  irAgregarItems(id:string | number){
    this._router.navigateByUrl(`/tabs/tab${this.tabNum}/agregar/${id}`);
  }

  borrarLista(id:number){
    this._deseos.borrarLista(id);
  }

  async modificarNombre(id:number){
    console.log('vamos a editar el nombre');
    const alert = await this.alertController.create({
      header: 'Nuevo nombre de lista',
      inputs: [
        {
          name: 'titulo',
          type: 'text',
          value: this._deseos.getLista(id).titulo,
          placeholder: 'Nuevo nombre de la lista'
        },
      ],
      message: '',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          handler: () => {
            console.log('Cancelar'); 
            this.lista.closeSlidingItems();
          }
        },
        {
          text: 'Modificar',
          handler: (data) => {
            if(data.titulo == ''){
              return
            }else{
              this._deseos.editarNombreLista(id, data.titulo);
              this.lista.closeSlidingItems();
            }
          }
        }
      ]
    });
    await alert.present();
  }

}
