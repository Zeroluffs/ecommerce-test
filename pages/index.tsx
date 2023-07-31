import Image from 'next/image'
import { Inter } from 'next/font/google'
import { useQuery } from 'react-query'
import { fetchProducts } from '@/Services/Event'
import { ProductCard } from '@/components/ProductCard'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  const { isLoading, error, data } = useQuery<Product[]>('products', fetchProducts)
  let products = data || []
  if (isLoading) return 'Loading...'
  if (error) {
    // @ts-ignore
    return 'An error has occurred: ' + error.message
  }

  return (
    <div className="max-w-7xl m-auto">
      <div className={'flex justify-center items-center'}>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-14 ">
          {products.map((product, index) => (
            <ProductCard key={index} {...product} />
          ))}
        </div>
      </div>
      d{' '}
    </div>
  )
}
