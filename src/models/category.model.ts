import mongoose, { Document, Schema } from 'mongoose';

export interface ICategory extends Document {
    name: string;
    iconUrl: string;
}

const categorySchema = new Schema<ICategory>(
    {
        name: { type: String, required: true, trim: true, unique: true },
        iconUrl: { type: String, required: true },
    },
    {
        timestamps: true,
    }
);

categorySchema.index({ name: 'text' });

export const Category = mongoose.model<ICategory>('Category', categorySchema);
