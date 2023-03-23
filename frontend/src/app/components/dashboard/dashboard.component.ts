import { Component, OnInit } from '@angular/core';
import { PropertyService } from 'src/app/services/property.service';
import { IPropertyResponse } from 'src/interfaces/property.interface';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  constructor(
    private propertyService: PropertyService
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

  }

}
