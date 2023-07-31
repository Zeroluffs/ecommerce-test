import { Inter } from 'next/font/google'
import { ProductList } from '@/components/ProductList'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  return (
    <div className="max-w-7xl m-auto">
      <ProductList />
    </div>
  )
}
