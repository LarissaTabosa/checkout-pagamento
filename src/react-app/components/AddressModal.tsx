import { useState } from 'react';
import { X } from 'lucide-react';

interface AddressModalProps {
  onClose: () => void;
  onSave: (address: string) => void;
}

export default function AddressModal({ onClose, onSave }: AddressModalProps) {
  const [recipientName, setRecipientName] = useState('');
  const [cep, setCep] = useState('');
  const [street, setStreet] = useState('');
  const [number, setNumber] = useState('');
  const [neighborhood, setNeighborhood] = useState('');
  const [city, setCity] = useState('');

  const formatCEP = (value: string) => {
    const numbers = value.replace(/\D/g, '');
    if (numbers.length <= 5) return numbers;
    return `${numbers.slice(0, 5)}-${numbers.slice(5, 8)}`;
  };

  const handleCEPChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCep(formatCEP(e.target.value));
  };

  const handleSave = () => {
    if (!recipientName || !cep || !street || !number || !neighborhood || !city) {
      alert('Por favor, preencha todos os campos');
      return;
    }
    const fullAddress = `${recipientName}\n${street}, ${number}, ${neighborhood}, ${city} - CEP ${cep}`;
    onSave(fullAddress);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white rounded-t-2xl sm:rounded-2xl w-full sm:max-w-md max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-gray-200">
          <h2 className="text-lg font-semibold text-gray-900">Adicionar endereço</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Form */}
        <div className="p-4 space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Nome do destinatário</label>
            <input
              type="text"
              value={recipientName}
              onChange={(e) => setRecipientName(e.target.value)}
              placeholder="Nome completo"
              className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none"
              onFocus={(e) => e.currentTarget.style.borderColor = '#FF2C55'}
              onBlur={(e) => e.currentTarget.style.borderColor = '#D1D5DB'}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">CEP</label>
            <input
              type="text"
              value={cep}
              onChange={handleCEPChange}
              placeholder="00000-000"
              maxLength={9}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none"
              style={{ '--tw-ring-color': '#FF2C55' } as React.CSSProperties}
              onFocus={(e) => e.currentTarget.style.borderColor = '#FF2C55'}
              onBlur={(e) => e.currentTarget.style.borderColor = '#D1D5DB'}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Rua</label>
            <input
              type="text"
              value={street}
              onChange={(e) => setStreet(e.target.value)}
              placeholder="Nome da rua"
              className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none"
              onFocus={(e) => e.currentTarget.style.borderColor = '#FF2C55'}
              onBlur={(e) => e.currentTarget.style.borderColor = '#D1D5DB'}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Número</label>
            <input
              type="text"
              value={number}
              onChange={(e) => setNumber(e.target.value)}
              placeholder="123"
              className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-red-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Bairro</label>
            <input
              type="text"
              value={neighborhood}
              onChange={(e) => setNeighborhood(e.target.value)}
              placeholder="Nome do bairro"
              className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-red-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Cidade</label>
            <input
              type="text"
              value={city}
              onChange={(e) => setCity(e.target.value)}
              placeholder="Nome da cidade"
              className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-red-500"
            />
          </div>

          <button
            onClick={handleSave}
            className="w-full text-white font-semibold py-3 rounded-lg transition-colors"
            style={{ backgroundColor: '#FF2C55' }}
            onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#E62850'}
            onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#FF2C55'}
          >
            Salvar endereço
          </button>
        </div>
      </div>
    </div>
  );
}
