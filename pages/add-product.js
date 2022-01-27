import { Select, Input, FormControl, FormLabel,
  FormErrorMessage, Button, Flex,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper, } from "@chakra-ui/react";
import React, {useState} from "react";
import axios from 'axios';
import { useRouter } from 'next/router'
import NextLink from 'next/link';






export default function AddProduct(){

  const [typeInput, setTypeInput] = useState(' ')
  
  const handleTypeInputChange = (e) => setTypeInput(e.target.value)

  
  const [skuExistError, setSkuExistError] = useState(false)
  
  const router = useRouter()
 

  const postProduct = (data) => {
    axios
      .post("https://scandiweb-test-pr.000webhostapp.com/products/add", JSON.stringify(data))
      .then(d => {
        if(d.status == 201){
          router.push('/');
        }
        if (d.status == 200){
          d.data.forEach(element => {
            if(element.field == "sku"){
              if (element.error.includes("exist")){
                setSkuExistError(true);
              }
            }
          });
        }
        
          
      })
      .catch(err => console.log(err));
  };

  const submit = e => {
    let sku = e.target['sku'].value;
    let name = e.target['name'].value;
    let price = e.target['price'].value;
    let type = typeInput;
    if (type == 'Book'){
       let weight = e.target['weight'].value; 
       let data = {
        sku: sku,
        name: name,
        price: price,
        type: "Book",
        weight:weight
      };
      
      postProduct(data);
    }
    if (type === 'DVD'){
        let size = e.target['size'].value; 
        let data = {
         sku: sku,
         name: name,
         price: price,
         type: 'DVD',
         size: size
       };
       postProduct(data);
     }
     if (type === 'Furniture'){
        let height = e.target['height'].value;
        let width = e.target['width'].value;
        let length = e.target['length'].value; 
        let data = {
         sku: sku,
         name: name,
         price: price,
         type: 'Furniture',
         height: height,
         width: width,
         length: length
       };
       postProduct(data);
     }

     
     
    
    
  };

  return (
      <><Flex justifyContent={'center'} alignItems={'center'} width={'100%'} mt={20}>
          

          <form style={{width: "50%"}} id="product_form" onSubmit={e => {
            e.preventDefault();
            submit(e);
            }}>
            <FormControl isRequired isInvalid={skuExistError}>
                <FormLabel htmlFor='name'>SKU</FormLabel>
                <Input id="sku" placeholder='Enter SKU' name="sku"/>
                {/* 
                  If product with this sku already in DB we throw an error 
                */}
                {skuExistError&&(
                   <FormErrorMessage>SKU already exist.</FormErrorMessage>
                )}

            </FormControl>
            <FormControl isRequired mt={3}>
                <FormLabel htmlFor='name'>Name</FormLabel>
                <Input id="name" placeholder='Enter product name' name="name" />
            </FormControl>          
            <FormControl isRequired mt={3}> 
                <FormLabel htmlFor='price'>Price($)</FormLabel>
                <NumberInput id="price"  name="price" min={0} precision={2}>
                  <NumberInputField placeholder='Enter amount'/>
                  <NumberInputStepper>
                    <NumberIncrementStepper />
                    <NumberDecrementStepper />
                  </NumberInputStepper>
                </NumberInput>
                
                
            </FormControl> 
            <FormControl isRequired mt={3}>
                <FormLabel htmlFor='name'>Type</FormLabel>
                <Select id="productType" placeholder="Select type" name="type" onChange={handleTypeInputChange}>
                    <option value='Book'>Book</option>
                    <option value="DVD">DVD</option>
                    <option value="Furniture">Furniture</option>
                </Select>
                
            </FormControl>
            {/* 
                  If user selected Book type we show weight input 
            */}
              {typeInput === 'Book' && (
                  <FormControl isRequired mt={3}>
                      <FormLabel htmlFor='weight'>Weight in KG</FormLabel>
                      <NumberInput id="weight" name="weight" min={0} precision={2} step={0.1} >
                        <NumberInputField placeholder="Enter weight"/>
                        <NumberInputStepper>
                          <NumberIncrementStepper />
                          <NumberDecrementStepper />
                        </NumberInputStepper>
                      </NumberInput>
                  </FormControl>
              )}
              {/* 
                  If user selected DVD type we show size input 
              */}
              {typeInput === "DVD" && (
                <FormControl isRequired mt={3}>
                    <FormLabel htmlFor='size'>Size in MB</FormLabel>
                    <NumberInput id="size" name="size" min={0}>
                        <NumberInputField placeholder="Enter size"/>
                        <NumberInputStepper>
                          <NumberIncrementStepper />
                          <NumberDecrementStepper />
                        </NumberInputStepper>
                      </NumberInput>
                </FormControl>

              )}
              {/* 
                  If user selected Furniture type we show dimensions inputs 
              */}
              {typeInput === "Furniture" && (
                  <>
                    <FormLabel htmlFor='dimensions' mt={5}>Dimensions</FormLabel >
                    <FormControl isRequired mt={3}>
                      <FormLabel htmlFor='size'>Height in CM</FormLabel>
                      <NumberInput id="height" name="height" min={0}  >
                        <NumberInputField placeholder="Enter height"/>
                        <NumberInputStepper>
                          <NumberIncrementStepper />
                          <NumberDecrementStepper />
                        </NumberInputStepper>
                      </NumberInput>
                    </FormControl>
                    <FormControl isRequired mt={3}>
                        <FormLabel htmlFor='width'>Width in CM</FormLabel>
                        <NumberInput id="width" name="width" min={0} >
                        <NumberInputField placeholder="Enter width"/>
                        <NumberInputStepper>
                          <NumberIncrementStepper />
                          <NumberDecrementStepper />
                        </NumberInputStepper>
                      </NumberInput>
                    </FormControl>
                    <FormControl isRequired mt={3}>
                          <FormLabel htmlFor='length'>Length in CM</FormLabel>
                          <NumberInput id="length" name="length"min={0} >
                            <NumberInputField placeholder="Enter length"/>
                            <NumberInputStepper>
                              <NumberIncrementStepper />
                              <NumberDecrementStepper />
                            </NumberInputStepper>
                          </NumberInput>
                    </FormControl></>
              )}
              <Flex mt={7} alignItems={'center'} justifyContent={'space-between'}>
                <Button type="submit" colorScheme={'teal'}>
                  Save
              </Button>
              
              
              <NextLink href={'/'}>
              <Button type="submit" colorScheme={'red'}>
                  Cancel
              </Button>
              </NextLink>
              </Flex>
             

             

          </form>
      </Flex></>
  );
}
