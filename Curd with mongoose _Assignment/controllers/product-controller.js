const ProductModel = require("../models/product");
const Category = require("../models/category");
const mongoose = require("mongoose");

exports.getProducts = (req, res, next) => {
  ProductModel.find()
    .populate("categoryId")
    .then((products) => {
      res.render("list-products", {
        pageTitle: "My Store - List Products",
        products: products,
      });
    });
};

exports.getAddProducts = (req, res, next) => {
  Category.find().then((categories) => {
    res.render("add-product", {
      pageTitle: "My Store - Add Products",
      categories: categories,
      alert: false,
    });
  });
};

exports.postProducts = (req, res, next) => {
  const product = new ProductModel({
    _id: mongoose.Types.ObjectId(),
    title: req.body.name,
    price: +req.body.price,
    imageUrl: "",
    categoryId: req.body.categoryId,
  });
  product.save().then((addedProduct) => {
    Category.find().then((categories) => {
      res.render("add-product", {
        pageTitle: "My Store - Add Products",
        categories: categories,
        alert: true,
        message: "Product has been added successfully",
      });
    });
  });
};

exports.getDeleteProduct = (req, res, next) => {
  if (ProductModel.find()) {
    ProductModel.find().then((products) => {
      res.render("delete-product", {
        pageTitle: "My Store - Delete Product",
        products,
        alert: false,
      });
    });
  }
};

exports.postDeleteProduct = (req, res, next) => {
  const deletingProductID = req.body.deletingProductID;
  ProductModel.deleteOne({ _id: `${deletingProductID}` }).then(() => {
    if (ProductModel.find()) {
      ProductModel.find().then((products) => {
        res.render("delete-product", {
          pageTitle: "My Store - Delete Product",
          products,
          alert: true,
          message: "Product has been deleted successfully",
        });
      });
    }
  });
};

exports.getUpdateProduct = (req, res, next) => {
  ProductModel.find().then((products) => {
    res.render("update-product", {
      pageTitle: "My Store - update Product",
      products,
      alert: false,
    });
  });
};

exports.postUpdateProduct = (req, res, next) => {
  const updatingProductID = req.body.updatingProductName;
  const newProduct = req.body.newName;
  const newPrice = req.body.newPrice;
  ProductModel.updateOne(
    { _id: `${updatingProductID}` },
    {
      $set: { title: `${newProduct}`, price: `${newPrice}` },
    }
  ).then(() => {
    ProductModel.find().then((products) => {
      res.render("update-product", {
        pageTitle: "My Store - update Product",
        products,
        alert: true,
        message: "Product has been updated successfully.",
      });
    });
  });
};

exports.getAddCategory = (req, res, next) => {
  res.render("add-category", {
    pageTitle: "App - add category",
    alert: false,
  });
};

// Category.findOne({ title: "Cosmetics" }, (err, addedCategory) => {
//     if (err) throw err;
//     if (!addedCategory) {
//       const cosmeticCategory = new Category({
//         title: "Cosmetics",
//         description: "Cosmetics",
//       });
//       cosmeticCategory.save();
//     }
//   });

exports.postAddCategory = (req, res, next) => {
  Category.find({ title: `${req.body.categoryTitle}` }).then(
    (addedCategory) => {
      if (addedCategory.length === 0) {
        const newCategory = new Category({
          title: `${req.body.categoryTitle}`,
          description: `${req.body.description}`,
          alert: true,
        });
        newCategory.save().then(
          res.render("add-category", {
            pageTitle: "App - add category",
            alert: true,
            message: "Category has been added successfully",
          })
        );
      } else {
        res.render("add-category", {
          pageTitle: "App - add category",
          alert: true,
          message: "Category already exist.",
        });
      }
    }
  );
};

exports.getDeleteCategory = (req, res, next) => {
  Category.find().then((categories) => {
    res.render("delete-category", {
      pageTitle: "App - delete category",
      categories,
      alert: false,
    });
  });
};

exports.postDeleteCategory = (req, res, next) => {
  const deletingCategoryID = req.body.deletingCategoryID;
  ProductModel.deleteOne({ categoryId: `${deletingCategoryID}` });
  Category.deleteOne({ _id: `${deletingCategoryID}` }).then(() => {
    if (Category.find()) {
      Category.find().then((categories) => {
        res.render("delete-category", {
          pageTitle: "My Store - Delete Category",
          categories,
          alert: true,
          message: "Category has been deleted successfully",
        });
      });
    }
  });
};
