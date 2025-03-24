import { Component, inject } from '@angular/core';
import { RouterService } from '../../../router.service';
import { AuthService } from '../../../core/authentication/auth.service';
import { AsyncPipe, CommonModule } from '@angular/common';
import { map, Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { selectRole } from '../../../stores/auth-store/auth.selectors';

@Component({
  selector: 'app-header',
  imports: [CommonModule, AsyncPipe],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
})
export class HeaderComponent {
  //routing
  routerService = inject(RouterService);

  //autority
  private auth = inject(AuthService);
  private store = inject(Store);
  role$: Observable<'admin' | 'teacher' | 'student' | undefined> =
    this.store.select(selectRole);

  logout() {
    this.auth.logout();
  }
}
