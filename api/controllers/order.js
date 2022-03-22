const Order = require('../models/order');


const Soup = require('../models/soup');

exports.createOrder = (req, res, next) => {
    // Fetch all soups from products.id body
    Soup.find({ _id: { $in: req.body.products.map(product => product.soup) } })
        .then(soups => {
            // console.log(soups)
            const checkSoup = soups.map(soup => {
                const product = req.body.products.find(product => product.soup.toString() === soup._id.toString());
                return {soup: soup._id, quantity: product.quantity, price: soup.price};
            });
            // Create new order 
            const order = new Order({
                userId: req.body.userId,
                products: checkSoup,
                // total: req.body.products.reduce((acc, product) => {
                //     return acc + product.price * product.quantity;
                // }, 0),
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
        console.log(order);
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


