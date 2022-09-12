import { Component, OnInit, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Employee } from '../employee';
import { EmployeeService } from '../employee.service'
import { first, take } from 'rxjs/operators';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  displayedColumns: string[] = ['EMP_ID', 'Name', 'Email', 'Actions'];
  dataSource: Employee[] = [];

  constructor(public dialog: MatDialog, private employeeService: EmployeeService) {}
  
  ngOnInit(): void {
    this.getAllemployees();
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(ExampleDialog, {
      width: '300px',
      data: {name: '', email: ''},
    });
    dialogRef.afterClosed().subscribe(formGroup => { 
      const newEmployee: Employee = formGroup.getRawValue();
      
      this.employeeService.addEmployee(newEmployee).then(
        (response) => {
          this.getAllemployees()
        }, (error)=>{
        console.log(error)
      });    
    });
  }
  //get all employeees
  getAllemployees(){
    let parsedEmployeeList: Employee[] = [];
    this.employeeService.getEmployeesList().snapshotChanges().subscribe(
      (data: any) => {
        data.forEach((item: any) => {
          let a = item.payload.toJSON(); 
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
    this.employeeService.getEmployee(id).snapshotChanges().subscribe(
      (data: any) => {
        const employee = data.payload.toJSON();
        
        const dialogRef = this.dialog.open(ExampleDialog, {
          width: '300px',
          data: {name: employee.name, email: employee.email},
        })
        dialogRef.afterClosed().pipe(take(1)).subscribe(formGroup => {    
          if(formGroup == null){
            return
          }
          else{
            const newEmployee: Employee = formGroup.getRawValue();
            this.employeeService.updateEmployee(newEmployee).then(
              (response) => {
                this.dialog.closeAll();
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
}
// dialog class 
@Component({
  selector: 'example-dialog',
  templateUrl: 'emp-detail-dialog.html',
})
export class ExampleDialog {
  formGroup: FormGroup;
  
  constructor(
    private formBuilder: FormBuilder, 
    public dialogRef: MatDialogRef<ExampleDialog>,
    @Inject(MAT_DIALOG_DATA) public data: Employee,
  ) {

    let emailregex: RegExp = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    this.formGroup = this.formBuilder.group({
      'name': [data.name, Validators.required],
      'email': [data.email, [Validators.required, Validators.pattern(emailregex)]]
    });
  }

  getErrorEmail() {
    return this.formGroup!.get('email')!.hasError('required') ? 'Email is required' :
      this.formGroup!.get('email')!.hasError('pattern') ? 'Not a valid emailaddress' : '';
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
}
