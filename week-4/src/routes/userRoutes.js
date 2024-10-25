const express = require("express");
const router = express.Router();
const { User } = require('../models/index');

router.post('/users', async (req,res) => {
    try {
        const { username, email, password } = req.body;
        const user = await User.create({ username, email, password });
        res.status(201).json(user);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
})


router.get('/users', async (req,res) => {
    try {
        const users = await User.findAll();
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
})


router.put('/users/:id', async (req,res) => {
    try {
        const { id } = req.params;
        const { username, email, password } = req.body;

        const user = await User.findByPk(id);
        if(!user) {
            return res.status(404).json({ error: 'User not found' });
        }

    await user.update({ username, email, password });
    res.status(200).json(user);

    } catch(error) {
        res.status(500).json({ error: error.message });
    }
})


router.delete('/users/:id', async (req,res) => {
    try {
        const { id } = req.params;

        const user = await User.findByPk(id);
        if(!user) {
            res.status(404).json({ error: 'User not found' });
        }

        await user.destroy();
        res.status(200).json({ message: 'User deleted successfully' });
    } catch(error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;