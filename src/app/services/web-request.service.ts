import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class WebRequestService {

  readonly API_URL;

  constructor(private http: HttpClient) { 
  
    this.API_URL = environment.API_URL;
  }

  get(uri: string) {
    return this.http.get(`${this.API_URL}/${uri}`);
  }
  delete(uri: string) {
    return this.http.delete(`${this.API_URL}/${uri}`);
  }
  post(uri: string, body: any) {
    return this.http.post(`${this.API_URL}/${uri}`, body);
  }
  patch(uri: string, body: any) {
    return this.http.patch(`${this.API_URL}/${uri}`, body);
  }
  put(uri: string, body: any) {
    return this.http.put(`${this.API_URL}/${uri}`, body);
  }
}
