const Soup = require('../models/soup');

exports.getAllSoups = (req, res, next) => {
    Soup.find()
        .then(soups => {
            res.status(200).json({
                soups: soups
            });
        })
        .catch(error => {
            res.status(400).json({
                error: error
            });
        });
};

exports.createSoup = (req, res, next) => {
    const soup = new Soup({
        title: req.body.title,
        description: req.body.description,
        details: req.body.details,
        price: req.body.price,
        quantity: req.body.quantity,
    });
    soup.save().then(
        () => {
            res.status(201).json({
                message: 'Soup saved successfully!'
            });
        }
    ).catch(
        (error) => {
            res.status(400).json({
                error: error
            });
        }
    );
};

exports.getOneSoup = (req, res, next) => {
    Soup.findOne({ _id: req.params.id })
        .then(soup => {
            res.status(200).json({
                soup: soup
            });
        })
        .catch(error => {
            res.status(404).json({
                error: error
            });
        });
};

exports.modifySoup = (req, res, next) => {
    Soup.updateOne({ _id: req.params.id }, { $set: req.body })
        .then(() => {
            res.status(200).json({
                message: 'Soup updated successfully!'
            });
        })
        .catch(error => {
            res.status(400).json({
                error: error
            });
        });
};

exports.deleteSoup = (req, res, next) => {
    Soup.deleteOne({ _id: req.params.id }).then(
        () => {
            res.status(200).json({ message: 'Soup deleted!' });
        }
    ).catch(
        (error) => {
            res.status(400).json({
                error: error
            });
        }
    );
};

// tu peux faire tous tes export en fin de fichier avec module.export

// A post request to /api/soup/ example:
// {
//     "title": "Soup 1",
//     "description": "Description 1",
//     "details": "Details 1",
//     "price": 1,
//     "quantity": 1
// }


