import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-generar-diagnostico',
  templateUrl: './generar-diagnostico.component.html',
  styleUrls: ['./generar-diagnostico.component.css']
})
export class GenerarDiagnosticoComponent {

  @Input('id')
  idProduct!: number;

  @Input()
  title: string = '';

  @Input()
  description: string = '';

  @Input()
  price: number = 0;

  @Input()
  image: string = '';

  @Output()
  onSelectProduct: EventEmitter<number> = new EventEmitter<number>();

  seleccionarProducto() {
    this.onSelectProduct.emit(this.idProduct);
  }

}
