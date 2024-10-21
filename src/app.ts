//Configuração e inicialização do servidor
import express from 'express';
import { connectDB } from './config/db';

const app = express();
const port = 4000;

connectDB();


app.listen(port, () => {
  console.log(`Servidor rodando na porta ${port}`);
});