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

  public localUser = true;
  public userName: string;

  constructor(
    public auth: AuthService,
    iconRegistry: MatIconRegistry,
    private sanitizer: DomSanitizer,
    private router: Router
  ) {
    moment.locale('el');
    iconRegistry.addSvgIcon(
      'favicon',
      sanitizer.bypassSecurityTrustResourceUrl('assets/Stethoscope.svg')
    );
    auth.user().subscribe(user => {
      this.localUser = user.local;
      this.userName = user.displayName;
    });
  }

  prepareRoute(outlet: RouterOutlet) {
    return outlet && outlet.activatedRouteData && outlet.activatedRouteData['animation'];
  }
}
