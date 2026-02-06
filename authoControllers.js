const User = require('../models/signup');
 const bcryptjs = require('bcryptjs');

exports.User = async (req, res) => {
    try {
        const { name, email, password } = req.body;

        if (!name || !email || !password) {
            return res.status(400).send('Tuba yanditse amakuru yose!');
        }

        const Maches = await User.findOne({ where: { email: email } });
        if (Maches) {
            return res.status(400).send('Iyi Email isanzwe ikoreshwa!');
        }

        const hashedPassword = await bcryptjs.hash(password, 10);

        await User.create({
            name: name,
            email: email,
            password: hashedPassword
        });

        res.redirect('/'); // Ibi bizahita bituma ihamagara getAllUser
    } catch (error) {
        console.error('Signuperror', error);
        res.status(500).send('Error in saving to database');
    }
};
 exports.getAllUser = async (req, res) => {
    try {
        const users = await User.findAll(); 
        
        res.render('index', { allUser: users }); 
    } catch (error) {
        console.error('Fetch error', error);
        res.render('index', { allUser: [] });
    }
};