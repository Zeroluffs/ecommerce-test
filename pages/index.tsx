import Image from "next/image";
import { Inter } from "next/font/google";
import { useQuery } from "react-query";
import { fetchProducts } from "@/Services/Event";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  const { isLoading, error, data } = useQuery<Product[]>(
    "products",
    fetchProducts
  );
  let products = data || [];
  if (isLoading) return "Loading...";
  if (error) {
    // @ts-ignore
    return "An error has occurred: " + error.message;
  }

  return (
    <div>
      <h1>{products[0].title}</h1>
    </div>
  );
}
