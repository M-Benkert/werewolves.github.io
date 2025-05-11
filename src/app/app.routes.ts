import { Routes } from "@angular/router";

import { HomeComponent} from "./home/home.component";

import { NewGameComponent } from "./new_game/new-game.component";
import { PlayersComponent } from "./new_game/01_players/players.component";
import { CharactersComponent } from "./new_game/02_characters/characters.component";
import { NewCharacterSelectComponent } from "./new_game/02_characters/new-character-select.component";
import { NewCharacterConfigureComponent } from "./new_game/02_characters/new-character-configure.component";

export const routes: Routes = [
  {
    path: "",
    title: "Home",
    component: HomeComponent,
  },
  {
    path: "new_game",
    title: "Neues Spiel",
    component: NewGameComponent,
  },
  {
    path: "new_game/players",
    title: "Spieler",
    component: PlayersComponent,
  },
  {
    path: "new_game/characters",
    title: "Charaktere",
    component: CharactersComponent,
  },
  {
    path: "new_game/characters/new",
    title: "Charakter Auswählen",
    component: NewCharacterSelectComponent,
  },
  {
    path: "new_game/characters/new/:characterType",
    title: "Charakter Anpassen",
    component: NewCharacterConfigureComponent,
  },
];
