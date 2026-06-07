const express = require('express');
const router = express.Router();
const supabase = require('../db/supabase');

router.post('/register', async (req, res) => {
    const { email, password, name } = req.body;
    try {
        const { data, error } = await supabase.auth.signUp({
            email,
            password,
            options: {
                data: { name }
            }
        });
        if (error) return res.status(400).json({ error: error.message });
        
        if (data.user) {
            await supabase.from('users').upsert({ id: data.user.id, name, auth_provider: 'email' });
        }
        
        res.json({ message: 'Registration successful', data });
    } catch (err) {
        res.status(500).json({ error: 'Server error' });
    }
});

router.post('/login', async (req, res) => {
    const { email, password } = req.body;
    try {
        const { data, error } = await supabase.auth.signInWithPassword({
            email,
            password,
        });
        if (error) return res.status(400).json({ error: error.message });
        res.json({ message: 'Login successful', session: data.session, user: data.user });
    } catch (err) {
        res.status(500).json({ error: 'Server error' });
    }
});

router.post('/logout', async (req, res) => {
    res.json({ message: 'Logged out' });
});

module.exports = router;
