import { Component, OnInit } from '@angular/core';

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


  constructor() { }

  ngOnInit(): void {
  }

  pallet1() {
    this.palletFlag1 = !this.palletFlag1;
    
    console.log(this.status, this.palletFlag1, 'pallet1')
  }
  donePallet1() {
    this.status = !this.status;
    this.palletsObj.push({
      name: 'pallet1',
      quantity: 72,
      cell: 6,
      col: 12,
      date: new Date().toDateString()
    });
    console.log(this.palletsObj)
  }

  pallet2() {
    this.palletFlag2 = !this.palletFlag2;
    this.status = !this.status;
    console.log(this.status, this.palletFlag2, 'pallet2')

  }

  pallet3() {
    this.palletFlag3 = !this.palletFlag3;
    this.status = !this.status;
    console.log(this.status, this.palletFlag3, 'pallet3')
  }

  pallet4() {
    this.palletFlag4 = !this.palletFlag4;
    this.status = !this.status;
    console.log(this.status, this.palletFlag4, 'pallet4')
  }

  pallet5() {
    this.palletFlag5 = !this.palletFlag5;
    this.status = !this.status;
    console.log(this.status, this.palletFlag5, 'pallet5')
  }



}
