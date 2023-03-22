import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PropertyService } from 'src/app/services/property.service';
import { IPropertyForm } from 'src/interfaces/property.interface';
import { DialogService, TypeDialog } from '../dialog/dialog.service';

@Component({
  selector: 'app-property-register',
  templateUrl: './property-register.component.html',
  styleUrls: ['./property-register.component.scss']
})
export class PropertyRegisterComponent implements OnInit {

  constructor(
    private propertyService: PropertyService,
    private dialogService: DialogService,
    private router: Router,
  ) { }


  registerProperty(
    property: IPropertyForm,
  ) {

    const propertyFormData = new FormData();

    propertyFormData.append("title", property.title);
    propertyFormData.append("register", String(property.register));
    propertyFormData.append("salePrice", String(property.salePrice));
    propertyFormData.append("purchasePrice", String(property.purchasePrice));
    propertyFormData.append("propertyStatusId", String(property.status));

    const fileListLength = property.images.length;
    for (let i = 0; i < fileListLength; i++) {
      propertyFormData.append("images", property.images[i]);
    }

    let dialogConfig = {
      header: "Registrado",
      message: "Imóvel registrado com sucesso",
      timer: 2500,
      type: "success" as TypeDialog
    }
    
    this.propertyService.register(propertyFormData)
      .subscribe({
        next: (response => {
          this.dialogService.show(dialogConfig);

          this.router.navigate(['home/dashboard']);

          console.log(response);
        }),
        error: (response) => {
          
          dialogConfig.header = "Error";
          dialogConfig.message = response.error.message || "Error desconhecido, verifique o console";
          dialogConfig.type = "error";

          this.dialogService.show(dialogConfig);
          console.log(response.error);
          
        }
      })

  }


  ngOnInit(): void {}

}
