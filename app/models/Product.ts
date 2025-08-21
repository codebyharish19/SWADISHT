import mongoose, { Schema, model, models } from "mongoose";

export interface IProduct {
  name: string;
  description: string;
  price: number;
  category: string;
  imageUrl: string; // URL to the product image
  _id?: mongoose.Types.ObjectId;
  createdAt?: Date;
  updatedAt?: Date;
}

const productSchema = new Schema<IProduct>(
  {
    name: { type: String, required: true, unique: true },
    description: { type: String, required: true },
    price: { type: Number, required: true, min: 0 },
    category: { type: String, required: true },
    imageUrl: { type: String, required: true },
  },
  { timestamps: true }
);

// Create or get the product model
const Product = models?.Product || model<IProduct>("Product", productSchema);

export default Product;
