import mongoose, { Document, Schema } from 'mongoose';
import { IProduct } from './product.model';
import { IMart } from './mart.model';
import { IUser } from './user.model';

export interface ICartItem extends Document {
    productId: mongoose.Types.ObjectId | IProduct;
    quantity: number;
}

export interface ICart extends Document {
    customerId: mongoose.Types.ObjectId | IUser;
    martId: mongoose.Types.ObjectId | IMart;
    items: ICartItem[];
    createdAt: string;
    updatedAt: string;
}

const cartItemSchema = new Schema<ICartItem>({
    productId: { type: Schema.Types.ObjectId, ref: 'Product', required: true },
    quantity: { type: Number, required: true, min: 1 },
});

const cartSchema = new Schema<ICart>(
    {
        customerId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
        martId: { type: Schema.Types.ObjectId, ref: 'Mart', required: true },
        items: [cartItemSchema],
    },
    {
        timestamps: true,
    }
);

cartSchema.index({ customerId: 1, martId: 1 }, { unique: true });

export const Cart = mongoose.model<ICart>('Cart', cartSchema);
