const express = require('express');
const router = express.Router();
const supabase = require('../db/supabase');

router.get('/', async (req, res) => {
    const { data, error } = await supabase.from('hobbies').select('*');
    if (error) return res.status(400).json({ error: error.message });
    res.json(data);
});

router.post('/user', async (req, res) => {
    const { userId, hobbyIds } = req.body; 
    await supabase.from('user_hobbies').delete().eq('user_id', userId);
    
    if (hobbyIds && hobbyIds.length > 0) {
        const inserts = hobbyIds.map(hobby_id => ({ user_id: userId, hobby_id }));
        const { error } = await supabase.from('user_hobbies').insert(inserts);
        if (error) return res.status(400).json({ error: error.message });
    }
    res.json({ message: 'Hobbies updated successfully' });
});

router.get('/user/:userId', async (req, res) => {
    const { userId } = req.params;
    const { data, error } = await supabase
        .from('user_hobbies')
        .select('hobby_id, hobbies(*)')
        .eq('user_id', userId);
        
    if (error) return res.status(400).json({ error: error.message });
    res.json(data.map(d => d.hobbies));
});

module.exports = router;
