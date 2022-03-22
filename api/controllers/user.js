const User = require('../models/user');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
require('dotenv').config();
const RANDOM_TOKEN_SECRET = process.env.RANDOM_TOKEN_SECRET;



exports.signup = (req, res, next) => {
    bcrypt.hash(req.body.password, 10)
        .then(hash => {
        const user = new User({
            email: req.body.email,
            password: hash,
            first_name: req.body.firstname,
            last_name: req.body.lastname,
            address_number: req.body.address_number,
            address_street: req.body.address_street,
            address_city: req.body.address_city,
            address_zip: req.body.address_zip,
            phone: req.body.phone,
        });
        user.save()
            .then(() => res.status(201).json({ message: 'Utilisateur créé !' }))
            .catch(error => res.status(400).json({ error }));
        })
        .catch(error => res.status(500).json({ error }));
    };


exports.login = (req, res, next) => {
  console.log('Login')
    User.findOne({ email: req.body.email })
    .then(user => {
      if (!user) {
        console.log('Utilisateur non trouvé')
        return res.status(401).json({ error: 'Utilisateur non trouvé !' });
      }
      bcrypt.compare(req.body.password, user.password)
        .then(valid => {
          if (!valid) {
            console.log('Mot de passe incorrect')
            return res.status(401).json({ error: 'Mot de passe incorrect !' });
          }
          res.status(200).json({
            userId: user._id,
            token: jwt.sign(
                { userId: user._id },
                RANDOM_TOKEN_SECRET,
                { expiresIn: '24h' }
              ),
              first_name: user.first_name ? user.first_name : "Anonyme",
              last_name: user.last_name ? user.last_name : null,
              email: user.email ? user.email : null,
              address_number: user.address_number ? user.address_number : null,
              address_street: user.address_street ? user.address_street : null,
              address_city: user.address_city ? user.address_city : null,
              address_zip: user.address_zip ? user.address_zip : null,
              phone: user.phone ? user.phone : null,
          });
        })
        .catch(error => res.status(500).json({ error }));
    })
    .catch(error => res.status(500).json({ error }));
};