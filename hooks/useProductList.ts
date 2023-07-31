import { useQuery } from 'react-query'
import { fetchProducts } from '@/Services/Event'
import { ChangeEvent, useCallback, useState } from 'react'

export const useProductList = () => {
  const [page, setPage] = useState(0)
  const [isPriceActive, setIsPriceActive] = useState(false)
  const [isRatingActive, setIsRatingActive] = useState(false)
  const [inputText, setInputText] = useState('')

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
  const { isLoading, error, data, isFetching, isPreviousData } = useQuery<FetchResponse>({
    queryKey: ['products', page],

    queryFn: () => fetchProducts(page),
    keepPreviousData: true,
    select: filterProducts,
  })
  let products = data!?.products?.filter((product) => {
    if (inputText === '') {
      return product
    } else {
      return product.title.toLowerCase().includes(inputText)
    }
  })
  let inputHandler = (e: ChangeEvent<HTMLInputElement>) => {
    let lowerCase = (e.target as HTMLInputElement).value.toLowerCase()
    setInputText(lowerCase)
  }
  let numberOfPages = data!?.total / data!?.limit || 0
  // let products = data?.products || []

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
  return {
    isLoading,
    error,
    data,
    isFetching,
    isPreviousData,
    page,
    setPage,
    isPriceActive,
    setIsPriceActive,
    isRatingActive,
    setIsRatingActive,
    products,
    inputHandler,
    inputText,
    numberOfPages,
    handleFilterByPrice,
    handleFilterByRating,
  }
}
