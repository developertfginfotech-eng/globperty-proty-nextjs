const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000/api';

export const kycAPI = {
  submitKYC: async (kycData, files) => {
    const formData = new FormData();

    Object.keys(kycData).forEach(key => {
      if (typeof kycData[key] === 'object' && kycData[key] !== null) {
        formData.append(key, JSON.stringify(kycData[key]));
      } else {
        formData.append(key, kycData[key]);
      }
    });

    const v1Files = {
      frontImage: 'frontimage',
      backImage: 'backimage',
      aadhaarCard: 'aadhaarcard',
      panCard: 'pancard',
      driversLicense: 'driverslicense',
      passport: 'passport',
      propertyOwnership: 'propertyownership',
      businessLicense: 'businesslicense',
      taxDocument: 'taxdocument',
      bankStatement: 'bankstatement',
      addressProof: 'addressproof'
    };

    Object.keys(v1Files).forEach(key => {
      const fileData = files[key];
      if (fileData && !(typeof fileData === 'object' && (fileData.front || fileData.back))) {
        formData.append(v1Files[key], fileData);
      }
    });

    Object.keys(files).forEach(key => {
      const fileData = files[key];
      const isV2FrontBack = fileData && typeof fileData === 'object' && (fileData.front || fileData.back);

      if (!v1Files[key] || isV2FrontBack) {
        if (Array.isArray(fileData)) {
          fileData.forEach((file) => formData.append(key, file));
        } else if (isV2FrontBack) {
          if (fileData.front) formData.append(`${key}_front`, fileData.front);
          if (fileData.back) formData.append(`${key}_back`, fileData.back);
        } else if (fileData) {
          formData.append(key, fileData);
        }
      }
    });

    const token = localStorage.getItem('authToken');
    const response = await fetch(`${API_URL}/kyc/upload`, {
      method: 'POST',
      headers: { 'Authorization': `Bearer ${token}` },
      body: formData,
    });
    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.message || 'KYC submission failed');
    }
    return response.json();
  },

  getKYCStatus: async () => {
    const token = localStorage.getItem('authToken');
    const response = await fetch(`${API_URL}/kyc/status`, {
      headers: { 'Authorization': `Bearer ${token}` },
    });
    if (!response.ok) throw new Error('Failed to fetch KYC status');
    return response.json();
  },

  verifyKYC: async (kycId, status, rejectionReason = '') => {
    const token = localStorage.getItem('authToken');
    const response = await fetch(`${API_URL}/kyc/verify/${kycId}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
      body: JSON.stringify({ status, rejectionReason }),
    });
    if (!response.ok) throw new Error('Failed to verify KYC');
    return response.json();
  },
};
