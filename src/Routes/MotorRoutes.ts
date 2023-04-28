import { Router } from 'express';
import MotorcycleController from '../Controllers/MotorController';

const motoRoute: Router = Router();
const LINT_CHATO = '/motorcycles/:id';

motoRoute.post(
  '/motorcycles',
  (req, res, next) => new MotorcycleController(req, res, next).register(),
);

motoRoute.get(
  '/motorcycles',
  (req, res, next) => new MotorcycleController(req, res, next).getAll(),
);
  
motoRoute.get(
  LINT_CHATO,
  (req, res, next) => new MotorcycleController(req, res, next).getById(),
);

motoRoute.put(
  LINT_CHATO,
  (req, res, next) => new MotorcycleController(req, res, next).updateById(),
);

motoRoute.delete(
  '/motorcycles/:id',
  (req, res, next) => new MotorcycleController(req, res, next).deleteById(),
);

export default motoRoute;