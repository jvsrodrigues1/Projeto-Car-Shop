import express from 'express';
import routes from './Routes/Route';
import ErrorHandler from './Middlewares/HandleErros';

const app = express();

app.use(routes);
app.use(ErrorHandler.handle);

export default app;
