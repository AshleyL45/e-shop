import {Component, inject} from '@angular/core';
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-hello.page',
  imports: [],
  template: `
      <p>La valeur du message est : {{ message }}</p>
  `,
  styles: ``
})
export default class HelloPage {
    private route = inject(ActivatedRoute);
    message = this.route.snapshot.data['message'];
}

