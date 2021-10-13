import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';

import { FetchDataApiService } from '../fetch-api-data.service';

import { MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-user-login-form',
  templateUrl: './user-login-form.component.html',
  styleUrls: ['./user-login-form.component.scss']
})
export class UserLoginFormComponent implements OnInit {
  
  @Input() userDetails = { Username: '', Password: ''}
  
  constructor(
    public fetchApiData: FetchDataApiService,
    public dialogRef: MatDialogRef<UserLoginFormComponent>,
    public snackBar: MatSnackBar,
    public router: Router
    ) { }
    
    ngOnInit(): void { }
    
    loginUser(): void {
      this.fetchApiData.userLogin(this.userDetails).subscribe((response) => {
        localStorage.setItem('username', response.user.Username);
        localStorage.setItem('token', response.token);
        this.dialogRef.close();
        this.snackBar.open('Login successful', 'OK', {
          duration: 2000
        });
        this.router.navigate(['movies']);
    }, (response) => {
      this.snackBar.open(response, 'OK', {
        duration: 2000
      });
    });
  }

}
