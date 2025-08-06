import mongoose, { Document } from 'mongoose';

export interface IProduct extends Document {
  id_: string;
  id: string;
  title: string;
  image: string;
  price: number;
  link: string;
}

const productSchema = new mongoose.Schema<IProduct>({
  id_: { type: String, required: true },
  id: { type: String, required: true, unique: true },  // required for update/delete to work
  title: { type: String, required: true },
  image: String,
  price: Number,
  link: String,
});

const ProductModel = mongoose.model<IProduct>('Product', productSchema);
export default ProductModel;
