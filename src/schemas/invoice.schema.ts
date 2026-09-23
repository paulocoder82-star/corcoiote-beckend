import { z } from 'zod';

export const createInvoiceSchema = z.object({
	amount: z
		.number('Entrada inválida: esperava-se um número.')
		.positive('Entrada inválida: espera-se um número.'),
	customerId: z.number().positive(),
	status: z.enum(['PEDING', 'PAID']),
	date: z.coerce.date('Data inválida.')
});

export const updateInvoiceSchema = z.object({
	amount: z
		.number('Entrada inválida : esperava-se um número.')
		.positive('O valor deve ser maior   ue zero.')
		.optional(),
	customerId: z.number().positive(),
	status: z.enum(['PEDING', 'PAID']).optional(),
	date: z.coerce.date('Data inválida').optional()
});

export type CreateInvoice = z.infer<typeof createInvoiceSchema>;
export type UpdateInvoice = z.infer<typeof updateInvoiceSchema>;
