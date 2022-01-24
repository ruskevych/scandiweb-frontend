import React, { useEffect, useState } from "react";
import { Box, Flex } from '@chakra-ui/layout';
import { Button } from '@chakra-ui/button';
import axios from 'axios';
import { Grid } from '@chakra-ui/react'
import Product from "./Product";
import { ColorModeSwitcher } from '../public/ColorModeSwitcher';
import NextLink from 'next/link';






function ProductList() {

    

    const  [productState, setProductState] = useState([]);

    useEffect(()=>{
        getProducts();
    }, [])

     
    const getProducts = () => {
        axios.get("https://scandiweb-test-pr.000webhostapp.com/products")
        .then(data=>{
            let product = data.data;
            setProductState(
                product.map(d=>{
                    return{
                        select: false,
                        id: d.ID,
                        sku: d.sku,
                        name: d.name,
                        price: d.price,
                        type: d.type,
                        attribute: d.attribute
                    };
                })
            );
        })
        .catch(err => alert(err));
    }

    const deleteProductsBySku = () =>{
        let arrayids = [];
        productState.forEach(d => {
            if (d.select) {
            arrayids.push(d.sku);
        }
        });
        console.log (JSON.stringify(arrayids));
    axios
      .post(`https://scandiweb-test-pr.000webhostapp.com/products/mass-delete`,JSON.stringify(arrayids))
      .then(data => {
        console.log(data);
        getProducts();
      })
      .catch(err => alert(err));
    }
    
    

    
        return (
            <>
            <Flex
                bg="blue.800" p={4}
            >
                <Box ml = {"auto"}>
                <NextLink href={'/add-product'}>

                    <Button colorScheme={"green"} >ADD</Button>
                </NextLink>
                    <Button id="delete-product-btn" colorScheme={"red"} ml={2} onClick={() => {
                        deleteProductsBySku();
                    }}>MASS DELETE</Button>

                    <ColorModeSwitcher ></ColorModeSwitcher>

                </Box>
            </Flex>
            <Flex justifyContent={'center'} alignItems={'center'} width={'100%'} mt={10}>
                <Grid templateColumns='repeat(4, 1fr)' gap={4} >
                    <Product
                        productState={productState}
                        setProductState={setProductState} />


                </Grid>
            </Flex>
            
            </>
            
                
      
    )
    
}

export default ProductList