import React, { useState } from 'react';
import { Shield, Search, Filter, AlertCircle, Download, X, Calendar, DollarSign, Plus } from 'lucide-react';

interface Claim {
  id: number;
  patientName: string;
  amount: number;
  submittedDate: string;
  status: 'In Review' | 'Approved' | 'Rejected';
  description: string;
  insuranceProvider: string;
  policyNumber: string;
}

const Insurance = () => {
  const [selectedClaim, setSelectedClaim] = useState<Claim | null>(null);
  const [searchQuery, setSearchQuery] = useState('');

  const claims: Claim[] = [
    {
      id: 2001,
      patientName: "John Doe",
      amount: 25000,
      submittedDate: "2024-03-15",
      status: "In Review",
      description: "Emergency appendectomy procedure",
      insuranceProvider: "HealthGuard Insurance",
      policyNumber: "HG-2024-1234"
    },
    {
      id: 2002,
      patientName: "Sarah Smith",
      amount: 18000,
      submittedDate: "2024-03-14",
      status: "Approved",
      description: "Diagnostic tests and consultation",
      insuranceProvider: "MediCare Plus",
      policyNumber: "MP-2024-5678"
    },
    {
      id: 2003,
      patientName: "Mike Johnson",
      amount: 35000,
      submittedDate: "2024-03-13",
      status: "In Review",
      description: "Physiotherapy sessions",
      insuranceProvider: "CarePlus Insurance",
      policyNumber: "CP-2024-9012"
    }
  ];

  const handleDownloadClaim = (claimId: number, e: React.MouseEvent) => {
    e.stopPropagation();
    // In a real application, this would trigger the claim document download
    console.log(`Downloading claim ${claimId}`);
  };

  const formatToINR = (amount: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
    }).format(amount);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-IN', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Approved':
        return 'bg-green-100 text-green-800';
      case 'Rejected':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-yellow-100 text-yellow-800';
    }
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-800">Insurance Claims</h1>
        <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center">
          <Plus className="w-4 h-4 mr-2" />
          Submit New Claim
        </button>
      </div>

      <div className="flex gap-4 mb-6">
        <div className="flex-1 relative">
          <Search className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search claims..."
            className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <button className="flex items-center px-4 py-2 border border-gray-200 rounded-lg hover:bg-gray-50">
          <Filter className="w-4 h-4 mr-2" />
          Filters
        </button>
      </div>

      <div className="bg-white rounded-xl shadow-sm">
        <div className="p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold">Active Claims</h2>
            <button className="text-blue-600 hover:text-blue-700 text-sm font-medium">
              View All
            </button>
          </div>
          <div className="space-y-4">
            {claims.map((claim) => (
              <div
                key={claim.id}
                onClick={() => setSelectedClaim(claim)}
                className="flex items-center justify-between p-4 border border-gray-100 rounded-lg hover:bg-gray-50 cursor-pointer transition-colors"
              >
                <div className="flex items-center">
                  <div className="p-2 bg-blue-50 rounded-lg">
                    <Shield className="w-6 h-6 text-blue-600" />
                  </div>
                  <div className="ml-4">
                    <p className="font-medium">{claim.patientName}</p>
                    <p className="text-sm text-gray-500">Claim #{claim.id}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-medium">{formatToINR(claim.amount)}</p>
                  <span className={`text-sm px-2 py-1 rounded ${getStatusColor(claim.status)}`}>
                    {claim.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {selectedClaim && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-lg m-4">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-semibold">Claim Details</h2>
              <button
                onClick={() => setSelectedClaim(null)}
                className="text-gray-500 hover:text-gray-700"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-gray-600">Patient Name</p>
                  <p className="font-medium">{selectedClaim.patientName}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Claim Number</p>
                  <p className="font-medium">#{selectedClaim.id}</p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-gray-600">Insurance Provider</p>
                  <p className="font-medium">{selectedClaim.insuranceProvider}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Policy Number</p>
                  <p className="font-medium">{selectedClaim.policyNumber}</p>
                </div>
              </div>

              <div>
                <p className="text-sm text-gray-600">Description</p>
                <p className="font-medium">{selectedClaim.description}</p>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-gray-600">Submitted Date</p>
                  <div className="flex items-center">
                    <Calendar className="w-4 h-4 text-gray-400 mr-1" />
                    <p className="font-medium">{formatDate(selectedClaim.submittedDate)}</p>
                  </div>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Amount</p>
                  <div className="flex items-center">
                    <DollarSign className="w-4 h-4 text-gray-400 mr-1" />
                    <p className="font-medium">{formatToINR(selectedClaim.amount)}</p>
                  </div>
                </div>
              </div>

              <div className="flex justify-between items-center pt-4 border-t">
                <span className={`px-3 py-1 rounded-full text-sm ${getStatusColor(selectedClaim.status)}`}>
                  {selectedClaim.status}
                </span>
                <button
                  onClick={(e) => handleDownloadClaim(selectedClaim.id, e)}
                  className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                  <Download className="w-4 h-4 mr-2" />
                  Download Claim
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Insurance;