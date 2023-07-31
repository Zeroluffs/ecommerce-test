import Image from "next/image";
import { Inter } from "next/font/google";
import { useQuery } from "react-query";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  const { isLoading, error, data } = useQuery("repoData", () =>
    fetch("https://dummyjson.com/products").then((res) => res.json())
  );
  if (isLoading) return "Loading...";
  if (error) {
    // @ts-ignore
    return "An error has occurred: " + error.message;
  }

  return <div></div>;
}
