import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { SideNavComponent } from '../side-nav/side-nav.component';
import { MatIconModule } from '@angular/material/icon';
import { Router } from '@angular/router';

@Component({
  selector: 'app-history',
  standalone: true,
  imports: [ReactiveFormsModule,CommonModule,MatIconModule,SideNavComponent],
  templateUrl: './history.component.html',
  styleUrl: './history.component.scss'
})
export class HistoryComponent {
  todoForm: any;
  selectedMonth: string;
  expenses: { month: string, expenseAmount: number }[] = [
    { month: 'January', expenseAmount: 38650 },
    { month: 'February', expenseAmount: 44200 },
    { month: 'March', expenseAmount: 32300 },
    { month: 'April', expenseAmount: 54850 },
    { month: 'May', expenseAmount: 75000 },
    { month: 'June', expenseAmount: 43500 }
  ];
  monthSelected: boolean = false;
  januaryExpense: any[] = [
    { expenseType: 'Recharge', expenseAmount: 33650 },
    { expenseType: 'Light Bills', expenseAmount: 5000 },
  ];
  februaryExpense: any[] = [
    { expenseType: 'Essentials', expenseAmount: 34200 },
    { expenseType: 'Light Bills', expenseAmount: 10000 }
  ];
  marchExpense: any[] = [
    { expenseType: 'Recharge', expenseAmount: 22300 },
    { expenseType: 'Essentials', expenseAmount: 10000 }
  ];
  aprilExpense: any[] = [
    { expenseType: 'Recharge', expenseAmount: 53850 },
    { expenseType: 'Essentials', expenseAmount: 1850 }
  ];
  mayExpense: any[] = [
    { expenseType: 'Recharge', expenseAmount: 55000 },
    { expenseType: 'Essentials', expenseAmount: 20000 }
  ];
  JuneExpense: any[] = [
    { expenseType: 'Recharge', expenseAmount: 40000 },
    { expenseType: 'Essentials', expenseAmount: 3500 }
  ];

  constructor(private fb: FormBuilder, private router: Router) {
    this.selectedMonth = new Date().toLocaleString('default', { month: 'long' });
  }

  ngOnInit(): void {
    this.todoForm = this.fb.group({
      month: ['', Validators.required],
      expenseType: ['', Validators.required],
      expenseAmount: ['', Validators.required]
    });
  }

  onSubmitExpense() {
    if (this.todoForm.valid) {
      const newExpense = this.todoForm.value;
      this.getFilteredExpenses().push(newExpense);
      this.todoForm.reset();
    }
  }

  onChangeExpense(event: any) {
    this.selectedMonth = event.target.value;
    this.monthSelected = true;
    this.getFilteredExpenses();
  }

  getFilteredExpenses() {
    switch (this.selectedMonth) {
      case 'January':
        return this.januaryExpense;
      case 'February':
        return this.februaryExpense;
      case 'March':
        return this.marchExpense;
      case 'April':
        return this.marchExpense;
      case 'May':
        return this.marchExpense;
      case 'June':
        return this.marchExpense;
      default:
        return [];
    }
  }

  calculateTotalExpense(month: string): number {
    return this.getFilteredExpenses().reduce((acc, curr) => acc + curr.expenseAmount, 0);
  }

  onSave() {
    if (this.todoForm.valid) {
      this.todoForm.reset({ month: this.selectedMonth });
      this.getFilteredExpenses();
    }
  }

  saveForm() {
    console.log("Form saved!");
  }

  onBack() {
    this.router.navigate(['/budget-planner/dashboard']);
  }

}
