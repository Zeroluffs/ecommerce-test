import Image from 'next/image'

export function ProductCard(product: Product) {
  return (
    <div className="w-[300px] flex flex-col gap-[12px] shadow-md rounded-sm">
      <div>
        <Image src={product.images[0]} alt={product.title} width={300} height={300} />
      </div>
      <div className="mx-2">
        <h1 className="text-lg font-semibold">{product.title}</h1>
        <p>{product.description}</p>
        <p>${product.price}</p>
        <p>Reviews: {product.rating}</p>
      </div>
      <button className="px-4 py-2 text-white m-auto mb-4  bg-red-500 w-[212px] rounded-xl">
        Add to Cart
      </button>
    </div>
  )
}
