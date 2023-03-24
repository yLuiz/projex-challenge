import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { IPropertyForm, IPropertyRequest, IPropertyResponse } from 'src/interfaces/property.interface';
import { DialogService, TypeDialog } from '../dialog/dialog.service';

@Component({
  selector: 'app-property-form',
  templateUrl: './property-form.component.html',
  styleUrls: ['./property-form.component.scss']
})
export class PropertyFormComponent implements OnInit {

  @Output() onSubmit = new EventEmitter<IPropertyForm>();

  @Input() buttonText = 'Cadastrar';
  @Input() property: IPropertyRequest | null = null;
  @Input() headerTitle = "";

  selectedImages: string[] = [];
  propertyForm!: FormGroup;

  constructor(
    private dialogService: DialogService
  ) { }

  onSelectedStatus(event: Event) {
    const status = (<HTMLSelectElement>event.target).value;

    this.propertyForm.patchValue({ status });
  }

  toString(value: number) {
    return String(value);
  }

  onFileSelected(event: Event) {

    
    const files = (<HTMLInputElement>event.target).files;
    
    const filesLength = files!.length;
    
    for (let i = 0; i < filesLength; i++) {
      if (!files?.item(i)?.type.includes("image")) {
        
        (<HTMLInputElement>document.getElementById('images')).value = '';

        this.dialogService.show({
          header: "Arquivo inválido",
          message: "Escolha apenas arquivos de imagem",
          timer: 2500,
          type: "error"
        })
        return;
      }
    }

    for (let i = 0; i < filesLength; i++) {
      if (files) this.selectedImages.push(files[i].name)
    }

    this.propertyForm.patchValue({ images: files });
  }

  submit() {

    if(Number(this.salePrice?.value) < Number(this.purchasePrice?.value)) {
      this.dialogService.show({
        header: "Campos inválidos",
        message: "O preço de venda não pode ser menor que o preço de comprar.",
        timer: 2500,
        type: "error"
      })
      return;
    }
    
    if (!this.images?.value || String(this.register?.value).length > 11 || this.propertyForm.invalid) {
      this.dialogService.show({
        header: "Campos inválidos",
        message: "Preencha todos os campos corretamente",
        timer: 2500,
        type: "error"
      })
      return;
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

  get images() {
    return this.propertyForm.get('images');
  }

  ngOnInit(): void {

    this.propertyForm = new FormGroup({
      title: new FormControl(this.property ? this.property.title : "", [Validators.required]),
      register: new FormControl(this.property ? this.property.register : "", Validators.maxLength(11)),
      salePrice: new FormControl(this.property ? this.property.salePrice : "", Validators.maxLength(11)),
      purchasePrice: new FormControl(this.property ? this.property.purchasePrice : "", Validators.maxLength(11)),
      images: new FormControl(this.property ? this.property.images : ""),
      status: new FormControl(this.property ? this.property.propertyStatusId : "1")
    });
  }

}

