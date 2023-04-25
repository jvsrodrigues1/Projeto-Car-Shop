import express from 'express';
import ErrorH from './Middlewares/HandleErrors';
import routes from './Routes/Routes';

const app = express();

app.use(express.json());

app.use(routes);
app.use(ErrorH.handle);

export default app;
