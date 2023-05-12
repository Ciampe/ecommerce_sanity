import React from 'react'

import { client } from '../lib/client';

import { Product } from '../components';

const products = ({ products }) => {
  return (
    <div className='products-container'>
        {products.map((product) => (
            <Product key={product._id} product={product} />
        ))}
    </div>
  )
}

export const getServerSideProps = async () => {
    const productsQuery = '*[_type == "product"]';
    const products = await client.fetch(productsQuery);
  
    return {
      props: { products }
    }
  }

export default products