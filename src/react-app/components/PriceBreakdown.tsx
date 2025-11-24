import { useState } from 'react';
import { ChevronDown, ChevronUp, Tag, Zap } from 'lucide-react';

interface Product {
  sellerDiscount: number;
  systemDiscount: number;
}

interface PriceBreakdownProps {
  product: Product;
  quantity: number;
  subtotal: number;
  totalSavings: number;
  total: number;
}

export default function PriceBreakdown({
  product,
  quantity,
  subtotal,
  totalSavings,
  total,
}: PriceBreakdownProps) {
  const [expanded, setExpanded] = useState(false);

  return (
    <div>
      {/* Discounts */}
      <div className="space-y-3 mb-4">
        <div className="flex items-center gap-2">
          <Tag className="w-4 h-4 text-gray-600" />
          <span className="text-sm text-gray-600">Desconto do vendedor</span>
          <span className="ml-auto text-sm font-medium" style={{ color: '#FF2C55' }}>
            -R$ {(product.sellerDiscount * quantity).toFixed(2).replace('.', ',')}
          </span>
        </div>
        <div className="flex items-center gap-2">
          <Zap className="w-4 h-4 text-gray-600" />
          <span className="text-sm text-gray-600">Desconto do TikTok Shop</span>
          <span className="ml-auto text-sm font-medium" style={{ color: '#FF2C55' }}>
            -R$ {(product.systemDiscount * quantity).toFixed(2).replace('.', ',')}
          </span>
        </div>
      </div>

      {/* Savings Banner */}
      <div className="bg-red-50 rounded-lg px-3 py-2 mb-4">
        <p className="text-sm font-medium text-center" style={{ color: '#FF2C55' }}>
          Você está economizando R$ {totalSavings.toFixed(2).replace('.', ',')} nesse pedido
        </p>
      </div>

      {/* Expandable Price Details */}
      <button
        onClick={() => setExpanded(!expanded)}
        className="w-full flex items-center justify-between text-sm text-gray-600 mb-2"
      >
        <span>Detalhes do preço</span>
        {expanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
      </button>

      {expanded && (
        <div className="space-y-2 pt-2 border-t border-gray-200">
          <div className="flex justify-between text-sm">
            <span className="text-gray-600">Subtotal</span>
            <span className="text-gray-900">R$ {subtotal.toFixed(2).replace('.', ',')}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-gray-600">Descontos</span>
            <span style={{ color: '#FF2C55' }}>-R$ {totalSavings.toFixed(2).replace('.', ',')}</span>
          </div>
          <div className="flex justify-between text-sm font-semibold pt-2 border-t border-gray-200">
            <span className="text-gray-900">Total</span>
            <span style={{ color: '#FF2C55' }}>R$ {total.toFixed(2).replace('.', ',')}</span>
          </div>
        </div>
      )}
    </div>
  );
}
