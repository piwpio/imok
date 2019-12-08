export interface SlaveModel {
  readonly id: string;
  name: string;
  isOk: boolean;
  phone: string;
  isActive: boolean;
  interval: number;
  actions: Array<SlaveActionModel>;
  isLogged: boolean;
}

interface SlaveActionModel {
  lat: number;
  long: number;
  time: number;
  isOk: boolean;
}
