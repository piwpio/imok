export interface SlaveModel {
  readonly id: number;
  name: string;
  isOk: boolean;
  phone: string;
  lastLocation?: SlaveLocationModel;
}

interface SlaveLocationModel {
  lat: number;
  long: number;
}
