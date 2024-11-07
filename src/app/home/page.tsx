import FoodDeliver from "@/components/HomePage/FoodDeliver";
import FoodPoster from "@/components/HomePage/FoodPoster";
import Footer from "@/components/HomePage/Footer";
import PopularFoods from "@/components/HomePage/PopularFoods";
import ReservationForm from "@/components/HomePage/ReservationForm";
import { Box } from "@chakra-ui/react";

export default function HomePage() {
    return (
        <Box>
            <FoodPoster/>
            <PopularFoods/>
            <FoodDeliver/>
            <ReservationForm/>
            <Footer/>
        </Box>
    )
}