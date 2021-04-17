import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DeseosService } from '../../services/deseos.service';
import { Lista } from '../../models/lista.model';
import { ListaItem } from '../../models/lista-item.module';

@Component({
  selector: 'app-agregar',
  templateUrl: './agregar.page.html',
  styleUrls: ['./agregar.page.scss'],
})
export class AgregarPage implements OnInit {

  lista:Lista; 
  nombreItem = "";


  constructor(public _deseos: DeseosService, private _activatedRoute:ActivatedRoute) {
    const listaId = this._activatedRoute.snapshot.paramMap.get('listaId');
    console.log(listaId);
    this.lista = this._deseos.getLista(listaId);
    console.log(this.lista);
   }

  ngOnInit() {
  }

  agregarItem(){
      if(this.nombreItem.length == 0){
        return
      }
      const nuevoitem = new ListaItem(this.nombreItem);
      this.lista.items.push(nuevoitem);
      this.nombreItem = '';
      this._deseos.guardarStorage();
  }

  cambioCheck(item:ListaItem){
    console.log(item);
    const pendientes = this.lista.items.filter(itemData => !itemData.estado).length;

    if(pendientes === 0){
      this.lista.terminadaEn = new Date();
      this.lista.terminada = true; 
    }else{
      this.lista.terminadaEn = null;
      this.lista.terminada = false; 
    }

    console.log(this._deseos.listas);


    this._deseos.guardarStorage();
  }

  borrarItem(index:number){
    this.lista.items.splice(index, 1);
    this._deseos.guardarStorage();
  }



}
