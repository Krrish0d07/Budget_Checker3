import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-expense',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './expense.component.html',
  styleUrl: './expense.component.scss'
})
export class ExpenseComponent {
  expenseForm: any;
  selectedMonth: string;
  expenses: { month: string, expenseAmount: number }[] = [
    { month: 'January', expenseAmount: 11500 },
    { month: 'February', expenseAmount: 12000 },
    { month: 'March', expenseAmount: 11800 },
    { month: 'April', expenseAmount: 14800 },
    { month: 'May', expenseAmount: 12000 },
    { month: 'June', expenseAmount: 15100 }
  ];
  monthSelected: boolean = false;
  januaryExpense: any[] = [
    { expenseType: 'Rent', expenseAmount: 10000 },
    { expenseType: 'Groceries', expenseAmount: 5000},
  ];
  februaryExpense: any[] = [
    { expenseType: 'Utilities', expenseAmount: 2000 },
    { expenseType: 'Groceries', expenseAmount: 4000 }
  ];
  marchExpense: any[] = [
    { expenseType: 'Rent', expenseAmount: 11000 },
    { expenseType: 'Utilities', expenseAmount: 2500 }
  ];
  aprilExpense: any[] = [
    { expenseType: 'Rent', expenseAmount: 10000 },
    { expenseType: 'Groceries', expenseAmount: 2300 }
  ];
  mayExpense: any[] = [
    { expenseType: 'Rent', expenseAmount: 13000 },
    { expenseType: 'Utilities', expenseAmount: 2500 }
  ];
  juneExpense: any[] = [
    { expenseType: 'Rent', expenseAmount: 15200 },
    { expenseType: 'Groceries', expenseAmount: 2400 }
  ];

  constructor(private fb: FormBuilder, private router: Router) {
    this.selectedMonth = new Date().toLocaleString('default', { month: 'long' });
  }

  ngOnInit(): void {
    this.expenseForm = this.fb.group({
      month: ['', Validators.required],
      expenseType: ['', Validators.required],
      expenseAmount: ['', Validators.required]
    });
  }

  onSubmitExpense() {
    if (this.expenseForm.valid) {
      const newExpense = this.expenseForm.value;
      this.getFilteredExpenses().push(newExpense);
      this.expenseForm.reset();
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
        return this.aprilExpense;
      case 'May':
        return this.mayExpense;
      case 'June':
        return this.juneExpense;
      default:
        return [];
    }
  }

  calculateTotalExpense(month: string): number {
    return this.getFilteredExpenses().reduce((acc, curr) => acc + curr.expenseAmount, 0);
  }

  onSave() {
    if (this.expenseForm.valid) {
      this.expenseForm.reset({ month: this.selectedMonth });
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
