const { json } = require('express');
const mysql = require('mysql');

const con = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'db_billing'
});

con.connect((err) => {
    if (err) throw err;
    console.log("DB Connected");
});

//Products Start
const getAllProducts = () => {
    return new Promise((resolve, reject) => {
        con.query("select * from tbl_products", (err, result) => {
            if (err) {
                return reject(err);
            } else {
                return resolve(result);
            }
        });
    });
}

const getSingleProduct = (id) => {
    return new Promise((resolve, reject) => {
        con.query("select * from tbl_products where pid=(?)", [id], (err, result) => {
            if (err) {
                return reject(err);
            } else {
                return resolve(result);
            }
        });
    });
}

const addProductDB = (name, rate, code) => {
    return new Promise((resolve, reject) => {
        con.query("insert into tbl_products (pname,rate,code) values (?,?,?)", [name, rate, code], (err, result) => {
            if (err) {
                return reject(err);
            }
            return resolve(result.insertId);
        });
    });
}

const editProductDB = (id, name, rate, code) => {
    return new Promise((resolve, reject) => {
        con.query("update tbl_products set pname=(?),rate=(?),code=(?) where pid=(?)", [name, rate, code, id], (err, result) => {
            if (err) {
                return reject(err);
            }
            return resolve(result);
        });
    });
}

const deleteProductDB = (id) => {
    return new Promise((resolve, reject) => {
        con.query("delete from tbl_products where pid=(?)", [id], (err, result) => {
            if (err) {
                return reject(err);
            } else {
                return resolve(result);
            }
        });
    });
}
//Products End
//---------------------------------------------------------------------------------
//Customer Start
const getAllCustomers = () => {
    return new Promise((resolve, reject) => {
        con.query("select * from tbl_customer", (err, result) => {
            if (err) {
                return reject(err);
            } else {
                return resolve(result);
            }
        });
    });
}

const getSingleCustomer = (id) => {
    return new Promise((resolve, reject) => {
        con.query("select * from tbl_customer where cid=(?)", [id], (err, result) => {
            if (err) {
                return reject(err);
            } else {
                return resolve(result);
            }
        });
    });
}

const getCustomerType = (type) => {
    return new Promise((resolve, reject) => {
        con.query("select * from tbl_customer where type=(?)", [type], (err, result) => {
            if (err) {
                return reject(err);
            } else {
                return resolve(result);
            }
        });
    });
}

const addCustomerDB = (cname, address, city, contact, type) => {
    return new Promise((resolve, reject) => {
        con.query("insert into tbl_customer (cname, address, city,contact,type) values (?,?,?,?,?)", [cname, address, city, contact, type], (err, result) => {
            if (err) {
                return reject(err);
            }
            return resolve(result.insertId);
        });
    });
}

const editCustomerDB = (id, cname, address, city, contact, type) => {
    return new Promise((resolve, reject) => {
        con.query("update tbl_customer set cname=(?),address=(?),city=(?),contact=(?),type=(?) where cid=(?)", [cname, address, city, contact, type, id], (err, result) => {
            if (err) {
                return reject(err);
            }
            return resolve(result);
        });
    });
}

const deleteCustomerDB = (id) => {
    return new Promise((resolve, reject) => {
        con.query("delete from tbl_customer where cid=(?)", [id], (err, result) => {
            if (err) {
                return reject(err);
            } else {
                return resolve(result);
            }
        });
    });
}
//Customer End
//---------------------------------------------------------------------------------
//Invoice Start
const getAllInvoice = () => {
    return new Promise((resolve, reject) => {
        con.query("select * from tbl_invoice", (err, result) => {
            if (err) {
                return reject(err);
            } else {
                return resolve(result);
            }
        });
    });
}

const getSingleInvoice = (id) => {
    return new Promise((resolve, reject) => {
        con.query("select * from tbl_invoice where pid=(?)", [id], (err, result) => {
            if (err) {
                return reject(err);
            } else {
                return resolve(result);
            }
        });
    });
}

const addInvoiceDB = (ino, idate, bcid, scid, itotal, ipaid, ipend, ipay, products) => {
    return new Promise((resolve, reject) => {
        con.query("insert into tbl_invoice (ino,idate,bcid,scid,itotal,ipaid,ipend,ipay) values (?,?,?,?,?,?,?,?)", [ino, idate, bcid, scid, itotal, ipaid, ipend, ipay], (err, result) => {
            if (err) {
                return reject(err);
            } else {
                let iid = result.insertId;
                for (let i = 0; i < products.length; i++) {
                    console.log(i)
                    con.query("insert into tbl_invoice_products (iid,pid,qty,price,rtotal) values (?,?,?,?,?)", [iid, products[i]["pid"], products[i]['qty'], products[i]['rate'], products[i]['rtotal']], (err, result) => {
                        if (err) {
                            return reject(err);
                        }
                    });
                }
                return resolve(result.insertId);
            }
        });
    });
}

const editInvoiceDB = (iid, ino, idate, bcid, scid, itotal, ipaid, ipend, ipay, products) => {
    return new Promise((resolve, reject) => {
        con.query("update tbl_invoice set pname=(?),rate=(?),code=(?) where iid=(?)", [ino, idate, bcid, scid, itotal, ipaid, ipend, ipay, iid], (err, result) => {
            if (err) {
                return reject(err);
            }
            return resolve(result);
        });
    });
}

const deleteInvoiceDB = (id) => {
    return new Promise((resolve, reject) => {
        con.query("delete from tbl_invoice where pid=(?)", [id], (err, result) => {
            if (err) {
                return reject(err);
            } else {
                return resolve(result);
            }
        });
    });
}
//Invoice End
//---------------------------------------------------------------------------------


module.exports = {
    getAllProducts,
    getSingleProduct,
    addProductDB,
    editProductDB,
    deleteProductDB,

    getAllCustomers,
    getSingleCustomer,
    getCustomerType,
    addCustomerDB,
    editCustomerDB,
    deleteCustomerDB,

    getAllInvoice,
    getSingleInvoice,
    addInvoiceDB,
    editInvoiceDB,
    deleteInvoiceDB,
}