import { Injectable } from '@angular/core';
import { Lista } from '../models/lista.model';

@Injectable({
  providedIn: 'root'
})
export class DeseosService {

  listas: Lista[] = [];

  constructor() { 
    this.cargarStorage();
    /* console.log('Servicio inicializado'); */
   /*  const lista1 = new Lista('Compras de supermercado'); 
    const lista2 = new Lista('Compras de navidad'); 
    this.listas.push(lista1, lista2); */
    /* console.log(this.listas); */
  }

  crearLista(titulo:string){
    let nuevaLista = new Lista(titulo);
    this.listas.push(nuevaLista);
    this.guardarStorage();
    return nuevaLista.id;
  }

  getLista(id:string | number){
    id = Number(id);
    return this.listas.find(listaData => listaData.id === id);
  }

  guardarStorage(){
    localStorage.setItem('data', JSON.stringify(this.listas));
  }

  cargarStorage(){

    if(localStorage.getItem('data')){
      this.listas = JSON.parse(localStorage.getItem('data')); 
    }
  }

   borrarLista(idLista:number){
     this.listas = this.listas.filter(listaData => listaData.id != idLista); 
     console.log(this.listas);
     this.guardarStorage();
   }

   editarNombreLista(id:number, nTitulo:string){
     this.getLista(id).titulo = nTitulo;
     this.guardarStorage();
   }


}
