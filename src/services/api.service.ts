import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

interface Response {
  [key: string]: any;
}

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  params = new HttpParams().set('api_key', environment.apiKey).set('limit', 9);

  constructor(private http: HttpClient) {}

  public getGiphys(searchString: string, offset?: number): Observable<Response> {
    const url: string = environment.apiLink;
    this.params = this.params.set('q',searchString);
    if(offset) {
      this.params = this.params.set('offset', offset)
    } else {
      this.params = this.params.set('offset', 0)
    }

    return this.http.get<Response>(url, {params: this.params});
  }
}
