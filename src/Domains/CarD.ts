import ICars from '../Interfaces/ICars';
import Vehicles from './VehicleD';

export default class Cars extends Vehicles {
  private doorsQty: number;
  private seatsQty: number;

  constructor(car: ICars) {
    super({
      id: car.id,
      model: car.model,
      year: car.year,
      color: car.color,
      status: car.status,
      buyValue: car.buyValue,
    });
    this.doorsQty = car.doorsQty;
    this.seatsQty = car.seatsQty;
  }
}