"use client";

import { useState } from "react";
import { products } from "@/data/products";
import { formatMessage } from "@/utils/formatMessage";
import { CartItem } from "@/types/CartItem";
import Image from "next/image";

export function ProductForm() {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [paymentMethod, setPaymentMethod] = useState("");

  const handleQuantityChange = (
    productName: string,
    tonalidade: string | undefined,
    quantity: number
  ) => {
    setCart((prev) => {
      const existing = prev.find(
        (item) =>
          item.name === productName && item.tonalidade === tonalidade
      );

      if (existing) {
        if (quantity === 0) {
          return prev.filter((item) => item !== existing);
        }
        return prev.map((item) =>
          item === existing ? { ...item, quantity } : item
        );
      }

      if (quantity > 0) {
        return [...prev, { name: productName, tonalidade, quantity }];
      }

      return prev;
    });
  };

  const handleSubmit = () => {
    if (!paymentMethod || cart.length === 0) {
      alert("Preencha os dados antes de enviar o pedido.");
      return;
    }

    const msg = formatMessage(cart, paymentMethod);
    const numero = "5527999999999"; // SEU número com DDD
    const url = `https://wa.me/${numero}?text=${msg}`;

    window.open(url, "_blank");
  };

  return (
    <div className="p-4 space-y-8 max-w-5xl mx-auto">
      <h2 className="text-2xl font-bold text-center">Produtos</h2>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {products.map((product) => (
          <div key={product.id}  className="bg-[#f2f1f2] rounded-xl shadow-md p-4 space-y-2 hover:shadow-lg transition-all">
            <Image
              src={product.image}
              alt={product.name}
              width={400}
              height={200}
              className="w-full h-48 object-contain rounded-full border p-2 bg-white"
            />
            <p className="font-semibold text-lg">{product.name}</p>

            {product.tonalidades ? (
              product.tonalidades.map((tonalidade) => (
                <div key={tonalidade} className="flex items-center gap-2">
                  <label className="text-sm">Tom {tonalidade}:</label>
                  <input
                    type="number"
                    min={0}
                    defaultValue={0}
                    onChange={(e) =>
                      handleQuantityChange(
                        product.name,
                        tonalidade,
                        parseInt(e.target.value)
                      )
                    }
                    className="w-16 border rounded px-1"
                  />
                </div>
              ))
            ) : (
              <div className="flex items-center gap-2">
                <label className="text-sm">Quantidade:</label>
                <input
                  type="number"
                  min={0}
                  defaultValue={0}
                  onChange={(e) =>
                    handleQuantityChange(
                      product.name,
                      undefined,
                      parseInt(e.target.value)
                    )
                  }
                  className="w-16 border rounded px-1"
                />
              </div>
            )}
          </div>
        ))}
      </div>

      <div className="bg-white rounded-lg shadow p-4 space-y-4">
        <label className="block text-lg font-semibold">
          Forma de pagamento:
        </label>
        <select
          className="border px-2 py-2 rounded w-full"
          onChange={(e) => setPaymentMethod(e.target.value)}
          defaultValue=""
        >
          <option value="" disabled>
            Selecione a forma de pagamento
          </option>
          <option value="Pix">Pix</option>
          <option value="Cartão na entrega">Cartão na entrega</option>
          <option value="Negociar com vendedor">Negociar com vendedor</option>
        </select>

        <button
          onClick={handleSubmit}
          className="w-full bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
        >
          Enviar Pedido pelo WhatsApp
        </button>
      </div>
    </div>
  );
}