// console.log("Hello from TypeScript!");
import express, { Request, Response } from 'express';
import { Product } from './Product';
import { v4 as uuidv4 } from 'uuid'; 
import { Update } from './Update';
import connectDB from './db';  // ✅ Import only
import ProductModel from './models/Product';
import dotenv from 'dotenv';

dotenv.config(); // ✅ Load environment variables

connectDB(); // ✅ Connect to MongoDB

const app = express();
const port = process.env.PORT || 3000;
app.use(express.json());

let products: Product[] = [
  {
    id_: uuidv4(),
    id: '1',
    title: 'Sample Product',
    image: 'https://example.com/image.jpg',
    price: 99.99,
    link: 'https://example.com/product'
  }
];

// Home route
app.get('/', (req: Request, res: Response) => {
  res.send('Hello from Express with TypeScript!');
});

// READ all products
app.get('/products', async (req: Request, res: Response) => {
  try {
    const products = await ProductModel.find();
    res.json(products);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch products' });
  }
});

// CREATE a new product
app.post('/product', async (req: Request, res: Response) => {
  try {
    const newProduct = new ProductModel({ id_: uuidv4(), ...req.body });
    const savedProduct = await newProduct.save();
    res.status(201).json(savedProduct);
  } catch (error) {
    res.status(500).json({ error: 'Failed to create product' });
  }
});

// UPDATE a product by id_
app.put('/products/:id_', async (req: Request, res: Response) => {
  try {
    const updatedProduct = await ProductModel.findOneAndUpdate(
      { id_: req.params.id_ },
      req.body,
      { new: true }
    );
    if (!updatedProduct)
      return res.status(404).json({ error: 'Product not found' });
    res.json(updatedProduct);
  } catch (error) {
    res.status(500).json({ error: 'Failed to update product' });
  }
});

// DELETE a product by id_
app.delete('/products/:id_', async (req: Request, res: Response) => {
  try {
    const deletedProduct = await ProductModel.findOneAndDelete({ id_: req.params.id_ });
    if (!deletedProduct)
      return res.status(404).json({ error: 'Product not found' });
    res.json({ message: 'Product deleted', product: deletedProduct });
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete product' });
  }
});

app.listen(port, () => {
  console.log(`🚀 Server is running on http://localhost:${port}`);
});
