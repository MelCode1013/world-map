import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class WorldMapServiceService {
  private apiUrl = 'https://api.worldbank.org/V2/country';

  constructor(private http: HttpClient) {}

  // Get all information for a country by its country code
  getCountryDetailsByCode(countryCode: string): Observable<any> {
    // Include the 'format=json' query parameter to ensure the response is in JSON format
    const countryDetailUrl = `${this.apiUrl}/${countryCode}?format=json`;
    return this.http.get<any>(countryDetailUrl);
  }

  getdata() : Observable<any> {
    return this.http.get(`${this.apiUrl}/?format=json`)
  }
}
