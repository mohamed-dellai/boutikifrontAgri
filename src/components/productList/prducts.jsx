import React from "react"
import Data from "../Data"
import { useState } from "react"
const ProductList = ({addToCart}) => {
    var productItems=Data.productItems
    const [count, setCount] = useState(0)
  const increment = () => {
    setCount(count + 1)
  }
  
  return (
      <section className='products' style={{height:"100%"}}>
        <h1 style={{margin: "auto",width:"fit-content",marginTop:"10px"}}>Nom de Categories</h1>
        <div className="all" style={{display:"flex",flexWrap:"wrap",alignItems:"center",justifyContent:"center"}}>
        {productItems.map((productItems) => {
          return (
            <div className='box' style={{width:"30%",display:"flex",alignItems:"center",justifyContent:"center",flexDirection:"column"}}>
              <div className='product mtop'>
                <div className='img'>
                  <img src={productItems.cover} alt='' style={{maxWidth:"200px",height:"190px"}}/>
                  <div className='product-like'>
                    <label>{count}</label> <br />
                    <i className='fa-regular fa-heart' onClick={increment}></i>
                  </div>
                </div>
                <div className='product-details'>
                  <h3>{productItems.name}</h3>
                 
                  <div className='price'>
                    <h4>DT {productItems.price}.00 </h4>
                    <button onClick={() => addToCart(productItems)}>
                      <i className='fa fa-plus'></i>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )
        })}
        </div>
      </section>
    
  )
}

export default ProductList
