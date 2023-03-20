import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export type TypeDialog = "error" | "success";

interface IDiologConfig {
  header: string;
  message: string;
  type?: TypeDialog;
  timer: number;
}

@Injectable({
  providedIn: 'root'
})
export class DialogService {

  public class = 'dialog-container';
  public dialogConfig = new BehaviorSubject<IDiologConfig>({
    header: '',
    message: '',
    type: "success",
    timer: 0
  });
  private visible_ = false;
  
  constructor() { }

  set visible (value: boolean) {
    this.visible = value;
  }

  get visible () {
    return this.visible_
  }

  public show({ header, message, type, timer }: IDiologConfig) {

    if (this.visible_) return;

    type = type ?? "success";

    this.dialogConfig.next({
      header,
      message,
      type,
      timer
    })

    this.visible_ = true;

    this.class = `dialog-container ${type} show`;

    setTimeout(() => {
      this.hide();
    }, timer);
  }

  public hide() {

    this.class = this.class.replace('show', 'hide');
    console.log(this.class)

    setTimeout(() => {
      this.visible_ = false;
      this.class = "dialog-container";
      console.log(this.class)
    }, 300);
  }
}
