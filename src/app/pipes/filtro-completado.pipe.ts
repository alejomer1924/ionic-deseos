import { Pipe, PipeTransform } from '@angular/core';
import { Lista } from '../models/lista.model';

@Pipe({
  name: 'filtroCompletado',
  pure: false
})
export class FiltroCompletadoPipe implements PipeTransform {

  transform(lista: Lista[], tab:number): Lista[] {

    /* console.log(tab); */

    if(tab == 1){
      return lista.filter(dataLista => dataLista.terminada == false);
    }else{
      return lista.filter(dataLista => dataLista.terminada == true);
    }
    
   
  }

}
