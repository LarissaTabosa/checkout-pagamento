import { Minus, Plus } from 'lucide-react';

interface Product {
  image: string;
  name: string;
  originalPrice: number;
  discountedPrice: number;
  badge: string;
}

interface ProductCardProps {
  product: Product;
  quantity: number;
  onQuantityChange: (quantity: number) => void;
}

export default function ProductCard({ product, quantity, onQuantityChange }: ProductCardProps) {
  const discount = Math.round(((product.originalPrice - product.discountedPrice) / product.originalPrice) * 100);

  return (
    <div className="flex gap-3">
      {/* Product Image */}
      <div className="relative w-24 h-24 flex-shrink-0">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover rounded-lg"
        />
        {product.badge && (
          <div className="absolute top-1 left-1 text-white text-[10px] font-bold px-1.5 py-0.5 rounded" style={{ backgroundColor: '#FF2C55' }}>
            -{discount}%
          </div>
        )}
      </div>

      {/* Product Details */}
      <div className="flex-1 min-w-0">
        <h3 className="text-sm font-medium text-gray-900 line-clamp-2 mb-1">
          {product.name}
        </h3>
        <div className="inline-block bg-red-50 text-[10px] font-semibold px-2 py-0.5 rounded mb-2" style={{ color: '#FF2C55' }}>
          {product.badge}
        </div>

        <div className="flex items-center justify-between">
          {/* Price */}
          <div>
            <div className="flex items-baseline gap-1">
              <span className="text-lg font-bold" style={{ color: '#FF2C55' }}>
                R$ {product.discountedPrice.toFixed(2).replace('.', ',')}
              </span>
            </div>
            <div className="text-xs text-gray-400 line-through">
              R$ {product.originalPrice.toFixed(2).replace('.', ',')}
            </div>
          </div>

          {/* Quantity Selector */}
          <div className="flex items-center gap-2 border border-gray-300 rounded-full px-2 py-1">
            <button
              onClick={() => onQuantityChange(Math.max(1, quantity - 1))}
              className="text-gray-600 hover:text-gray-900"
            >
              <Minus className="w-3 h-3" />
            </button>
            <span className="text-sm font-medium w-6 text-center">{quantity}</span>
            <button
              onClick={() => onQuantityChange(quantity + 1)}
              className="text-gray-600 hover:text-gray-900"
            >
              <Plus className="w-3 h-3" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
