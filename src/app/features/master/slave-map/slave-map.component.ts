import { Component, OnInit } from '@angular/core';
import {GoogleMap} from '@agm/core/services/google-maps-types';
import {Subscription} from 'rxjs';
import {ActivatedRoute} from '@angular/router';
import { } from 'googlemaps';

@Component({
  selector: 'app-slave-map',
  templateUrl: './slave-map.component.html',
  styleUrls: ['./slave-map.component.scss'],
})
export class SlaveMapComponent implements OnInit {
  map: GoogleMap;
  routeSubscription$: Subscription;
  latitude: any = null;
  longitude: any = null;
  marker: any;

  constructor(
    private route: ActivatedRoute
  ) { }

  ngOnInit() {}

  ionViewWillEnter() {
    this.latitude = null;
    this.longitude = null;
    this.routeSubscription$ = this.route.params.subscribe(params => {
      this.latitude = parseFloat(params.lat);
      this.longitude = parseFloat(params.long);
      if (this.map) {
        this.setMap();
      }
    });
  }

  ionViewDidLeave() {
    this.routeSubscription$.unsubscribe();
    this.latitude = null;
    this.longitude = null;
    if (this.marker) {
      this.marker.setMap(null);
      this.marker = null;
    }
  }

  mapReady(map: GoogleMap) {
    this.map = map;
    this.setMap();
  }

  setMap() {
    this.map.setCenter({lat: this.latitude, lng: this.longitude});
    this.map.setZoom(14);
    this.marker = new google.maps.Marker({
      position: {lat: this.latitude, lng: this.longitude}
    });
    this.marker.setMap(this.map);
  }

}
