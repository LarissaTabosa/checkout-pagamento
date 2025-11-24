import { X, CheckCircle } from 'lucide-react';

interface PaymentModalProps {
  total: number;
  onClose: () => void;
}

export default function PaymentModal({ total, onClose }: PaymentModalProps) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 p-4">
      <div className="bg-white rounded-2xl w-full max-w-sm p-6">
        <div className="flex justify-end mb-4">
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
            <X className="w-6 h-6" />
          </button>
        </div>

        <div className="text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-green-100 rounded-full mb-4">
            <CheckCircle className="w-8 h-8 text-green-500" />
          </div>

          <h2 className="text-xl font-bold text-gray-900 mb-2">Pedido Confirmado!</h2>
          <p className="text-gray-600 mb-6">
            Seu pedido foi realizado com sucesso.
          </p>

          <div className="bg-gray-50 rounded-lg p-4 mb-6">
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600">Total pago</span>
              <span className="text-2xl font-bold" style={{ color: '#FF2C55' }}>
                R$ {total.toFixed(2).replace('.', ',')}
              </span>
            </div>
          </div>

          <button
            onClick={onClose}
            className="w-full text-white font-semibold py-3 rounded-lg transition-colors"
            style={{ backgroundColor: '#FF2C55' }}
            onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#E62850'}
            onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#FF2C55'}
          >
            Continuar comprando
          </button>
        </div>
      </div>
    </div>
  );
}
