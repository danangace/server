const { Transaction, Cart } = require('../models');

class TransactionController {
    static createTransaction(req, res, next) {
        const { id } = req.decoded;
        Cart.find()
            .then(carts => {
                let cost = 0;
                let listProduct = [];
                carts.forEach(data => {
                    let obj = {};
                    cost += data.cost;
                    obj.productId = data.productId;
                    obj.color = data.color;
                    obj.size = data.size;
                    obj.cost = data.cost;
                    obj.amount = data.amount;
                    listProduct.push(obj);
                });
                return Transaction.create({
                    listProduct,
                    UserId: id,
                    status: 'unpaid',
                    totalCost: cost
                });
            })
            .then(transaction => {
                res.status(201).json(transaction);
            })
            .catch(next);
    }

    static getAllTransaction(req, res, next) {
        Transaction.find()
            .populate('listProduct.productId')
            .then(transaction => {
                res.status(200).json(transaction);
            })
            .catch(next);
    }

    static getUserTransaction(req, res, next) {
        Transaction.find({
            UserId: req.decoded.id
        })
            .populate('listProduct.productId')
            .then(transaction => {
                res.status(200).json(transaction);
            })
            .catch(next);
    }

    static updateStatusTransaction(req, res, next) {
        let { paid, sent, received } = req.query;
        let { id } = req.params;
        if (paid) {
            Transaction.findOneAndUpdate(
                {
                    _id: id
                },
                {
                    $set: { status: 'paid' }
                },
                {
                    new: true
                }
            )
                .then(transaction => {
                    res.status(200).json(transaction);
                })
                .catch(next);
        } else if (sent) {
            Transaction.findOneAndUpdate(
                {
                    _id: id
                },
                {
                    $set: { status: 'sent' }
                },
                {
                    new: true
                }
            )
                .then(transaction => {
                    res.status(200).json(transaction);
                })
                .catch(next);
        } else if (received) {
            Transaction.findOneAndUpdate(
                {
                    _id: id
                },
                {
                    $set: { status: 'received' }
                },
                {
                    new: true
                }
            )
                .then(transaction => {
                    res.status(200).json(transaction);
                })
                .catch(next);
        }
    }

    static deleteTransaction(req, res, next) {
        const { id } = req.params;
        Transaction.deleteOne({
            _id: id
        })
            .then(result => {
                if (result.deletedCount > 0) {
                    res.status(200).json({
                        message: 'Deleted transaction success'
                    });
                }
            })
            .catch(next);
    }
}

module.exports = TransactionController;