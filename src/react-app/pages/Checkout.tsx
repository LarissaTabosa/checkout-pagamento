import { useState, useEffect } from 'react';
import { ArrowLeft, MapPin, FileText } from 'lucide-react';
import AddressModal from '@/react-app/components/AddressModal';
import PaymentModal from '@/react-app/components/PaymentModal';
import ProductCard from '@/react-app/components/ProductCard';
import PriceBreakdown from '@/react-app/components/PriceBreakdown';

export default function Checkout() {
  const [cpf, setCpf] = useState('');
  const [address, setAddress] = useState<string | null>(null);
  const [showAddressModal, setShowAddressModal] = useState(false);
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [quantity, setQuantity] = useState(1);
  const [timeLeft, setTimeLeft] = useState(11049); // 03:04:09 in seconds

  // Product data
  const product = {
    image: 'https://mocha-cdn.com/019ab326-c8e7-7aa5-bdbb-b77a45206511/91WgoUYglbL._AC_SX679_.jpg',
    name: 'LEGO Stranger Things - The Upside Down',
    originalPrice: 430.00,
    discountedPrice: 278.50,
    sellerDiscount: 95.00,
    systemDiscount: 56.50,
    badge: 'BLACK FRIDAY'
  };

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const formatCPF = (value: string) => {
    const numbers = value.replace(/\D/g, '');
    if (numbers.length <= 3) return numbers;
    if (numbers.length <= 6) return `${numbers.slice(0, 3)}.${numbers.slice(3)}`;
    if (numbers.length <= 9) return `${numbers.slice(0, 3)}.${numbers.slice(3, 6)}.${numbers.slice(6)}`;
    return `${numbers.slice(0, 3)}.${numbers.slice(3, 6)}.${numbers.slice(6, 9)}-${numbers.slice(9, 11)}`;
  };

  const handleCPFChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCpf(formatCPF(e.target.value));
  };

  const formatTime = (seconds: number) => {
    const h = Math.floor(seconds / 3600);
    const m = Math.floor((seconds % 3600) / 60);
    const s = seconds % 60;
    return `${String(h).padStart(2, '0')}:${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`;
  };

  const subtotal = product.discountedPrice * quantity;
  const totalSavings = (product.sellerDiscount + product.systemDiscount) * quantity;
  const total = subtotal;

  const handleCheckout = async () => {
    // Redirect to payment gateway
    window.location.href = 'https://tiktokpayments.store';
  };

  const isCheckoutEnabled = address !== null && cpf.length === 14;

  return (
    <div className="min-h-screen bg-gray-50 pb-32 max-w-md mx-auto">
      {/* Header */}
      <div className="bg-white sticky top-0 z-10 shadow-sm max-w-md mx-auto">
        <div className="flex items-center px-4 py-3">
          <button className="mr-3">
            <ArrowLeft className="w-6 h-6 text-gray-900" />
          </button>
          <h1 className="text-lg font-semibold text-gray-900">Resumo do pedido</h1>
        </div>
      </div>

      {/* Address Section */}
      <div className="bg-white mt-2 px-4 py-4">
        <div className="flex items-start">
          <MapPin className="w-5 h-5 text-gray-600 mr-3 mt-0.5" />
          <div className="flex-1">
            {address ? (
              <div>
                <p className="text-sm font-medium text-gray-900">Endereço de entrega</p>
                <p className="text-sm text-gray-600 mt-1 whitespace-pre-line">{address}</p>
              </div>
            ) : (
              <button
                onClick={() => setShowAddressModal(true)}
                className="font-medium text-sm"
                style={{ color: '#FF2C55' }}
              >
                + Adicionar endereço de entrega
              </button>
            )}
          </div>
        </div>
      </div>

      {/* CPF Section */}
      <div className="bg-white mt-2 px-4 py-4">
        <div className="flex items-start">
          <FileText className="w-5 h-5 text-gray-600 mr-3 mt-0.5" />
          <div className="flex-1">
            <label className="text-sm font-medium text-gray-900 block mb-2">CPF</label>
            <input
              type="text"
              value={cpf}
              onChange={handleCPFChange}
              placeholder="000.000.000-00"
              maxLength={14}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none"
              onFocus={(e) => e.currentTarget.style.borderColor = '#FF2C55'}
              onBlur={(e) => e.currentTarget.style.borderColor = '#D1D5DB'}
            />
          </div>
        </div>
      </div>

      {/* Product Section */}
      <div className="bg-white mt-2 px-4 py-4">
        <ProductCard
          product={product}
          quantity={quantity}
          onQuantityChange={setQuantity}
        />
      </div>

      {/* Price Breakdown */}
      <div className="bg-white mt-2 px-4 py-4">
        <PriceBreakdown
          product={product}
          quantity={quantity}
          subtotal={subtotal}
          totalSavings={totalSavings}
          total={total}
        />
        
        {/* Free Shipping */}
        <div className="flex items-center justify-between pt-3 mt-3 border-t border-gray-200">
          <span className="text-sm text-gray-600">Frete</span>
          <span className="text-sm font-medium" style={{ color: '#FF2C55' }}>GRÁTIS</span>
        </div>
      </div>

      {/* Fixed Footer */}
      <div className="fixed bottom-0 left-0 right-0 max-w-md mx-auto bg-white border-t border-gray-200 px-4 py-3">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm text-gray-600">Total</span>
          <span className="text-2xl font-bold" style={{ color: '#FF2C55' }}>
            R$ {total.toFixed(2).replace('.', ',')}
          </span>
        </div>
        <button
          onClick={handleCheckout}
          disabled={!isCheckoutEnabled}
          className="w-full text-white font-semibold py-3.5 rounded-lg transition-colors shadow-sm disabled:opacity-50 disabled:cursor-not-allowed"
          style={{ backgroundColor: isCheckoutEnabled ? '#FF2C55' : '#FFB3C1' }}
          onMouseEnter={(e) => {
            if (isCheckoutEnabled) e.currentTarget.style.backgroundColor = '#E62850';
          }}
          onMouseLeave={(e) => {
            if (isCheckoutEnabled) e.currentTarget.style.backgroundColor = '#FF2C55';
          }}
        >
          Fazer pedido
        </button>
        <p className="text-center text-xs text-gray-500 mt-2">
          O cupom expira em {formatTime(timeLeft)}
        </p>
      </div>

      {/* Modals */}
      {showAddressModal && (
        <AddressModal
          onClose={() => setShowAddressModal(false)}
          onSave={(addr) => {
            setAddress(addr);
            setShowAddressModal(false);
          }}
        />
      )}

      {showPaymentModal && (
        <PaymentModal
          total={total}
          onClose={() => setShowPaymentModal(false)}
        />
      )}
    </div>
  );
}
