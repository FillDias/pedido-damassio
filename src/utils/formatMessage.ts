
type CartItem = {
  name: string;
  quantity: number;
  tonalidade?: string;
};

export function formatMessage(cart: CartItem[], paymentMethod: string) {
  let message = "Olá! Quero fazer um pedido:\n\n";

  cart.forEach((item) => {
    message += `- ${item.name}`;
    if (item.tonalidade) message += ` (tom ${item.tonalidade})`;
    message += `: ${item.quantity} unidade(s)\n`;
  });

  message += `\nForma de pagamento: ${paymentMethod}`;

  return encodeURIComponent(message);
}