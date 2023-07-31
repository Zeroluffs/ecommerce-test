import { ProductCard } from '@/components/ProductCard'
import { useProductList } from '@/hooks/useProductList'

export function ProductList() {
  const {
    data,
    isLoading,
    isRatingActive,
    isPriceActive,
    error,
    products,
    inputHandler,
    handleFilterByPrice,
    handleFilterByRating,
    setPage,
    page,
    numberOfPages,
    isFetching,
    isPreviousData,
  } = useProductList()

  if (isLoading) return 'Loading...'
  if (error) {
    // @ts-ignore
    return 'An error has occurred: ' + error.message
  }
  return (
    <div className={'mt-[64px]'}>
      <div className={'flex flex-col gap-6'}>
        <input
          onChange={inputHandler}
          placeholder={'Search Product'}
          className={'bg-gray-300 rounded-md p-3  w-[244px] h-[32px]'}
          type="text"
        />
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
      </div>

      <div className={'flex justify-center items-center mt-8'}>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-14 ">
          {products?.map((product, index) => (
            <ProductCard key={index} {...product} />
          ))}
        </div>
      </div>
      {/*<span>Current Page: {page + 1}</span>*/}
      <div className={'flex  flex-row justify-center gap-6 my-6'}>
        <button
          className={'text-xl bg-blue-500 text-white p-2 rounded-xl disabled:opacity-50'}
          onClick={() => setPage((old) => Math.max(old - 1, 0))}
          disabled={page === 0}>
          Previous
        </button>{' '}
        <span className={'justify-center mt-2 text-lg'}>
          {page + 1} of {numberOfPages}
        </span>
        <button
          className={'text-xl bg-blue-500 text-white p-2 rounded-xl disabled:opacity-50'}
          onClick={() => {
            if (page === numberOfPages - 1) return
            if (!isPreviousData) {
              setPage((old) => old + 1)
            }
          }}
          // Disable the Next Page button until we know a next page is available
          disabled={page === numberOfPages - 1 || isFetching}>
          Next
        </button>
      </div>
    </div>
  )
}
