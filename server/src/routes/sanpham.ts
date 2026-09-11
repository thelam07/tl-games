import { Router } from 'express';
import { supabase } from '../lib/supabase.js';

export const sanPhamRouter = Router();

sanPhamRouter.get('/:id', async (req, res) => {
  const id = req.params.id;

  const { data, error } = await supabase
    .from('san_pham')
    .select('*')
    .eq('id', id)
    .single();

  if (!data) {
    res.status(404).json('Khong tim thay san pham');
    return;
  }
  if (error) {
    res.status(500).send('Error');
  } else {
    res.json(data);
  }
});