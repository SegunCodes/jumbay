const {
  saveProduct,
  getAllProducts,
  getCategoryProducts,
  getProduct,
  getSellerProducts,
  getSellerProduct,
  deleteSellerProduct,
  updateSellerProduct,
  addToCart,
} = require("../services/UserService");

// for sellers to add products
exports.addProducts = async (req, res) => {
  try {
    const { name, quantity, price, category_id } = req.body;
    console.log(req.user.id);
    //store user details to database.
    const product = await saveProduct(
      name,
      quantity,
      price,
      category_id,
      req.user.id
      // user_id
    );
    if (!product) {
      return res.status(400).json({
        status: false,
        data: {},
        message: "Something went wrong",
      });
    }

    return res.status(200).json({
      status: true,
      data: {},
      message: "Successful",
    });
  } catch (error) {
    console.error(error);
  }
};

// for sellers to view their products
exports.viewMyProducts = async (req, res) => {
  try {
    //store user details to database.
    const products = await getSellerProducts(req.user.id);
    if (!products) {
      return res.status(400).json({
        status: false,
        data: {},
        message: "Something went wrong",
      });
    }

    return res.status(200).json({
      status: true,
      data: products,
      message: "Successful",
    });
  } catch (error) {
    console.error(error);
  }
};

// for sellers to view a single product of theirs
exports.viewMyProduct = async (req, res) => {
  try {
    const { product_id } = req.params;

    const product = await getSellerProduct(product_id, req.user.id);
    if (!product) {
      return res.status(400).json({
        status: false,
        data: {},
        message: "Something went wrong",
      });
    }

    return res.status(200).json({
      status: true,
      data: product,
      message: "Successful",
    });
  } catch (error) {
    console.error(error);
  }
};

// for buyers or even sellers to view all products available for sale
exports.viewAllProducts = async (req, res) => {
  try {
    const products = await getAllProducts();
    if (!products) {
      return res.status(400).json({
        status: false,
        data: {},
        message: "Something went wrong",
      });
    }

    return res.status(200).json({
      status: true,
      data: products,
      message: "Successful",
    });
  } catch (error) {
    console.error(error);
  }
};

// for buyers or even sellers to view all products category available for sale
exports.viewAllCategoryProducts = async (req, res) => {
  try {
    const { category_id } = req.params;

    const products = await getCategoryProducts(category_id);
    if (!products) {
      return res.status(400).json({
        status: false,
        data: {},
        message: "Something went wrong",
      });
    }

    return res.status(200).json({
      status: true,
      data: products,
      message: "Successful",
    });
  } catch (error) {
    console.error(error);
  }
};

// for buyers or even sellers to view a single product available for sale
exports.viewProduct = async (req, res) => {
  try {
    const { product_id } = req.params;

    const product = await getProduct(product_id);
    if (!product) {
      return res.status(400).json({
        status: false,
        data: {},
        message: "Something went wrong",
      });
    }

    return res.status(200).json({
      status: true,
      data: product,
      message: "Successful",
    });
  } catch (error) {
    console.error(error);
  }
};

// for sellers to view their products
exports.viewMyProducts = async (req, res) => {
  try {
    const products = await getSellerProducts(req.user.id);
    if (!products) {
      return res.status(400).json({
        status: false,
        data: {},
        message: "Something went wrong",
      });
    }

    return res.status(200).json({
      status: true,
      data: products,
      message: "Successful",
    });
  } catch (error) {
    console.error(error);
  }
};

// for sellers to view a single product of theirs
exports.viewMyProduct = async (req, res) => {
  try {
    const { product_id } = req.params;

    const product = await getSellerProduct(product_id, req.user.id);
    if (!product) {
      return res.status(400).json({
        status: false,
        data: {},
        message: "Something went wrong",
      });
    }

    return res.status(200).json({
      status: true,
      data: product,
      message: "Successful",
    });
  } catch (error) {
    console.error(error);
  }
};

//for seller to delete product

exports.deleteMyProduct = async (req, res) => {
  try {
    const { product_id, user_id } = req.body;

    const products = await deleteSellerProduct(product_id, user_id);
    if (!products) {
      return res.status(400).json({
        status: false,
        data: {},
        message: "Something went wrong",
      });
    }

    return res.status(200).json({
      status: true,
      data: products,
      message: "Successful",
    });
  } catch (error) {
    console.error(error);
  }
};

//update seller products
exports.updateMyProduct = async (req, res) => {
  try {
    const { quantity, price, product_id, user_id } = req.body;

    const product = await updateSellerProduct(
      quantity,
      price,
      product_id,
      user_id
    );

    if (!product) {
      return res.status(400).json({
        status: false,
        data: {},
        message: "Something went wrong",
      });
    }

    return res.status(200).json({
      status: true,
      data: product,
      message: "Successful",
    });
  } catch (error) {
    console.error(error);
  }
};

exports.addToCart = async (req, res) => {
  try {
    const { productName, productId, quantity, price } = req.body;

    const product = await addToCart(
      productName,
      productId,
      quantity,
      price,
      req.user.id
    );

    if (!product) {
      return res.status(400).json({
        status: false,
        data: {},
        message: "Something went wrong",
      });
    }

    return res.status(200).json({
      status: true,
      data: product,
      message: "Successful",
    });
  } catch (error) {
    console.error(error);
  }
};
