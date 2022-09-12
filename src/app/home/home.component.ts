import { Component, OnInit, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Employee } from '../employee';
import { EmployeeService } from '../employee.service'
import { first, take } from 'rxjs/operators';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  email: any=null;
  name: any=null;
  
  displayedColumns: string[] = ['EMP_ID', 'Name', 'Email', 'Actions'];
  dataSource: Employee[] = [];

  constructor(public dialog: MatDialog, private employeeService: EmployeeService) {}

  openDialog(): void {
    const dialogRef = this.dialog.open(ExampleDialog, {
      width: '250px',
      data: {name: this.name, email: this.email},
    });
    dialogRef.afterClosed().subscribe(result => { 
      if(result.name != null && result.email!=null){
        debugger
      const newEmployee: Employee = {
        name: result.name,
        email: result.email
      }
      this.employeeService.addEmployee(newEmployee).then(
        (response) => {
          this.getAllemployees()
        }, (error)=>{
        console.log(error)
      });  
    }   
    });
  }
  //get all employeees
  getAllemployees(){
    // debugger
    let parsedEmployeeList: Employee[] = [];
    this.employeeService.getEmployeesList().snapshotChanges().subscribe(
      (data: any) => {
        // debugger
        data.forEach((item: any) => {
          let a = item.payload.toJSON(); 
          // debugger
          a['id'] = item.key;
          parsedEmployeeList.push(a as Employee);
        })
        this.dataSource = parsedEmployeeList;
        parsedEmployeeList=[]
      },
      (error: any) => {
        console.log(error);
      });
  }

  edit(id:any){
    this.employeeService.getEmployee(id).snapshotChanges() .subscribe(
      (data: any) => {
        const employee = data.payload.toJSON();
        const dialogRef = this.dialog.open(ExampleDialog, {
          width: '250px',
          data: {name: employee.name, email: employee.email},
        })
        dialogRef.afterClosed().pipe(take(1)).subscribe(result => {    
          debugger
          if(result == null){
            return
          }
          else{
            debugger
            this.employeeService.
            updateEmployee(result).then(
              (response) => {
                debugger
                // this.getAllemployees()
              }, (error)=>{
              console.log(error)
            });       
          }       
        });
      },
      (error: any) => {
        console.log(error);
      });
  }
  delete(id:any){
    this.employeeService.deleteEmployee(id) 
    this.getAllemployees()
  }
  ngOnInit(): void {
    this.getAllemployees();
  }
 
}
// dialog class 
@Component({
  selector: 'example-dialog',
  templateUrl: 'example-dialog.html',
})
export class ExampleDialog {
  constructor(
    public dialogRef: MatDialogRef<ExampleDialog>,
    @Inject(MAT_DIALOG_DATA) public data: Employee,
  ) {}
  Employee={
  name:"hello"
  }
  onNoClick(): void {
    this.dialogRef.close();
  }
}

// // dialog class 
// @Component({
//   selector: 'update-employee-dialog',
//   templateUrl: 'example-dialog.html',
// })
// export class UpdateEmployeeeDialog {
//   constructor(
//     public dialogRef: MatDialogRef<UpdateEmployeeeDialog>,
//     @Inject(MAT_DIALOG_DATA) public data: Employee,
//   ) {}
//   Employee={
//   name:"hello"
//   }
//   onNoClick(): void {
//     this.dialogRef.close();
//   }
// }
