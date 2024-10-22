//Lógica das lojas (cálculo da distância, listagem de todas lojas, pesquisa por ID, delete loja, criação de loja, update de loja)
import { Request, Response } from 'express';
import Loja from '../models/lojaModels';
import logger from '../utils/logger';
import axios from 'axios';

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