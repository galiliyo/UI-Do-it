import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  Router,
  UrlTree,
} from '@angular/router';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map, tap, take } from 'rxjs/operators';
import { Store } from '@ngrx/store';

// import { AuthService } from './auth.service';
import * as fromApp from './store/app.reducer';
import { AuthService } from './auth/auth.service';
import { log } from 'util';

@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {
  constructor(
    private authService: AuthService,
    private router: Router,
    private store: Store<fromApp.AppState>
  ) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    router: RouterStateSnapshot
  ):
    | boolean
    | UrlTree
    | Promise<boolean | UrlTree>
    | Observable<boolean | UrlTree> {
    if (this.authService.getLocalStorageUser()) {
      console.log('authguard true');
      return true;
    } else {
      console.log('authguard false');
      return this.router.createUrlTree(['/login']);
    }
  }
}
