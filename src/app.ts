//Configuração e inicialização do servidor
import express from 'express';
import { connectDB } from './config/db';
import router from './routes/lojaRoutes';
import logger from './utils/logger';

const app = express();
const port = 3000;

connectDB();

// Middleware para analisar JSON
app.use(express.json());

// rotas de lojas
app.use('/api/lojas', router);

app.listen(port, () => {
  logger.info(`Servidor rodando na porta ${port}`);
});