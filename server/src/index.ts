// Diem khoi dong server. Hien tai moi chi co ban nhat de kiem tra chay duoc.
// TODO: cors, express.json, cac router, middleware xu ly loi.

import 'dotenv/config';
import express from 'express';
import cors from 'cors'
import { sanPhamRouter } from './routes/sanpham.js';

const app = express();
app.use(cors({ origin: process.env.CLIENT_ORIGIN }));
app.use(express.json());

app.use('/api/san-pham', sanPhamRouter)

app.listen(3000, () => {
  console.log('Server chay tai http://localhost:3000');
});
