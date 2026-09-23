import type { Request, Response } from 'express';
import type {
	CreateInvoice,
	UpdateInvoice
} from '../schemas/invoice.schema.ts';
import * as InvoiceService from '../services/invoice.service.ts';
import type { Invoice } from '../types.ts';

export function getAllInvoice(request: Request, response: Response) {
	const page = Number(request.query.page) || 1;

	const invoices = InvoiceService.findAllInvoices(page);

	response.status(200).json(invoices);
}

export function getInvoiceById(request: Request, response: Response) {
	const id = +request.params.id;

	const invoice = InvoiceService.findInvoiceById(id);

	response.status(200).json(invoice);
}

export function createInvoice(request: Request, response: Response) {
	const datas = request.body as CreateInvoice;
	const invoice = InvoiceService.insertInvoice(datas);
	response.status(201).json(invoice);
}

export function updateInvoice(request: Request, response: Response) {
	const id = +request.params.id;
	const datas = request.body as UpdateInvoice;

	const invoice = InvoiceService.modifyInvoice(id, datas);
	response.status(200).json(invoice);
}

export function deleteInvoice(request: Request, response: Response) {
	const id = Number(request.params.id);
	response.status(204).send();
}
