const Router = require('express').Router();


const storeController = require('../controllers/storeController');
const isAuth = require('../middleware/is-auth')


//routes
Router.post('/createstore', isAuth, storeController.createStore);
Router.post('/:id/addproduct', isAuth, storeController.addProduct);
Router.post('/:id/addsupplier', isAuth, storeController.addSupplier);
Router.post('/:id/addcustomer', isAuth, storeController.addCustomer);
Router.get('/allstores', isAuth, storeController.getAllStore);
Router.get('/:id/store', isAuth, storeController.getSingleStore);
Router.get('/allproducts', isAuth, storeController.getAllProduct);
Router.get('/allsupplier', isAuth, storeController.getAllSupplier);
Router.get('/allcustomer', isAuth, storeController.getAllCustomer);
Router.get('/:id/:supplierId/supplier', isAuth, storeController.getSingleSupplier);
Router.get('/:id/:productId/product', isAuth, storeController.getSingleProduct);
Router.get('/:id/:customerId/customer', isAuth, storeController.getSingleCustomer);
Router.patch('/:id/updatestore', isAuth, storeController.updateStore);
Router.patch('/:id/:supplierId/updatesupplier', isAuth, storeController.updateSupplier)
Router.patch('/:id/:productId/updateproduct', isAuth, storeController.updateProduct);
Router.patch('/:id/:customerId/updatecustomer', isAuth, storeController.updateCustomer);

module.exports = Router