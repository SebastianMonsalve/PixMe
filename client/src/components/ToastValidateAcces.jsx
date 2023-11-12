import { useToast } from "@chakra-ui/react";
const ToastValidateAcces = () => {
  const toast = useToast();
  toast({
    title: "good",
    description: "We've created your account for you.",
    status: "success",
    duration: 9000,
    isClosable: true,
  });
};

export default ToastValidateAcces;
