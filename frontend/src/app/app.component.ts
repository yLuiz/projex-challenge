import { Component } from '@angular/core';
import { DialogService } from './components/dialog/dialog.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  constructor (
    private dialogService: DialogService
  ) {}

  ngOnInit() {
    this.dialogService.header = "Error";
    this.dialogService.message = "Invalid credentials.";
    this.dialogService.setType('error');

    setTimeout(() => {this.dialogService.show()}, 1000);

  }
}
