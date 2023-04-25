import IAllVehicles from './IAllVehicles';

export default interface ICar extends IAllVehicles {
  doorsQty: number,
  seatsQty: number,
}