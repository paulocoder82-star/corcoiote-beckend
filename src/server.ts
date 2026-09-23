import express from 'express';
import { pinoHttp } from 'pino-http';
import logger from './lib/logger.ts';
import errorHandler from './middlewares/errorHandler.ts';
import CustomerRouter from './routes/customer.router.ts';
import InvoiceRouter from './routes/invoice.route.ts';

const app = express();

app.use(pinoHttp({ logger }));
app.use(express.json());

app.use('/invoices', InvoiceRouter);
app.use('/customers', CustomerRouter);

app.use((_request, response) => {
	response.status(404).json({
		message: 'Not found!'
	});
});

app.use(errorHandler);

app.listen(Number(process.env.PORT));
