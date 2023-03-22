import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { IUserRequest, IUserResponse } from 'src/interfaces/user.interface';
import { DialogService, TypeDialog } from '../dialog/dialog.service';

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.scss']
})
export class UserFormComponent implements OnInit {

  @Output() onSubmit = new EventEmitter<IUserRequest>();

  @Input() buttonText = 'Cadastrar';
  @Input() user: IUserResponse | null = null;

  userForm!: FormGroup;
  matchedPassword = true;

  constructor(
    private dialogService: DialogService
  ) { }

  submit() {

    let dialogConfig = {
      header: 'Campos inválidos',
      message: "Todos os campos são obrigatórios",
      timer: 2000,
      type: "error" as TypeDialog
    }

    if (this.userForm.invalid) {
      dialogConfig.message = "As senhas não são correspondem";
      return;
    }

    if (this.password!.value !== this.confirmedPassword!.value) {

      console.log(this.password, this.confirmedPassword)
      
      dialogConfig.message = "As senhas não são correspondem";

      this.dialogService.show(dialogConfig);

      this.matchedPassword = false;
      return;
    }

    this.matchedPassword = true;

    if (this.password!.value.length < 6) {
      
      dialogConfig.message = "As senha deve conter no mínimo 6 caracteres";

      this.dialogService.show(dialogConfig);
      return;
    }

    const userEmit: IUserRequest = {
      email: this.email!.value,
      name: this.name!.value,
      password: this.password!.value
    }

    // console.log(userEmit);

    this.onSubmit.emit(this.userForm.value);
    // this.onSubmit.subscribe(user => console.log(user));
  }

  get password() {
    return this.userForm.get('password');
  }

  get confirmedPassword() {
    return this.userForm.get('confirmedPassword');
  }

  get name() {
    return this.userForm.get('name');
  }

  get email() {
    return this.userForm.get('email');
  }

  ngOnInit(): void {

    this.userForm = new FormGroup({
      name: new FormControl(this.user ? this.user.name : "", [Validators.required]),
      email: new FormControl(this.user ? this.user.email : "", [
        Validators.required, 
        Validators.pattern('^[a-z0-9.]+@[a-z0-9]+\.[a-z]+\.([a-z]+)?$')
      ]),
      password: new FormControl("", [
        Validators.required,
        Validators.minLength(6)
      ]),
      confirmedPassword: new FormControl("", [Validators.required])
    });
  }

}
