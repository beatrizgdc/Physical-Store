//Lógica das lojas (cálculo da distância, listagem de todas lojas, pesquisa por ID, delete loja, criação de loja, update de loja)
import { Request, Response } from 'express';
import Loja from '../models/lojaModels';
import { obterCoordenadasPorCep } from '../utils/obterCoordenadas';
import { calcularDistancia } from '../utils/distance';
import logger from '../utils/logger';
import axios from 'axios';

// Função para buscar lojas próximas de um CEP fornecido
export const buscarLojasProximas = async (req: Request, res: Response) => {
    const { cep } = req.body;  
    
    try {
        const coordenadasUsuario = await obterCoordenadasPorCep(cep);
        if (!coordenadasUsuario) {
            logger.error(`CEP inválido: ${cep}`);
            return res.status(404).json({ message: 'CEP inválido ou não encontrado.' });
        }

        const { latitude: latUsuario, longitude: lonUsuario } = coordenadasUsuario;

        // Registrar a requisição do usuário
        logger.info({
            message: 'Requisição de busca por lojas',
            cepUsuario: cep,
            coordenadasUsuario,
            timestamp: new Date().toISOString()
        });

        const lojas = await Loja.find();
        const lojasComDistancia = [];

        for (const loja of lojas) {
            const coordenadasLoja = await obterCoordenadasPorCep(loja.endereco.CEP);
            if (coordenadasLoja) {
                const { latitude: latLoja, longitude: lonLoja } = coordenadasLoja;
                const distancia = calcularDistancia(latUsuario, lonUsuario, latLoja, lonLoja);

                if (distancia <= 100) {
                    lojasComDistancia.push({ loja, distancia });
                }
            }
        }

        // Ordenar as lojas pela distância (mais próxima primeiro)
        lojasComDistancia.sort((a, b) => a.distancia - b.distancia);

        // Retornar as lojas mais próximas ou mensagem informativa
        if (lojasComDistancia.length > 0) {
            res.json(lojasComDistancia.map(ld => ({ loja: ld.loja, distancia: ld.distancia })));
        } else {
            res.status(404).json({ message: 'Nenhuma loja encontrada em um raio de 100km.' });
        }
    } catch (error) {
        logger.error(`Erro ao buscar lojas: ${error}`);
        res.status(500).json({ message: 'Erro no servidor ao buscar lojas.' });
    }
};


// Função para ver todas as lojas
export const getLojas = async (req: Request, res: Response) => {
    try {
        const lojas = await Loja.find(); 
        res.status(200).json(lojas); 
    } catch (error: any) {
        res.status(500).json({ message: error.message });
    }
};

// Função para obter uma loja específica
export const getLoja = async (req: Request, res: Response) => {
    const { id } = req.params;

    try {
        const loja = await Loja.findById(id);
        if (!loja) {
            return res.status(404).json({ message: 'Loja não encontrada' });
        }
        res.status(200).json(loja);
    } catch (error) {
        logger.error('Erro ao obter loja:', error);
        res.status(500).json({ message: 'Erro ao obter loja'});
    }
};

// Função para criar uma loja
export const createLoja = async (req: Request, res: Response) => {
    const { nome, endereco } = req.body; 
    const { cep, numero } = endereco;

    try {
        // Verificar se o CEP é válido e obter o endereço
        const resposta = await axios.get(`https://viacep.com.br/ws/${cep}/json/`);

        if (resposta.data.erro) {
            return res.status(400).json({ message: 'CEP inválido.' });
        }

        const enderecoCompleto = {
            rua: resposta.data.logradouro,
            cidade: resposta.data.localidade,
            estado: resposta.data.uf,
            CEP: resposta.data.cep,
            numero: numero, // Número fornecido pelo usuário
        };

        const novaLoja = new Loja({
            nome: req.body.nome, 
            endereco: enderecoCompleto,   
        });

        await novaLoja.save();
        res.status(201).json(novaLoja);
    } catch (error: any) {
        logger.error(`Erro ao criar loja: ${error.message}`);
        res.status(400).json({ message: error.message });
    }
};

//Remove loja
export const deleteLoja = async (req: Request, res: Response) => {
    const { id } = req.params;

    try {
        const lojaDeletada = await Loja.findByIdAndDelete(id);

        if (!lojaDeletada) {
            return res.status(404).json({ message: 'Loja não encontrada' });
        }

        return res.status(200).json({ message: 'Loja deletada com sucesso', loja: lojaDeletada });
    } catch (error) {
        return res.status(500).json({ message: 'Erro ao deletar a loja', error });
    }
};

// Editar Loja
export const editLoja = async (req: Request, res: Response) => {
    const { id } = req.params;
    const { nome, endereco } = req.body;

    try {
        const loja = await Loja.findById(id);
        if (!loja) {
            return res.status(404).json({ message: 'Loja não encontrada.' });
        }

        // Atualiza os campos
        loja.nome = nome || loja.nome;
        loja.endereco = {
            rua: endereco.rua || loja.endereco.rua,
            numero: endereco.numero || loja.endereco.numero,
            cidade: endereco.cidade || loja.endereco.cidade,
            estado: endereco.estado || loja.endereco.estado,
            CEP: endereco.CEP || loja.endereco.CEP,
        };

        await loja.save(); // Salvar a loja atualizada
        res.status(200).json({ message: 'Loja atualizada com sucesso!', loja });

    } catch (error) {
        logger.error(error);
        res.status(500).json({ message: 'Erro ao atualizar a loja.' });
    }
};