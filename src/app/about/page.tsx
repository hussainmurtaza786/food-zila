import About from "@/components/AboutPage/About";
import Chief from "@/components/AboutPage/Chiefs";
import FoodServe from "@/components/AboutPage/FoodServe";
import Responsis from "@/components/AboutPage/Responsis";
import { Box } from "@chakra-ui/react";

export default function AboutPage(){
    return(
        <Box>
            <About/>
            <FoodServe/>
            <Chief/>
            <Responsis/>
        </Box>
    )
}