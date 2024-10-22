// Rotas da API da loja
import { Router } from 'express';
import { getLoja, createLoja, getLojas, deleteLoja, editLoja, buscarLojasProximas } from '../controller/lojaController';

const router = Router();

// Rota para buscar lojas próximas por CEP
router.post('/buscar-lojas-proximas', buscarLojasProximas);
// Rota para obter uma loja (id)
router.get('/:id', getLoja);
// Rota para obter todas as lojas
router.get('/', getLojas);
// Rota para criar loja
router.post('/', createLoja);
// Rota para deletar loja
router.delete('/:id', deleteLoja);
// Rota para deletar loja
router.put('/:id', editLoja);

export default router;