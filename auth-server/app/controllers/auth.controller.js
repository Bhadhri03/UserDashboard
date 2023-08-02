const config = require('../config/auth.config.js');
const db = require('../models');

const User = db.user;

var jwt = require('jsonwebtoken');
var bcrypt = require('bcryptjs');

exports.signup = async(req, res) => {
    const user = new User({
        fname : req.body.fname,
        lname : req.body.lname,
        email : req.body.email,
        password : bcrypt.hashSync(req.body.password, 8),
        phone : req.body.phone,
        gender : req.body.gender
    });

    await user.save((err, user) => {
        if(err){
            res.status(500).send({ message: err });
            return;
        }
        res.send({ message: "User was registered successfully!" });
    }
    );
};

exports.signin = (req, res) => {
    console.log(req.body);
    User.findOne({
        email : req.body.email
    }).exec((err, user) => {
        if(err){
            res.status(500).send({ message: err });
            return;
        }
        if(!user){
            return res.status(404).send({ message: "User Not Found!" });
        }
        var passwordIsValid = bcrypt.compareSync(
            req.body.password,
            user.password
        );
        if(!passwordIsValid){
            return res.status(401).send({
                accessToken: null,
                message: "Invalid Password!"
            });
        }
        const token = jwt.sign({ id: user.id }, config.secret, { algorithm: 'HS256', allowInsecureKeySizes: true, expiresIn: 86400 });

        res.status(200).send({
            id: user._id,
            fname: user.fname,
            lname: user.lname,
            email: user.email,
            phone: user.phone,
            gender: user.gender,
            accessToken: token
        });
    });
};

