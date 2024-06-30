import { Component, Input, OnInit } from '@angular/core';
import * as L from 'leaflet';

@Component({
  selector: 'app-osm-map',
  templateUrl: './osm-map.component.html',
  styleUrls: ['./osm-map.component.css']
})
export class OsmMapComponent implements OnInit {
  /**
   * Location address to be geocoded and displayed on the map
   * @type {string}
   */
  @Input() location: string = '';

  /**
   * Leaflet map instance
   * @type {L.Map}
   */
  map!: L.Map;

  /**
   * Leaflet marker instance
   * @type {L.Marker}
   */
  marker!: L.Marker;

  constructor() { }

  /**
   * Lifecycle hook that is called after data-bound properties are initialized
   */
  ngOnInit(): void {
    this.initializeMap();
  }

  /**
   * Initializes the Leaflet map with default settings and tile layer
   */
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

  /**
   * Geocodes the provided address and updates the map view and marker position accordingly
   * @param {string} address - Address to geocode
   */
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
          console.error('Address not found:', address);
        }
      })
      .catch(error => {
        console.error('Geocoding error:', error);
      });
  }
}
