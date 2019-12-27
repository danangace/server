const router = require('express').Router();
const {
    authenticate,
    authorizationAdmin,
    authorizationCustomer
} = require('../middlewares/auth');
const { ProductController } = require('../controllers');

router.use(authenticate);

// create product
router.post('/', authorizationAdmin, ProductController.createProduct);

// get one product
router.get('/:id', ProductController.getOneProduct);

// get info attributes
router.get('/:id/attr', ProductController.getDetailAttribute);

// update main product
router.put('/:id', authorizationAdmin, ProductController.updateProduct);

// update attributes product
router.put('/:id/attr', authorizationAdmin, ProductController.updateAttributes);

// decrease stock of product
router.patch('/:id', authorizationCustomer, ProductController.updateStock);

// delete stock by admin
router.delete('/:id', authorizationAdmin, ProductController.deleteProduct);

module.exports = router;