const ProductModel = require("../models/product");
const Category = require("../models/category");
const mongoose = require("mongoose");

exports.getProducts = (req, res, next) => {
  const isAuthenticated = req.session.isLoggedIn;
  const userType = req.session.userType;
  ProductModel.find()
    .populate("categoryId")
    .then((products) => {
      res.render("list-products", {
        pageTitle: "My Store - List Products",
        products: products,
        isAuthenticated: isAuthenticated,
        userType,
      });
    });
};

exports.getAddProducts = (req, res, next) => {
  const isAuthenticated = req.session.isLoggedIn;
  const userType = req.session.userType;

  Category.find().then((categories) => {
    res.render("add-product", {
      pageTitle: "My Store - Add Products",
      categories: categories,
      alert: false,
      isAuthenticated: isAuthenticated,
      userType,
    });
  });
};

exports.postProducts = (req, res, next) => {
  const isAuthenticated = req.session.isLoggedIn;
  const userType = req.session.userType;
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
        isAuthenticated: isAuthenticated,
        userType,
      });
    });
  });
};

exports.getDeleteProduct = (req, res, next) => {
  const isAuthenticated = req.session.isLoggedIn;
  const userType = req.session.userType;
  if (ProductModel.find()) {
    ProductModel.find().then((products) => {
      res.render("delete-product", {
        pageTitle: "My Store - Delete Product",
        products,
        alert: false,
        isAuthenticated: isAuthenticated,
        userType,
      });
    });
  }
};

exports.postDeleteProduct = (req, res, next) => {
  const isAuthenticated = req.session.isLoggedIn;
  const userType = req.session.userType;
  const deletingProductID = req.body.deletingProductID;
  ProductModel.deleteOne({ _id: `${deletingProductID}` }).then(() => {
    if (ProductModel.find()) {
      ProductModel.find().then((products) => {
        res.render("delete-product", {
          pageTitle: "My Store - Delete Product",
          products,
          alert: true,
          message: "Product has been deleted successfully",
          isAuthenticated: isAuthenticated,
          userType,
        });
      });
    }
  });
};

exports.getUpdateProduct = (req, res, next) => {
  const isAuthenticated = req.session.isLoggedIn;
  const userType = req.session.userType;
  ProductModel.find().then((products) => {
    res.render("update-product", {
      pageTitle: "My Store - update Product",
      products,
      alert: false,
      isAuthenticated: isAuthenticated,
      userType,
    });
  });
};

exports.postUpdateProduct = (req, res, next) => {
  const isAuthenticated = req.session.isLoggedIn;
  const userType = req.session.userType;
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
        isAuthenticated: isAuthenticated,
        userType,
      });
    });
  });
};

exports.getAddCategory = (req, res, next) => {
  const isAuthenticated = req.session.isLoggedIn;
  const userType = req.session.userType;
  res.render("add-category", {
    pageTitle: "App - add category",
    alert: false,
    isAuthenticated: isAuthenticated,
    userType,
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
  const isAuthenticated = req.session.isLoggedIn;
  const userType = req.session.userType;
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
            isAuthenticated: isAuthenticated,
            userType,
          })
        );
      } else {
        res.render("add-category", {
          pageTitle: "App - add category",
          alert: true,
          message: "Category already exist.",
          isAuthenticated: isAuthenticated,
          userType,
        });
      }
    }
  );
};

exports.getDeleteCategory = (req, res, next) => {
  const isAuthenticated = req.session.isLoggedIn;
  const userType = req.session.userType;
  Category.find().then((categories) => {
    res.render("delete-category", {
      pageTitle: "App - delete category",
      categories,
      alert: false,
      isAuthenticated: isAuthenticated,
      userType,
    });
  });
};

exports.postDeleteCategory = (req, res, next) => {
  const isAuthenticated = req.session.isLoggedIn;
  const userType = req.session.userType;
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
          isAuthenticated: isAuthenticated,
          userType,
        });
      });
    }
  });
};
