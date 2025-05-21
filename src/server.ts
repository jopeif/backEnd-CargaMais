import express from 'express';
import AuthRoutes from './infra/web/express/routes/AuthRoutes';
import PersonRoutes from './infra/web/express/routes/PersonTestsRoutes'
import dotenv from 'dotenv';
dotenv.config();


const app = express();
app.use(express.json());


app.use('/', AuthRoutes);
app.use('/person', PersonRoutes)


app.listen(process.env.PORT, () => console.log('Server running on port 3000'));
