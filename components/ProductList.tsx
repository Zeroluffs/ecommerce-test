import { ProductCard } from '@/components/ProductCard'
import { useProducts } from '@/hooks/useProducts'
import InfiniteScroll from 'react-infinite-scroll-component'

export function ProductList() {
  const { data, fetchNextPage, hasNextPage } = useProducts()
  return (
    <InfiniteScroll
      next={fetchNextPage}
      hasMore={hasNextPage || false}
      loader={<p>Loading...</p>}
      dataLength={data?.pages?.reduce((total, page) => total + page.length, 0) || 0}>
      <div className={'flex justify-center items-center'}>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-14 ">
          {data?.pages?.map((page, index) =>
            page?.map((product, index) => <ProductCard key={index} {...product} />)
          )}
        </div>
      </div>
    </InfiniteScroll>
  )
}
