import { DomSanitizer } from '@angular/platform-browser';
import { AuthService } from './services/auth.service';
import { Component } from '@angular/core';
import { MatIconRegistry } from '@angular/material';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.less']
})
export class AppComponent {
  constructor(
    public auth: AuthService,
    iconRegistry: MatIconRegistry,
    sanitizer: DomSanitizer
  ) {
    iconRegistry.addSvgIcon(
      'account',
      sanitizer.bypassSecurityTrustResourceUrl('assets/account.svg')
    );
  }
}
