import mongoose, { Document, Schema } from 'mongoose';
import { IUser } from './user.model';
import { IProduct } from './product.model';

export interface IWishlist extends Document {
    customerId: mongoose.Types.ObjectId | IUser;
    items: (mongoose.Types.ObjectId | IProduct)[];
    createdAt: string;
    updatedAt: string;
}

const wishlistSchema = new Schema<IWishlist>(
    {
        customerId: { type: Schema.Types.ObjectId, ref: 'User', required: true, unique: true },
        items: [{ type: Schema.Types.ObjectId, ref: 'Product' }],
    },
    {
        timestamps: true,
    }
);

export const Wishlist = mongoose.model<IWishlist>('Wishlist', wishlistSchema);
