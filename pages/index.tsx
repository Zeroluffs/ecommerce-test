import { Inter } from 'next/font/google'
import { ProductList } from '@/components/ProductList'
import { dehydrate, QueryClient } from 'react-query'
import { fetchProducts } from '@/Services/Event'

const inter = Inter({ subsets: ['latin'] })
const fetching = async () => {
  try {
    const res = await fetch(`https://dummyjson.com/products?skip=${0}&limit=10`)
    return await res.json()
  } catch (err) {
    return err
  }
}
export default function Home() {
  return (
    <div className="max-w-7xl m-auto">
      <ProductList />
    </div>
  )
}

export async function getStaticProps() {
  const queryClient = new QueryClient()
  await queryClient.prefetchQuery(['products', 0], () => fetchProducts(0))
  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
  }
}
