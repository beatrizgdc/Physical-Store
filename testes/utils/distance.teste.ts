// Função para calcular a distância entre dois pontos (fórmula de Haversine)
import { calcularDistancia } from '../../src/utils/distance';

describe('Função calcularDistancia', () => {
    it('deve calcular a distância corretamente entre dois pontos', () => {
        const lat1 = -23.55052; // São Paulo
        const lon1 = -46.633308;
        const lat2 = -22.906846; // Rio de Janeiro
        const lon2 = -43.172896;

        const distancia = calcularDistancia(lat1, lon1, lat2, lon2);
        expect(distancia).toBeCloseTo(357, 0);
    });
});

