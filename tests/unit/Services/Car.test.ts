import { expect } from 'chai';
import { Model } from 'mongoose';
import Sinon from 'sinon';
import CarService from '../../../src/Services/CarServices';
import CarODM from '../../../src/Models/CarModel';
import ICar from '../../../src/Interfaces/ICar';
import Car from '../../../src/Domains/Car';

describe('Testes na camad Service', function () {
  it('Verifica se um carro e criado com sucesso', async function () {
    const carInput: ICar = {
      model: 'HB20',
      year: 2020,
      color: 'White',
      status: true,
      buyValue: 55990,
      doorsQty: 4,
      seatsQty: 5,
    };
    const carOutput: Car = new Car({
      id: '6348513f34c397abcad040b2',
      model: 'HB20',
      year: 2020,
      color: 'White',
      status: true,
      buyValue: 55990,
      doorsQty: 4,
      seatsQty: 5,
    });
    Sinon.stub(Model, 'create').resolves(carOutput);

    const service = new CarService(new CarODM());
    const result = await service.register(carInput);

    expect(result).to.be.deep.equal(carOutput);
  });

  it('Verifica se um carro não é criado faltado o elemento ID', async function () {
    const carInput: ICar = {
      model: 'HB20',
      year: 2020,
      color: 'White',
      status: true,
      buyValue: 55990,
      doorsQty: 4,
      seatsQty: 5,
    };

    Sinon.stub(Model, 'create').resolves(null);

    const service = new CarService(new CarODM());
    const result = await service.register(carInput);

    expect(result).to.be.deep.equal(null);
  });

  it('Verifica a busca por carros', async function () {
    const carsOutput: ICar[] = [
      {
        id: '634852326b35b59438fbea2f',
        model: 'Marea',
        year: 2002,
        color: 'Black',
        status: true,
        buyValue: 15.99,
        doorsQty: 4,
        seatsQty: 5,
      },
      {
        id: '634852326b35b59438fbea31',
        model: 'Tempra',
        year: 1995,
        color: 'Black',
        status: true,
        buyValue: 39,
        doorsQty: 2,
        seatsQty: 5,
      },
    ];
    Sinon.stub(Model, 'find').resolves(carsOutput);

    const service = new CarService(new CarODM());
    const result = await service.getAll();

    expect(result).to.be.deep.equal(carsOutput);
  });

  it('Verifica se a busca encontra um carro usando um ID válido', async function () {
    const carOutput: Car = new Car({
      id: '63319d80feb9f483ee823ac5',
      model: 'HB20',
      year: 2020,
      color: 'White',
      status: true,
      buyValue: 55990,
      doorsQty: 4,
      seatsQty: 5,
    });
    Sinon.stub(Model, 'findById').resolves(carOutput);
  
    const service = new CarService(new CarODM());
    const result = await service.getById('63319d80feb9f483ee823ac5');
  
    expect(result).to.be.deep.equal(carOutput);
  });

  it('Verifica erro na busca de um carro com ID inválido', async function () {
    try {
      const service = new CarService(new CarODM());
      await service.getById('634852326b35b59438');
    } catch (error) {
      expect((error as Error).message).to.be.equal('Invalid mongo id');
    }
  });

  it('Verifica a busca por um carro com ID nulo', async function () {
    Sinon.stub(Model, 'findOne').resolves(null);

    try {
      const service = new CarService(new CarODM());
      await service.getById('634852326b35b59438fbea3f');
    } catch (error) {
      expect((error as Error).message).to.be.equal('Car not found');
    }
  });

  it('Verifica a atualização dos dados de um carro com ID válido', async function () {
    const carInput: ICar = {
      model: 'Marea',
      year: 2002,
      color: 'Black',
      status: true,
      buyValue: 15.990,
      doorsQty: 4,
      seatsQty: 5,
    };
    const carOutput: Car = new Car({
      id: '634852326b35b59438fbea2f',
      model: 'Marea',
      year: 2002,
      color: 'Black',
      status: true,
      buyValue: 15.99,
      doorsQty: 4,
      seatsQty: 5,
    });
    Sinon.stub(Model, 'findByIdAndUpdate').resolves(carOutput);
  
    const service = new CarService(new CarODM());
    const result = await service.updateById('6348513f34c397abcad040b2', carInput);
  
    expect(result).to.be.deep.equal(carOutput);
  });

  it('Verifica erro ao tentar atualizar um carro com ID inválido', async function () {
    const carInput: ICar = {
      model: 'HB20',
      year: 2020,
      color: 'White',
      status: true,
      buyValue: 55990,
      doorsQty: 4,
      seatsQty: 5,
    };
    try {
      const service = new CarService(new CarODM());
      await service.updateById('634852326b35b59438', carInput);
    } catch (error) {
      expect((error as Error).message).to.be.equal('Invalid mongo id');
    }
  });

  it('Verifica um erro ao tentar atualizar um carro com ID nulo', async function () {
    const carInput: ICar = {
      model: 'HB20',
      year: 2020,
      color: 'White',
      status: true,
      buyValue: 55990,
      doorsQty: 4,
      seatsQty: 5,
    };
    Sinon.stub(Model, 'findByIdAndUpdate').resolves(null);

    try {
      const service = new CarService(new CarODM());
      await service.updateById('634852326b35b59438fbea3f', carInput);
    } catch (error) {
      expect((error as Error).message).to.be.equal('Car not found');
    }
  });

  afterEach(function () {
    Sinon.restore();
  });
});
