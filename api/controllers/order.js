const Order = require('../models/order');


const Soup = require('../models/soup');

exports.createOrder = (req, res, next) => {
    Soup.find({ _id: { $in: req.body.products.map(product => product.soup) } })
        .then(soups => {
            const checkSoup = soups.map(soup => {
                const product = req.body.products.find(product => product.soup.toString() === soup._id.toString());
                return {soup: soup._id, quantity: product.quantity, price: soup.price};
            });
            // console.log(checkSoup);
            checkSoup.forEach(orderedSoup => {
                const product = soups.find(soup => soup._id.toString() === orderedSoup.soup.toString());
                if (orderedSoup.quantity > product.quantity) {
                    res.status(400).json({
                        error: `Not enough quantity for ${product.title}, only ${product.quantity} left`,
                        quantity: product.quantity
                    });
                } else {
                    product.quantity -= orderedSoup.quantity;
                    Soup.updateOne({ _id: product._id }, { $set: { quantity: product.quantity } })
                        .then(() => {
                            console.log('quantity updated', product._id, product.quantity);
                        })
                        .catch(error => {
                            console.log(error);
                        });
                }
            });
            // Tried with UpdateMany but it didn't work, so I had to do it with UpdateOne

            // Soup.updateMany(
            //     { _id: { $in: checkSoup.map(soup => soup.soup) } }, 
            //     {$set: checkSoup.map(soup => {
            //             console.log('soup', soup);
            //             const product = req.body.products.find(product => product.soup.toString() === soup.soup.toString());
            //             return {quantity: soup.quantity - product.quantity};
            //         }
            //     )}
            // )

                // {$set: { quantity: 0 }})
                // {$set: {quantity}})
                // .then(() => {console.log('Updated soups', checkSoup)})
                // .catch(error => {console.log('Error updating soups', error)});
            const order = new Order({
                userId: req.body.userId,
                products: checkSoup,
                total: checkSoup.reduce((acc, product) => {
                        return acc + product.price * product.quantity;
                }, 0),
                status: 'pending',
                address_number: req.body.address_number,
                address_street: req.body.address_street,
                address_city: req.body.address_city,
                address_zip: req.body.address_zip,
                phone: req.body.phone,
            });
            
            order.save().then(
                (createdOrder) => {
                console.log('Order created successfully!');
                // console.log(order);
                res.status(201).json(createdOrder);
                }
            ).catch(
                (error) => {
                res.status(400).json({
                    error: error
                });
                }
            );
    })
};

exports.getAllOrders = (req, res, next) => {
    Order.find()
        .populate('products.soup', 'title price')
        .then(orders => {
            res.status(200).json({
                orders: orders
            });
        })
        .catch(error => {
            res.status(400).json({
                error: error
            });
        });
}


