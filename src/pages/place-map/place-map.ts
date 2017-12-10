import { Component, OnInit} from '@angular/core';
import { IonicPage, NavController, NavParams, Platform } from 'ionic-angular';
import { Geolocation, Geoposition } from '@ionic-native/geolocation';
import leaflet from 'leaflet';
/**
 * Generated class for the PlaceMapPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-place-map',
  templateUrl: 'place-map.html',
})
export class PlaceMapPage implements OnInit {
place:any;
map:any;
  constructor(public navCtrl: NavController, public navParams: NavParams, private platform: Platform) {
    this.place = navParams.get('place');
    console.log(this.place);
  }

  ionViewDidLoad() {
    this.platform.ready().then(() => {
      this.map = leaflet.map("map").setView([this.place.lat,this.place.lon], 13);
      leaflet.tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attributions: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="http://mapbox.com">Mapbox</a>',
        maxZoom: 18
      }).addTo(this.map);
      
        leaflet.marker([this.place.lat, this.place.lon]).addTo(this.map)
          .bindPopup(this.place.display_name)
          .openPopup();

    })
    console.log('ionViewDidLoad PlaceMapPage');
  }
  

  ngOnInit(){
  }
}
