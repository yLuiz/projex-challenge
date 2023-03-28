import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { PropertyService } from 'src/app/services/property.service';
import { environment } from 'src/environments/environment';
import { IPropertyResponse } from 'src/interfaces/property.interface';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  totalProfit = 0;
  amountStock = 0;
  amountSold = 0;
  totalPercentProfit = 0;
  totalExpense = 0;
  totalSale = 0;
  loading: boolean = true;
  
  data: any;
  chartOptions: any;


  constructor(
    private propertyService: PropertyService,
    private router: Router,
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

          this.totalExpense += Number(property.purchasePrice);

          if (property.propertyStatusId === 2) { //status 1 => estoque;  status 2 => vendido
            this.totalSale += Number(property.salePrice);
            this.totalProfit += Number(property.propertyProfit);
          }

          this.loading = false;
        })
        
        this.data = {
          labels: ['Total dos gastos (R$)','Total das vendas (R$)','Total dos lucros (R$)'],
          datasets: [
              {
                  data: [this.totalExpense, this.totalSale, this.totalProfit],
                  backgroundColor: [
                      "#ff3131",
                      "#7ee954",
                      "#36A2EB"
                  ],
                  hoverBackgroundColor: [
                      "#ff3131",
                      "#7ee954",
                      "#36A2EB"
                  ]
              }
          ]
        };

      },
      error: (response) => {
        console.log(response);
      }
    })

    let stateData = this.router.getCurrentNavigation();

    console.log(stateData)

  }

}
