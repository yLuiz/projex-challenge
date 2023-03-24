import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PropertyService } from 'src/app/services/property.service';
import { IPropertyResponse } from 'src/interfaces/property.interface';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  profit = 0;
  amountStock = 0;
  amountSold = 0;

  constructor(
    private propertyService: PropertyService,
    private router: Router
  ) { }

  properties: IPropertyResponse[] = [];

  goToDetails() {

  }

  goToBuyout() {
    
  }

  ngOnInit(): void {

    this.propertyService.getAll().subscribe({
      next: (response) => {
        this.properties = response.properties
        console.log(response);
      },
      error: (response) => {
        console.log(response);
      }
    })

    let stateData = this.router.getCurrentNavigation();

    console.log(stateData)

  }

}
