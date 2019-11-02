import { Injectable } from '@angular/core';
import {Observable} from 'rxjs';
import {SlaveModel} from '../models/slave.model';

@Injectable({
  providedIn: 'root'
})
export class MasterService {

  constructor() {}

  getSlaves(): Observable<Array<SlaveModel>> {
    return new Observable<Array<SlaveModel>>( observer => {
      const slave = [
        {
          id: 1,
          name: 'Stachu Maj',
          isOk: true,
          phone: '111222333'
        },
        {
          id: 2,
          name: 'Andrzej Gac',
          isOk: false,
          phone: '333222111',
          lastLocation: {
            lat: 0,
            long: 0
          }
        },
        {
          id: 3,
          name: 'Stefan Gunia',
          isOk: true,
          phone: '333222111',
        }
      ];

      observer.next(slave);
      observer.complete();
    });
  }
}
