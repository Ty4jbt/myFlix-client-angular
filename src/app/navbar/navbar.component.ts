import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  constructor(
    public router: Router,
    public snackBar: MatSnackBar,
    public toolBar: MatSnackBar,
  ) { }

  ngOnInit(): void {
  }

  logoutUser(): void {
    localStorage.clear();
    this.router.navigate(['welcome']);
    this.snackBar.open("You've been logged out", "OK", {
      duration: 2000,
    });
  }

}
