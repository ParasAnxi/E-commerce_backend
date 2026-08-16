import mongoose, { Document, Schema } from 'mongoose';

export interface IProduct extends Document {
    martId: string;
    name: string;
    weight: string;
    price: number;
    originalPrice: number;
    discountPercentage: number;
    rating: number;
    reviews: number;
    brand: string;
    type: string;
    description: string;
    imageUrl: string;
    categoryId: string;
}

const productSchema = new Schema<IProduct>(
    {
        martId: { type: String, required: true },
        name: { type: String, required: true, trim: true },
        weight: { type: String, required: true },
        price: { type: Number, required: true, min: 0 },
        originalPrice: { type: Number, required: true, min: 0 },
        discountPercentage: { type: Number, default: 0, min: 0, max: 100 },
        rating: { type: Number, default: 0, min: 0, max: 5 },
        reviews: { type: Number, default: 0, min: 0 },
        brand: { type: String, required: true, trim: true },
        type: { type: String, required: true, trim: true },
        description: { type: String, required: true },
        imageUrl: { type: String, required: true },
        categoryId: { type: String, required: true },
    },
    {
        timestamps: true,
    }
);

productSchema.index({ name: 'text', description: 'text', brand: 'text' });

export const Product = mongoose.model<IProduct>('Product', productSchema);
