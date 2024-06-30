import { Injectable } from '@angular/core';

/**
 * Service to handle session storage operations.
 * Provides methods to get, set, remove items, and clear the session storage.
 */
@Injectable({
  providedIn: 'root'
})
export class SessionStorageService {

  constructor() { }

  /**
   * Retrieves the item with the specified key from session storage.
   * @param key The key of the item to retrieve
   * @returns The value associated with the key, or null if the key does not exist
   */
  getItem(key: string): string | null {
    return sessionStorage.getItem(key);
  }

  /**
   * Sets the item in session storage with the specified key and value.
   * @param key The key under which to store the value
   * @param value The value to store
   */
  setItem(key: string, value: string): void {
    sessionStorage.setItem(key, value);
  }

  /**
   * Removes the item with the specified key from session storage.
   * @param key The key of the item to remove
   */
  removeItem(key: string): void {
    sessionStorage.removeItem(key);
  }

  /**
   * Clears all items from session storage.
   */
  clear(): void {
    sessionStorage.clear();
  }
}
