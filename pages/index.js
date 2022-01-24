import React from 'react'
import ProductList from '../components/ProductList'
import $ from 'jquery';


class Home extends React.Component {

  

  componentDidMount(){


   
    $( "#delete-product-btn" ).click(function() {
        checkboxes = document.getElementsByClassName('delete-checkbox');
        for (let item of checkboxes){     
          if(item.checked){
            item.click();
            item.click();

          }
        }     
    });
  }

  render(){
    
  return ( 
      
      <ProductList></ProductList>
          
  )
  } 
}

export default Home
