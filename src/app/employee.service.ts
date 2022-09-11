import { Injectable } from '@angular/core';
import { Employee } from './employee';

import {
  AngularFireDatabase,
  AngularFireList,
  AngularFireObject,
} from '@angular/fire/compat/database';
@Injectable({
  providedIn: 'root'
})
export class EmployeeService {
  employeesRef?: AngularFireList<any>;
  employeeRef?: AngularFireObject<any>;

  constructor(private db: AngularFireDatabase) {}
  // Create Student
  AddEmployee(employee: Employee) {
    return this.employeesRef!.push({
      name: employee.name,
      email: employee.email,
    })
  }
  GetEmployee(id: string) {
    this.employeeRef = this.db.object('employees-list/' + id);
    return this.employeeRef;
  }
  GetEmployeesList() {
    this.employeesRef = this.db.list('employees-list');
    return this.employeesRef;
  }
  UpdateEmployee(employee: Employee) {
    this.employeeRef!.update({
      name: employee.name,
      email: employee.email,
    });
  }
  DeleteEmployee(id: string) {
    this.employeeRef = this.db.object('employees-list/' + id);
    this.employeeRef.remove();
  }
}
