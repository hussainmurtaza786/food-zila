import { Box, Button, Text } from "@chakra-ui/react";
import PageBanner from "@/components/common/PageBanner";
import FormField from "@/components/common/FormField";
import { FaPaperPlane, FaRegUser } from "react-icons/fa";
import { HiOutlineMail } from "react-icons/hi";
import { IoCreateOutline } from "react-icons/io5";

export default function Contact() {
  return (
    <Box display="flex" flexDirection="column" bgColor="whitesmoke">
      <PageBanner title="CONTACT US" />

      <Box w="100%" display="flex" justifyContent="center" alignItems="center">
        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          flexDirection="column"
          w="600px"
          m={4}
          p={14}
          bgColor="white"
          borderRadius="12px"
          boxShadow="lg"
          mt={8}
        >
          <form>
            <Box display="flex" flexDirection="column" gap={6} w="full" maxWidth="500px">
              <FormField label="Your Name" icon={FaRegUser} placeholder="Your Name" />
              <FormField label="Email Address" icon={HiOutlineMail} type="email" placeholder="Email Address" />
              <FormField label="Enter Your Message Here" icon={IoCreateOutline} placeholder="Your message..." />

              <Button
                display="flex"
                alignItems="center"
                justifyContent="center"
                bgColor="#00813d"
                color="white"
                _hover={{ bgColor: "#006f2c", boxShadow: "0 0 5px rgba(0, 128, 61, 0.5)" }}
                p={6}
                borderRadius="8px"
                fontSize="lg"
                fontWeight="bold"
                gap={3}
                mt={6}
              >
                <FaPaperPlane size={20} />
                <Text>GET IN TOUCH</Text>
              </Button>
            </Box>
          </form>
        </Box>
      </Box>
    </Box>
  );
}
