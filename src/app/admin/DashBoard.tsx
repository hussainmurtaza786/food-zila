import { Box, Flex, Heading, Select, Text } from "@chakra-ui/react";
import { Oswald, Patrick_Hand, Nunito,Merriweather } from '@next/font/google';

// Load the fonts using @next/font
const oswald = Oswald({ weight: "700", subsets: ['latin-ext'] });
const patrick_hand = Patrick_Hand({ weight: "400", subsets: ['latin-ext'] });
const nunito = Nunito({ weight: "400", subsets: ['latin-ext'] });
const merriweather = Merriweather({ weight: "700", subsets: ['latin'] });

export default function DashBoard() {
    return (
        <Box >
            <Flex direction={['column', 'row']} >
                <Box
                    bg="linear-gradient(135deg, #D1E8E2, #AEEEEE, #F5F5F5)"
                    flex="1"
                    p={8}
                    h='100vh'
                    boxShadow="xl"
                >
                    <Heading
                        fontSize="3xl"
                        className={oswald.className}
                        mb={6}
                        color="teal.600"
                    >
                        Dashboard
                    </Heading>

                    <Text
                        fontSize="2xl"
                        className={merriweather.className}
                        fontWeight="bold"
                        mb={4}
                    >
                        Product List
                    </Text>
                    <Text className={merriweather.className} fontSize="2xl" fontWeight="bold" mb={4}>
                        UI Components
                    </Text>

                    <Select
                        border="1px solid #ccc"
                        mb={4}
                        placeholder="Select Element"
                        _hover={{ borderColor: 'teal.500' }}
                    >
                        <option value="option1">Option 1</option>
                    </Select>

                    <Select
                        border="1px solid #ccc"
                        mb={4}
                        placeholder="Select Component"
                        _hover={{ borderColor: 'teal.500' }}
                    >
                        <option value="option1">Option 1</option>
                    </Select>

                    <Select
                        border="1px solid #ccc"
                        mb={4}
                        placeholder="Select Table"
                        _hover={{ borderColor: 'teal.500' }}
                    >
                        <option value="option1">Option 1</option>
                    </Select>
                </Box>

                <Box
                    bgColor="blue.500"
                    h="100%"
                    flex="4"
                    boxShadow="xl"
                    p='5'
                >
                    <Text
                        fontSize="5xl"
                        className={patrick_hand.className}
                        color="white"
                        fontWeight="bold"
                        textAlign='center'
                        
                    >
                        Welcome to the Dashboard
                    </Text>
                    
                </Box>
            </Flex>
        </Box>
    );
}
