import { Component } from '@angular/core';

@Component({
    selector: 'app-home.page',
    imports: [],
    template: `
        <section>
            <h2>Ceci est la page d'accueil</h2>
        </section>
    `,
    styles: `
      section {
        padding: 1rem;
      }
    `
})
export default class HomePage {

}
