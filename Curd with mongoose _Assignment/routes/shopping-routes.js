const express = require("express");

const productController = require("../controllers/product-controller");

const router = express.Router();

router.get("/list-products", productController.getProducts);
router.get("/add-product", productController.getAddProducts);
router.post("/add-product", productController.postProducts);

router.get("/delete-product", productController.getDeleteProduct);
router.post("/delete-product", productController.postDeleteProduct);

router.get("/update-product", productController.getUpdateProduct);
router.post("/update-product", productController.postUpdateProduct);

router.get("/add-category", productController.getAddCategory);
router.post("/add-category", productController.postAddCategory);

router.get("/delete-category", productController.getDeleteCategory);
router.post("/delete-category", productController.postDeleteCategory);

module.exports = router;
