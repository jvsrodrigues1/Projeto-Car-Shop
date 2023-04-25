import { Model, Schema, model, models } from 'mongoose';

export default abstract class AbstractODM<T> {
  readonly model: Model<T>;
  private schema: Schema<T>;

  constructor(schema: Schema<T>, modelName: string) {
    this.schema = schema;
    this.model = models[modelName] || model(modelName, this.schema);
  }

  public async create(obj: T): Promise<T> {
    return this.model.create({ ...obj });
  }

  public async findAll(): Promise<T[] | null> {
    return this.model.find({});
  }

  public async findById(id: string): Promise<T | null> {
    return this.model.findById(id);
  }

  public async updateById(id: string, obj: Partial<T>):
  Promise<T | null> {
    return this.model.findByIdAndUpdate(
      { _id: id },
      obj,
      { new: true },
    );
  }

  public async deleteById(id: string): Promise<T | null> {
    return this.model.findByIdAndDelete(id);
  }
}
