import React, { useState } from 'react';
import { Calculator, Plus, X } from 'lucide-react';

interface Procedure {
  id: string;
  name: string;
  basePrice: number;
  variables: {
    id: string;
    name: string;
    options: { value: string; price: number }[];
  }[];
}

interface CostEstimatorProps {
  onClose: () => void;
}

const CostEstimator: React.FC<CostEstimatorProps> = ({ onClose }) => {
  const [selectedProcedure, setSelectedProcedure] = useState<string>('');
  const [selections, setSelections] = useState<Record<string, string>>({});

  const procedures: Procedure[] = [
    {
      id: 'surgery1',
      name: 'General Surgery',
      basePrice: 50000,
      variables: [
        {
          id: 'room',
          name: 'Room Type',
          options: [
            { value: 'general', price: 2000 },
            { value: 'private', price: 5000 },
            { value: 'deluxe', price: 8000 },
          ],
        },
        {
          id: 'duration',
          name: 'Expected Duration',
          options: [
            { value: '1-2 hours', price: 10000 },
            { value: '2-4 hours', price: 20000 },
            { value: '4+ hours', price: 30000 },
          ],
        },
      ],
    },
    {
      id: 'consultation1',
      name: 'Specialist Consultation',
      basePrice: 2000,
      variables: [
        {
          id: 'specialist',
          name: 'Specialist Type',
          options: [
            { value: 'general', price: 1000 },
            { value: 'senior', price: 2000 },
            { value: 'hod', price: 3000 },
          ],
        },
      ],
    },
  ];

  const calculateEstimate = () => {
    const procedure = procedures.find((p) => p.id === selectedProcedure);
    if (!procedure) return 0;

    let total = procedure.basePrice;
    procedure.variables.forEach((variable) => {
      const selected = selections[variable.id];
      if (selected) {
        const option = variable.options.find((opt) => opt.value === selected);
        if (option) {
          total += option.price;
        }
      }
    });
    return total;
  };

  const formatToINR = (amount: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
    }).format(amount);
  };

  return (
    <div className="bg-white rounded-lg shadow-lg p-6 max-w-2xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <div className="flex items-center">
          <Calculator className="w-6 h-6 text-blue-600 mr-2" />
          <h2 className="text-xl font-semibold">Cost Estimator</h2>
        </div>
        <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
          <X className="w-5 h-5" />
        </button>
      </div>

      <div className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Select Procedure
          </label>
          <select
            value={selectedProcedure}
            onChange={(e) => {
              setSelectedProcedure(e.target.value);
              setSelections({});
            }}
            className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
          >
            <option value="">Choose a procedure...</option>
            {procedures.map((procedure) => (
              <option key={procedure.id} value={procedure.id}>
                {procedure.name}
              </option>
            ))}
          </select>
        </div>

        {selectedProcedure && (
          <div className="space-y-4">
            {procedures
              .find((p) => p.id === selectedProcedure)
              ?.variables.map((variable) => (
                <div key={variable.id}>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    {variable.name}
                  </label>
                  <select
                    value={selections[variable.id] || ''}
                    onChange={(e) =>
                      setSelections({ ...selections, [variable.id]: e.target.value })
                    }
                    className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="">Select {variable.name.toLowerCase()}...</option>
                    {variable.options.map((option) => (
                      <option key={option.value} value={option.value}>
                        {option.value} ({formatToINR(option.price)})
                      </option>
                    ))}
                  </select>
                </div>
              ))}

            <div className="mt-6 p-4 bg-gray-50 rounded-lg">
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Base Price</span>
                <span className="font-medium">
                  {formatToINR(
                    procedures.find((p) => p.id === selectedProcedure)?.basePrice || 0
                  )}
                </span>
              </div>
              <div className="border-t my-4"></div>
              <div className="flex justify-between items-center">
                <span className="font-semibold">Estimated Total</span>
                <span className="text-xl font-bold text-blue-600">
                  {formatToINR(calculateEstimate())}
                </span>
              </div>
              <p className="text-sm text-gray-500 mt-4">
                * This is an estimate. Final costs may vary based on actual procedure
                requirements and complications.
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CostEstimator;