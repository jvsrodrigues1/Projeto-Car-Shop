import { Router } from 'express';
import CarController from '../Controllers/CarControllers';

const CARS_ID = '/cars/:id';

const routes = Router();

routes.put(
  CARS_ID,
  (req, res, next) => new CarController(req, res, next).updateById(),
);

routes.post(
  '/cars',
  (req, res, next) => new CarController(req, res, next).register(),
);

routes.get(
  '/cars',
  (req, res, next) => new CarController(req, res, next).getAll(),
);

routes.get(
  CARS_ID,
  (req, res, next) => new CarController(req, res, next).getById(),
);

routes.delete(
  CARS_ID,
  (req, res, next) => new CarController(req, res, next).deleteById(),
);

export default routes;
