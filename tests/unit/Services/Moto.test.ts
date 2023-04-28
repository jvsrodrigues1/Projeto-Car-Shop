import { expect } from 'chai';
import { Model } from 'mongoose';
import Sinon from 'sinon';
import IMotorcycle from '../../../src/Interfaces/IMotorcycle';
import Motorcycle from '../../../src/Domains/Motorcycle';
import MotorcycleService from '../../../src/Services/MotorcycleService';
import MotorcycleODM from '../../../src/Models/MotoModel';

describe('Testes de  na camada MotorcycleService', function () {
  it('Verifica a criacao de uma moto com sucesso', async function () {
    const motorcycleInput: IMotorcycle = {
      model: 'Honda Cb 600f',
      year: 2002,
      color: 'Black',
      status: true,
      buyValue: 15.990,
      category: 'Street',
      engineCapacity: 1000,
    };
    const motorcycleOutput: Motorcycle = new Motorcycle({
      id: '6348513f34c397abcad040b2',
      model: 'Honda Cb 600f',
      year: 2002,
      color: 'Black',
      status: true,
      buyValue: 15.990,
      category: 'Street',
      engineCapacity: 1000,
    });
    Sinon.stub(Model, 'create').resolves(motorcycleOutput);

    const service = new MotorcycleService(new MotorcycleODM());
    const result = await service.register(motorcycleInput);

    expect(result).to.be.deep.equal(motorcycleOutput);
  });

  it('Verifica erro na criacao de uma nova moto', async function () {
    const motorcycleInput: IMotorcycle = {
      model: 'Honda',
      year: 2002,
      color: 'Black',
      status: true,
      buyValue: 15.990,
      category: 'Street',
      engineCapacity: 1000,
    };

    Sinon.stub(Model, 'create').resolves(null);

    const service = new MotorcycleService(new MotorcycleODM());
    const result = await service.register(motorcycleInput);

    expect(result).to.be.deep.equal(null);
  });

  it('Verifica sistema de busca das motos', async function () {
    const motorcyclesOutput: IMotorcycle[] = [
      {
        id: '634852326b35b59438fbea2f',
        model: 'Hornet',
        year: 2005,
        color: 'Yellow',
        status: true,
        buyValue: 30.000,
        category: 'Street',
        engineCapacity: 600,
      },
      {
        id: '634852326b35b59438fbea31',
        model: 'Honda Cbr 1000rr',
        year: 2011,
        color: 'Orange',
        status: true,
        buyValue: 59.900,
        category: 'Street',
        engineCapacity: 1000,
      },
    ];
    Sinon.stub(Model, 'find').resolves(motorcyclesOutput);

    const service = new MotorcycleService(new MotorcycleODM());
    const result = await service.getAll();

    expect(result).to.be.deep.equal(motorcyclesOutput);
  });

  it('Verifica busca de uma moto com ID Válido', async function () {
    const motorcycleOutput: Motorcycle = new Motorcycle({
      id: '6348513f34c397abcad040b2',
      model: 'Honda Cb 600f Hornet',
      year: 2002,
      color: 'Black',
      status: true,
      buyValue: 15.990,
      category: 'Street',
      engineCapacity: 1000,
    });
    Sinon.stub(Model, 'findById').resolves(motorcycleOutput);
  
    const service = new MotorcycleService(new MotorcycleODM());
    const result = await service.getById('6348513f34c397abcad040b2');
  
    expect(result).to.be.deep.equal(motorcycleOutput);
  });

  it('Verifica busca de uma moto com ID inválido', async function () {
    try {
      const service = new MotorcycleService(new MotorcycleODM());
      await service.getById('634852326b35b59sas438');
    } catch (error) {
      expect((error as Error).message).to.be.equal('Invalid mongo id');
    }
  });

  afterEach(function () {
    Sinon.restore();
  });
});
