import { StorageItem } from './storage-item.model';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Observable } from 'rxjs/Observable';
import { Injectable } from '@angular/core';

/**
 * The Local storage service. Service to provide management of and access to items stored in local storage.
 */
@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {
  public static readonly ONE_MINUTE = 60 * 1000;
  public static readonly ONE_HOUR = 60 * LocalStorageService.ONE_MINUTE;
  public static readonly ONE_DAY = 24 * LocalStorageService.ONE_DAY;
  public static readonly ONE_WEEK = LocalStorageService.ONE_DAY * 7;

  private readonly watchedItems: Map<string, BehaviorSubject<any>> = new Map();

  /**
   * Sets up a listener for storage events in other windows so data remains synchronized across windows.
   */
  constructor() {
    window.onstorage = (event) => {
      const watchedItem = this.watchedItems.get(event.key);

      if (watchedItem) {
        watchedItem.next(this.stringToObj(event.newValue, event.key));
      }
    };
  }

  /**
   * Get the local storage item for the given key.
   * @param {string} key the storage key
   * @param {number} expiryPeriod The expiry period  in milliseconds
   */
  getItem<T>(key: string, expiryPeriod?: number): T {
    const stringValue = localStorage.getItem(key);
    return this.stringToObj<T>(stringValue, key, expiryPeriod);
  }

  /**
   * Get an Observable for the local storage item for the given key.
   */
  watchItem<T>(key: string): Observable<T> {
    return this.getSubjectItemForKey<T>(key).asObservable();
  }

  /**
   * Set the local storage item for the given key.
   */
  setItem<T>(key: string, value: T) {
    const item = this.getSubjectItemForKey<T>(key);
    item.next(value);
    localStorage.setItem(key, JSON.stringify(new StorageItem(value)));
  }

  /**
   * Remove the local storage item for the given key.
   */
  clearItem(key: string) {
    const item: BehaviorSubject<any> = this.watchedItems.get(key);

    if (item) {
      item.complete();
      this.watchedItems.delete(key);
    }
    localStorage.removeItem(key);
  }

  private getSubjectItemForKey<T>(key: string): BehaviorSubject<T> {
    let item: BehaviorSubject<T> = this.watchedItems.get(key);

    if (!item) {
      item = new BehaviorSubject<T>(this.getItem<T>(key));
      this.watchedItems.set(key, item);
    }

    return item;
  }

  /**
   * Extracts the JSON data from the given storage JSON string.
   * @param {string} jsonString
   * @param {number} expiryPeriod The expiry period in milliseconds
   */
  private stringToObj<T>(jsonString: string, key: string, expiryPeriod?: number): T {

    let storageItem: StorageItem = null,
      data = null;
    try {
      storageItem = <StorageItem>JSON.parse(jsonString);
      data = this.storageItemValid(storageItem, key, expiryPeriod) ? storageItem.data : null;
    } catch (e) {
      // Not valid JSON, return null
    }
    return data;
  }

  /**
   * Checks if the item has expired, will also clear any expired items.
   */
  storageItemValid(item: StorageItem, key: string, expiryPeriod?: number): boolean {

    let storageItemValid = !!(item && item.created);

    if (storageItemValid && expiryPeriod) {

      const timeNow = new Date().getTime(),
        expiryTime = item.created + expiryPeriod;

      if (expiryTime < timeNow) {
        storageItemValid = false;
        this.clearItem(key);
      }
    }

    return storageItemValid;
  }
}

