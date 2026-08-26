import mongoose, { Document, Schema } from 'mongoose';
import { IAddress, addressSchema } from './user.model';
import { IUser } from './user.model';

export interface IMart extends Document {
    name: string;
    description?: string;
    ownerId: mongoose.Types.ObjectId | IUser;
    logo?: string;
    banner?: string;
    address: IAddress;
    isApproved: boolean;
    isOpen: boolean;
    createdAt: string;
    updatedAt: string;
}

const martSchema = new Schema<IMart>(
    {
        name: { type: String, required: true, trim: true },
        description: { type: String, trim: true },
        ownerId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
        logo: { type: String },
        banner: { type: String },
        address: { type: addressSchema, required: true },
        isApproved: { type: Boolean, default: false },
        isOpen: { type: Boolean, default: true },
    },
    {
        timestamps: true,
    }
);

martSchema.index({ name: 'text', description: 'text' });

export const Mart = mongoose.model<IMart>('Mart', martSchema);
