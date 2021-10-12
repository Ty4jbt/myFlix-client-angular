import { Component, OnInit, Input } from '@angular/core';

import { FetchDataApiService } from '../fetch-api-data.service';

import { MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-profile-edit',
  templateUrl: './profile-edit.component.html',
  styleUrls: ['./profile-edit.component.scss']
})
export class ProfileEditComponent implements OnInit {

  @Input() userData = { Username: '', Password: '', Email: '', Birthday: '' }

  constructor(
    public fetchApiData: FetchDataApiService,
    public snackBar: MatSnackBar,
    public dialogRef: MatDialogRef<ProfileEditComponent>,
  ) { }

  ngOnInit(): void {
  }

  updateUserData(): void {
    this.fetchApiData.editUserInfo(this.userData).subscribe((response) => {
      this.dialogRef.close();
      localStorage.setItem('user', response.Username);
      this.snackBar.open('Profile deatails have been updated', 'OK', {
        duration: 2000,
      });
    }, (response) => {
      this.snackBar.open(response, 'OK', {
        duration: 2000,
      });
    });
    setTimeout(function () {
      window.location.reload();
    }, 1250);
  }

  cancel(): void {
    this.dialogRef.close();
  }

}
