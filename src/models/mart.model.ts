import mongoose, { Document, Schema } from 'mongoose';

export interface IMart extends Document {
    name: string;
    rating: number;
    reviews: number;
    deliveryTime: string;
    isFreeDelivery: boolean;
    minOrderFreeDelivery: number;
    imageUrl: string;
    address?: string;
}

const martSchema = new Schema<IMart>(
    {
        name: { type: String, required: true, trim: true },
        rating: { type: Number, default: 0, min: 0, max: 5 },
        reviews: { type: Number, default: 0, min: 0 },
        deliveryTime: { type: String, required: true },
        isFreeDelivery: { type: Boolean, required: true, default: false },
        minOrderFreeDelivery: { type: Number, default: 0, min: 0 },
        imageUrl: { type: String, required: true },
        address: { type: String, trim: true },
    },
    {
        timestamps: true,
    }
);

martSchema.index({ name: 'text', address: 'text' });

export const Mart = mongoose.model<IMart>('Mart', martSchema);
