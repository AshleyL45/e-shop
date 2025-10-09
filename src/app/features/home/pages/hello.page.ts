import {Component, inject} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {Counter} from "../../core/components/exercices/counter/counter";
import {Temperature} from "../../core/components/exercices/temperature/temperature";
import {LikeCounter} from "../../core/components/exercices/like-counter/like-counter";

@Component({
  selector: 'app-hello.page',
    imports: [
        Counter,
        Temperature,
        LikeCounter
    ],
  template: `
      <p>La valeur du message est : {{ message }}</p>

      <app-counter></app-counter>
      
      <app-temperature></app-temperature>

      
      <app-like-counter></app-like-counter>
  `,
  styles: ``
})
export default class HelloPage {
    private route = inject(ActivatedRoute);
    message = this.route.snapshot.data['message'];
}

