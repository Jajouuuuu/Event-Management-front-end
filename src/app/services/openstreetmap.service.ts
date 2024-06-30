import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

/**
 * Service to interact with OpenStreetMap Nominatim API for geocoding addresses.
 * Geocoding converts addresses into geographic coordinates.
 */
@Injectable({
    providedIn: 'root'
})
export class OpenStreetMapService {
    /** Base URL for Nominatim API */
    private nominatimBaseUrl = 'https://nominatim.openstreetmap.org/search';

    constructor(private http: HttpClient) { }

    /**
     * Geocodes the given address to retrieve geographic coordinates.
     * @param address The address to geocode
     * @returns An Observable of type any[] containing geocoding results in JSON format
     */
    geocode(address: string) {
        const url = `${this.nominatimBaseUrl}?q=${encodeURIComponent(address)}&format=json`;
        return this.http.get<any[]>(url);
    }
}
