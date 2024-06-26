import { Component, Input, OnInit } from '@angular/core';
import * as L from 'leaflet';

@Component({
  selector: 'app-osm-map',
  templateUrl: './osm-map.component.html',
  styleUrls: ['./osm-map.component.css']
})
export class OsmMapComponent implements OnInit {
  @Input() location: string = '';

  map!: L.Map;
  marker!: L.Marker;

  constructor() { }

  ngOnInit(): void {
    this.initializeMap();
  }

  initializeMap(): void {
    const defaultCoordinates: L.LatLngExpression = [48.8566, 2.3522];

    this.map = L.map('map').setView(defaultCoordinates, 12);

    const tileLayerUrl = 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';
    const attribution = '&copy; OpenStreetMap contributors';

    L.tileLayer(tileLayerUrl, {
      attribution
    }).addTo(this.map);

    if (this.location) {
      this.geocodeLocation(this.location);
    }
  }

  geocodeLocation(address: string): void {
    const url = `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(address)}&format=json`;

    fetch(url)
      .then(response => response.json())
      .then(data => {
        if (data.length > 0) {
          const latLng: L.LatLngExpression = [parseFloat(data[0].lat), parseFloat(data[0].lon)];
          this.map.setView(latLng, this.map.getZoom());

          if (this.marker) {
            this.map.removeLayer(this.marker);
          }
          this.marker = L.marker(latLng).addTo(this.map);
        } else {
          console.error('Adresse non trouvée : ', address);
        }
      })
      .catch(error => {
        console.error('Erreur de géocodage : ', error);
      });
  }
}
