// Modelo da loja
import mongoose, { Schema, Document } from 'mongoose';

export interface Loja extends Document {
  nome: string;
  endereco: {
    rua: string;
    numero: string;
    cidade: string;
    estado: string;
    CEP: string;
  };
  distancia?: number; 
}

// esquema da loja
const SchemaLoja: Schema = new Schema({
  nome: { 
    type: String, 
    required: true 
  },
  endereco: {
    rua: { 
      type: String, 
      required: true 
    },
    numero: { 
      type: String, 
      required: true 
    },
    cidade: { 
      type: String, 
      required: true 
    },
    estado: { 
      type: String, 
      required: true 
    },
    CEP: { 
      type: String, 
      required: true 
    }
  },
  distancia: {
    type: Number, 
    default: null 
  }
});

export default mongoose.model<Loja>('Loja', SchemaLoja);