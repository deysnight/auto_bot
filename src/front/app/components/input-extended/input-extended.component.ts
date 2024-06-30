import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import ITaskCustomVar from '../../../../entities/ientities/icustomvar.entity';

@Component({
  selector: 'app-input-extended',
  templateUrl: './input-extended.component.html',
  styleUrl: './input-extended.component.scss',
})
export class InputExtendedComponent implements OnInit {
  @Input() internVar: ITaskCustomVar = { name: '', value: '' };
  @Output() clickResetEvent = new EventEmitter<string>();
  @Output() clickDeleteEvent = new EventEmitter<string>();
  @Output() clickSetEvent = new EventEmitter<string>();
  isEditable: boolean = false;
  internVarValue: string = '';

  ngOnInit() {
    this.internVarValue = this.internVar.value as string;
  }

  resetInternVar(): void {
    this.clickResetEvent.emit(this.internVar.name);
  }

  deleteInternVar(): void {
    this.clickDeleteEvent.emit(this.internVar.name);
  }

  editInternVar(): void {
    this.isEditable = true;
  }

  setInternVar(): void {
    this.isEditable = false;
    this.clickSetEvent.emit(this.internVarValue);
  }

  updateValue(event: Event): void {
    const newValue = (event.target as HTMLInputElement).value;
    try {
      this.internVarValue = newValue;
    } catch {}
  }
}
