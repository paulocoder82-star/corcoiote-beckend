import { z } from 'zod';

export const createCustomerSchema = z.object({
	name: z
		.string('Entrada inválida: esperava-se um texto.')
		.min(
			1,
			'Muito curto: esperava-se um texto com pelo menos 1 caractere.'
		),
	email: z.email('Endereço de e-mail inválido.'),
	imageUrl: z.url().optional()
});

export const updateCustomerSchema = z.object({
	name: z
		.string('Entrada inválida: esperava-se um texto')
		.min(1, 'Muito curto: esperava-se um texto com pelo menos 1 caractere.')
		.optional(),
	email: z.email('Endereço de e-mail inválido.').optional(),
	imageUrl: z.url().optional()
});

export type CreateCustomer = z.infer<typeof createCustomerSchema>;
export type UpdateCustomer = z.infer<typeof updateCustomerSchema>;
