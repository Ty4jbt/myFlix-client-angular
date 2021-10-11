import { Component, OnInit } from '@angular/core';

import { FetchDataApiService } from '../fetch-api-data.service';

import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';

import { ProfileEditComponent } from '../profile-edit/profile-edit.component';

@Component({
  selector: 'app-profile-view',
  templateUrl: './profile-view.component.html',
  styleUrls: ['./profile-view.component.scss']
})
export class ProfileViewComponent implements OnInit {

  user: any = {};
  movies: any = {};
  favorites: any = {};

  constructor(
    public fetchApiData: FetchDataApiService,
    public snackBar: MatSnackBar,
    public dialog: MatDialog,
    public router: Router,
  ) { }

  ngOnInit(): void {
    this.getUserData();
  }

  getUserData(): void {
    this.fetchApiData.getUser().subscribe((response: any) => {
      this.user = response;
      console.log(this.user);
      this.getFavoriteMovies();
    });
  }

  getFavoriteMovies(): void {
    this.fetchApiData.getAllMovies().subscribe((res: any) => {
      this.movies = res;
      this.filterFavorites();
    });
  }

  filterFavorites(): void {
    this.favorites = this.movies.filter((movie: any) => this.user.FavoriteMovies.includes(movie._id));
    return this.favorites;
  }

  openUpdateViewDialog(): void {
    this.dialog.open(ProfileEditComponent, {
      width: '400px',
    });
  }

  deleteProfile(): void {
    if (confirm('Are you sure? This cannot be undone.')) {
      this.fetchApiData.deleteuser('username').subscribe(() => {
        localStorage.clear();
        this.router.navigate(['welcome']);
        this.snackBar.open('Account Deleted', 'OK', {
          duration: 3000
        });
      });
    }
  }

  removeFromFavorites(_id: string, title: string): void {
    this.fetchApiData.deleteUserFavMovie(_id).subscribe(() => {
      this.snackBar.open(
        `${title} has been removed`, 'OK', {
        duration: 2000,
      }
      );
      setTimeout(function () {
        window.location.reload();
      }, 1000);
    });
  }

}
