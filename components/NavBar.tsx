import { useSelector } from 'react-redux'
import { numberOfItems, totalPrice } from '@/slices/cart'
export function NavBar() {
  const numberOfProducts = useSelector(numberOfItems)
  const total = useSelector(totalPrice)
  return (
    <nav>
      <div className="flex justify-between items-center py-4">
        <div className="flex items-center">
          <div className="flex items-center">
            <a href="" className="text-xl text-red-500 md:text-4xl lg:text-6xl font-bold">
              Ecommerce
            </a>
          </div>
        </div>
        <div className="flex items-center">
          <a
            href="#"
            className="text-gray-800 text-sm md:text-2xl  lg:text-3xl mx-4 hover:text-blue-500">
            {numberOfProducts > 0 ? 'Products' : 'Product'} in cart: {numberOfProducts}
          </a>
          <a
            href="#"
            className="text-gray-800 text-sm md:text-2xl lg:text-3xl mx-4 hover:text-blue-500">
            Total: ${total}
          </a>
        </div>
      </div>
    </nav>
  )
}
