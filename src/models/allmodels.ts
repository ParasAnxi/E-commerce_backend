const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    password: { type: String, required: true },
    role: {
      type: String,
      enum: ["admin", "martOwner", "customer"],
      default: "customer",
    },
    phone: { type: String, trim: true },
    address: {
      street: String,
      city: String,
      state: String,
      zipCode: String,
      country: String,
    },
    isActive: { type: Boolean, default: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", userSchema);


const martSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    description: { type: String },
    ownerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      unique: true, // Guarantees one mart per martOwner (remove if one owner can have multiple)
    },
    logo: { type: String }, // Image URL
    banner: { type: String },
    address: {
      street: { type: String, required: true },
      city: { type: String, required: true },
      state: { type: String, required: true },
      zipCode: { type: String, required: true },
      country: { type: String, required: true },
    },
    isApproved: { type: Boolean, default: false }, // Admin approval workflow
    isOpen: { type: Boolean, default: true },
  },
  { timestamps: true }
);

// Index for geo/city queries
martSchema.index({ "address.city": 1, isApproved: 1 });

module.exports = mongoose.model("Mart", martSchema);

const productSchema = new mongoose.Schema(
  {
    martId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Mart",
      required: true,
      index: true,
    },
    name: { type: String, required: true, trim: true },
    description: { type: String },
    category: { type: String, required: true, index: true },
    price: { type: Number, required: true, min: 0 },
    stock: { type: Number, required: true, min: 0, default: 0 },
    images: [{ type: String }],
    isAvailable: { type: Boolean, default: true },
  },
  { timestamps: true }
);

// Compound index for fast browsing within a specific mart
productSchema.index({ martId: 1, category: 1, isAvailable: 1 });

module.exports = mongoose.model("Product", productSchema);

const orderItemSchema = new mongoose.Schema({
  productId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Product",
    required: true,
  },
  name: { type: String, required: true }, // Saved in case product name changes
  price: { type: Number, required: true }, // Fixed historical price at time of purchase
  quantity: { type: Number, required: true, min: 1 },
});

const orderSchema = new mongoose.Schema(
  {
    customerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },
    martId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Mart",
      required: true,
      index: true,
    },
    items: [orderItemSchema],
    totalAmount: { type: Number, required: true },
    shippingAddress: {
      street: String,
      city: String,
      state: String,
      zipCode: String,
      country: String,
    },
    status: {
      type: String,
      enum: [
        "pending",
        "confirmed",
        "processing",
        "out_for_delivery",
        "delivered",
        "cancelled",
      ],
      default: "pending",
    },
    paymentStatus: {
      type: String,
      enum: ["pending", "paid", "failed", "refunded"],
      default: "pending",
    },
    paymentMethod: {
      type: String,
      enum: ["card", "cod", "upi", "wallet"],
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Order", orderSchema);

const cartItemSchema = new mongoose.Schema({
  productId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Product",
    required: true,
  },
  quantity: { type: Number, required: true, min: 1 },
});

const cartSchema = new mongoose.Schema(
  {
    customerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      unique: true,
    },
    martId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Mart",
      required: true,
    }, // Restricts cart items to a single mart at a time
    items: [cartItemSchema],
  },
  { timestamps: true }
);

module.exports = mongoose.model("Cart", cartSchema);