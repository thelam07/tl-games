// Diem khoi dong server. Hien tai moi chi co ban nhat de kiem tra chay duoc.
// TODO: cors, express.json, cac router, middleware xu ly loi.

import express from 'express';

const app = express();

app.listen(3000, () => {
  console.log('Server chay tai http://localhost:3000');
});
