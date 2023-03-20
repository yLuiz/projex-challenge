import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MenuService {

  class = '';

  visible = new BehaviorSubject<boolean>(false);

  constructor() { }
}
