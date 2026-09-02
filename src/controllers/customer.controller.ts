import type { Request, Response } from 'express';
import type {
	CreateCustomer,
	UpdateCustomer
} from '../schemas/customer.schema.ts';
import * as CustomerService from '../services/customer.service.ts';

export function getAllCustomers(_request: Request, response: Response): void {
	const customers = CustomerService.findAllCustomers();

	response.status(200).json(customers);
}

export function getCustomerById(request: Request, response: Response): void {
	const id = Number(request.params.id);

	const customer = CustomerService.findCustomerById(id);

	response.status(200).json(customer);
}

export function createCustomer(request: Request, response: Response): void {
	const { name, email, imageUrl } = request.body as CreateCustomer;

	const customer = CustomerService.insertCustomer({
		name,
		email,
		imageUrl
	});

	response.status(201).json(customer);
}

export function updateCustomer(request: Request, response: Response): void {
	const id = Number(request.params.id);
	const { name, email, imageUrl } = request.body as UpdateCustomer;

	const customer = CustomerService.modifyCustomer(id, {
		name,
		email,
		imageUrl
	});

	response.status(200).json(customer);
}

export function deleteCustomer(request: Request, response: Response): void {
	const id = Number(request.params.id);

	CustomerService.removeCustomer(id);

	response.status(204).send();
}
