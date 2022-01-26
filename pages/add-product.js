import { Box, Select, Input, InputGroup, InputLeftElement , FormControl, FormLabel,FormErrorMessage, Button, Flex } from "@chakra-ui/react";
import React, {useState} from "react";
import { useForm } from "react-hook-form";
import axios from 'axios';
import { useRouter } from 'next/router'
import NextLink from 'next/link';






export default function Test(props){
  const [skuInput, setSkuInput] = useState(' ')
  const [nameInput, setNameInput] = useState(' ')
  const [priceInput, setPriceInput] = useState('0')
  const [typeInput, setTypeInput] = useState(' ')


  const handleSkuInputChange = (e) => {setSkuInput(e.target.value); setSkuExistError(false)}
  const handleNameInputChange = (e) => setNameInput(e.target.value)
  const handlePriceInputChange = (e) => setPriceInput(e.target.value)
  const handleTypeInputChange = (e) => setTypeInput(e.target.value)


  const isSkuError = skuInput==="";
  const isPriceError = !( /\d/.test(priceInput));
  const isNameError = nameInput==="";
  const isTypeError = typeInput==="";

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
            <FormControl isRequired isInvalid={isSkuError || skuExistError}>
                <FormLabel htmlFor='name'>SKU</FormLabel>
                <Input id="sku" placeholder='Enter SKU' name="sku" onChange={handleSkuInputChange}/>
                {/* 
                  If sku is empty we throw an error 
                */}
                {isSkuError&&(
                   <FormErrorMessage>SKU is required.</FormErrorMessage>
                )}
                {/* 
                  If product with this sku already in DB we throw an error 
                */}
                {skuExistError&&(
                   <FormErrorMessage>SKU already exist.</FormErrorMessage>
                )}

            </FormControl>
            <FormControl isRequired isInvalid={isNameError}>
                <FormLabel htmlFor='name'>Name</FormLabel>
                <Input id="name" placeholder='Enter product name' name="name"  onChange={handleNameInputChange}/>
                {/* 
                  If Name is empty we throw an error
                */}
                
                {isNameError&&(
                   <FormErrorMessage>Name is required.</FormErrorMessage>
                )}
            </FormControl>          
            <FormControl isRequired isInvalid={isPriceError}> 
                <FormLabel htmlFor='price'>Price ($)</FormLabel>

                

                    <Input id="price"  placeholder='Enter amount' name="price" onChange={handlePriceInputChange}/>
                
                {/* 
                  If Price contains not a number we throw an error 
                */}
                {isPriceError&&(
                   <FormErrorMessage>Price must be a number</FormErrorMessage>
                )}
            </FormControl> 
            <FormControl isRequired isInvalid = {isTypeError}>
                <FormLabel htmlFor='name'>Type</FormLabel>
                <Select id="productType" placeholder="Select type" name="type"  onChange={handleTypeInputChange}>
                    <option value='Book'>Book</option>
                    <option value="DVD">DVD</option>
                    <option value="Furniture">Furniture</option>
                </Select>
                {/* 
                  If type is empty we throw an error 
                */}
                {isTypeError&&(
                   <FormErrorMessage>Type is required</FormErrorMessage>
                )}
            </FormControl>
            {/* 
                  If user selected Book type we show weight input 
            */}
              {typeInput === 'Book' && (
                  <FormControl isRequired>
                      <FormLabel htmlFor='weight'>Weight in KG</FormLabel>
                      <Input id="weight" name="weight" placeholder="Enter weight" />
                  </FormControl>
              )}
              {/* 
                  If user selected DVD type we show size input 
              */}
              {typeInput === "DVD" && (
                <FormControl isRequired>
                    <FormLabel htmlFor='size'>Size in MB</FormLabel>
                    <Input id="size" name="size" placeholder="Enter size" />
                </FormControl>

              )}
              {/* 
                  If user selected Furniture type we show dimensions inputs 
              */}
              {typeInput === "Furniture" && (
                  <>
                    <FormLabel htmlFor='dimensions'>Dimensions</FormLabel>
                    <FormControl isRequired>
                      <FormLabel htmlFor='size'>Height in CM</FormLabel>
                      <Input id="height" name="height" placeholder="Enter height" />
                    </FormControl>
                    <FormControl isRequired>
                        <FormLabel htmlFor='width'>Width in CM</FormLabel>
                        <Input id="width" name="width" placeholder="Enter width" />
                    </FormControl>
                    <FormControl isRequired>
                          <FormLabel htmlFor='length'>Length in CM</FormLabel>
                          <Input id="length" name="length" placeholder="Enter length" />
                    </FormControl></>
              )}
              <Flex mt={5} alignItems={'center'} justifyContent={'space-between'}>
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
