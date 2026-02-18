import React, { useState, useEffect } from 'react'
import JewelleryCard from './JewelleryCard'
import { IoIosSearch } from "react-icons/io";
import { FcLike, FcLikePlaceholder } from "react-icons/fc";
import { TfiReload } from "react-icons/tfi";
import { FaMinus } from "react-icons/fa6";
import { FaPlus } from "react-icons/fa6";
import { useLocation, useParams } from 'react-router-dom';
import { FaFacebook } from "react-icons/fa";
import { FaTwitter } from "react-icons/fa";
import { FaWhatsapp } from "react-icons/fa";
import { FaPinterestP } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import StarRatings from './StarRatings';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';
import axios from "axios";



function ProductDetail() {

    //useParams() is a React Router hook that lets you read values from the URL.-->/product/12,Here, 12 is a parameter.

    const { id } = useParams();

    //find products from Products array

    // const product = Products.find((item) => item.id === Number(id));

    const location = useLocation();
    const [product, setProduct] = useState(null);
    const [quantity, setQuantity] = useState(1);
    const [rating, setRating] = useState(0);
    const [activeTab, setActiveTab] = useState(location.state && location.state?.openReviews ? "reviews" : "details");
    const [loading, setLoading] = useState(false);
    const { addToCart } = useCart();
    const { wishlistItems, addToWishlist, removeFromWishlist, isInWishlist } = useWishlist();
    const [showImage, setShowImage] = useState(false);
    const [reviewLoading, setReviewLoading] = useState(false);
    const [reviewError, setReviewError] = useState("");
    const [allProducts, setAllProducts] = useState([]);
    const [canReview, setCanReview] = useState(false);
    // const [currentUser,setCurrentUser] = useState(null);

    useEffect(() => {
        fetch(`http://localhost:5000/products/${id}`)

            .then(res => res.json())
            .then(data => setProduct(data))
            .catch(err => console.error(err));
    }, [id]);


    useEffect(() => {
        axios.get("http://localhost:5000/products")
            .then(res => setAllProducts(res.data))
            .catch(err => console.error(err));
    }, []);


    useEffect(() => {

        const checkReviewPermission = async () => {

            try {

                const token = localStorage.getItem("token")

                const { data } = await axios.get(`http://localhost:5000/api/orders/can-review/${id}`, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    },
                });

                setCanReview(data.canReview);

            } catch (err) {
                console.log(err);
                setCanReview(false);
            }
        }

        checkReviewPermission();

    }, [id]);


    // useEffect(()=>{
    //     axios,get("http://localhost:5000/api/auth/login"),{
    //         headers: {
    //             Authorization: `Bearer ${token}`,
    //         },
    //     }
    // })

    const submitReviewHandler = async (e) => {
        e.preventDefault();

        if (rating === 0) {
            setReviewError("Please select a rating");
            return;
        }

        const form = e.target;

        const reviewData = {
            userId: currentUser._id,
            rating,
            comment: form.review.value,
        };

        try {
            setReviewLoading(true);
            setReviewError("");

            const { data } = await axios.post(
                `http://localhost:5000/products/${product._id}/reviews`,
                reviewData,
                {
                    headers: {
                        "Content-Type": "application/json",
                    },
                }
            );


            // Update product reviews instantly
            setProduct((prev) => ({
                ...prev,
                reviews: data.reviews,
                averageRating: data.averageRating,
                numReviews: data.reviews.length,
            }));

            // Reset form
            form.reset();
            setRating(0);

        } catch (error) {
            setReviewError(
                error.response?.data?.message || "Failed to submit review"
            );
        } finally {
            setReviewLoading(false);
        }
    };



    const increment = () => {
        setQuantity(prev => prev + 1);
    }

    const decrement = () => {
        setQuantity(prev => (prev > 1 ? prev - 1 : 1));
    }

    if (!product) {
        return <div className="p-6">Loading...</div>;
    }

    // "" | "details" | "reviews"
    // Make sure Products exists and filter out the current product
    // const otherProducts = Products.filter(item => item.id !== product.id);
    // const productsToShow = otherProducts.slice(0, 4); // shows max 6 products



    const handleAddToCart = async () => {
        setLoading(true);
        await addToCart({ ...product, quantity });
        setLoading(false);
    };


    const handleWishlistClick = () => {
        if (isInWishlist(product._id || product.id)) {
            removeFromWishlist(product._id || product.id);
        } else {
            addToWishlist(product);
        }
    };


    const productsToShow = allProducts
        .filter(p => p._id !== product._id) // exclude current product
        .filter(p => p.category?.name === product.category?.name) // same category
        .slice(0, 8); // show max 6 products


    const hasReviewed = product.reviews?.some(
        (rev) => rev.userId === currentUser._id
    );


    return (
        <div className='mt-10'>
            <div className="flex flex-col lg:flex-row gap-6 lg:gap-10 items-start px-4 sm:px-6 lg:pl-55">
                <div className="relative w-full sm:w-[450px] lg:w-[600px] 
                h-[350px] sm:h-[500px] lg:h-[700px] 
                overflow-hidden rounded-2xl cursor-pointer">

                    <img
                        src={product.image}
                        alt={product.title}
                        className="w-full h-full object-fill rounded-2xl"
                    />

                    <button
                        onClick={() => setShowImage(true)}
                        className="absolute top-6 right-6 bg-gray-200 p-4 rounded-full cursor-pointer hover:bg-gray-300 shadow-md"
                    >
                        <IoIosSearch className="text-2xl text-gray-700" />
                    </button>
                </div>

                <div className="flex flex-col gap-3 border border-gray-200 rounded-lg p-4 
                w-full sm:w-[600px] lg:w-[700px] 
                h-auto lg:h-[700px]">

                    <h1 className="text-2xl font-semibold text-gray-900 leading-snug">
                        {product.title}
                    </h1>

                    <h1 className="text-xl font-bold text-blue-900 mt-1">
                        ₹{product.price}
                    </h1>

                    <p className="text-gray-600 text-lg font-semibold leading-relaxed mt-3 ">{product.description}</p>

                    {product.stock > 0 ? (
                        <h1 className="text-green-600 text-lg font-medium mt-5">
                            In Stock
                        </h1>
                    ) : (
                        <h1 className="text-red-600 text-lg font-medium mt-5">
                            Out of Stock
                        </h1>
                    )}

                    <div className="flex flex-wrap gap-4 mt-6">

                        <div className="flex items-center border border-gray-300 rounded-md px-6 py-4 hover:border-black transition-colors">
                            <button className="px-3 py-1 cursor-pointer" onClick={decrement}><FaMinus /></button>
                            <span className="px-4 text-xl">{quantity}</span>
                            <button className="px-3 py-1 cursor-pointer" onClick={increment}><FaPlus /></button>
                        </div>


                        <button
                            onClick={handleWishlistClick}
                            className="bg-gray-200 px-3 py-2 rounded-md hover:bg-gray-300 transition-colors shadow-sm cursor-pointer hover:shadow-md flex items-center justify-center">
                            {isInWishlist(product._id || product.id) ? (
                                <FcLike className="text-2xl text-red-500" />
                            ) : (
                                <FcLikePlaceholder className="text-2xl" />
                            )}
                        </button>


                        <button className="bg-gray-200 px-3 py-2 rounded-md hover:bg-gray-300 transition-colors shadow-sm cursor-pointer hover:shadow-md flex items-center justify-center">
                            <TfiReload className="text-2xl" />
                        </button>
                    </div>

                    <button
                        className={`w-60 py-3 rounded-md mt-8 transition duration-300 shadow-md
    ${product.stock > 0
                                ? "bg-blue-900 hover:bg-blue-800 cursor-pointer text-white"
                                : "bg-gray-400 cursor-not-allowed text-white"}
  `}
                        onClick={handleAddToCart}
                        disabled={loading || product.stock <= 0}
                    >
                        {product.stock > 0 ? (loading ? "Adding..." : "Add to Cart") : "Out of Stock"}
                    </button>


                    <p className='text-xl font-semibold text-gray-800 mt-4'>
                        Categories:<span className="text-gray-600 ml-2">{product.category?.name}</span>
                    </p>

                    <div className="flex items-center gap-5 mt-6">
                        <h1 className="mr-2 font-semibold text-gray-700 text-2xl">Share:</h1>
                        <FaFacebook size={40} className="text-2xl cursor-pointer hover:text-blue-600  hover:scale-105 transition-all duration-300" />
                        <FaTwitter size={40} className="text-2xl cursor-pointer hover:text-blue-400 hover:scale-105 transition-all duration-300" />
                        <FaWhatsapp size={40} className="text-2xl cursor-pointer hover:text-green-500 hover:scale-105 transition-all duration-300" />
                        <FaPinterestP size={40} className="text-2xl cursor-pointer hover:text-red-500 hover:scale-105 transition-all duration-300" />
                        <MdEmail size={40} className="text-2xl cursor-pointer hover:text-gray-800 hover:scale-105 transition-all duration-300" />
                    </div>
                </div>
            </div>

            <div className="flex flex-col border border-gray-300 
                w-full sm:w-[600px] lg:w-[700px] 
                mt-10 
                mx-auto lg:ml-20 xl:ml-[215px] 
                hover:border-black h-auto">

                <div className="flex flex-wrap gap-4 sm:gap-6 lg:gap-9">
                    <div className={`cursor-pointer mt-5 ml-3 sm:mt-7 sm:ml-7
 text-xl font-semibold ${activeTab === "details" ? "border-b-3 border-black" : "border-b-2 border-transparent"}`}
                        onClick={() => setActiveTab("details")}>
                        <h1>Details</h1>
                    </div>

                    <div className={`cursor-pointer mt-5 ml-3 sm:mt-7 sm:ml-7
 text-xl font-semibold ${activeTab === "reviews" ? "border-b-3 border-black" : "border-b-2 border-transparent"}`}
                        onClick={() => setActiveTab("reviews")}>
                        <h1>Reviews({product.numReviews || 0})</h1>
                    </div>

                    <div className={`cursor-pointer mt-5 ml-3 sm:mt-7 sm:ml-7
 text-xl font-semibold ${activeTab === "moreproducts" ? "border-b-3 border-black" : "border-b-2 border-transparent"}`}
                        onClick={() => setActiveTab("moreproducts")}>
                        <h1>More Products</h1>
                    </div>
                </div>

                {/* details tab */}

                {
                    activeTab === "details" && (
                        <div className='p-5 border-t border-gray-300 text-gray-700'>
                            <p className="mt-2 text-lg">Free shipping on all orders</p>
                            <p className="mt-2 text-lg">30-day return policy</p>
                            <p className="mt-2 text-lg">Customer support available 24/7</p>
                            <p className="mt-2 text-lg">Made with high-quality materials</p>
                            <p className="mt-2 text-lg">Secure online payment</p>
                        </div>
                    )
                }

                {/* review tab */}
                {
                    activeTab === "reviews" && (
                        <div className='mt-3 p-6'>

                            {(!product.reviews || product.reviews.length === 0) && (
                                <h1 className='text-lg text-gray-600 font-semibold'>
                                    There are no reviews yet.
                                </h1>
                            )}

                            <h1 className='text-lg text-gray-800 font-semibold mt-3'>
                                Be the first to review "{product.title}"
                            </h1>
                           

                            {product.reviews && product.reviews.length > 0 && (
                                <div className="mb-6 space-y-4 mt-5">
                                    {product.reviews.map((rev, index) => (
                                        <div key={index} className="border-b pb-3">
                                            <div className="flex items-center gap-2">
                                                <strong>{rev.userName}</strong>
                                                <span className="text-sm text-gray-500">
                                                    ({rev.rating} ★)
                                                </span>
                                            </div>
                                            <p className="text-gray-700 mt-3">{rev.comment}</p>
                                        </div>
                                    ))}
                                </div>
                            )}

                            {/* Conditional rendering for review form */}
                            {canReview ? (
                                !hasReviewed ? (
                                    <form
                                        className="flex flex-col gap-4 mt-5 max-w-[520px]"
                                        onSubmit={submitReviewHandler}
                                    >
                                        <div className="flex items-center gap-4 mt-2">
                                            <h1 className='mt-2 text-gray-800 text-xl flex items-center font-semibold'>
                                                Your rating
                                                <span className="text-red-500 ml-2 text-3xl align-middle">*</span>
                                            </h1>

                                            <StarRatings rating={rating} setRating={setRating} />
                                        </div>

                                        <h1 className='mt-5 text-xl font-semibold text-gray-800 flex items-center'>
                                            Your review
                                            <span className="text-red-500 ml-2 text-3xl align-middle">*</span>
                                        </h1>

                                        <textarea
                                            name="review"
                                            id="review"
                                            placeholder="Write your review here..."
                                            className="w-full text-xl max-w-[520px] bg-gray-100 border border-transparent rounded-md px-3 py-2 mt-5 
               focus:outline-none focus:border-black hover:border-black transition-colors resize-y"
                                        />

                                        <button
                                            type="submit"
                                            className="bg-blue-900 text-white text-xl font-semibold w-max px-10 py-3 rounded-md cursor-pointer mt-8 hover:bg-blue-800 transform hover:scale-105 transition duration-300 shadow-md"
                                        >
                                            Submit
                                        </button>

                                        {reviewLoading && (
                                            <p className="text-blue-600 font-semibold mt-2">
                                                Submitting review...
                                            </p>
                                        )}

                                        {reviewError && (
                                            <p className="text-red-600 font-semibold mt-2">
                                                {reviewError}
                                            </p>
                                        )}

                                    </form>
                                ) : (
                                    <p className="text-green-600 font-semibold mt-5">Thank you for your review</p>
                                )
                            ) : (
                                <p className="text-gray-600 mt-5 text-xl font-semibold">
                                    Only customers who have purchased and received this product can leave a review.
                                </p>
                            )}

                        </div>
                    )
                }

                {/* moreproducts tab */}

                {activeTab === "moreproducts" && (
                    <div
                        className="p-5 border-t border-gray-300 
grid grid-cols-1 sm:grid-cols-2 gap-4 overflow-y-auto
"
                        style={{
                            height: "320px" // height of ONE row (2 products), rest scrolls
                        }}

                    >
                        {productsToShow.length > 0 ? (
                            productsToShow.map((item) => (
                                <JewelleryCard
                                    key={item._id}
                                    id={item._id}
                                    image={item.image}
                                    title={item.title}
                                    price={item.price}
                                    small={true}
                                />
                            ))
                        ) : (
                            <p className="text-gray-600">No other products available.</p>
                        )}
                    </div>
                )}


            </div>


            {showImage && (
                <div
                    className="fixed inset-0 bg-black bg-opacity-80 z-50 flex items-center justify-center"
                    onClick={() => setShowImage(false)}
                >
                    <div
                        className="relative w-full h-full flex items-center justify-center p-6"
                        onClick={(e) => e.stopPropagation()} // prevent close on image click
                    >
                        <img
                            src={product.image}
                            alt={product.title}
                            className="max-w-full max-h-full object-contain"
                        />

                        {/* Close button */}
                        <button
                            onClick={() => setShowImage(false)}
                            className="absolute -top-4 -right-4 bg-white text-black w-10 h-10 rounded-full text-xl font-bold shadow-md hover:bg-gray-200"
                        >
                            ✕
                        </button>
                    </div>
                </div>
            )}

        </div>
    )
}

export default ProductDetail