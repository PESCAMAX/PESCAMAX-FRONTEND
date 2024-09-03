import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RelojService {
  private apiUrl = 'http://192.168.1.12/random'; // Replace with your ESP8266's IP address

  constructor(private http: HttpClient) {}

 
  setHours(hours: any): Observable<any> {
    const url = `${this.apiUrl}/setHours`;
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.post(url, hours, { headers });
  }
}