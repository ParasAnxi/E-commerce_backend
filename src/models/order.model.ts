import mongoose, { Document, Schema } from 'mongoose';
import { IAddress, addressSchema, IUser } from './user.model';
import { IMart } from './mart.model';
import { IProduct } from './product.model';

export type OrderStatus = "pending" | "confirmed" | "processing" | "out_for_delivery" | "delivered" | "cancelled";
export type PaymentStatus = "pending" | "paid" | "failed" | "refunded";
export type PaymentMethod = "card" | "cod" | "upi" | "wallet";

export interface IOrderItem extends Document {
    productId: mongoose.Types.ObjectId | IProduct;
    name: string;
    price: number;
    quantity: number;
}

export interface IOrder extends Document {
    customerId: mongoose.Types.ObjectId | IUser;
    martId: mongoose.Types.ObjectId | IMart;
    items: IOrderItem[];
    totalAmount: number;
    shippingAddress: IAddress;
    status: OrderStatus;
    paymentStatus: PaymentStatus;
    paymentMethod: PaymentMethod;
    createdAt: string;
    updatedAt: string;
}

const orderItemSchema = new Schema<IOrderItem>({
    productId: { type: Schema.Types.ObjectId, ref: 'Product', required: true },
    name: { type: String, required: true },
    price: { type: Number, required: true },
    quantity: { type: Number, required: true, min: 1 },
});

const orderSchema = new Schema<IOrder>(
    {
        customerId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
        martId: { type: Schema.Types.ObjectId, ref: 'Mart', required: true },
        items: [orderItemSchema],
        totalAmount: { type: Number, required: true, min: 0 },
        shippingAddress: { type: addressSchema, required: true },
        status: { 
            type: String, 
            enum: ["pending", "confirmed", "processing", "out_for_delivery", "delivered", "cancelled"], 
            default: "pending" 
        },
        paymentStatus: { 
            type: String, 
            enum: ["pending", "paid", "failed", "refunded"], 
            default: "pending" 
        },
        paymentMethod: { 
            type: String, 
            enum: ["card", "cod", "upi", "wallet"], 
            required: true 
        },
    },
    {
        timestamps: true,
    }
);

export const Order = mongoose.model<IOrder>('Order', orderSchema);
