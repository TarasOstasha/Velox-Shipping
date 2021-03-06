import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { palletData } from '../interfaces/pallet-data.model';

// const httpOptions = {
//   headers: new HttpHeaders({ 'Content-Type': 'application/json'})
// };






if (location.hostname == 'localhost') var url = 'http://localhost/'; //dev
else var url = '/'; //production



@Injectable({
  providedIn: 'root'
})
export class ApiService {
  // palletData: any = {};
  // httpHeader = {
  //   headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  // };
  
  

  constructor(private _http: HttpClient) { }

  sendPalletData(data: palletData) {
    return this._http.post(url + 'pallet-data', data)
  }

  getPalletData() {
    return this._http.get(url + 'pallet-data')
  }

  removeItem(item: any) {
    return this._http.delete(url + 'pallet-data/' + item)
  }
  
}
