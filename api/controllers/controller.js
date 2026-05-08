const path = require('path')
const model = require(path.join(__dirname, '..', 'models', 'model'))

//Product Start
const showAllProducts = (req, res) => {
    model.getAllProducts().then((data) => {
        if (data == '') {
            response = {
                "status": false,
                "error": "Record Not Found",
            }
        } else {
            response = {
                "status": true,
                "data": data,
            }
        }
        res.json(response);
    }).catch(err => {
        response = {
            "status": false,
            "error": "DB server not response query error",
        }
        res.json(response);
    });
}

const showSingleProduct = (req, res) => {
    id = req.params["id"]
    model.getSingleProduct(id).then((data) => {
        if (data == '') {
            response = {
                "status": false,
                "error": "Record Not Found",
            }
        } else {
            response = {
                "status": true,
                "data": data,
            }
        }
        res.json(response);
    }).catch(err => {
        response = {
            "status": false,
            "error": "DB server not response query error",
        }
        res.json(response);
    });
}

const addProduct = (req, res) => {
    let name = req.body.pname
    let rate = req.body.rate
    let code = req.body.code
    model.addProductDB(name, rate, code).then((data) => {
        response = {
            "status": true,
            "msg": "Product Added Successfully",
            "lastInsertID": data,
        }
        res.json(response);
    }).catch(err => {
        response = {
            "status": false,
            "error": "DB server not response query error",
        }
        res.json(response);
    });
}

const editProduct = (req, res) => {
    let id = req.params["id"]
    let name = req.body.pname
    let rate = req.body.rate
    let code = req.body.code
    model.editProductDB(id, name, rate, code).then((data) => {
        if (data.affectedRows == 1) {
            response = {
                "status": true,
                "msg": "Product Edited Successfully",
            }
        } else {
            response = {
                "status": false,
                "error": "Record Not Found",
            }
        }
        res.json(response);
    }).catch(err => {
        response = {
            "status": false,
            "error": "DB server not response query error",
        }
        res.json(response);
    })
}

const deleteProduct = (req, res) => {
    id = req.params["id"]
    model.deleteProductDB(id).then((data) => {
        if (data.affectedRows == 1) {
            response = {
                "status": true,
                "msg": "Product Deleted Successfully",
            }
        } else {
            response = {
                "status": false,
                "error": "Record Not Found",
            }
        }
        res.json(response);
    }).catch(err => {
        response = {
            "status": false,
            "error": "DB server not response query error",
        }
        res.json(response);
    });
}
//Product End
//---------------------------------------------------------------------------------
//Customer Start
const showAllCustomers = (req, res) => {
    model.getAllCustomers().then((data) => {
        if (data == '') {
            response = {
                "status": false,
                "error": "Record Not Found",
            }
        } else {
            response = {
                "status": true,
                "data": data,
            }
        }
        res.json(response);
    }).catch(err => {
        response = {
            "status": false,
            "error": "DB server not response query error",
        }
        res.json(response);
    });
}

const showSingleCustomer = (req, res) => {
    id = req.params["id"]
    model.getSingleCustomer(id).then((data) => {
        if (data == '') {
            response = {
                "status": false,
                "error": "Record Not Found",
            }
        } else {
            response = {
                "status": true,
                "data": data,
            }
        }
        res.json(response);
    }).catch(err => {
        response = {
            "status": false,
            "error": "DB server not response query error",
        }
        res.json(response);
    });
}

const showCustomerType = (req, res) => {
    let type = req.params["type"];
    model.getCustomerType(type).then((data) => {
        if (data == '') {
            response = {
                "status": false,
                "error": "Record Not Found",
            }
        } else {
            response = {
                "status": true,
                "data": data,
            }
        }
        res.json(response);
    }).catch(err => {
        response = {
            "status": false,
            "error": "DB server not response query error",
        }
        res.json(response);
    });
}

const addCustomer = (req, res) => {
    let cname = req.body.cname
    let address = req.body.address
    let city = req.body.city
    let contact = req.body.contact
    let type = req.body.type
    model.addCustomerDB(cname, address, city,contact,type).then((data) => {
        response = {
            "status": true,
            "msg": "Customer Added Successfully",
            "lastInsertID": data,
        }
        res.json(response);
    }).catch(err => {
        response = {
            "status": false,
            "error": "DB server not response query error",
        }
        res.json(response);
    });
}

const editCustomer = (req, res) => {
    let id = req.params["id"]
    let cname = req.body.cname
    let address = req.body.address
    let city = req.body.city
    let contact = req.body.contact
    let type = req.body.type
    model.editCustomerDB(id, cname, address, city,contact,type).then((data) => {
        if (data.affectedRows == 1) {
            response = {
                "status": true,
                "msg": "Customer Edited Successfully",
            }
        } else {
            response = {
                "status": false,
                "error": "Record Not Found",
            }
        }
        res.json(response);
    }).catch(err => {
        response = {
            "status": false,
            "error": "DB server not response query error",
        }
        res.json(response);
    })
}

const deleteCustomer = (req, res) => {
    id = req.params["id"]
    model.deleteCustomerDB(id).then((data) => {
        if (data.affectedRows == 1) {
            response = {
                "status": true,
                "msg": "Customer Deleted Successfully",
            }
        } else {
            response = {
                "status": false,
                "error": "Record Not Found",
            }
        }
        res.json(response);
    }).catch(err => {
        response = {
            "status": false,
            "error": "DB server not response query error",
        }
        res.json(response);
    });
}
//Customer End
//---------------------------------------------------------------------------------
//Invoice Start
const showAllInvoice = (req, res) => {
    model.getAllInvoice().then((data) => {
        if (data == '') {
            response = {
                "status": false,
                "error": "Record Not Found",
            }
        } else {
            response = {
                "status": true,
                "data": data,
            }
        }
        res.json(response);
    }).catch(err => {
        response = {
            "status": false,
            "error": "DB server not response query error",
        }
        res.json(response);
    });
}

const showSingleInvoice = (req, res) => {
    id = req.params["id"]
    model.getSingleInvoice(id).then((data) => {
        if (data == '') {
            response = {
                "status": false,
                "error": "Record Not Found",
            }
        } else {
            response = {
                "status": true,
                "data": data,
            }
        }
        res.json(response);
    }).catch(err => {
        response = {
            "status": false,
            "error": "DB server not response query error",
        }
        res.json(response);
    });
}

const addInvoice = (req, res) => {
    let ino = req.body.ino
    let idate = req.body.idate
    let bcid = req.body.bcid
    let scid = req.body.scid
    let itotal = req.body.itotal
    let ipaid = req.body.ipaid
    let ipend = req.body.ipend
    let ipay = req.body.ipay
    let products =req.body.products
    model.addInvoiceDB(ino,idate,bcid,scid,itotal,ipaid,ipend,ipay,products).then((data) => {
        response = {
            "status": true,
            "msg": "Invoice Added Successfully",
            "lastInsertID": data,
        }
        res.json(response);
    }).catch(err => {
        response = {
            "status": false,
            "error": "DB server not response query error",
        }
        res.json(response);
    });
}

const editInvoice = (req, res) => {
    let id = req.params["id"]
    let name = req.body.pname
    let rate = req.body.rate
    let code = req.body.code
    model.editInvoiceDB(id, name, rate, code).then((data) => {
        if (data.affectedRows == 1) {
            response = {
                "status": true,
                "msg": "Invoice Edited Successfully",
            }
        } else {
            response = {
                "status": false,
                "error": "Record Not Found",
            }
        }
        res.json(response);
    }).catch(err => {
        response = {
            "status": false,
            "error": "DB server not response query error",
        }
        res.json(response);
    })
}

const deleteInvoice = (req, res) => {
    id = req.params["id"]
    model.deleteInvoiceDB(id).then((data) => {
        if (data.affectedRows == 1) {
            response = {
                "status": true,
                "msg": "Invoice Deleted Successfully",
            }
        } else {
            response = {
                "status": false,
                "error": "Record Not Found",
            }
        }
        res.json(response);
    }).catch(err => {
        response = {
            "status": false,
            "error": "DB server not response query error",
        }
        res.json(response);
    });
}
//Invoice End
//---------------------------------------------------------------------------------


module.exports = {
    showAllProducts,
    showSingleProduct,
    addProduct,
    editProduct,
    deleteProduct,

    showAllCustomers,
    showSingleCustomer,
    showCustomerType,
    addCustomer,
    editCustomer,
    deleteCustomer,

    showAllInvoice,
    showSingleInvoice,
    addInvoice,
    editInvoice,
    deleteInvoice,
}