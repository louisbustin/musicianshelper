import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class WebRequestService {

  readonly API_URL = environment.API_URL;

  constructor(private http: HttpClient) { 

  }
  
  get<T>(uri: string): Observable<T> {
    return this.http.get<T>(`${this.API_URL}/${uri}`);
  }

  delete<T>(uri: string): Observable<T> {
    return this.http.delete<T>(`${this.API_URL}/${uri}`);
  }
  post<T>(uri: string, body: T): Observable<T> {
    return this.http.post<T>(`${this.API_URL}/${uri}`, body);
  }
  patch<T>(uri: string, body: T): Observable<T> {
    return this.http.patch<T>(`${this.API_URL}/${uri}`, body);
  }
  put<T>(uri: string, body: T): Observable<T> {
    return this.http.put<T>(`${this.API_URL}/${uri}`, body);
  }
}
