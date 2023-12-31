import Image from 'next/image'
import { useState } from 'react'
import { addToCart } from '@/slices/cart'
import { useDispatch } from 'react-redux'
import { AppDispatch } from '@/store/store'

export function ProductCard(product: Product) {
  const [showFullText, setShowFullText] = useState(false)
  const longText = product.description
  const dispatch = useDispatch<AppDispatch>()
  const onClickCart = async () => {
    dispatch(addToCart(product))
  }
  return (
    <div className="w-[300px] flex flex-col gap-[12px] shadow-md rounded-sm">
      <div className={'relative w-[300px] h-[344px]'}>
        <Image
          src={product.images[0]}
          alt={product.title}
          fill
          className={'w-[300px] h-[344px] object-cover'}
        />
      </div>
      <div className="mx-2">
        <h1 className="text-lg font-semibold">{product.title}</h1>
        {/*<p className={'truncate'}>{product.description}</p>*/}
        <div>
          {showFullText ? (
            <p>{longText}</p>
          ) : (
            <p>{longText.length > 100 ? longText.slice(0, 100) + '...' : longText}</p>
          )}
          {longText.length > 100 && (
            <button
              className={'text-sm text-blue-500'}
              onClick={() => setShowFullText(!showFullText)}>
              {showFullText ? 'Show Less' : 'Show More'}
            </button>
          )}
        </div>
        <p>${product.price}</p>
        <p>Reviews: {product.rating}</p>
      </div>
      <button
        onClick={onClickCart}
        className="px-4 py-2 text-white m-auto mb-4 active:bg-red-950 hover:bg-red-700 duration-300  bg-red-500 w-[212px] rounded-xl">
        Add to Cart
      </button>
    </div>
  )
}
