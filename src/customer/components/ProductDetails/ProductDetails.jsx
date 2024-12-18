import { useEffect, useState } from 'react'
import { Button, Rating } from '@mui/material'
import { Radio, RadioGroup } from '@headlessui/react'
import HomeSectionCard from '../HomeSectionCard/HomeSectionCard'
import { useNavigate, useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { findProductById, getAllProducts } from '../../../State/Product/Action'
import { addItemToCart } from '../../../State/Cart/Action'
import { getAllRatingByProduct } from '../../../State/Rating/Action'
import { getAllReviewByProduct } from '../../../State/Review/Action'
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp';

const product = {  
    highlights: [
        'Hand cut and sewn locally',
        'Dyed with our proprietary colors',
        'Pre-washed & pre-shrunk',
        'Ultra-soft 100% cotton',
    ],
}

function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
}

export default function ProductDetails() {
    const [selectedSize, setSelectedSize] = useState("");
    const [showAllReviews, setShowAllReviews] = useState(false);
    const navigate = useNavigate();
    const params = useParams();
    const dispatch = useDispatch();
    const { products } = useSelector(store => store);
    const { allRating } = useSelector((store) => store);
    const { allReview } = useSelector((store) => store);
    const { auth } = useSelector((store) => store);
    const [showAllProducts, setShowAllProducts] = useState(false);

    const toggleShowAllProducts = () => {
        setShowAllProducts(prev => !prev); // Toggle the state
    };

    const handleAddToCart = () => {
        if (!selectedSize) {
            alert('Please Select Size')
            return;
        }
        const data = {
            productId: params.productId,
            size: selectedSize.name
        }
        dispatch(addItemToCart(data))
        navigate("/cart")
    }
    const prodId = params.productId;

    useEffect(() => {
        const data = { productId: params.productId }
        dispatch(findProductById(data))
        dispatch(getAllProducts())
        dispatch(getAllRatingByProduct(prodId))
        dispatch(getAllReviewByProduct(prodId))
    }, [params.productId, dispatch]);

    // Toggle review visibility
    const toggleShowReviews = () => {
        setShowAllReviews(prev => !prev);
    };

    const allProducts = Array.isArray(products.products) ? products.products : [];
    const category = products.product?.category;
    const thirdLevelCategory = category?.name
    const secondLevelCategory = category?.parentCategory?.name;
    const firstLevelCategory = category?.parentCategory?.parentCategory?.name
    const allRatings = allRating.ratings || [];
    const allReviews = allReview.reviews || [];
    const similarProducts = allProducts.filter(item => item.category.name === thirdLevelCategory && item.id !== prodId);
    const productSize = products.product?.sizes || []; // Use dynamic data from product details


    // Calculate the average rating if ratings are available
    const averageRating = allRatings.length > 0 ? (allRatings.reduce((acc, rating) => acc + rating.rating, 0) / allRatings.length).toFixed(1) : null;

    console.log(auth.user)

    return (
        <div className="bg-[#FBFBFB] lg:px-20">
            <div className="pt-6">
                <nav>
                    <ol role="list" className="mx-auto flex max-w-2xl items-center space-x-2 px-4 sm:px-6 lg:max-w-7xl lg:px-8">
                        <li className="text-sm font-medium text-gray-500 hover:text-gray-700">
                            {firstLevelCategory}
                        </li>
                        <li className="text-sm font-medium text-gray-500 hover:text-gray-700">
                            <span className="mx-2">/</span>
                            {secondLevelCategory}
                        </li>
                        <li className="text-sm font-medium text-gray-500 hover:text-gray-700">
                            <span className="mx-2">/</span>
                            {thirdLevelCategory}
                        </li>
                    </ol>
                </nav>
                <section className='grid grid-cols-1 lg:grid-cols-2 gap-x-8 gap-y-10 px-4 pt-5'>
                    {/* Image gallery */}
                    <div className="flex flex-col items-center">
                        <div className="overflow-hidden rounded-xl shadow-lg w-[19rem] h-[27rem]">
                            <img
                                src={`data:image/jpeg;base64,${products.product?.image}`} 
                                alt="image Not Found"
                                className="w-full h-full object-cover object-center"
                            />
                        </div>
                    </div>

                    {/* Product info */}
                    <div className="lg:col-span-1 max-auto max-w-2xl px-4 pb-16 sm:px-6 lg:max-w-7xl lg:px-8 lg:pb-6">
                        <div className="lg:col-span-2">
                            <h1 className="text-xl text-indigo-500 font-semibold text-gray-900">{products.product?.brand}</h1>
                            <h1 className='text-lg text-gray-800 font-semibold opacity-80 pt-1'>{products.product?.title.slice(0,60)}</h1>
                        </div>

                        {/* Options */}
                        <div className="mt-3">
                            <div className='flex items-center space-x-5 text-lg text-gray-900'>
                                <p className='font-semibold text-green-600 text-2xl'>₹{products.product?.discountedPrice}</p>
                                <p className="opacity-60 line-through text-lg">₹{products.product?.price}</p>
                                <p className='text-green-600 font-semibold'>{products.product?.discountPercent}% off</p>
                            </div>

                            <div className="flex space-x-2">
                                {averageRating ? (
                                    <>
                                        <Rating name="read-only" value={parseFloat(averageRating)} readOnly />
                                        <p className="opacity-60 text-sm">{averageRating}Rating{allRatings.length > 1 ? 's' : ''}</p>
                                    </>
                                ) : (
                                    <p className="text-sm text-gray-500">No ratings yet</p>
                                )}
                                {/* Reviews Section */}
                                {allReviews.length > 0 ? (
                                    <p className="text-center text-sm opacity-60">{allReviews.length} Review{allReviews.length > 1 ? 's' : ''}</p>
                                ) : (
                                    <p className="text-center text-sm text-gray-500">No reviews yet</p>
                                )}

                            </div>
                            {/* Sizes */}
                           {/* Sizes */}
                           <div className="mt-3">
                                <div className="flex items-center justify-between">
                                    <h3 className="text-sm font-medium text-gray-900">Size</h3>
                                </div>
                                <fieldset aria-label="Choose a size" className="mt-2">
                                    <RadioGroup
                                        value={selectedSize}
                                        onChange={setSelectedSize}
                                        className="grid grid-cols-4 gap-4 sm:grid-cols-8 mb-1"
                                    >
                                        {productSize.map((size) => (
                                            <Radio
                                                key={size.name}
                                                value={size}
                                                // disabled={!size.inStock}
                                                className={classNames(
                                                    size.inStock
                                                        ? 'cursor-pointer bg-white text-gray-900 shadow-sm'
                                                        : ' bg-white',
                                                    selectedSize === size
                                                        ? 'bg-[#11a5f0] text-black border-2 border-[#5c7fe0]'
                                                        : '',
                                                    'group relative flex items-center justify-center rounded-full border px-3 py-2 text-sm font-medium uppercase'
                                                )}
                                            >
                                                <span className="text-left">{size.name}</span>
                                            </Radio>
                                        ))}
                                    </RadioGroup>
                                </fieldset>
                            </div>

                            {auth.user ? (
                                <div className="mt-6">
                                    <Button
                                        onClick={handleAddToCart}
                                        variant="contained"
                                        size="large"
                                        fullWidth
                                        style={{ backgroundColor: '#5195b8' }}
                                    >
                                        Add to Cart
                                    </Button>
                                </div>
                            ) :
                                (
                                    <div>
                                        <p className='mt-2 text-sm font-semibold text-red-500'>Please login to add items in cart</p>
                                    </div>
                                )}
                            {/* Product Description */}
                            <div className="pt-6">
                                <h3 className="text-lg font-medium text-gray-900">Description</h3>
                                <p className="mt-4 text-base text-gray-500">{products.product?.description}</p>
                            </div>
                        </div>
                    </div>
                </section>
                {/* Product Highlights */}
                <div className="py-8 px-4 bg-[#d7f8fc] rounded-3xl">
                    <h2 className="text-xl font-semibold text-gray-900">Highlights</h2>
                    <ul className="mt-6 space-y-3 text-gray-600">
                        {product.highlights.map((highlight) => (
                            <li key={highlight} className="flex items-center text-sm">
                                <svg className="mr-2 h-5 w-5 text-green-500" fill="currentColor" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" aria-hidden="true">
                                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm-1-8V5a1 1 0 112 0v5a1 1 0 11-2 0zm0 4v-3a1 1 0 112 0v3a1 1 0 11-2 0z" clipRule="evenodd"></path>
                                </svg>
                                {highlight}
                            </li>
                        ))}
                    </ul>
                </div>
                {/* Ratings Section */}
                {auth.user ? (
                    <section className="pt-6">
                        <div className='bg-[#ede3ff] p-2 rounded-lg'>
                            <div className="flex justify-center items-center">
                                {averageRating ? (
                                    <>
                                        {/* Display Average Rating */}
                                    </>
                                ) : (
                                    <p className="text-sm text-gray-500">No ratings yet</p>
                                )}
                            </div>

                            {/* Reviews */}
                            {allReviews.length > 0 ? (
                                <div className="space-y-4 mt-2">
                                    {/* Display only the first two reviews or all reviews depending on state */}
                                    {(showAllReviews ? allReviews : allReviews.slice(0, 2)).map((reviewItem) => (
                                        <div key={reviewItem.id} className="bg-indigo-50 p-5 rounded-lg shadow-2xl">
                                            {/* Review Section */}
                                            <div >
                                                <p className="font-semibold text-lg text-gray-700">
                                                    {reviewItem.users.firstName}&nbsp;{reviewItem.users.lastName}
                                                </p>
                                                <p className="text-sm text-gray-600 italic">{reviewItem.review}</p>
                                            </div>

                                            {/* Rating Section: Match ratings to the current review using product_id and user_id */}
                                            {allRatings
                                                .filter((ratingItem) =>
                                                    ratingItem.product.id === reviewItem.product.id &&
                                                    ratingItem.users.userId === reviewItem.users.userId // Match by both product and user
                                                )
                                                .slice(0, 1)  // Show only the first matched rating (in case of multiple ratings per user/product)
                                                .map((ratingItem) => (
                                                    <div key={ratingItem.id} className="bg-indigo-50 rounded-lg">
                                                        <Rating value={ratingItem.rating} readOnly />
                                                    </div>
                                                ))
                                            }
                                        </div>
                                    ))}

                                    {/* Show More / Show Less button */}
                                    {allReviews.length > 2 && (
                                        <div className="flex justify-center">
                                            <button
                                                onClick={toggleShowReviews}
                                            // Change color here (e.g., green)
                                            >
                                                {showAllReviews ? <ArrowDropUpIcon className="text-gray-700" /> : <ArrowDropDownIcon className="text-gray-400" />}
                                            </button>
                                        </div>
                                    )}
                                </div>
                            ) : (
                                <p className="text-center text-sm text-gray-500">No reviews yet</p>
                            )}
                        </div>
                    </section>
                ) : (
                    <div className='mt-4 text-sm text-red-500 font-semibold'>
                        <p>Login To See Rating And Reviews</p>
                    </div>
                )}
                {/* Related Products */}
                <section className="pt-2">
                    <h2 className="py-2 text-xl font-bold">Related Products</h2>

                    {/* Toggle Switch */}
                    <div className="flex items-center gap-4 mb-4">
                        <label htmlFor="toggleAll" className="text-sm font-medium text-gray-700">
                            Show all products
                        </label>
                        <input
                            type="checkbox"
                            id="toggleAll"
                            checked={showAllProducts}
                            onChange={toggleShowAllProducts}
                            className="toggle-switch"
                        />
                    </div>            
                    <div className="flex flex-wrap gap-2">
                        {similarProducts.length > 0 ? (
                            (showAllProducts ? similarProducts : similarProducts.slice(0, 5)) // Toggle between all and first 5 products
                                .map((prod) => (
                                    <HomeSectionCard key={prod.id} product={prod} />
                                ))
                        ) : (
                            <p className="text-center text-sm text-gray-500">No similar products available</p>
                        )}
                    </div>
                </section>
            </div>
        </div>
    );
}



