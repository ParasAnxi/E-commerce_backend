import mongoose, { Document, Schema } from 'mongoose';
import { IMart } from './mart.model';

export interface IProduct extends Document {
    martId: mongoose.Types.ObjectId | IMart;
    name: string;
    description?: string;
    category: mongoose.Types.ObjectId | string;
    price: number;
    stock: number;
    images: string[];
    isAvailable: boolean;
    createdAt: string;
    updatedAt: string;
}

const productSchema = new Schema<IProduct>(
    {
        martId: { type: Schema.Types.ObjectId, ref: 'Mart', required: true },
        name: { type: String, required: true, trim: true },
        description: { type: String, trim: true },
        category: { type: Schema.Types.ObjectId, ref: 'Category', required: true },
        price: { type: Number, required: true, min: 0 },
        stock: { type: Number, required: true, min: 0, default: 0 },
        images: [{ type: String, required: true }],
        isAvailable: { type: Boolean, default: true },
    },
    {
        timestamps: true,
    }
);

productSchema.index({ name: 'text', description: 'text' });

export const Product = mongoose.model<IProduct>('Product', productSchema);
