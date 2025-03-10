import { Box, Container, Heading, useColorModeValue, VStack, Input, Button, useToast } from '@chakra-ui/react'
import {useState} from 'react'
import {useProductStore} from '../store/product.js'

const CreatePage = () => {
  const [newProduct, createNewProduct] = useState({
    name: "",
    price: "",
    image: "",
  })
  
  const toast = useToast();
  const {createProduct} = useProductStore();

  const handleAddProduct =  async () => {
    const {success, message }= await createProduct(newProduct)
    if (!success) {
      toast({
        title: "Error",
        description: message,
        status: "error",
        duration: 4000,
        isClosable: true
      });
    } else {
      toast({
        title: "Success",
        description: message,
        status: "success",
        duration: 4000,
        isClosable: true
      });
    }
    createNewProduct({ name: "", price: "", image: "" });
  };

  return (
    <Container maxW={"container.sm"}>
      <VStack spacing={8}>
        <Heading as={"h1"} size={"2x1"} textAlign={"center"} mb={8}>
          Create a new product
        </Heading>

        <Box w={"full"} bg={useColorModeValue("white", "gray.800")} p={6} rounded={"lg"} shadow={"md"}> 
          <VStack spacing={4}>
          <Input 
            placeholder='Product name'
            name='name'
            value={newProduct.name}
            onChange={(e) => createNewProduct({...newProduct, name: e.target.value})}
          />
          <Input 
            placeholder='Product price'
            name='price'
            type='number'
            value={newProduct.price}
            onChange={(e) => createNewProduct({...newProduct, price: e.target.value})}
          />
          <Input 
            placeholder='Product image'
            name='image'
            value={newProduct.image}
            onChange={(e) => createNewProduct({...newProduct, image: e.target.value})}
          />

            <Button colorScheme='blue' onClick={handleAddProduct} w='full'>
							Add Product
						</Button>

          </VStack>
        </Box>
      </VStack>
    </Container>
  )
}

export default CreatePage