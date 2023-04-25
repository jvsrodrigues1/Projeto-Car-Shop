import IAllVehicles from './IVehicle';

export default interface ICar extends IAllVehicles {
  doorsQty: number,
  seatsQty: number,
}