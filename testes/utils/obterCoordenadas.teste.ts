import axios from 'axios';
import { obterCoordenadasPorCep } from '../../src/utils/obterCoordenadas';
import logger from '../../src/utils/logger';

// Mock axios para simular chamadas de API
jest.mock('axios');

describe('Função obterCoordenadasPorCep', () => {
    afterEach(() => {
        jest.clearAllMocks(); // Limpar mocks após cada teste
    });

    it('deve retornar as coordenadas para um CEP válido', async () => {
        // Mock para a resposta da ViaCEP
        (axios.get as jest.Mock).mockResolvedValueOnce({
            data: {
                logradouro: 'Rua Exemplo',
                localidade: 'São Paulo',
                uf: 'SP',
                erro: false
            }
        });

        // Mock para a resposta do Nominatim
        (axios.get as jest.Mock).mockResolvedValueOnce({
            data: [
                {
                    lat: '-23.550520',
                    lon: '-46.633308'
                }
            ]
        });

        const cep = '01001000';
        const coordenadas = await obterCoordenadasPorCep(cep);

        expect(coordenadas).toEqual({
            latitude: -23.55052,
            longitude: -46.633308
        });
        expect(logger.info).toHaveBeenCalledWith(expect.stringContaining('Endereço obtido via ViaCEP'));
    });

    it('deve retornar null para um CEP inválido', async () => {
        // Mock para a resposta da ViaCEP indicando erro
        (axios.get as jest.Mock).mockResolvedValueOnce({
            data: {
                erro: true
            }
        });

        const cep = '00000000';
        const coordenadas = await obterCoordenadasPorCep(cep);

        expect(coordenadas).toBeNull();
        expect(logger.error).toHaveBeenCalledWith(expect.stringContaining('CEP inválido'));
    });

    it('deve retornar null se o Nominatim não encontrar coordenadas', async () => {
        // Mock para a resposta da ViaCEP
        (axios.get as jest.Mock).mockResolvedValueOnce({
            data: {
                logradouro: 'Rua Exemplo',
                localidade: 'São Paulo',
                uf: 'SP'
            }
        });

        // Mock para a resposta do Nominatim sem dados
        (axios.get as jest.Mock).mockResolvedValueOnce({
            data: []
        });

        const cep = '01001000';
        const coordenadas = await obterCoordenadasPorCep(cep);

        expect(coordenadas).toBeNull();
        expect(logger.error).toHaveBeenCalledWith(expect.stringContaining('Coordenadas não encontradas'));
    });

    it('deve retornar null se ocorrer um erro na requisição', async () => {
        // Mock para simular um erro de requisição
        (axios.get as jest.Mock).mockRejectedValueOnce(new Error('Erro de rede'));

        const cep = '01001000';
        const coordenadas = await obterCoordenadasPorCep(cep);

        expect(coordenadas).toBeNull();
        expect(logger.error).toHaveBeenCalledWith(expect.stringContaining('Erro ao buscar coordenadas'));
    });
});
