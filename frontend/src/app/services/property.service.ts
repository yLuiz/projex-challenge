import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { environment } from 'src/environments/environment';
import { IPropertyRequest, IPropertyResponse } from 'src/interfaces/property.interface';

@Injectable({
  providedIn: 'root'
})
export class PropertyService {

  sendingProperty = new BehaviorSubject(false);

  constructor(
    private http: HttpClient
  ) { }

  public register(propertyFormData: FormData) {
    return this.http.post(`${environment.api_url}/property`, propertyFormData);
  }

  public getAll() {
    return this.http.get<{properties: IPropertyResponse[]}>(`${environment.api_url}/property`);
  }

}
