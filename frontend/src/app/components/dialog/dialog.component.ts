import { Component, Input, OnInit } from '@angular/core';
import { DialogService } from './dialog.service';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.scss']
})
export class DialogComponent implements OnInit {
  header: string = '';
  message: string = '';

  constructor(
    public dialogService: DialogService
  ) {}

  ngOnInit(): void {
    this.header = this.dialogService.header;
    this.message = this.dialogService.message;

  }

}
