import { Box, FormControl, FormLabel, Input } from "@chakra-ui/react";
import { patrickHand } from "@/lib/fonts";
import { IconType } from "react-icons";

type FormFieldProps = {
  label: string;
  icon: IconType;
  type?: string;
  placeholder: string;
};

export default function FormField({ label, icon: Icon, type = "text", placeholder }: FormFieldProps) {
  return (
    <FormControl id={label.replace(/\s/g, "-").toLowerCase()} isRequired>
      <FormLabel color="gray.600" fontWeight="bold" className={patrickHand.className}>
        {label}
      </FormLabel>
      <Box display="flex" alignItems="center" gap={2} p={2} borderWidth={1} borderColor="gray.300" borderRadius="md">
        <Icon size={20} color="gray.600" />
        <Input
          type={type}
          placeholder={placeholder}
          border="none"
          borderBottom="1px solid #00813d"
          _focus={{ borderColor: "#00813d", boxShadow: "0 0 5px rgba(0, 128, 61, 0.5)" }}
          _hover={{ borderColor: "#00813d" }}
        />
      </Box>
    </FormControl>
  );
}
