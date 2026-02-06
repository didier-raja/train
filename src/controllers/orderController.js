const {User} = require('../models/users');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { where } = require('sequelize');

exports.register = async(req,res)=>{
    try{
        const { email,password} = req.body;

        const existingUser = await User.findOne({ where :{ email:email}})
        
        if(existingUser){
            return res.status(400).json({message:"User arleady exists"});
        };

        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = await User.create({
            email: email,
            password: hashedPassword
        });
        return res.status(201).json({ message:"New user is created well", userId: newUser.id})
    }catch(error){
        res.status(500).json({error:error.message})
    }
}
exports.login = async(req,res)=>{
    try{
        const { email,password} = req.body;

        const user = await User.findOne({where: {email:email}});
        if(!user){
            return res.status(404).json({message:"User not found"})
        }
        const isMach = await bcrypt.hash(password, user.password);
        if(!isMach){
            return res.status(401).json({message:"Invalid passwoed"})
        }
        const token = jwt.sign(
            { id: user.id, is_admin: user.is_admin },
            process.env.JWT_SECRET || 'secretkey',
            { expiresIn: '1h' }
        );

        res.status(200).json({
            message: 'Login successful',
            token,
            user: { id: user.id, email: user.email, is_admin: user.is_admin }
        });
    }catch (error) {
        res.status(500).json({ error: error.message });
    }

}