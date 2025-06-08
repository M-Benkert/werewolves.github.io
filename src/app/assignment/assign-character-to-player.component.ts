import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";

import { PlayerIteratorService } from "../services/player-iterator.service";

@Component({
  selector: "app-assign-character-to-player",
  imports: [],
  template: `
    <h2>Charaktere Zuordnen</h2>
  `,
  styles: ``
})
export class AssignCharacterToPlayerComponent implements OnInit {
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private playerIteratorService: PlayerIteratorService,
  ) {}

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      const navigate = params["navigate"];
      if (navigate && navigate === "true") {
        this.playerIteratorService.newIteration();

        const firstPlayer = this.playerIteratorService.next();
        if (firstPlayer) {
          this.router.navigate([
            "/assignment",
            "character-to-player",
            firstPlayer.getId(),
          ]);
        }
      }
    });
  }
}
