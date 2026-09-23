import { Router } from 'express';
import * as InvoiceController from '../controllers/invoice.controller.ts';
import validate from '../middlewares/validate.ts';
import {
	createInvoiceSchema,
	updateInvoiceSchema
} from '../schemas/invoice.schema.ts';

const router = Router();

router.get('/', InvoiceController.getAllInvoice);
router.get('/:id', InvoiceController.getInvoiceById);
router.post(
	'/',
	validate(createInvoiceSchema),
	InvoiceController.updateInvoice
);
router.delete('/:id', InvoiceController.deleteInvoice);
export default router;
