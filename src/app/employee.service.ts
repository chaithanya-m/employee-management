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
  addEmployee(employee: Employee) {
    return this.employeesRef!.push({
      name: employee.name,
      email: employee.email,
    })
  }
  getEmployee(id: string) {
    this.employeeRef = this.db.object('employees-list/' + id);
    return this.employeeRef;
  }
  getEmployeesList() {
    this.employeesRef = this.db.list('employees-list');
    return this.employeesRef;
  }
  updateEmployee(employee: Employee) {
    return this.employeeRef!.update({
      name: employee.name,
      email: employee.email,
    });
  }
  deleteEmployee(id: string) {
    this.employeeRef = this.db.object('employees-list/' + id);
    this.employeeRef.remove();
  }
}
