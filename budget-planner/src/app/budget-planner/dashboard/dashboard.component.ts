import { Component } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { SideNavComponent } from '../side-nav/side-nav.component';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [MatIconModule,SideNavComponent,CommonModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent {
  //Income
  lastMonthIncome = ['January: 68650','February: 56200','March: 70300','April: 98850','May: 112000','June: 75500'];
  currentMonthIncome = '88000';
  //Expense
  lastMonthExpense = ['January: 38650','February: 44200','March: 32300','April: 54850','May: 75000','June: 43500'];
  currentMonthExpense = '23000';
  //UpComing Transaction
  upcomingTransactions = [
    { description: 'Pay House rent'},
    { description: 'Pay Electric bill'},
    { description: 'buy groceries'},
    { description: 'Pay EMI'},
    { description: 'Pay other Expenditures'}
  ]
  totalCurrentMonthIncome = 88000;
  totalCurrentMonthExpense = 23000;

  constructor(public router: Router) { }


  onIncome() {
    this.router.navigate(['/budget-planner/income'])
  }
  onExpense() {
    this.router.navigate(['/budget-planner/expense'])
  }
  onUpcoming(){
    this.router.navigate(['/budget-planner/todo'])
  }
get currentMonthSavings(): number{
  return this.totalCurrentMonthIncome - this.totalCurrentMonthExpense;
}


}