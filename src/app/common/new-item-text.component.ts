import {Component, EventEmitter, Output} from "@angular/core";
import {FormsModule} from "@angular/forms";

@Component({
  selector: "app-text-field",
  imports: [FormsModule],
  template: `
    <div class="input-block">
      <input type="text" class="text-input" placeholder="Hinzufügen" [(ngModel)]="value"/>
      <button (click)="add()" class="action-add add-button">+</button>
    </div>
  `,
  styles: ``
})
export class NewItemTextComponent {
  value: string = "";

  @Output() addEvent = new EventEmitter<string>();

  add() {
    this.addEvent.emit(this.value);
    this.value = "";
  }
}
