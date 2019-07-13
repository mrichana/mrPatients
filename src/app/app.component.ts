import { DomSanitizer } from '@angular/platform-browser';
import { AuthService } from './services/auth.service';
import { Component } from '@angular/core';
import { MatIconRegistry } from '@angular/material/icon';
import { RouterOutlet } from '@angular/router';
import * as moment from 'moment';
import { Router } from '@angular/router';

import { slideAnimation } from './animations';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.less'],
  animations: [slideAnimation]
})
export class AppComponent {
  constructor(public auth: AuthService, iconRegistry: MatIconRegistry, private sanitizer: DomSanitizer, private router: Router
    ) {
    moment.locale('el');
    iconRegistry.addSvgIcon(
      'favicon',
      sanitizer.bypassSecurityTrustResourceUrl('assets/Stethoscope.svg')
    );
    auth.user().subscribe( user => {
      if (user) {
        this.router.navigate(['/']);
      } else {
        this.router.navigate(['/login']);
      }
    });
  }

  prepareRoute(outlet: RouterOutlet) {
    return outlet && outlet.activatedRouteData && outlet.activatedRouteData['animation'];
  }
}
