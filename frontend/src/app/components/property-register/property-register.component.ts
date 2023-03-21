import { Component, OnInit } from '@angular/core';
import { IPropertyRequest } from 'src/interfaces/property.interface';

@Component({
  selector: 'app-property-register',
  templateUrl: './property-register.component.html',
  styleUrls: ['./property-register.component.scss']
})
export class PropertyRegisterComponent implements OnInit {

  registerProperty(property: IPropertyRequest) {
    console.log(property)
  }

  constructor() { }

  ngOnInit(): void {}

}
