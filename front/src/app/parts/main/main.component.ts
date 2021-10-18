import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { palletData } from '../../interfaces/pallet-data.model';
import { FormBuilder, FormGroup, Validators, FormControl, NgForm, FormGroupDirective } from '@angular/forms';


import { map } from 'rxjs/operators';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.less']
})
export class MainComponent implements OnInit {
  palletFlag1!: boolean;
  palletFlag2!: boolean;
  palletFlag3!: boolean;
  palletFlag4!: boolean;
  palletFlag5!: boolean;
  status!: boolean;
  clientIdForm!: FormGroup;

  currentDate = new Date().toDateString();



  pallets: object = [
    { name: 'Pallet 1', quantity: 72, cell: 6, col: 12 },
    { name: 'Pallet 2', quantity: 56, cell: 7, col: 8 },
    { name: 'Pallet 3', quantity: 63, cell: 7, col: 9 },
    { name: 'Pallet 4', quantity: 63, cell: 6, col: 9 },
    { name: 'Pallet 5', quantity: 144, cell: 16, col: 9 }
  ]

  imgUrl: object = [
    { url: '' }
  ]

  palletsObj: any = [];
  totalPallets: number = 0;
  nextPallets: any = [];




  constructor(private _api: ApiService, private _formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.getPallet();
    this.getSumma();
    this.clientIdForm = this._formBuilder.group({
      clientId: ['', [Validators.required, Validators.minLength(2)]]
    })
  }

  sendClientId(form: NgForm) {
    console.log(this.clientIdForm.value);
    form.resetForm();
  }


  // this method count codes and create a summa of each next of it and added as object key
  getSumma() {
    setTimeout(() => {
      this.palletsObj.map((item: any, index: any) => {
        //console.log(this.nextPallets[index], 'this.nextPallets[index]')
        // this.nextPallets.forEach((key: any, i: any) => {
        //   item[key] = key
        // })
        // return this.palletsObj
        return Object.assign(item, { summa: this.nextPallets[index] })
      });
    }, 500)
  }

  // post send pallets method
  sendPallets(palletNumber: palletData) {
    this._api.sendPalletData(palletNumber)
      .subscribe((response: any) => {
        console.log(response);
        if (response.ok) {
          this.getPallet(); // updating view after adding data;
          this.getSumma(); // updating summa views table
          console.log('done');
        }
      }, err => console.log(err));
  }
  // get all data pallets
  getPallet() {
    return this._api.getPalletData()
      .pipe(
        map((res: any) => {
          console.log(res.pallet)
          res.pallet.reduce((acc: any, el: any, i: any) => { return this.nextPallets[i] = acc + el.quantity; }, 0); // get new array with updating next value
          //console.log(this.nextPallets)
          this.totalPallets = res.pallet.reduce((acc: any, item: any, currentIndex: any) => {
            return acc + item.quantity
          }, 0)
          return res.pallet;
        })
      )
      .subscribe((response) => {
        this.palletsObj = response;
      })
  }

  // summa next pallet
  summaNext() {
    this.palletsObj.reduce((acc: any, el: any, i: any) => { return this.palletsObj[i] = acc + el.quantity; }, 0)
    console.log(this.palletsObj)
  }

  pallet1() {
    this.palletFlag1 = !this.palletFlag1;
    this.status = !this.status;
    console.log(this.status)
  }
  donePallet1() {
    const pallet1: palletData = {
      name: 'pallet1',
      quantity: 56,
      cell: 7,
      col: 8,
      date: new Date().toDateString()
    };
    this.sendPallets(pallet1);

  }



  pallet2() {
    this.palletFlag2 = !this.palletFlag2;
    this.status = !this.status;
    console.log(this.status, this.palletFlag2, 'pallet2')

  }
  donePallet2() {
    const pallet2: palletData = {
      name: 'pallet2',
      quantity: 63,
      cell: 7,
      col: 9,
      date: new Date().toDateString()
    }
    this.sendPallets(pallet2);
  }

  pallet3() {
    this.palletFlag3 = !this.palletFlag3;
    this.status = !this.status;
    console.log(this.status, this.palletFlag3, 'pallet3')
  }
  donePallet3() {
    const pallet3: palletData = {
      name: 'pallet3',
      quantity: 72,
      cell: 6,
      col: 12,
      date: new Date().toDateString()
    };
    this.sendPallets(pallet3);
  }

  pallet4() {
    this.palletFlag4 = !this.palletFlag4;
    this.status = !this.status;
    console.log(this.status, this.palletFlag4, 'pallet4')
  }
  donePallet4() {
    const pallet4: palletData = {
      name: 'pallet3',
      quantity: 63,
      cell: 9,
      col: 7,
      date: new Date().toDateString()
    };
    this.sendPallets(pallet4);
  }

  pallet5() {
    this.palletFlag5 = !this.palletFlag5;
    this.status = !this.status;
    console.log(this.status, this.palletFlag5, 'pallet5')
  }
  donePallet5() {
    const pallet5: palletData = {
      name: 'pallet5',
      quantity: 144,
      cell: 16,
      col: 9,
      date: new Date().toDateString()
    };
    this.sendPallets(pallet5);
  }

  removeRow(item: any, index: any) {
    console.log(item, 'item main component')
    this.palletsObj.splice(index,1); // remove from views
    return this._api.removeItem(item._id)
      .subscribe((response: any) => {
        console.log(response);
        if (response.ok) {
          this.getPallet(); // updating view after adding data;
          this.getSumma(); // updating summa views table
          console.log('done');
        }
      }, err => console.log(err));
  }



}
