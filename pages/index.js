import React from 'react'
import ProductList from '../components/ProductList'
import $ from 'jquery';


class Home extends React.Component {

  

  componentDidMount(){
    $('#delete-product-btn').click(async ()=>{
      checkboxes = document.getElementsByClassName('delete-checkbox');
      if (checkboxes.length > 0){
        for (let checkbox of checkboxes){

            if(checkbox.checked){
              checkbox.checked = false;
              checkbox.click();
            }

          }
      }
    })
  }

  render(){
    
  return ( 
      
      <ProductList></ProductList>
          
  )
  } 
}

export default Home
