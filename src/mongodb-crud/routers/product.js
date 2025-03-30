import express from 'express'
import { addProducts, deleteProducts, getProducts, getProductsById, updateProducts } from '../controllers/product.js';

const router = express.Router();

router.get('/',getProducts);


router.get('/:id', getProductsById);
router.post('/',addProducts);
router.put('/:id',updateProducts);
router.delete('/:id',deleteProducts);

export default router;