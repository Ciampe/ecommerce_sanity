import React, { useEffect, useRef } from 'react';
import Link from 'next/link';
import { AiOutlineMinus, AiOutlinePlus, AiOutlineLeft, AiOutlineShopping } from 'react-icons/ai';
import { TiDeleteOutline } from 'react-icons/ti';
import { toast } from 'react-hot-toast';

import { useStateContext } from '../context/StateContext';
import { urlFor } from '../lib/client';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

function Cart() {
  const cartRef = useRef();
  const { totalPrice, totalQuantities, cartItems, setShowCart, toggleCartItemQuantity, onRemove } = useStateContext(); 
  console.log(cartItems)
  let messageText = 'Hola! Quisiera hacer el siguiente pedido: '
    cartItems.map((item) => {
      messageText = messageText + item.quantity + ' x ' + item.name + ' '
    })
  return (
    <div className='cart-wrapper' ref={cartRef}>
      <div className='cart-container'>
        <button
          type='button'
          className='cart-heading'
          onClick={() => setShowCart(false)}
        >
          <AiOutlineLeft />
          <span className='heading'>Tu carrito</span>
          <span className='cart-num-items'>({totalQuantities} producto{`${totalQuantities > 1 ? 's' : ''}`})</span>
        </button>

        {cartItems.length < 1 && (  
          <div className='empty-cart'>
              <AiOutlineShopping size={150} />
              <h3>Tu carrito está vacío</h3>
              <Link href="/">
                <button
                  type='button'
                  onClick={() => setShowCart(false)}
                  className='btn'
                >
                  Continuar comprando
                </button>
              </Link>
          </div>
        )}

        <div className='product-container'>
          {cartItems.length >= 1 && cartItems.map((item) => (
            <div className='product' key={item._id}>
              <img src={urlFor(item?.image[0])}
                className='cart-product-image' />
              <div className='item-desc'>
                <div className='flex top'>
                  <h5>{item.name}</h5>
                  <h4>${item.price}</h4>
                </div>
                <div className='flex bottom'>
                  <div>
                    <p className='quantity-desc'>
                      <span
                        className='minus'
                        onClick={() => toggleCartItemQuantity(item._id, 'dec')}
                      >
                        <AiOutlineMinus />
                      </span>
                      <span
                        className='num'
                      >
                        {item.quantity}
                      </span>
                      <span
                        className='plus'
                        onClick={() => toggleCartItemQuantity(item._id, 'inc')}
                      >
                        <AiOutlinePlus />
                      </span>
                      </p>
                  </div>
                  <button 
                    type='button'
                    className='remove-item'
                    onClick={() => onRemove(item)}
                  >
                    <TiDeleteOutline />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
        {cartItems.length >= 1 && (
          <div className='cart-bottom'>
            <div  className='total'>
              <h3>Subtotal:</h3>
              <h3>${totalPrice}</h3>
            </div>
            <div className='btn-container'>
              <a
                href={`https://wa.me/5493416361889?text=${messageText}`}
                target='_blank'
                className='wsp-btn'
              >
                Continuar a WhatsApp
              </a>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default Cart