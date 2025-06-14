import { Component, Input, Output, EventEmitter } from "@angular/core";

import { ListItem } from "./list-item";
import { ListItemComponent } from "./list-item.component";

@Component({
  selector: "app-list",
  imports: [ListItemComponent, ListItemComponent],
  template: `
    <div class="list">
      @for (item of listItems; track item.getId()) {
        <app-list-item
          id="{{ item.getId() }}"
          name="{{ item.getName() }}"
          (removeEvent)="remove(item.getId())"
        ></app-list-item>
      }
    </div>
  `,
  styles: ``
})
export class ListComponent {
  @Input() listItems: ListItem[] = [];
  @Output() removeEvent = new EventEmitter<string>();

  remove(id: string) {
    this.removeEvent.emit(id);
  }
}
