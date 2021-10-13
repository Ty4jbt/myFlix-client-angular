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

  /**
   * routes to profile page
   */
   onProfileClick(): void {
    this.router.navigate(['profile']);
  }

  /**
   * logs user out and routes to welcome page
   */
  logoutUser(): void {
    localStorage.clear();
    this.router.navigate(['welcome']);
    this.snackBar.open("You've been logged out", "OK", {
      duration: 2000,
    });
  }

  /**
   * routes to movies page
   */
   onMovieClick(): void {
    this.router.navigate(['movies'])
  }

}
