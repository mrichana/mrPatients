import { DomSanitizer } from '@angular/platform-browser';
import { AuthService } from './services/auth.service';
import { Component } from '@angular/core';
import { MatIconRegistry } from '@angular/material/icon';
import { RouterOutlet } from '@angular/router';

import { slideAnimation } from './animations';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.less'],
  animations: [slideAnimation]
})
export class AppComponent {
  constructor(public auth: AuthService, iconRegistry: MatIconRegistry, sanitizer: DomSanitizer) {
    iconRegistry.addSvgIcon(
      'favicon',
      sanitizer.bypassSecurityTrustResourceUrl('assets/Stethoscope.svg')
    );
  }

  prepareRoute(outlet: RouterOutlet) {
    return outlet && outlet.activatedRouteData && outlet.activatedRouteData['animation'];
  }
}
