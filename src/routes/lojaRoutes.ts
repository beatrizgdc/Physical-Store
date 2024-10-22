// Rotas da API da loja
import { Router } from 'express';
import { getLoja, createLoja, getLojas, deleteLoja, editLoja } from '../controller/lojaController';

const router = Router();

// Rota para obter uma loja
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