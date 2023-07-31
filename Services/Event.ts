export async function fetchProducts(pageNumber: number) {
  try {
    const res = await fetch(`https://dummyjson.com/products?skip=${pageNumber * 10}&limit=10`)
    return await res.json()
  } catch (err) {
    return err
  }
}
