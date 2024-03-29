import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Book } from './book';

@Injectable()
export class BookService {
  constructor(private http: HttpClient) {}

  bookUrl = 'api/booksSearch';
  searchBooksByTitle(searchQuery: string): Observable<Book[]> {

    return this.http.get<Book[]>(this.bookUrl, {
      params: new HttpParams().set('name', searchQuery)
    });
  }
}
