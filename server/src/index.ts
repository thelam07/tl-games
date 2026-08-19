import express from 'express';
import cors from 'cors';
import { env } from './lib/env';
import { authRouter } from './routes/auth';
import { productsRouter } from './routes/products';
import { categoriesRouter } from './routes/categories';
import { ordersRouter } from './routes/orders';
import { notFound, errorHandler } from './middleware/error';

const app = express();

app.use(cors({ origin: env.CLIENT_ORIGIN.split(',') }));
app.use(express.json());

// Kiem tra server song chua (Render dung de health check)
app.get('/api/health', (_req, res) => res.json({ ok: true }));

app.use('/api/auth', authRouter);
app.use('/api/products', productsRouter);
app.use('/api/categories', categoriesRouter);
app.use('/api/orders', ordersRouter);

app.use(notFound);
app.use(errorHandler);

app.listen(env.PORT, () => {
  console.log(`🚀 Server chay tai http://localhost:${env.PORT}`);
});
