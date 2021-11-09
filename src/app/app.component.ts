import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ApiService } from 'src/services/api.service';
import { debounceTime } from 'rxjs/operators';
import { IGif } from 'src/interfaces/interfaces';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'ultra-app';
  public searchTags = new FormControl();
  public images: IGif[] = [];
  public pages: number[] = [];
  lastPage: number = 0;
  currentPage = 1;
  searchedValue = "";
  gifsOnPage = 9; //Amount of pics on page
  maxOffsetGiphyApi = 4999; //According to giphy Api documentation this is max offset
  fun = false;

  constructor(public apiService: ApiService) {}

  ngOnInit(): void {
    this.paginate(1);
    this.searchTags.valueChanges.pipe(debounceTime(1000)).subscribe((value) => {
      this.searchGiphy(value);
    });
  }

  public party() {
    if(this.fun) {
      this.fun = false;
      this.searchTags.setValue("working");
      this.searchGiphy("working")
    } else {
      this.fun = true;
      this.searchTags.setValue("party");
      this.searchGiphy("party")
    }
  }

  // Request gifs from Giphy using their API and angular services
  public searchGiphy(searchValue: string, offset?: number) {
    this.searchedValue = searchValue;
    this.searchTags.setValue(searchValue);
    // Find last page
    this.lastPage = Math.ceil(this.maxOffsetGiphyApi / this.gifsOnPage);

    this.apiService.getGiphys(searchValue, offset).subscribe((res) => {
      if (res.pagination.total_count < this.lastPage) {
        this.lastPage = res.pagination.total_count;
      }
      console.log(res)
      this.images = [];
      res.data.forEach((gif: { title: any; images: any }) => {
        this.images.push({ title: gif.title, url: gif.images.original.url });
      });
    });
  }

  // If pagination new page is requested
  newPage(number: number | string) {
    if(typeof number === 'string') {
      return;
    }
    let offset = (number - 1) * 9;
    this.searchGiphy(this.searchedValue, offset);
    this.paginate(number)
  }

  paginate(newPage?: number) {
    // pages
    if(newPage) {
      this.currentPage = newPage;
    }
    let pages = [];
    for (let i = 1; i <= this.lastPage; i++) {
        let offset = (i == 1 || this.lastPage) ? 1 : 1;
        if (i == 1 || (this.currentPage - offset <= i && this.currentPage + offset >= i) || 
            i == this.currentPage || i == this.lastPage) {
            pages.push(i);
        } else if (i == this.currentPage - (offset + 1) || i == this.currentPage + (offset + 1)) {
            pages.push('...');
        }
    }
    return pages;
  }
}
