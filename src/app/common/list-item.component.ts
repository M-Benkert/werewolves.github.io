import {Component, EventEmitter, Input, Output} from "@angular/core";

@Component({
  selector: "app-list-item",
  imports: [],
  template: `
    <div class="item">
      <span>{{ name }}</span>
      <button (click)="remove()" class="action-remove remove-button">X</button>
    </div>
  `,
  styles: ``
})
export class ListItemComponent {
  @Input() name: string = "";
  @Output() removeEvent = new EventEmitter<string>();

  remove() {
    this.removeEvent.emit();
  }
}
