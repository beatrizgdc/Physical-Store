//Configuração e inicialização do servidor
import express from 'express';
import { connectDB } from './config/db';
import logger from './utils/logger';

const app = express();
const port = 4000;

connectDB();


app.listen(port, () => {
  logger.info(`Servidor rodando na porta ${port}`);
});