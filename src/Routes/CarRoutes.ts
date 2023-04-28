import { Router } from 'express';
import CarController from '../Controllers/CarController';

const carRoutes: Router = Router();

carRoutes.put(
  '/cars/:id',
  (req, res, next) => new CarController(req, res, next).updateById(),
);

carRoutes.post(
  '/cars',
  (req, res, next) => new CarController(req, res, next).register(),
);

carRoutes.get(
  '/cars',
  (req, res, next) => new CarController(req, res, next).getAll(),
);

carRoutes.get(
  '/cars/:id',
  (req, res, next) => new CarController(req, res, next).getById(),
);

carRoutes.delete(
  '/cars/:id',
  (req, res, next) => new CarController(req, res, next).deleteById(),
);

export default carRoutes;
