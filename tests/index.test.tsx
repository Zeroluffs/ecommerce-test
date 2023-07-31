import { describe } from 'node:test'

const data: FetchResponse = {
  products: [
    {
      id: 1,
      title: 'iphone 12',
      description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos.',
      price: 100,
      rating: 4,
      images: ['https://picsum.photos/200/300'],
      category: 'electronics',
    },
    {
      id: 2,
      title: 'iphone 14',
      description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos.',
      price: 100,
      rating: 4,
      images: ['https://picsum.photos/200/300'],
      category: 'electronics',
    },
    {
      id: 3,
      title: 'Product 3',
      description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos.',
      price: 100,
      rating: 4,
      images: ['https://picsum.photos/200/300'],
      category: 'electronics',
    },
  ] as Product[],
  skip: 3,
  total: 24,
  limit: 3,
}
function filterObject(inputText: string): Product[] {
  return data!?.products?.filter((product) => {
    if (inputText === '') {
      return product
    } else {
      return product.title.toLowerCase().includes(inputText)
    }
  })
}
describe('Functions', () => {
  it('should filter arrays', () => {
    let data = filterObject('iph')
    expect(data.length).toBe(2)
  })
  it('should filter arrays', () => {
    let data = filterObject('')
    expect(data.length).toBe(3)
  })
})
