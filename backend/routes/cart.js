const express = require('express');
const router = express.Router();
const supabase = require('../db/supabase');

router.get('/:userId', async (req, res) => {
    const { userId } = req.params;
    const { data, error } = await supabase
        .from('cart')
        .select('id, quantity, products(*)')
        .eq('user_id', userId);
        
    if (error) return res.status(400).json({ error: error.message });
    res.json(data);
});

router.post('/', async (req, res) => {
    const { userId, productId, quantity } = req.body;
    const { data: existing } = await supabase
        .from('cart')
        .select('*')
        .eq('user_id', userId)
        .eq('product_id', productId)
        .single();
        
    let error;
    if (existing) {
        const resp = await supabase.from('cart').update({ quantity: existing.quantity + (quantity || 1) }).eq('id', existing.id);
        error = resp.error;
    } else {
        const resp = await supabase.from('cart').insert({ user_id: userId, product_id: productId, quantity: quantity || 1 });
        error = resp.error;
    }
    
    if (error) return res.status(400).json({ error: error.message });
    res.json({ message: 'Added to cart' });
});

router.put('/:id', async (req, res) => {
    const { id } = req.params;
    const { quantity } = req.body;
    const { error } = await supabase.from('cart').update({ quantity }).eq('id', id);
    if (error) return res.status(400).json({ error: error.message });
    res.json({ message: 'Cart updated' });
});

router.delete('/:id', async (req, res) => {
    const { id } = req.params;
    const { error } = await supabase.from('cart').delete().eq('id', id);
    if (error) return res.status(400).json({ error: error.message });
    res.json({ message: 'Item removed' });
});

router.delete('/clear/:userId', async (req, res) => {
    const { userId } = req.params;
    const { error } = await supabase.from('cart').delete().eq('user_id', userId);
    if (error) return res.status(400).json({ error: error.message });
    res.json({ message: 'Cart cleared' });
});

module.exports = router;
