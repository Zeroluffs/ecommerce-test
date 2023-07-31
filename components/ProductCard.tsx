import Image from 'next/image'
import { useState } from 'react'

export function ProductCard(product: Product) {
  const [showFullText, setShowFullText] = useState(false)
  const longText = product.description
  return (
    <div className="w-[300px] flex flex-col gap-[12px] shadow-md rounded-sm">
      <div>
        <Image src={product.images[0]} alt={product.title} width={300} height={300} />
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
      <button className="px-4 py-2 text-white m-auto mb-4  bg-red-500 w-[212px] rounded-xl">
        Add to Cart
      </button>
    </div>
  )
}
