export type Customer = {
	id: number;
	name: string;
	email: string;
	imageUrl: string | null;
};

type InvoiceStatus = 'PENDING' | 'PAID';

export type Invoice = {
	id: number;
	amount: number;
	status: InvoiceStatus;
	date: Date;
	customerId: number;
	createAt: Date;
};

export type ValidationFieldError = {
	field: string;
	message: string;
};
