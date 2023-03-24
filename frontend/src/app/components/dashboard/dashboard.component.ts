import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PropertyService } from 'src/app/services/property.service';
import { environment } from 'src/environments/environment';
import { IPropertyResponse } from 'src/interfaces/property.interface';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  profitTotal = 0;
  amountStock = 0;
  amountSold = 0;
  percentProfitTotal = 0;

  constructor(
    private propertyService: PropertyService,
    private router: Router
  ) { }

  environment = environment;
  properties: IPropertyResponse[] = [];

  goToDetails() {}

  goToBuyout() {}

  ngOnInit(): void {

    this.propertyService.getAll().subscribe({
      next: (response) => {
        this.properties = response.properties;

        response.properties.map((property) => {
          if (property.propertyStatusId === 1) {
            this.amountStock += 1;
          } else {
            this.amountSold += 1;
          }

          console.log(property.propertyProfit)
          this.profitTotal += Number(property.propertyProfit);

        })

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
