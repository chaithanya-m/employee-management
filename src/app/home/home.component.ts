import { Component, OnInit, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Employee } from '../employee';
import { EmployeeService } from '../employee.service'


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
  displayedColumns: string[] = ['id', 'name', 'email', 'Action'];
  dataSource: Employee[] = [];


  constructor(public dialog: MatDialog,private employeeService: EmployeeService) {}

  openDialog(): void {
    const dialogRef = this.dialog.open(ExampleDialog, {
      width: '250px',
      data: {name: this.name, email: this.email},
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      // const x=Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
      // const data = {id: x, name:result.name, email:result.email, symbol: ''};
      
      const newEmployee: Employee = {
        name: result.name,
        email: result.email
      }
      this.employeeService.AddEmployee(newEmployee).then(
        (response) => {
          this.getAllemployees()
      }, (error)=>{
        console.log(error)
      });
      

     

      let dataSourceCopy = this.dataSource;
     
    });
  }
  getAllemployees(){
    // debugger
    let parsedEmployeeList: Employee[] = [];
    this.employeeService.GetEmployeesList().snapshotChanges().subscribe(
      (data: any) => {
        // debugger
        // this.dataSource = data;
        data.forEach((item: any) => {
          let a = item.payload.toJSON(); 
          a['id'] = item.key;
          parsedEmployeeList.push(a as Employee);
        })
        this.dataSource = parsedEmployeeList;
      },
      (error: any) => {
        console.log(error);
      });
  }
  edit(id:any){
debugger
  }
  delete(id:any){
    this.employeeService.DeleteEmployee(id) 
    this.getAllemployees()
  }

  ngOnInit(): void {
    this.getAllemployees();
    
  }
  
}
@Component({
  selector: 'example-dialog',
  templateUrl: 'example-dialog.html',
})
export class ExampleDialog {
  constructor(
    public dialogRef: MatDialogRef<ExampleDialog>,
    @Inject(MAT_DIALOG_DATA) public data: Employee,
  ) {}

  onNoClick(): void {
    this.dialogRef.close();
  }
}


/**  Copyright 2022 Google LLC. All Rights Reserved.
    Use of this source code is governed by an MIT-style license that
    can be found in the LICENSE file at https://angular.io/license */



     // dataSourceCopy.push()
      // this.dataSource.push(data);
      // this.dataSource = ELEMENT_DATA;
      // debugger


       // .snapshotChanges().subscribe(
      //   (data: any) => {
      //     debugger
      //     // this.dataSource = data;
  
      //   },
      //   (error: any) => {
      //     console.log(error);
      //   });


      // this.employeeService.GetEmployeesList().snapshotChanges().subscribe(
    //   (data: any) => {
    //     debugger
    //     this.dataSource = data;

    //   },
    //   (error: any) => {
    //     console.log(error);
    //   });