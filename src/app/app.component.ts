import { Component } from "@angular/core";
import { RouterOutlet } from "@angular/router";

@Component({
  selector: "app-root",
  imports: [RouterOutlet],
  template: `
    <h1>{{ title }}</h1>
    <div class="view">
        <router-outlet />
    </div>
  `,
  styles: `:host { width: 100%; }`,
})
export class AppComponent {
  title = "Werwolf";
}
