import { Box, Image, Text } from "@chakra-ui/react";
import { Patrick_Hand, Oswald, Inter, Roboto } from '@next/font/google';

const oswald = Oswald({ weight: '400', subsets: ['latin'] });

export default function Chief() {
    return (
        <Box display='flex' justifyContent='center' alignItems='center'>
            <Box>
                <Box>
                    <Text textAlign='center' fontSize='60px' className={oswald.className} fontWeight='bolder'>MEET OUR EXPERT CHIEFS</Text>
                </Box>
                <Box display='flex'>
                    <Box m={2} display='flex' flexDir='column' >
                        <Image borderRadius='12px' src="assets/chief-1.jpg" />
                        <Text>
                            head chef
                        </Text>
                        <Text>

                            Leslie Alexander
                        </Text>

                    </Box>
                    <Box m={2} >
                        <Image borderRadius='12px' src="assets/chief-2.jpg" />
                    </Box>
                    <Box m={2}>
                        <Image borderRadius='12px' src="assets/chief-3.jpg" />
                    </Box>
                </Box>
            </Box>
        </Box>
    )
}