const express = require("express");
const app = express();
const path = require("path");
const controllers = require(path.join(__dirname,'controllers','controller'));
const cors = require("cors");

app.use(cors());
app.use(express.json());

BasicAuth = (req, res, next) => {
  const authorization = req.headers.authorization;
  if (!authorization) {
    res.set("WWW-Authenticate", 'Basic realm="401"');
    res.status(401).send("Basic Auth Req");
  }
  base64String = authorization?.split(" ")[1];
  [user, pwd] = Buffer.from(base64String, "base64").toString()?.split(":"); //admin:1234

  if (user == "admin" && pwd == "12345") {
    next();
  } else {
    res.set("WWW-Authenticate", 'Basic realm="401"');
    res.status(401).send("Invalid Login details");
  }
};

//Product Start
app.get("/products", BasicAuth, controllers.showAllProducts);
app.get("/products/:id", BasicAuth, controllers.showSingleProduct);
app.post("/products", BasicAuth, controllers.addProduct);
app.put("/products/:id", BasicAuth, controllers.editProduct);
app.delete("/products/:id", BasicAuth, controllers.deleteProduct);
//Product End

//Customer Start
app.get("/customer", BasicAuth, controllers.showAllCustomers);
app.get("/customer/:id", BasicAuth, controllers.showSingleCustomer);
app.get("/customerType/:type", BasicAuth, controllers.showCustomerType);
app.post("/customer", BasicAuth, controllers.addCustomer);
app.put("/customer/:id", BasicAuth, controllers.editCustomer);
app.delete("/customer/:id", BasicAuth, controllers.deleteCustomer);
//Customer End

//Invoice Start
app.get("/invoice", BasicAuth, controllers.showAllInvoice);
app.get("/invoice/:id", BasicAuth, controllers.showSingleInvoice);
app.post("/invoice", BasicAuth, controllers.addInvoice);
app.put("/invoice/:id", BasicAuth, controllers.editInvoice);
app.delete("/invoice/:id", BasicAuth, controllers.deleteInvoice);
//Invoice End

const PORT = 5000;
app.listen(5000, () => console.log(`Server start on ${PORT}`));