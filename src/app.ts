import express from 'express';
import ErrorH from './Middlewares/HandleErrors';
import carRoutes from './Routes/CarRoutes';
// push das estrelas!!!

const app = express();

app.use(express.json());

app.use('/', carRoutes);
app.use(ErrorH.handle);

export default app;
