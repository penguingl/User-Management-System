const User = require('../models/user');
const { sendMessage } = require('../producer');

exports.createUser = async (req, res) => {
    try {
        const newUser = await User.create(req.body);
        await sendMessage('user-actions', { userId: newUser.id, action: 'create', timestamp: new Date() });
        res.status(201).send(newUser);
    } catch (error) {
        console.error('Error creating user:', error);
        res.status(500).send({ error: 'Error creating user' });
    }
};

exports.updateUser = async (req, res) => {
    try {
        const user = await User.findByPk(req.params.id);
        if (user) {
          await user.update(req.body);
          await sendMessage('user-actions', { userId: user.id, action: 'update', timestamp: new Date() });
          res.status(200).send(user);
        } else {
          res.status(404).send({ error: 'User not found' });
        }
    } catch (error) {
        console.error('Error updating user:', error);
        res.status(500).send({ error: 'Error updating user' });
    }
};

exports.getUsers = async (_, res) => {
    try {
        const users = await User.findAll();
        res.status(200).send(users);
    } catch (error) {
        console.error('Error fetching users:', error);
        res.status(500).send({ error: 'Error fetching users' });
    }
};