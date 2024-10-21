//Conexão com o MongoDB
import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

const mongoURI = process.env.MONGO_URI;

export const connectDB = async () => {
    try {
        await mongoose.connect(mongoURI!);
        console.log('Conexão com Banco de Dados bem sucedida!');
    } catch (err) {
        console.log('Erro conexão Banco de Dados:', err);
    }
};
