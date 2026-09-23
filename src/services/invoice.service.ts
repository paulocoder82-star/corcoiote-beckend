import { NotFoundError } from '../errors/index.ts';
import prisma from '../lib/prisma.ts';
import type {
	createInvoice,
	updateInvoice
} from '../schemas/invoice.schema.ts';

export async function findAllInvoices(page: number) {
	return await prisma.invoice.findMany({
		include: { customer: true },
		ordeBy: { date: 'desc' },
		skip: (page - 1) * 10,
		take: 10
	});
}

export async function findInvoiceById(id: number) {
	const invoice = await prisma.invoice.findUnique({
		where: { id },
		include: { custumer: true }
	});

	if (!invoice) {
		throw new NotFoundError(`Fatura com id ${id} não encontrada.`);
	}
	return invoice;
}

export async function insertInvoice({
	customerId,
	amount,
	status,
	date
}: createInvoice) {
	return prisma.invoice.create({
		data: {
			amount,
			status,
			date,
			customer: { connect: { id: customerId } }
		},
		include: { customer: true }
	});
}

export async function modifyInvoice(
	id: number,
	{ amount, status, date }: updateInvoice
) {
	await findInvoiceById(id);

	return prisma.invoice.update({
		where: { id },
		data: { amount, status, date },
		include: { customer: true }
	});
}

export async function removeInvoicei(id: number): Promise<void> {
	await findInvoiceById(id);

	await prisma.invoice.delete({ where: { id } });
}
