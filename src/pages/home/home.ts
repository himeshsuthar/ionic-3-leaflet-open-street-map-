import { Component, ElementRef, ViewChild ,ChangeDetectorRef,OnInit} from '@angular/core';
import { NavController,Platform } from 'ionic-angular';
import { LocalStorageService } from 'angular-2-local-storage';
import { Toast } from '@ionic-native/toast';
import { AlertController } from 'ionic-angular';
import { Geolocation, Geoposition } from '@ionic-native/geolocation';
import leaflet from 'leaflet';
import mapboxgl from 'mapbox-gl/dist/mapbox-gl.js';
declare var jquery: any;
declare var $: any; 
declare var plugin: any;
declare var cordova: any;

import {
  GoogleMaps,
  GoogleMap,
  GoogleMapsEvent,
  GoogleMapOptions,
  CameraPosition,
  MarkerOptions,
  Marker,
  LatLng
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
 records;
 markerGroup:any;
  isenabled: boolean = false;
  constructor(public navCtrl: NavController, private googleMaps: GoogleMaps, private platform: Platform,
    private localStorage: LocalStorageService,
    private toast: Toast,
    public alertCtrl: AlertController,
    private geolocation: Geolocation,
    private ref:ChangeDetectorRef) {  
    this.records = this.localStorage.get('records');
this.data={};
this.lat = '';
this.long= '';
if(this.records === null){
      this.localStorage.set('records',[]);
  this.records = this.localStorage.get('records');

}

        console.log(this.records);
  
  }
  ngOnInit() {
    this.platform.ready().then(() => {
      this.map = leaflet.map("map").fitWorld();
     this.loadMap();
    });
    
  }

 regreshMap(){
    return new Promise(resolve => {
      document.getElementById('map').innerHTML = "";
      if (document.getElementById('map').innerHTML == ""){
        resolve(true);
      }
    })
  }
clearAll(){
  if (this.map != undefined) {
    this.map.remove();
  }

  this.navCtrl.setRoot(this.navCtrl.getActive().component);
}
 loadMap() {
 // var a = await this.regreshMap();
   var a = true;
if(a == true){
  var newMarkerGroup;
  var that = this;
    leaflet.tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attributions: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="http://mapbox.com">Mapbox</a>',
      maxZoom: 18
    }).addTo(this.map);
    this.map.locate({
      setView: true,
      maxZoom: 10
    }).on('locationfound', (e) => {
      this.markerGroup = leaflet.featureGroup();
      let marker: any = leaflet.marker([e.latitude, e.longitude]).on('click', (e) => {
        alert('Marker clicked');
      })
      this.markerGroup.addLayer(marker);
      this.map.addLayer(this.markerGroup);
      }).on('locationerror', (err) => {
        alert(err.message);
    })
      this.map.on('click', function(e) {
      that.lat= e.latlng.lat;
      that.long=  e.latlng.lng;
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
      let marker: any = leaflet.marker([that.lat, that.long]).on('click', (e) => {
        //alert('Marker clicked');
      })
         console.log(marker);
   //     this.markerGroup.addLayer(marker);
        console.log(this.markerGroup);
     //   this.map.addLayer(this.markerGroup);
      console.log(this.lat);
});
  }  
}
  // loadMap() {

  //   this.geolocation.getCurrentPosition().then((data: Geoposition) => {
  //     let location = {
  //       lat: data.coords.latitude,
  //       lng: data.coords.longitude
  //     };
  //     let mapEle = this.theMap.nativeElement;
  //     this.map = new plugin.google.maps.Map.getMap(mapEle, {

  //       'mapType': plugin.google.maps.MapTypeId.NORMAL,
  //       'controls': {
  //         'compass': true,
  //         'myLocationButton': false,
  //         'indoorPicker': false,
  //         'zoom': true
  //       },
  //       'gestures': {
  //         'scroll': true,
  //         'tilt': true,
  //         'rotate': true,
  //         'zoom': true
  //       },
  //       'camera': {
  //         'tilt': 0,
  //         'zoom': 11,
  //         'bearing': 0
  //       }

  //     });

  //     console.log('Map should be loaded.');
  //     let $target: any = location;
  //     this.map.one(plugin.google.maps.event.MAP_READY, () => {

  //       console.log("Map is ready.");
  //       this.moveMapToLocation($target);

  //       this.map.on(plugin.google.maps.event.CAMERA_MOVE_END,
  //         (data: any) => {
  //           console.log(data);
  //         }
  //       );
  //     });


  //   });
  //   console.log('Start loading MAP');


  // }
  // moveMapToLocation(target: { lat: number, lng: number }) {
  //   let animateOpt = {
  //     target: target,
  //     zoom: 18,
  //     duration: 1000
  //   };

  //   this.map.animateCamera(animateOpt);
  // }


  // loadMap() {
    
  //   let location = new LatLng(-34.9290, 138.6010);
  //   console.log(location);
  //   this.map = new GoogleMap('map', {
  //     'controls': {
  //       'compass': true,
  //       'myLocationButton': true,
  //       'indoorPicker': true,
  //       'zoom': true
  //     },
  //     'gestures': {
  //       'scroll': true,
  //       'tilt': true,
  //       'rotate': true,
  //       'zoom': true
  //     },
  //     'camera': {
  //       'target': location,
  //       'tilt': 30,
  //       'zoom': 15,
  //       'bearing': 50
  //     }
  //   });

  //   this.map.on(GoogleMapsEvent.MAP_READY).subscribe(() => {
  //     console.log('Map is ready!');
  //   });
    

  // }
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
  

  doSubmitData(data){
    
  this.records.push(data);
   this.data = {};
    data={};
    this.localStorage.set('records',this.records);
    let alert = this.alertCtrl.create({
      title: 'New Location!',
      subTitle: 'New Location Successfully added!',
      buttons: ['OK']
    });
    alert.present();    
    //console.log(this.localStorage.get(data));
  }

}
