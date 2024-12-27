import React, { useRef } from "react";
import AliceCarousel from "react-alice-carousel";
import HomeSectionCard from "../HomeSectionCard/HomeSectionCard";
import { Button } from "@mui/material";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";

const HomeSectionCarousel = ({ data, sectionName }) => {
    const carouselRef = useRef(null); // Reference to the AliceCarousel instance

    const responsive = {
        0: { items: 1 },
        720: { items: 3 },
        1024: { items: 6 },
    };

    const items = (data || []).slice(0, 30).map((item) => <HomeSectionCard product={item} />);

    // Handler for the next button
    const handleNext = () => {
        if (carouselRef.current) {
            carouselRef.current.slideNext();
        }
    };

    // Handler for the previous button
    const handlePrev = () => {
        if (carouselRef.current) {
            carouselRef.current.slidePrev();
        }
    };

    return (
        <div className="relative border rounded-lg shadow-lg p-2 bg-gradient-to-br from-blue-50 via-pink-50 to-green-50">
             <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-gray-800 text-center mb-6 transition-all duration-300 transform hover:text-pink-400 hover:scale-105">
                {sectionName.charAt(0).toUpperCase() + sectionName.slice(1)} {/* Capitalize first letter */}
            </h2>
            <div className="relative">
                <AliceCarousel
                    ref={carouselRef}
                    items={items}
                    disableButtonsControls
                    responsive={responsive}
                    disableDotsControls
                />
                
                {/* Previous Button */}
                <Button
                    variant="contained"
                    className="z-50"
                    sx={{
                        position: "absolute",
                        top: "50%",
                        left: "10px", // Keep it on the left
                        transform: "translateY(-90%)",
                        background: "transparent", // Transparent background
                        boxShadow: "none", // No shadow for a clean look
                    }}
                    aria-label="previous"
                    onClick={handlePrev}
                >
                    <ArrowBackIosIcon sx={{ transform: "rotate(0deg)", color: "black" }} />
                </Button>

                {/* Next Button */}
                <Button
                    variant="contained"
                    className="z-50"
                    sx={{
                        position: "absolute",
                        top: "50%",
                        right: "0px", // Shift it to the far right
                        transform: "translateY(-90%)",
                        background: "transparent", // Transparent background
                        boxShadow: "none", // No shadow for a clean look
                    }}
                    aria-label="next"
                    onClick={handleNext}
                >
                    <ArrowBackIosIcon sx={{ transform: "rotate(180deg)", color: "black" }} />
                </Button>
            </div>
        </div>
    );
};

export default HomeSectionCarousel;
