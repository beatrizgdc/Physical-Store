//Conexão com o MongoDB
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import logger from '../utils/logger';

dotenv.config();

const mongoURI = process.env.MONGO_URI;

export const connectDB = async () => {
    try {
        await mongoose.connect(mongoURI!);
        logger.info('Conexão com Banco de Dados bem sucedida!');
    } catch (err) {
        logger.error('Erro conexão Banco de Dados:', err);
    }
};