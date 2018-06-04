/**
 * Simple model to hold data being held in web storage with a timestamp of when it was created.
 */
export class StorageItem {
  /** The date of creation in milliseconds*/
  created: number;

  /** The data stored */
  data: any;

  constructor(data: any) {
    this.data = data;
    this.created = new Date().getTime();
  }
}
