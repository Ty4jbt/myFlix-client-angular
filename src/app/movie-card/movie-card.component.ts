import { Component, OnInit } from '@angular/core';
import { FetchDataApiService } from '../fetch-api-data.service';

import { MovieDirectorComponent } from '../movie-director/movie-director.component';
import { MovieGenreComponent } from '../movie-genre/movie-genre.component';
import { MovieSummaryComponent } from '../movie-summary/movie-summary.component';

import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-movie-card',
  templateUrl: './movie-card.component.html',
  styleUrls: ['./movie-card.component.scss']
})
export class MovieCardComponent implements OnInit {
  movies: any[] = [];
  constructor(
    public fetchApiData: FetchDataApiService,
    public dialog: MatDialog,
    public snackBar: MatSnackBar
  ) { }

  ngOnInit(): void {
    this.getMovies();
  }

  getMovies(): void {
    this.fetchApiData.getAllMovies().subscribe((response: any) => {
      this.movies = response;
      console.log(this.movies);
      return this.movies;
    });
  }

  openGenreViewDialog(name: string, description: string): void {
    this.dialog.open(MovieGenreComponent, {
      data: { name, description },
      width: '500px'
    });
  }

  openDirectorViewDialog(name: string, bio: string, birthYear: number, deathYear: number): void {
    this.dialog.open(MovieDirectorComponent, {
      data: { name, bio, birthYear, deathYear },
      width: '500px'
    });
  }

  openSummaryViewDialog(title: string, description: string): void {
    this.dialog.open(MovieSummaryComponent, {
      data: { title, description },
      width: '500px'
    });
  }

  addMoviesToFavs(_id: string): any {
    this.fetchApiData.addFavMovie(_id).subscribe((response: any) => {
      this.snackBar.open('Added to favorites.', 'OK', {
        duration: 3000
      });
    });
  }
}
