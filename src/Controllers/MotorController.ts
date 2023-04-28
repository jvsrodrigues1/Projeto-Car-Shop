import { NextFunction, Request, Response } from 'express';
import IMotorcycle from '../Interfaces/IMotorcycle';
import MotorcycleService from '../Services/MotorcycleService';
import MotorcycleODM from '../Models/MotoModel';

export default class MotorcycleController {
  private req: Request;
  private res: Response;
  private next: NextFunction;
  private service: MotorcycleService;

  constructor(req: Request, res: Response, next: NextFunction) {
    this.req = req;
    this.res = res;
    this.next = next;
    this.service = new MotorcycleService(new MotorcycleODM());
  }

  public async register() {
    const motorcycle: IMotorcycle = {
      model: this.req.body.model,
      year: this.req.body.year,
      color: this.req.body.color,
      status: this.req.body.status || false,
      buyValue: this.req.body.buyValue,
      category: this.req.body.category,
      engineCapacity: this.req.body.engineCapacity,
    };

    try {
      const newMotorcycle = await this.service.register(motorcycle);
      return this.res.status(201).json(newMotorcycle);
    } catch (error) {
      this.next(error);
    }
  }

  public async getAll(): Promise<Response> {
    const motorcycles = await this.service.getAll();
    return this.res.status(200).json(motorcycles);
  }

  public async getById() {
    try {
      const { id } = this.req.params;
      const motorcycle = await this.service.getById(id);
      return this.res.status(200).json(motorcycle);
    } catch (error) {
      this.next(error);
    }
  }

  public async updateById() {
    try {
      const { id } = this.req.params;
      const motorcycle = this.req.body;
      const updatedMotorcycle = await this.service.updateById(id, motorcycle);
      return this.res.status(200).json(updatedMotorcycle);
    } catch (error) {
      this.next(error);
    }
  }

  public async deleteById() {
    try {
      const { id } = this.req.params;
      await this.service.deleteById(id);
      return this.res.status(204).end();
    } catch (error) {
      this.next(error);
    }
  }
}
