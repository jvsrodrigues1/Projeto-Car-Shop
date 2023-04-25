import CarODM from '../Models/CarModel';
import Car from '../Domains/CarD';
import ICar from '../Interfaces/ICars';
import NotFound from '../errors/NotFound';
import InvalidId from '../errors/IdInvalid';

const MONGO_INVALID_ID = 'Invalid mongo id';
const CAR_404 = 'Car not found';

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
    const AllCarsFinal = await Promise.all(cars?.map((car) => this.createCarDomain(car)) ?? []);
    return AllCarsFinal;
  }
  
  public async getById(id: string): Promise<Car | null> {
    const regexId = /^[0-9a-fA-F]{24}$/;
    if (!regexId.test(id)) {
      throw new InvalidId(MONGO_INVALID_ID);
    }
    const car = await this.carODM.findById(id);
    const OneCarFinal = this.createCarDomain(car);
    if (!OneCarFinal) {
      throw new NotFound(CAR_404);
    }
    return OneCarFinal;
  }

  public async updateById(id: string, car: ICar): Promise<Car | null> {
    const regexId = /^[0-9a-fA-F]{24}$/;
    if (!regexId.test(id)) {
      throw new InvalidId(MONGO_INVALID_ID);
    }
    const updatedCar = await this.carODM.updateById(id, car);
    const OneCarFinal = this.createCarDomain(updatedCar);
    if (!OneCarFinal) {
      throw new NotFound(CAR_404);
    }
    return OneCarFinal;
  }

  public async deleteById(id: string): Promise<void> {
    const regexId = /^[0-9a-fA-F]{24}$/;
    if (!regexId.test(id)) {
      throw new InvalidId(MONGO_INVALID_ID);
    }
    const deletedCar = await this.carODM.deleteById(id);
    const OneCarFinal = this.createCarDomain(deletedCar);
    if (!OneCarFinal) {
      throw new NotFound(CAR_404);
    }
  }
}
