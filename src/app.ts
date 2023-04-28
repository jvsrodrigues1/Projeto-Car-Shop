import express from 'express';
import ErrorH from './Middlewares/HandleErrors';
import carRoutes from './Routes/CarRoutes';
import motoRoute from './Routes/MotorRoutes';
// push das estrelas!!!@

const app = express();

app.use(express.json());

app.use('/', carRoutes);
app.use('/', motoRoute);
app.use(ErrorH.handle);

export default app;
