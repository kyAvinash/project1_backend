const express = require("express");
const app = express();
const PORT = 4000;

const cors = require("cors");
const corsOptions = {
  origin: "*",
  credentials: true,
  optionSuccessStatus: 200,
};

app.use(cors(corsOptions));

const { initializeDatabase } = require("./db/db.connect");

// read data from json file
//const fs = require("fs");

const Product = require("./models/bicycles.models");

app.use(express.json());

initializeDatabase();

// Uncomment this to seed data into database.

/*
const jsonData = fs.readFileSync("products.json", "utf8");

const products = JSON.parse(jsonData);
*/

// function to seed data.

/*
function seedData(){
  try{
    for(const productData of products){
      const newProduct = new Product({
        name: productData.name,
        type: productData.type,
        brand: productData.brand,
        model: productData.model,
        year: productData.year,
        price: productData.price,
        imageUrls: productData.imageUrls,
        description: productData.description,
        favorite: productData.favorite,
        availableInStock: productData.availableInStock,
        stockQuantity: productData.stockQuantity,
        categories: productData.categories,
        tags: productData.tags,
        weight: productData.weight,
        dimensions: productData.dimensions,
        material: productData.material,
        color: productData.color,
        size: productData.size,
        condition: productData.condition,
        warranty: productData.warranty,
        warrantyDuration: productData.warrantyDuration,
        shipping: productData.shipping,
        shippingCost: productData.shippingCost,
        shippingDuration: productData.shippingDuration,
        reviews: productData.reviews,
      });
      newProduct.save(); 
    }
  }catch(error){
    console.error("Error seeding data", error);
  }
}

//seedData();
*/

// Get all products
async function getAllProducts() {
  try {
    const allProducts = await Product.find();
    return allProducts;
  } catch (error) {
    return error;
  }
}

app.get("/products", async (req, res) => {
  try {
    const products = await getAllProducts();
    if (products.length != 0) {
      res.json(products);
    } else {
      res.status(404).json({ message: "No products found" });
    }
  } catch (error) {
    res.status(500).json({ error: "Error getting products" });
  }
});

async function getProductsByType(productType) {
  try {
    const products = await Product.find({ type: productType });
    return products;
  } catch (error) {
    throw error;
  }
}

app.get("/products/type/:type", async (req, res) => {
  try {
    const products = await getProductsByType(req.params.type);
    if (products.length != 0) {
      res.json(products);
    } else {
      res.status(404).json({ message: "No products found" });
    }
  } catch (error) {
    res.status(500).json({ error: "Error getting products" });
  }
});

async function getProductsByBrand(productBrand) {
  try {
    const products = await Product.find({ brand: productBrand });
    return products;
  } catch (error) {
    throw error;
  }
}

app.get("/products/brand/:brand", async (req, res) => {
  try {
    const products = await getProductsByBrand(req.params.brand);
    if (products.length != 0) {
      res.json(products);
    } else {
      res.status(404).json({ message: "No products found" });
    }
  } catch (error) {
    res.status(500).json({ error: "Error getting products" });
  }
});

async function getProductsByModel(productModel) {
  try {
    const products = await Product.find({ model: productModel });
    return products;
  } catch (error) {
    throw error;
  }
}

app.get("products/model/:model", async (req, res) => {
  try {
    const products = await getProductsByModel(req.params.model);
    if (products.length != 0) {
      res.json(products);
    } else {
      res.status(404).json({ message: "No products found" });
    }
  } catch (error) {
    res.status(500).json({ error: "Error getting products" });
  }
});

async function getProductsByYear(productYear){
  try{
    const products = await Product.find({ year: productYear });
    return products;
  }catch(error){
    throw error;
  }
}

app.get("/products/year/:year", async (req, res) =>{
  try{
    const products = await getProductsByYear(req.params.year);
    if(products.length != 0){
      res.json(products);
    }else{
      res.status(404).json({message: "No products found"});
    }
  }catch(error){
    res.status(500).json({error: "Error getting products"});
  }
})

async function getProductsByPrice(productPrice){
  try{
    const products = await Product.find({ price: productPrice });
    return products;
  }catch(error){
    throw error;
  }
}

app.get("/products/price/:price", async (req, res) =>{
  try{
    const products = await getProductsByPrice(req.params.price);
    if(products.length != 0){
      res.json(products);
    }else{
      res.status(404).json({message: "No products found"});
    }
  }catch(error){
    res.status(500).json({error: "Error getting products"});
  }
})

async function getProductById(productId) {
  try {
    const product = await Product.findById(productId);
    return product;
  } catch (error) {
    throw error;
  }
}

app.get("/products/:id", async (req, res) => {
  try {
    const product = await getProductById(req.params.id);
    if (product) {
      res.json(product);
    } else {
      res.status(404).json({ message: "No product found" });
    }
  } catch (error) {
    res.status(500).json({ error: "Error getting products" });
  }
});


app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
