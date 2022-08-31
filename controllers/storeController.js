const Store = require('../models/stores');

exports.createStore = async(req, res, next) => {
  const {store_name, email, phone_number, address} = req.body
  const store = new Store({
    store_name: store_name,
    email: email,
    phone_number: phone_number,
    address: address,
    user: req.userId
  });

  await store.save()
  return res.status(201).json({
    "message": "store successfully created",
    "store": store
  });

}

exports.addProduct = async(req, res, next) => {
  const storeId = req.params.id;
  const store = await Store.findById(storeId);
  if(!store){
    return res.status(404).json({
      message: "store not found"
    })
  }
  const {  product_name, product_category, quantity, cost_price, selling_price } = req.body

  const Product = ({
    product_name: product_name,
    product_category: product_category,
    quantity: quantity,
    cost_price: cost_price,
    selling_price: selling_price
  })

  store.products.push(Product);
  await store.save();
  return res.status(201).json({
    message:'product added successfully',
    product: store.products
  })
}

exports.addSupplier = async(req, res, next) => {
  const storeId = req.params.id;
  const store = await Store.findById(storeId);
  if(!store){
    return res.status(404).json({
      message: "store not found"
    })
  }
  const {  supplier_name, product, phone_number, price } = req.body

  const Supplier = ({
    supplier_name: supplier_name,
    product: product,
    phone_number: phone_number,
    price: price,
  })

  store.suppliers.push(Supplier);
  await store.save();
  return res.status(201).json({
    message:'supplier added successfully',
    suppliers: store.suppliers
  })
}

exports.addCustomer = async(req, res, next) => {
  const storeId = req.params.id;
  const store = await Store.findById(storeId);
  if(!store){
    return res.status(404).json({
      message: "store not found"
    })
  }
  const { customer_name, email, phone_number, address } = req.body

  const Customer = ({
    customer_name: customer_name,
    email: email,
    phone_number: phone_number,
    address: address,
  })

  store.customers.push(Customer);
  await store.save();
  return res.status(201).json({
    message:'customer added successfully',
    customers: store.customers
  })
}

exports.getAllStore = async(req, res, next) => {
  const stores = await Store.find();
  return res.status(201).json({
    stores: stores
  })
}

exports.getSingleStore =  async(req, res, next) => {
  const storeId = req.params.id;
  const store = await Store.findById(storeId);
  if(!store){
    return res.status(404).json({
      message: "store not found"
    })
  }
  return res.status(201).json({
    store: store
  })

}

exports.getAllProduct = async(req, res, next) => {
  const storeId = req.params.id;
  const store = await Store.findById(storeId);
  if(!store){
    return res.status(404).json({
      message: "store not found"
    })
  }
  return res.status(201).json({
    products: store.products
  })

}

exports.getAllSupplier = async(req, res, next) => {
  const storeId = req.params.id;
  const store = await Store.findById(storeId);
  if(!store){
    return res.status(404).json({
      message: "store not found"
    })
  }
  return res.status(201).json({
    suppliers: store.suppliers
  })

}

exports.getAllCustomer = async(req, res, next) => {
  const storeId = req.params.id;
  const store = await Store.findById(storeId);
  if(!store){
    return res.status(404).json({
      message: "store not found"
    })
  }
  return res.status(201).json({
    customers: store.customers
  })

}

exports.getSingleProduct = async(req, res, next) => {
  const storeId = req.params.id;
  const productId = req.params.productId;
  const store = await Store.findById(storeId);
  if(!store){
    return res.status(404).json({
      message: "store not found"
    })
  }
  store.products.map(product => {
    const isEqual = product.id === productId
    if(!isEqual){
      return res.status(404).json();
    }
    return res.status(201).json({
      product: product
    })
   
  });
}

  exports.getSingleSupplier = async(req, res, next) => {
    const storeId = req.params.id;
    const supplierId = req.params.supplierId;
    const store = await Store.findById(storeId);
    if(!store){
      return res.status(404).json({
        message: "store not found"
      })
    }
    store.suppliers.map(supplier => {
      const isEqual = supplier.id === supplierId
      if(!isEqual){
        return res.status(404).json();
      }
      return res.status(201).json({
        supplier: supplier
      })
    });
    }

    exports.getSingleCustomer = async(req, res, next) => {
      const storeId = req.params.id;
      const customerId = req.params.customerId;
      const store = await Store.findById(storeId);
      if(!store){
        return res.status(404).json({
          message: "store not found"
        })
      }
      store.customers.map(customer => {
        const isEqual = customer.id === customerId
        if(!isEqual){
          return res.status(404).json();
        }
        return res.status(201).json({
          customer: customer
        })
      });
      }

    exports.updateStore = async(req, res, next) => {
      const storeId =  req.params.id;
      const store = await Store.findById(storeId);
      if(!store){
        return res.status(404).json({
          message: "store not found"
        })
      }
      const {store_name, email, phone_number, address} = req.body;
      store.store_name = store_name;
      store.email = email;
      store.phone_number = phone_number;
      store.address = address
      await store.save();
      return res.status(201).json({
        "message": "store information updated",
        store: store
      })
    };
  
  exports.updateProduct = async(req, res, next) => {
    const storeId = req.params.id;
    const productId = req.params.productId;
    const {  product_name, product_category, quantity, cost_price, selling_price } = req.body
    const store = await Store.findById(storeId);
    if(!store){
      return res.status(404).json({
        message: "store not found"
      })
    }
    store.products.map(product => {
      const isEqual = product.id === productId
      if(!isEqual){
        return res.status(404).json();
      }
      product.product_name = product_name;
      product.product_category = product_category;
      product.quantity = quantity;
      product.cost_price = cost_price;
      product.selling_price = selling_price;
    })
    await store.save();
    return res.status(201).json({
        'message': "product updated",
        product: store.products
      })
  }

  exports.updateSupplier = async(req, res, next) => {
    const storeId = req.params.id;
    const supplierId = req.params.supplierId;
    const {  supplier_name, product, phone_number, price } = req.body
    const store = await Store.findById(storeId);
    if(!store){
      return res.status(404).json({
        message: "store not found"
      })
    }
    store.suppliers.map(supplier => {
      const isEqual = supplier.id === supplierId
      if(!isEqual){
        return res.status(404).json();
      }
      supplier.supplier_name = supplier_name;
      supplier.product = product;
      supplier.phone_number = phone_number;
      supplier.price = price;
    })
    await store.save();
    return res.status(201).json({
      'message': "supplier updated",
      supplier: store.suppliers
    })
  }

  exports.updateCustomer = async(req, res, next) => {
    const storeId = req.params.id;
    const customerId = req.params.customerId;
    const { customer_name, email, phone_number, address } = req.body;
    const store = await Store.findById(storeId);
    if(!store){
      return res.status(404).json({
        message: "store not found"
      })
    }
    store.customers.map(customer => {
      const isEqual = customer.id === customerId
      if(!isEqual){
        return res.status(404).json();
      }
      customer.customer_name = customer_name;
      customer.email = email;
      customer.phone_number = phone_number;
      customer.address = address;
    })
    await store.save();
    return res.status(201).json({
      'message': "customer updated",
      customer: store.customers
    })
   }

    

  




  
