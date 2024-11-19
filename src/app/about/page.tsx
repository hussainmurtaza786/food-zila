import About from "@/components/AboutPage/About";
import Chief from "@/components/AboutPage/Chiefs";
import { Box } from "@chakra-ui/react";

export default function AboutPage(){
    return(
        <Box>
            <About/>
            <Chief/>
        </Box>
    )
}