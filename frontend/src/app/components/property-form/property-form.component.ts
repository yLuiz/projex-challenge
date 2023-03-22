import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { IPropertyRequest, IPropertyResponse } from 'src/interfaces/property.interface';
import { DialogService, TypeDialog } from '../dialog/dialog.service';

@Component({
  selector: 'app-property-form',
  templateUrl: './property-form.component.html',
  styleUrls: ['./property-form.component.scss']
})
export class PropertyFormComponent implements OnInit {

  @Output() onSubmit = new EventEmitter<IPropertyRequest>();

  @Input() buttonText = 'Cadastrar';
  @Input() property: IPropertyResponse | null = null;

  propertyForm!: FormGroup;

  constructor(
    private dialogService: DialogService
  ) { }

  handleFile(event: any) {
    console.log(event.target.files);
  }

  submit() {

    let dialogConfig = {
      header: 'Campos inválidos',
      message: "Todos os campos são obrigatórios",
      timer: 2000,
      type: "error" as TypeDialog
    }

    this.onSubmit.emit(this.propertyForm.value);
  }

  get purchasePrice() {
    return this.propertyForm.get('purchasePrice');
  }

  get password3() {
    return this.propertyForm.get('password');
  }

  get salePrice() {
    return this.propertyForm.get('salePrice');
  }

  get title() {
    return this.propertyForm.get('title');
  }

  get register() {
    return this.propertyForm.get('register');
  }

  ngOnInit(): void {

    this.propertyForm = new FormGroup({
      title: new FormControl(this.property ? this.property.title : "", [Validators.required]),
      register: new FormControl(this.property ? this.property.register : ""),
      salePrice: new FormControl(this.property ? this.property.salePrice : ""),
      purchasePrice: new FormControl(this.property ? this.property.purchasePrice : ""),
    });
  }

}

