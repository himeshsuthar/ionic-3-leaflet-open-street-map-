import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PlaceMapPage } from './place-map';

@NgModule({
  declarations: [
    PlaceMapPage,
  ],
  imports: [
    IonicPageModule.forChild(PlaceMapPage),
  ],
})
export class PlaceMapPageModule {}
