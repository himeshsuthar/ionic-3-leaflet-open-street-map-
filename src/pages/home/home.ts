import { Component, ElementRef, ViewChild, OnInit } from '@angular/core';
import { NavController, Platform } from 'ionic-angular';
import { LocalStorageService } from 'angular-2-local-storage';
import { Diagnostic } from '@ionic-native/diagnostic';
import { AlertController } from 'ionic-angular';
import { Geolocation } from '@ionic-native/geolocation';
import leaflet from 'leaflet';
import mapboxgl from 'mapbox-gl/dist/mapbox-gl.js';
import { LoadingController } from "ionic-angular";
import { ListPage } from '../list/list';
declare var $: any;

import {
  GoogleMaps,
  GoogleMapsEvent,
  GoogleMapOptions
} from '@ionic-native/google-maps';
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage implements OnInit {
  @ViewChild('map') theMap: ElementRef;
  map: any;
  data;
  lat;
  long;
  isLocationAvailable: boolean;
  records;
  markerGroup: any;
  isenabled: boolean = false;
  constructor(public navCtrl: NavController,
    private googleMaps: GoogleMaps,
    private platform: Platform,
    private localStorage: LocalStorageService,
    public alertCtrl: AlertController,
    private geolocation: Geolocation,
    private diagnostic: Diagnostic,
    private loadingCtrl: LoadingController) {
    this.isLocationAvailable = false;
    this.records = this.localStorage.get('records');
    this.data = {};
    this.lat = '';
    this.long = '';
    let locationAlert = this.alertCtrl.create({
      title: 'Enable Location',
      message: `Enable Location Service`,
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          handler: () => {
            console.log(' clicked');
          }
        },
        {
          text: 'Agree',
          handler: () => {
            this.diagnostic.switchToLocationSettings();
            console.log(' clicked');
          }
        }
      ]
    });

    if (this.records === null) {
      this.localStorage.set('records', []);
      this.records = this.localStorage.get('records');
    }

    let loading = this.loadingCtrl.create({
      spinner: "crescent",
      content: "Loading Maps....  !"
    });
    loading.present();
    this.platform.ready().then((readySource) => {
      $('#map-container').html('<div id=map></div>');
      // var that = this;
      // this.diagnostic.isLocationEnabled().then(
      //   (isAvailable) => {
       
      //     this.isLocationAvailable = true;
      //     that.geolocation.getCurrentPosition().then((resp) => {
      //       that.lat = resp.coords.latitude;
      //       that.long = resp.coords.longitude;
      //       that.map = leaflet.map("map").setView([resp.coords.latitude, resp.coords.longitude], 13);
      //       that.loadMap();
      //     }).catch((e) => {
            
      //       console.log('not available');
      //       that.loadMap();
      //       locationAlert.present();
      //     })
      //     console.log('Is available? ' + isAvailable);
      //   }).catch((e) => {
      //     locationAlert.present();
      //     alert('test');
      //     this.loadMap();
      //     console.error(e)
      //   });
      setTimeout(() => {
        loading.dismiss();
              $('#map-container').html('<div id=map></div>');
        this.map = leaflet.map("map").setView([51.846 , 10.096], 7);
           this.loadMap();
      
      }, 1000);
    })
  }
  ngOnInit() {
  }

  regreshMap() {
    return new Promise(resolve => {
      document.getElementById('map').innerHTML = "";
      if (document.getElementById('map').innerHTML == "") {
        resolve(true);
      }
    })
  }
  clearAll() {
    if (this.map != undefined) {
      this.map.remove();
    }
    this.navCtrl.setRoot(this.navCtrl.getActive().component);
  }
  loadMap() {
    // if (!this.isLocationAvailable) {
    //   this.map = leaflet.map("map").fitWorld();

    // }
    var that = this;
    leaflet.tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attributions: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="http://mapbox.com">Mapbox</a>',
      maxZoom: 18
    }).addTo(this.map);
    if (this.isLocationAvailable) {
      leaflet.marker([this.lat, this.long]).addTo(this.map)
        .bindPopup("YOU ARE HERE ")
        .openPopup();
    }
    if (!this.isLocationAvailable) {
      this.map.locate({
        setView: true,
        maxZoom: 10
      }).on('locationfound', (e) => {
        let marker: any = leaflet.marker([e.latitude, e.longitude]).on('click', (e) => {
          alert('Marker clicked');
        })

      })
    }
    //   this.markerGroup.addLayer(marker);
    //   this.map.addLayer(this.markerGroup);
    // }).on('locationerror', (err) => {
    //   alert(err.message);
    // })
    this.map.on('click', function (e) {
      that.lat = e.latlng.lat;
      that.long = e.latlng.lng;
      leaflet.marker([that.lat, that.long]).addTo(that.map)
        .bindPopup("YOU ARE HERE ")
        .openPopup();
      that.data.lat = e.latlng.lat;
      that.data.long = e.latlng.lng;
      let alert = that.alertCtrl.create({
        title: 'Confirm Location',
        message: `lat=${that.lat}  long = ${that.long}`,
        buttons: [
          {
            text: 'Cancel',
            role: 'cancel',
            handler: () => {
              console.log(' clicked');
            }
          },
          {
            text: 'Agree',
            handler: () => {
              $('#map').hide();
              $(':input[type="submit"]').prop('disabled', false);
              $('#locationPin').hide();
              console.log(' clicked');
            }
          }
        ]
      });
      alert.present();
      console.log(e);
      //   newMarkerGroup = new leaflet.LayerGroup();
      // var newMarker =new leaflet.marker(e.latlng).addTo(this.map);
      // let marker: any = leaflet.marker([that.lat, that.long]).on('click', (e) => {
      //alert('Marker clicked');
      // })
      // console.log(marker);
      //     this.markerGroup.addLayer(marker);
      console.log(this.markerGroup);
      //   this.map.addLayer(this.markerGroup);
      console.log(this.lat);
    });
  }

  doopenMap() {
    this.isenabled = true;
    console.log("open map");
    let mapOptions: GoogleMapOptions = {
      camera: {
        target: {
          lat: 43.0741904,
          lng: -89.3809802
        },
        zoom: 18,
        tilt: 30
      }
    };
    this.map = this.googleMaps.create('map_canvas', mapOptions);
    this.map.one(GoogleMapsEvent.MAP_READY)
      .then(() => {
        console.log('Map is ready!');

        // Now you can use all methods safely.
        this.map.addMarker({
          title: 'Ionic',
          icon: 'blue',
          animation: 'DROP',
          position: {
            lat: 43.0741904,
            lng: -89.3809802
          }
        })
          .then(marker => {
            marker.on(GoogleMapsEvent.MARKER_CLICK)
              .subscribe(() => {
                alert('clicked');
              });
          });

      });
  }


  doSubmitData(data) {

    this.records.push(data);
    this.data = {};
    data = {};
    this.localStorage.set('records', this.records);
    let alert = this.alertCtrl.create({
      title: 'New Location!',
      subTitle: 'New Location Successfully added!',
      buttons: ['OK']
    });
    alert.present();
    this.navCtrl.push(ListPage, {
    })
    this.navCtrl.setRoot(this.navCtrl.getActive().component);

    //console.log(this.localStorage.get(data));
  }

}
