import Image from 'next/image'
import { Inter } from 'next/font/google'
import { useQuery, useQueryClient } from 'react-query'
import { fetchProducts } from '@/Services/Event'
import { ProductCard } from '@/components/ProductCard'
import { ProductList } from '@/components/ProductList'
import { ChangeEvent, useCallback, useState } from 'react'
import { InputType } from 'zlib'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  const [isPriceActive, setIsPriceActive] = useState(false)
  const [isRatingActive, setIsRatingActive] = useState(false)
  const queryClient = useQueryClient()

  // Function to handle filtering by price
  const filterProducts = useCallback(
    (data: FetchResponse) => {
      if (isPriceActive || isRatingActive) {
        if (isPriceActive) {
          data?.products?.sort((a, b) => a.price - b.price)
        }
        if (isRatingActive) {
          data?.products?.sort((a, b) => a.rating - b.rating)
        }
        return data
      } else {
        return data
      }
    },
    [isPriceActive, isRatingActive]
  )
  const [page, setPage] = useState(0)
  const [inputText, setInputText] = useState('')

  const { isLoading, error, data, isFetching, isPreviousData } = useQuery<FetchResponse>({
    queryKey: ['products', page],

    queryFn: () => fetchProducts(page),
    keepPreviousData: true,
    select: filterProducts,
  })
  let inputHandler = (e: ChangeEvent<HTMLInputElement>) => {
    let lowerCase = (e.target as HTMLInputElement).value.toLowerCase()
    setInputText(lowerCase)
  }
  let numberOfPages = data!?.total / data!?.limit || 0
  // let products = data?.products || []
  let products = data!?.products?.filter((product) => {
    if (inputText === '') {
      return product
    } else {
      return product.title.toLowerCase().includes(inputText)
    }
  })
  const handleFilterByPrice = () => {
    setIsPriceActive(!isPriceActive)
    if (isRatingActive) {
      setIsRatingActive(false)
    }
  }

  // Function to handle filtering by rating
  const handleFilterByRating = () => {
    setIsRatingActive(!isRatingActive)
    if (isPriceActive) {
      setIsPriceActive(false)
    }
  }
  if (isLoading) return 'Loading...'
  if (error) {
    // @ts-ignore
    return 'An error has occurred: ' + error.message
  }
  return (
    <div className="max-w-7xl m-auto">
      <div>
        <input
          onChange={inputHandler}
          placeholder={'Search Product'}
          className={'bg-gray-300 rounded-md p-3  w-[244px] h-[32px]'}
          type="text"
        />
      </div>
      <div className="flex space-x-4">
        <button
          onClick={handleFilterByPrice}
          className={`border p-2 ${
            isPriceActive ? 'bg-blue-500 text-white' : 'bg-white text-blue-500'
          }`}>
          Filter by Price
        </button>
        <button
          onClick={handleFilterByRating}
          className={`border p-2 ${
            isRatingActive ? 'bg-blue-500 text-white' : 'bg-white text-blue-500'
          }`}>
          Filter by Rating
        </button>
      </div>
      <div className={'flex justify-center items-center'}>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-14 ">
          {products?.map((product, index) => (
            <ProductCard key={index} {...product} />
          ))}
        </div>
      </div>
      {/*<span>Current Page: {page + 1}</span>*/}
      <div className={'flex  flex-row justify-center gap-6 my-6'}>
        <button
          className={'text-xl text-blue-500'}
          onClick={() => setPage((old) => Math.max(old - 1, 0))}
          disabled={page === 0}>
          Previous Page
        </button>{' '}
        <button
          className={'text-xl text-blue-500'}
          onClick={() => {
            if (!isPreviousData) {
              setPage((old) => old + 1)
            }
          }}
          // Disable the Next Page button until we know a next page is available
          disabled={page === numberOfPages}>
          Next Page
        </button>
        {isFetching ? <span> Loading...</span> : null} {/*<ProductList />*/}
      </div>
    </div>
  )
}
