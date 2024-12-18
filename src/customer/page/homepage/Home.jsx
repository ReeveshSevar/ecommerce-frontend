import React, { useEffect } from "react";
import MainCarousel from "../../components/HomeCarosel/MainCarousel";
import HomeSectionCarousel from "../../components/HomeSectionCarousel/HomeSectionCarousel";
import { useDispatch, useSelector } from "react-redux";
import { getAllProducts } from "../../../State/Product/Action";

const Home = () => {
    const dispatch = useDispatch();
    const { products } = useSelector((store) => store);

    useEffect(() => {
        dispatch(getAllProducts());
    }, [dispatch]);

    const allProducts = products?.products || [];  // Safe fallback to an empty array if undefined or null

    // Ensure that allProducts is an array before attempting to call .map()
    const categories = Array.isArray(allProducts)
        ? [...new Set(allProducts.map(product => product.category.name))]
        : [];

    // Limit to first 5 categories
    const limitedCategories = categories.slice(0, 10);

    return (
        <div className="bg-gradient-to-r from-[#778beb] via-[#82ccdd] to-[#48dbfb] min-h-screen">
            <MainCarousel />

            <div className="space-y-8 py-8 flex flex-col justify-center px-6 lg:px-8">
                {/* Category Section */}
                <h2 className="text-4xl font-extrabold text-center text-white">
                    Explore Our Amazing Categories
                </h2>

                {/* Iterate through limited categories and render a carousel for each */}
                {limitedCategories.map((category) => {
                    const categoryProducts = allProducts.filter(product => product.category.name === category);
                    switch (category) {
                        case 'gouns':
                            return (
                                <div
                                    key={category}
                                    className="rounded-xl p-3 bg-white shadow-lg transform transition-all duration-300 hover:shadow-2xl hover:scale-105"
                                >
                                    <HomeSectionCarousel
                                        data={categoryProducts}
                                        sectionName="Gouns"
                                    />
                                </div>
                            );
                        case 'lengha':
                            return (
                                <div
                                    key={category}
                                    className="rounded-xl p-3 bg-white shadow-lg transform transition-all duration-300 hover:shadow-2xl hover:scale-105"
                                >
                                    <HomeSectionCarousel
                                        data={categoryProducts}
                                        sectionName="Bridel Lengha"
                                    />
                                </div>
                            );
                        case 'suite':
                            return (
                                <div
                                    key={category}
                                    className="rounded-xl p-3 bg-white shadow-lg transform transition-all duration-300 hover:shadow-2xl hover:scale-105"
                                >
                                    <HomeSectionCarousel
                                        data={categoryProducts}
                                        sectionName="Suite"
                                    />
                                </div>
                            );
                        case 'saree':
                            return (
                                <div
                                    key={category}
                                    className="rounded-xl p-3 bg-white shadow-lg transform transition-all duration-300 hover:shadow-2xl hover:scale-105"
                                >
                                    <HomeSectionCarousel
                                        data={categoryProducts}
                                        sectionName="Saree"
                                    />
                                </div>
                            );

                    }
                })}
            </div>
        </div>
    );
};

export default Home;
