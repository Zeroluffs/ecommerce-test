export async function fetchProducts() {
  try {
    const res = await fetch(`https://dummyjson.com/products`);
    const data = await res.json();
    return data.products;
  } catch (err) {
    return err;
  }
}
