import React from 'react'
import ProductList from '../components/ProductList'
import $ from 'jquery';


class Home extends React.Component {

  

  componentDidMount(){
    $('#delete-product-btn').click(async ()=>{
      checkboxes = document.getElementsByClassName('delete-checkbox');
      if ((document.getElementsByClassName('delete-checkbox')).length > 0){
        checkboxes = document.getElementsByClassName('delete-checkbox');
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
