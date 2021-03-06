import { Component, OnInit, Input } from '@angular/core';

import { MatDialogRef } from '@angular/material/dialog';

import { FetchDataApiService } from '../fetch-api-data.service';

import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-user-registration-form',
  templateUrl: './user-registration-form.component.html',
  styleUrls: ['./user-registration-form.component.scss']
})
export class UserRegistrationFormComponent implements OnInit {

  @Input() userDetails = { Username: '', Password: '', Email: '', Birthday: '' };

  constructor(
    public fetchApiData: FetchDataApiService,
    public dialogRef: MatDialogRef<UserRegistrationFormComponent>,
    public snackBar: MatSnackBar
  ) { }

  ngOnInit(): void { }

  registerUser(): void {
    this.fetchApiData.userRegistration(this.userDetails).subscribe((response) => {
      this.dialogRef.close();
      console.log(response);
      this.snackBar.open('Welcome, you are now registered. You can now login', 'OK', {
        duration: 3000
      });
    }, (response) => {
      this.snackBar.open(response, 'OK', {
        duration: 2000
      });
    });
  }
}
