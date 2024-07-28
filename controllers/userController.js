const User = require('../models/User');

const createUser = async (req, res) => {
    const { email, name, mobile } = req.body;
    try {
        const newUser = new User({ email, name, mobile });
        await newUser.save();
        res.status(201).json(newUser);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const getUserDetails = async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        if (!user) return res.status(404).json({ message: 'User not found' });
        res.json(user);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
module.exports={
    createUser,
    getUserDetails,
}