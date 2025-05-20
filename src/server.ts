import express from 'express';
import AuthRoutes from './infra/web/express/routes/AuthRoutes';


const app = express();
app.use(express.json());

app.use('/', AuthRoutes);


app.listen(3000, () => console.log('Server running on port 3000'));
