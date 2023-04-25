import Car from '../Domains/Car';
import ICar from '../Interfaces/ICar';
import CarODM from '../Models/CarODM';
import NotFoundError from '../errors/NotFoundError';
import InvalidIdError from '../errors/InvalidIdError';

const INVALID_MONGO_ID = 'Invalid mongo id';
const CAR_NOT_FOUND = 'Car not found';

export default class CarService {
  private carODM: CarODM;

  constructor(carODM: CarODM) {
    this.carODM = carODM;
  }

  private createCarDomain(car: ICar | null): Car | null {
    if (car) {
      return new Car(car);
    }
    return null;
  }

  public async register(car: ICar) {
    const newCar = await this.carODM.create(car);
    return this.createCarDomain(newCar);
  }

  public async getAll(): Promise<(Car | null)[]> {
    const cars = await this.carODM.findAll();
    const carsFinal = await Promise.all(cars?.map((car) => this.createCarDomain(car)) ?? []);
    return carsFinal;
  }
  
  public async getById(id: string): Promise<Car | null> {
    const regexId = /^[0-9a-fA-F]{24}$/;
    if (!regexId.test(id)) {
      throw new InvalidIdError(INVALID_MONGO_ID);
    }
    const car = await this.carODM.findById(id);
    const carFinal = this.createCarDomain(car);
    if (!carFinal) {
      throw new NotFoundError(CAR_NOT_FOUND);
    }
    return carFinal;
  }

  public async updateById(id: string, car: ICar): Promise<Car | null> {
    const regexId = /^[0-9a-fA-F]{24}$/;
    if (!regexId.test(id)) {
      throw new InvalidIdError(INVALID_MONGO_ID);
    }
    const updatedCar = await this.carODM.updateById(id, car);
    const carFinal = this.createCarDomain(updatedCar);
    if (!carFinal) {
      throw new NotFoundError(CAR_NOT_FOUND);
    }
    return carFinal;
  }

  public async deleteById(id: string): Promise<void> {
    const regexId = /^[0-9a-fA-F]{24}$/;
    if (!regexId.test(id)) {
      throw new InvalidIdError(INVALID_MONGO_ID);
    }
    const deletedCar = await this.carODM.deleteById(id);
    const carFinal = this.createCarDomain(deletedCar);
    if (!carFinal) {
      throw new NotFoundError(CAR_NOT_FOUND);
    }
  }
}
