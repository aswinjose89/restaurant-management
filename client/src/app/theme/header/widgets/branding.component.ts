import { Component } from '@angular/core';

@Component({
  selector: 'app-branding',
  template: `
    <a class="matero-branding" href="https://github.com/aswinjose89" target="_blank">
      <img src="./assets/images/matero.png" class="matero-branding-logo-expanded" alt="logo" />
      <span class="matero-branding-name">Restaurant</span>
    </a>
  `,
})
export class BrandingComponent {}
