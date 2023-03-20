import { Injectable } from '@angular/core';

type TypeDialog = "error" | "success";

@Injectable({
  providedIn: 'root'
})
export class DialogService {

  public class = 'dialog-container';
  private header_ = '';
  private message_ = '';
  private visible_ = false;
  
  constructor() { }

  setType (value: TypeDialog) {
    this.class = `${this.class} ${value}`;
  }

  set header (value: string) {
    this.header_ = value;
  }

  get header () {
    return this.header_;
  }

  set message (value: string) {
    this.message_ = value;
  }

  get message () {
    return this.message_;
  }

  set visible (value: boolean) {
    this.visible = value;
  }

  get visible () {
    return this.visible_
  }

  public show() {
    this.visible_ = true;
    this.class = `${this.class} show`;
  }

  public hide() {
    this.visible_ = false;
    this.class = `${this.class} hide`;
  }
}
