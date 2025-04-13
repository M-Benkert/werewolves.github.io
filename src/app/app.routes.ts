import { Routes } from "@angular/router";

import { HomeComponent} from "./home/home.component";
import { PlayersComponent } from "./players/players.component";

export const routes: Routes = [
  {
    path: "",
    title: "Home",
    component: HomeComponent,
  },
  {
    path: "players",
    title: "Spieler",
    component: PlayersComponent,
  }
];
