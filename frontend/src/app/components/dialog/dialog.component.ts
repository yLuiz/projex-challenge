import { Component, Input, OnInit } from '@angular/core';
import { DialogService, TypeDialog } from './dialog.service';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.scss']
})
export class DialogComponent implements OnInit {
  header: string = '';
  message: string = '';

  type: TypeDialog | undefined = "success";

  constructor(
    public dialogService: DialogService
  ) {}

  showTest() {
    this.dialogService.show({ 
      header: "Teste",
      message: "Testando mensagem",
      timer: 2000,
      type: "error"
    });
  }

  ngOnInit(): void {
    // this.showTest();

    this.dialogService.dialogConfig.subscribe({
      next: (values) => {
        this.header = values.header;
        this.message = values.message;
        this.type = values.type;
      }
    });
  }

}
