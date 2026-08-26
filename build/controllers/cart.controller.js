"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.removeFromCart = exports.updateCartItem = exports.getMyCarts = exports.addToCart = void 0;
const cart_model_1 = require("../models/cart.model");
// Add to Cart || POST /api/cart || Private
const addToCart = async (req, res) => {
    try {
        const { martId, productId, quantity } = req.body;
        const customerId = req.user._id;
        let cart = await cart_model_1.Cart.findOne({ customerId, martId });
        if (cart) {
            const itemIndex = cart.items.findIndex(p => p.productId.toString() === productId);
            if (itemIndex > -1) {
                cart.items[itemIndex].quantity += quantity;
            }
            else {
                cart.items.push({ productId, quantity });
            }
            cart = await cart.save();
        }
        else {
            cart = await cart_model_1.Cart.create({
                customerId,
                martId,
                items: [{ productId, quantity }],
            });
        }
        res.status(200).json(cart);
    }
    catch (error) {
        res.status(500).json({ message: 'Server Error', error });
    }
};
exports.addToCart = addToCart;
// Get Customer Carts || GET /api/cart || Private
const getMyCarts = async (req, res) => {
    try {
        const customerId = req.user._id;
        const carts = await cart_model_1.Cart.find({ customerId })
            .populate('martId', 'name logo')
            .populate('items.productId', 'name price images');
        res.status(200).json(carts);
    }
    catch (error) {
        res.status(500).json({ message: 'Server Error', error });
    }
};
exports.getMyCarts = getMyCarts;
// Update Cart Item || PUT /api/cart/:productId || Private
const updateCartItem = async (req, res) => {
    try {
        const { quantity } = req.body;
        const customerId = req.user._id;
        const productId = req.params.productId;
        const cart = await cart_model_1.Cart.findOne({ customerId, "items.productId": productId });
        if (cart) {
            const itemIndex = cart.items.findIndex(p => p.productId.toString() === productId);
            if (itemIndex > -1) {
                cart.items[itemIndex].quantity = quantity;
                await cart.save();
                return res.status(200).json(cart);
            }
        }
        res.status(404).json({ message: 'Item not found in any cart' });
    }
    catch (error) {
        res.status(500).json({ message: 'Server Error', error });
    }
};
exports.updateCartItem = updateCartItem;
// Remove from Cart || DELETE /api/cart/:productId || Private
const removeFromCart = async (req, res) => {
    try {
        const customerId = req.user._id;
        const productId = req.params.productId;
        const cart = await cart_model_1.Cart.findOne({ customerId, "items.productId": productId });
        if (cart) {
            cart.items = cart.items.filter(item => item.productId.toString() !== productId);
            // If cart is empty after removing, maybe delete the cart
            if (cart.items.length === 0) {
                await cart_model_1.Cart.findByIdAndDelete(cart._id);
                return res.status(200).json({ message: 'Cart deleted as it is empty' });
            }
            else {
                await cart.save();
                return res.status(200).json(cart);
            }
        }
        res.status(404).json({ message: 'Item not found in cart' });
    }
    catch (error) {
        res.status(500).json({ message: 'Server Error', error });
    }
};
exports.removeFromCart = removeFromCart;
