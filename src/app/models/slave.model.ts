export interface SlaveModel {
  readonly id: number;
  name: string;
  isOk: boolean;
  phone: string;
  isActive: boolean;
  interval: number;
  lastLocations: Array<SlaveLocationModel>;
}

interface SlaveLocationModel {
  lat: number;
  long: number;
  time: number;
}
