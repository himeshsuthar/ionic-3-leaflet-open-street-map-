import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import "rxjs/add/operator/map";
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import "rxjs/add/operator/toPromise";

/*
  Generated class for the PlacesProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class PlacesProvider {

  constructor(public http: Http) {
    console.log('Hello PlacesProvider Provider');

  }

  getPlaces(lat, long) {
    return this.http
      .get(
      `http://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${lat}&lon=${long}` 
      )
      .map(response =>{ 
        //console.log(response);
        return response.json()});
  }

}
