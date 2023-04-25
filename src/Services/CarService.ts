import Car from '../Domains/Car';
import ICar from '../Interfaces/ICar';
import CarODM from '../Models/CarModel';
import NotFound from '../errors/NotFound';
import IdInvalid from '../errors/IdInvalid';

const CAR_404 = 'Car not found';
const INVALID_MONGO_ID = 'Invalid mongo id';

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
    const allCarsFinal = await Promise.all(cars?.map((car) => this.createCarDomain(car)) ?? []);
    return allCarsFinal;
  }
  
  public async getById(id: string): Promise<Car | null> {
    const regexId = /^[0-9a-fA-F]{24}$/;
    if (!regexId.test(id)) {
      throw new IdInvalid(INVALID_MONGO_ID);
    }
    const car = await this.carODM.findById(id);
    const currentCar = this.createCarDomain(car);
    if (!currentCar) {
      throw new NotFound(CAR_404);
    }
    return currentCar;
  }

  public async updateById(id: string, car: ICar): Promise<Car | null> {
    const regexId = /^[0-9a-fA-F]{24}$/;
    if (!regexId.test(id)) {
      throw new IdInvalid(INVALID_MONGO_ID);
    }
    const updatedCar = await this.carODM.updateById(id, car);
    const currentCar = this.createCarDomain(updatedCar);
    if (!currentCar) {
      throw new NotFound(CAR_404);
    }
    return currentCar;
  }

  public async deleteById(id: string): Promise<void> {
    const regexId = /^[0-9a-fA-F]{24}$/;
    if (!regexId.test(id)) {
      throw new IdInvalid(INVALID_MONGO_ID);
    }
    const deletedCar = await this.carODM.deleteById(id);
    const currentCar = this.createCarDomain(deletedCar);
    if (!currentCar) {
      throw new NotFound(CAR_404);
    }
  }
}
