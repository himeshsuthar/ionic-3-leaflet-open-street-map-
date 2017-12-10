import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { GoogleMaps} from '@ionic-native/google-maps';
import { Geolocation } from '@ionic-native/geolocation';
import { Diagnostic } from '@ionic-native/diagnostic';
import { HeaderColor } from '@ionic-native/header-color';
import { MyApp } from './app.component';
import { HttpModule } from '@angular/http';
import { HttpClientModule } from '@angular/common/http';
import { HomePage } from '../pages/home/home';
import { ListPage } from '../pages/list/list';

import { PlaceMapPage } from '../pages/place-map/place-map';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { LocalStorageModule } from 'angular-2-local-storage';
import { Toast } from '@ionic-native/toast';
import { PlacesProvider } from '../providers/places/places';

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    ListPage,
    PlaceMapPage
  ],
  imports: [
    BrowserModule,
    HttpModule,
    HttpClientModule,
    IonicModule.forRoot(MyApp),
    LocalStorageModule.withConfig({
      prefix: 'my-app',
      storageType: 'localStorage'
    })
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    ListPage,
    PlaceMapPage
  ],
  providers: [
    HttpModule,
    Diagnostic,
    HeaderColor,
    HttpClientModule,
    Geolocation,
    GoogleMaps,
    Toast,
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    PlacesProvider
  ]
})
export class AppModule {}
