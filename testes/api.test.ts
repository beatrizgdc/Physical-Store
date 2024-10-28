import request from 'supertest';
import { connectDB, disconnectDB } from '../src/config/db';
import app from '../src/app'; 

let server: any;

describe('API Lojas', () => {
     // Conectar ao banco de dados antes de todos os testes
     beforeAll(async () => {
        await connectDB();  
    });

    // Desconectar do banco de dados após todos os testes
    afterAll(async () => {
        await disconnectDB();  
    });


    // Teste para buscar lojas próximas


    // Teste para listar todas as lojas
    it('GET /lojas deve retornar todas as lojas', async () => {
        const response = await request(app).get('/api/lojas');

        expect(response.status).toBe(200);
        expect(response.body).toBeInstanceOf(Array);
        expect(response.body.length).toBeGreaterThan(0);
    });

    // Teste para obter uma loja por ID
    it('GET /lojas/:id deve retornar a loja correta', async () => {
        const lojaId = '671a2f007efb4c5e4871e922';
        const response = await request(app).get(`/api/lojas/${lojaId}`);

        expect(response.status).toBe(200);
        expect(response.body).toHaveProperty('_id', lojaId);
    });

    // Teste para criar uma nova loja


    // Teste para atualizar uma loja


    // Teste para deletar uma loja
    it('DELETE /lojas/:id deve deletar a loja correta', async () => {
        const lojaId = '671549e8536ff171adeafa41';

        const response = await request(app).delete(`/api/lojas/${lojaId}`);

        expect(response.status).toBe(200);
        expect(response.body.message).toBe('Loja deletada com sucesso');
    });
});
