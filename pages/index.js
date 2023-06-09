import React from 'react'
import Link from 'next/link'

import { client } from '../lib/client';

import { Product, FooterBanner, HeroBanner} from "../components"

const Home = ({ products, bannerData }) => {
  return (
    <>
      <HeroBanner heroBanner={bannerData.length && bannerData[0]}/>
      <div className='products-heading'>
        <h2>¡Nuestros productos más buscados!</h2>
        <p>Cosmética - Perfumería - Belleza</p>
      </div>

      <div className='products-container'>
        {products?.map((product) => <Product key={product._id} product={product} />)}
      </div>
      <Link href={`/products`}>
        <button type="button" className='all-products' onClick={() => {}}>Ver todos los productos</button>
      </Link>

      <FooterBanner footerBanner={bannerData && bannerData[0]} />
    </>
  )
}

export const getServerSideProps = async () => {
  const productsQuery = '*[_type == "product"]';
  const products = await client.fetch(productsQuery);

  const bannerQuery = '*[_type == "banner"]';
  const bannerData = await client.fetch(bannerQuery);

  return {
    props: { products, bannerData }
  }
}

export default Home