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

  favs: any[] = [];
  movies: any[] = [];

  constructor(
    public fetchApiData: FetchDataApiService,
    public dialog: MatDialog,
    public snackBar: MatSnackBar
    ) { }
    
    ngOnInit(): void {
      this.getMovies();
      this.getUsersFavs();
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
  
  addToFavs(_id: string): any {
    this.fetchApiData.addFavMovie(_id).subscribe((response: any) => {
      this.snackBar.open('Added to favorites.', 'OK', {
        duration: 3000
      });
      return this.getUsersFavs();
    });
  }

  removeFromFavs(_id: string): void {
    this.fetchApiData.deleteUserFavMovie(_id).subscribe((response: any) => {
      this.snackBar.open('Removed from favorites', 'OK', {
        duration: 3000,
      });
      return this.getUsersFavs();
    })
  }

  getUsersFavs(): void {
    this.fetchApiData.getUser().subscribe((response: any) => {
      this.favs = response.Favorites;
      return this.favs
    })
  }
  
  /**
   * evaluates if a movie is inside the favorites list
   * @param _id 
   * @returns boolean
   */
  isFav(_id: string): Boolean {
    return this.favs.includes(_id) ? true : false
  }

  /**
   * addes or removies movies from favorites in database and app
   * @param _id 
   * @returns updated list of favorites
   */
  toggleFav(_id: string): void {
    if (this.isFav(_id)) {
      console.log("trying to remove...")
      this.fetchApiData.deleteUserFavMovie(_id).subscribe((response: any) => {
        this.snackBar.open('Removed from favorites!', 'OK', {
          duration: 2000,
        });
        return this.favs.splice(this.favs.indexOf(_id), 1)
      })
    } else if (!this.isFav(_id)) {
      console.log("trying to add...")

      this.fetchApiData.addFavMovie(_id).subscribe((response: any) => {
        console.log(_id);
        this.snackBar.open('Added to favorites!', 'OK', {
          duration: 2000,
        });
        return this.favs.push(_id);
      })
    }
  }
}
