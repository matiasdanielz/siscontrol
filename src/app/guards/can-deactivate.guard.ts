import { Injectable } from '@angular/core';
import { CanDeactivate } from '@angular/router';
import { Observable } from 'rxjs';

// Interface que define a função canDeactivate
export interface CanComponentDeactivate {
  canDeactivate: () => boolean | Observable<boolean>;
}

@Injectable({
  providedIn: 'root',
})
export class CanDeactivateGuard
  implements CanDeactivate<CanComponentDeactivate>
{
  canDeactivate(component: CanComponentDeactivate): boolean | Observable<boolean> {
    // Verifica se o componente tem a função canDeactivate
    return component.canDeactivate ? component.canDeactivate() : true;
  }
}
