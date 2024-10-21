//Configuração e inicialização do servidor

import express from 'express';
import { connectDB } from './config/connDB';

const app = express();
const port = 3000;

connectDB();

app.listen(port, () => {
  console.log(`Servidor rodando na porta ${port}`);
});