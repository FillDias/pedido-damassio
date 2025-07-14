import { ProductForm } from "@/components/ProductForm";
import Image from "next/image";



<div className="flex justify-center mb-6">
  <Image src="https://i.imgur.com/ivFxpTd.png" alt="Logo" className="h-16" />
</div>

export default function Home() {
  return (

    
    <main className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <ProductForm />
    </main>
  );
}
