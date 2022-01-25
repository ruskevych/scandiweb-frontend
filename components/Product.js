import { Box, Text, GridItem, Flex } from '@chakra-ui/react';
import React from "react";

function Product(props) {

  return props.productState.map(d => (
    <GridItem key={d.id} >
    <Box borderWidth='1px' borderRadius='lg' overflow='hidden' textAlign={'center'} padding={20} width={'auto'} minW={'sm'}>
        
        <input type='checkbox' className='delete-checkbox'
          defaultChecked={d.select}
          onChange={e => {
            let value = e.target.checked;
            
            props.setProductState(
              props.productState.map(sd => {
                if (sd.id === d.id) {
                  sd.select = value;
                }
                return sd;
              })
            );
          }}
        />
      
      
      <Text>{d.sku}</Text>
      <Text>{d.name}</Text>
      <Text>{(parseInt(d.price)).toFixed(2) + " $"}</Text>
      {
      d.type == "Book" && (
        <Flex alignItems={'center'} justifyContent={'space-between'} flexDirection={'row'}><Text>Weight : </Text> <Text>{d.attribute}</Text></Flex>
      )}
      {d.type == "DVD" && (
        <Flex alignItems={'center'} justifyContent={'space-between'} flexDirection={'row'}><Text>Size : </Text> <Text>{d.attribute}</Text></Flex>
      )}
      {d.type == "Furniture" && (
        <Flex alignItems={'center'} justifyContent={'space-between'} flexDirection={'row'}><Text>Dimensions : </Text> <Text>{d.attribute}</Text></Flex>
      )}
    </Box>
    </GridItem>
  ));
}

export default Product;
