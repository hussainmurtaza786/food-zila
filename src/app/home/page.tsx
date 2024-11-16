import FoodDeliver from "@/components/HomePage/FoodDeliver";
import FoodPoster from "@/components/HomePage/FoodPoster";

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

        </Box>
    )
}