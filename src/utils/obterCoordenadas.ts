// Função que recebe um CEP e retorna as coordenadas (latitude/longitude)
import axios from 'axios';
import logger from './logger';

export const obterCoordenadasPorCep = async (cep: string): Promise<{ latitude: number; longitude: number } | null> => {
    try {
        // requisição à API ViaCEP para validar o CEP e obter o endereço
        const viaCepResponse = await axios.get(`https://viacep.com.br/ws/${cep}/json/`);

        if (viaCepResponse.data.erro) {
            logger.error(`CEP inválido: ${cep}`);
            return null;
        }

        // Caso o CEP seja válido, extraímos o logradouro, localidade e uf do retorno
        const { logradouro, localidade, uf } = viaCepResponse.data;
        logger.info(`Endereço obtido via ViaCEP: ${logradouro}, ${localidade}, ${uf}`);

        // requisição Nominatim para obter as coordenadas baseadas no endereço
        const response = await axios.get(`https://nominatim.openstreetmap.org/search`, {
            params: {
                postalcode: cep,
                country: 'Brazil',
                format: 'json',
                limit: 1
            }
        });

        const data = response.data;

        if (data.length === 0) {
            logger.error(`Coordenadas não encontradas para o CEP ${cep}`);
            return null;
        }

        const { lat, lon } = data[0];
        return { latitude: parseFloat(lat), longitude: parseFloat(lon) };
    } catch (error) {
        logger.error(`Erro ao buscar coordenadas para o CEP ${cep}: ${error}`);
        return null;
    }
};