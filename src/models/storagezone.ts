// @format
export class StorageZone {
  failIndex: number = 0;
  guid: string = '';
  storageZoneName: string = '';
  path: string = '';
  objectName: string = '';
  length: number = -1;
  lastChanged: Date = new Date();
  serverId: number = -1;
  isDirectory: boolean = false;
  userId: string = '';
  dateCreated: Date = new Date();
  storageZoneId: number = -1;
}
