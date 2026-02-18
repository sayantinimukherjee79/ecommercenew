import Cart from "../models/cartModel.js";
import Product from "../models/Product.js";


//add product to cart

export const addToCart = async (req, res) => {
    try {

        const { productId, quantity = 1 } = req.body;
        const userId = req.user._id;

        if (!productId) {
            return res.status(400).json({ message: "productId is required" });
        }

        let qty = quantity && quantity > 0 ? quantity : 1;


        let cart = await Cart.findOne({ user: userId });

        if (cart) {

            (cart.items || []).forEach((item, index) => {
                if (!item.product) console.warn(`Cart item at index ${index} has undefined product`);
            });

        }



        if (!cart) {

            //create new cart , if cart does not exist
            cart = new Cart({ user: userId, items: [{ product: productId, quantity: qty }] });


        } else {
            //check if product exists in cart

            const itemsIndex = cart.items.findIndex(item => item.product && item.product.toString() === productId);
            if (itemsIndex > -1) {
                cart.items[itemsIndex].quantity += qty;
            } else {
                cart.items.push({ product: productId, quantity });
            }
        }

        await cart.save();
        res.status(200).json(cart);

        await Product.findByIdAndUpdate(productId, { $inc: {  cartCount: 1 } });

    } catch (error) {

        res.status(500).json({ message: error.message });

    }
};


//get users cart items

export const getCart = async (req, res) => {
    try {
        const userId = req.user._id;

        const cart = await Cart.findOne({ user: userId })
            .populate({ path: "items.product", model: "Product", select: "title price description image " });

        if (!cart) return res.status(200).json([]);

        // Flatten items for frontend
        const items = cart.items.map(item => ({
            _id: item.product._id,      // product id
            title: item.product.title,   // product title
            price: item.product.price,   // product price
            image: item.product.image,   // product image
            quantity: item.quantity      // cart quantity
        }));

        res.status(200).json(items);

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};



//update quantity of a product in the cart

export const updateCartItem = async (req, res) => {
    try {

        const userId = req.user._id;
        const { productId, quantity } = req.body;

        if (quantity < 1) {

            return res.status(400).json({ message: "quantity must be at least 1" });
        }

        const cart = await Cart.findOne({ user: userId });

        if (!cart)
            return res.status(404).json({ message: "cart not found" });

        const itemIndex = cart.items.findIndex(
            (item) => item.product.toString() === productId
        );

        if (itemIndex === -1)
            return res.status(404).json({ message: "Product not found in cart" });

        cart.items[itemIndex].quantity = quantity;
        await cart.save();

        //populate product details for response

        await cart.populate({
            path: "items.product",
            model: "Product",
            select: "title price description"
        });

        res.status(200).json(cart.items);

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

//remove items from the cart

export const removeCartItem = async (req, res) => {
    try {

        const userId = req.user._id;
        const { productId } = req.body;

        const cart = await Cart.findOne({ user: userId });

        if (!cart) return res.status(404).json({ message: "Cart not found" });

        //filter out the product to remove

        cart.items = cart.items.filter(
            (item) => item.product.toString() !== productId
        );

        await cart.save();

         await Product.findByIdAndUpdate(productId, { $inc: {  cartCount: -1 } });
         
        //populate product details for response

        await cart.populate({

            path: "items.product",
            model: "Product",
            select: "title price description"

        });

        res.status(200).json(cart.items);

    } catch (error) {

        res.status(500).json({ message: error.message })
    };
}