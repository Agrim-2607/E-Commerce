const express = require('express');
const router = express.Router();
const supabase = require('../db/supabase');

router.get('/', async (req, res) => {
    const { data, error } = await supabase.from('products').select('*, hobbies(hobby_name)');
    if (error) return res.status(400).json({ error: error.message });
    res.json(data);
});

router.get('/hobby/:hobbyId', async (req, res) => {
    const { hobbyId } = req.params;
    const { data, error } = await supabase.from('products').select('*').eq('hobby_id', hobbyId);
    if (error) return res.status(400).json({ error: error.message });
    res.json(data);
});

router.get('/:id', async (req, res) => {
    const { id } = req.params;
    const { data, error } = await supabase.from('products').select('*, hobbies(hobby_name)').eq('id', id).single();
    if (error) return res.status(400).json({ error: error.message });
    res.json(data);
});

module.exports = router;
