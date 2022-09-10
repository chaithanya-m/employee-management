import { Component, OnInit, Inject } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';

export interface DialogData {
  email: string;
  name: string;
}


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  email: string="";
  name: string="";
  datas :any[]=[
    {
      name:null,
      email:null
    }
  ]
  displayedColumns: string[] = ['id', 'name', 'email', 'symbol'];
  dataSource: EmployeeElement[] = [];

  

  constructor(public dialog: MatDialog) {}

  openDialog(): void {
    const dialogRef = this.dialog.open(ExampleDialog, {
      width: '250px',
      data: {name: this.name, email: this.email},
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      
      const data = {id: 1, name:result.name, email:result.email, symbol: ''};
      let dataSourceCopy = this.dataSource;
      // dataSourceCopy.push()
      // this.dataSource.push(data);
      this.dataSource = ELEMENT_DATA;
      // debugger
    });
    
  }

  ngOnInit(): void {
  }
  
}
@Component({
  selector: 'example-dialog',
  templateUrl: 'example-dialog.html',
})
export class ExampleDialog {
  constructor(
    public dialogRef: MatDialogRef<ExampleDialog>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
  ) {}

  onNoClick(): void {
    this.dialogRef.close();
  }
}

export interface EmployeeElement {
  name: string;
  id: number;
  email: number;
  symbol: string;
}

const ELEMENT_DATA: EmployeeElement[] = [
  {id: 1, name: 'Hydrogen', email: 1.0079, symbol: 'H'},
  {id: 2, name: 'Helium', email: 4.0026, symbol: 'He'},
  // {position: 3, name: 'Lithium', weight: 6.941, symbol: 'Li'},
  // {position: 4, name: 'Beryllium', weight: 9.0122, symbol: 'Be'},
  // {position: 5, name: 'Boron', weight: 10.811, symbol: 'B'},
  // {position: 6, name: 'Carbon', weight: 12.0107, symbol: 'C'},
  // {position: 7, name: 'Nitrogen', weight: 14.0067, symbol: 'N'},
  // {position: 8, name: 'Oxygen', weight: 15.9994, symbol: 'O'},
  // {position: 9, name: 'Fluorine', weight: 18.9984, symbol: 'F'},
  // {position: 10, name: 'Neon', weight: 20.1797, symbol: 'Ne'},
];





/**  Copyright 2022 Google LLC. All Rights Reserved.
    Use of this source code is governed by an MIT-style license that
    can be found in the LICENSE file at https://angular.io/license */
