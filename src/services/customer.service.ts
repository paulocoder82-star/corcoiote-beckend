import { NotFoundError } from '../errors/index.ts';
import prisma from '../lib/prisma.ts';
import { customers } from '../mocks/customer.mock.ts';
import type {
	CreateCustomer,
	UpdateCustomer
} from '../schemas/customer.schema.ts';
import type { Customer } from '../types.ts';

export async function findAllCustomers(): Promise<Customer[]> {
	const customers = await prisma.customer.findMany();
	return customers;
}

export async function findCustomerById(id: number): Promise<Customer> {
	const customer = await prisma.customer.findUnique({
		where: { id }
	});

	if (!customer) {
		throw new NotFoundError(`Cliente com id ${id} não encontrado.`);
	}

	return customer;
}

export async function insertCustomer({
	name,
	email,
	imageUrl
}: CreateCustomer): Promise<Customer> {
	const customer = await prisma.customer.create({
		data: {
			name,
			email,
			imageUrl
		}
	});

	return customer;
}

export async function modifyCustomer(
	id: number,
	{ name, email, imageUrl }: UpdateCustomer
): Promise<Customer> {
	const findCustomer = await prisma.customer.findUnique({
		where: { id }
	});

	if (!findCustomer) {
		throw new NotFoundError(`Cliente com id ${id} não encontrado.`);
	}

	const customer = await prisma.customer.update({
		where: { id },
		data: { name, email, imageUrl }
	});

	return customer;
}

export async function removeCustomer(id: number): Promise<void> {
	const findCustomer = await prisma.customer.findUnique({
		where: { id }
	});

	if (!findCustomer) {
		throw new NotFoundError(`Cliente com id ${id} não encontrado.`);
	}

	await prisma.customer.delete({
		where: { id }
	});
}
