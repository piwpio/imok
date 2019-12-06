// import {Injectable, NgZone} from '@angular/core';
// import {Observable} from 'rxjs';
// import {HttpClient} from '@angular/common/http';
// import {API_BASE_URL} from '../constants/environment';
// import {MatSnackBar} from '@angular/material';
//
// export interface ResponseData {
//   ok: boolean;
//   data: any;
// }
//
// @Injectable({
//   providedIn: 'root'
// })
// export class AjaxService {
//
//   constructor(
//     private http: HttpClient,
//     private zone: NgZone,
//     private snackBar: MatSnackBar
//   ) {}
//
//   post(url, body): Observable<ResponseData> {
//     return new Observable<ResponseData>((observer) => {
//       this.http.post<any>(`${API_BASE_URL}/${url}`, body).subscribe( response => {
//         if (response !== undefined && response.ok !== undefined && response.ok) {
//           observer.next({
//             ok: true,
//             data: response.data
//           });
//         } else {
//           const message = response !== undefined && response.ok !== undefined && !response.ok ?
//             response.message : 'Coś poszło nie tak';
//           this.zone.run(() => {
//             this.snackBar.open(message);
//           });
//           observer.next({
//             ok: false,
//             data: null
//           });
//         }
//         observer.complete();
//       }, error => {
//         this.zone.run(() => {
//           this.snackBar.open(error.error);
//         });
//         observer.next({
//           ok: false,
//           data: null
//         });
//         observer.complete();
//       });
//     });
//   }
//
// }
