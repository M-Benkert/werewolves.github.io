import { Component } from "@angular/core";
import { RouterLink } from "@angular/router";


@Component({
  selector: "app-home",
  imports: [RouterLink],
  template: `
    <a routerLink="/players">Players</a>
  `,
  styles: ``
})
export class HomeComponent {

}
