'use client';
import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import { MapContainer, TileLayer, Marker } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
// import L from 'leaflet';

interface FarmerDetails {
  id: string;
  full_name: string;
  contact_number: number;
  email: string;
  aadhaar: string;
  total_land_area: string;
  crops_grown: string[];
  farming_type: string;
  irrigation_method: string;
  fertilizer_usage: string;
  harvest_seasons: string;
  average_yield: string;
  previous_buyers: string;
  village: string;
  taluk: string;
  district: string;
  state: string;
  pin_code: string;
  geo_location: string;
  nearest_market: string;
  delivery_mode: string;
  storage_facilities: string;
  distance_to_road: string;
  transport_availability: string;
  payment_method: string;
  bank_account: string;
  bank_name: string;
  ifsc_code: string;
  upi_id: string;
  land_ownership_proof: string;
  long_term_partnership: string;
  additional_remarks: string;
  latitude: number;
  longitude: number;
  is_verify: boolean;
}

export default function FarmerDetails() {
  const params = useParams();
  const [farmer, setFarmer] = useState<FarmerDetails | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);

  useEffect(() => {
    const fetchFarmerDetails = async () => {
      try {
        const response = await fetch(`https://freshxpress-backend.onrender.com/api/farmers/${params.id}`);
        const data = await response.json();
        setFarmer(data);
      } catch (error) {
        console.error('Error fetching farmer details:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchFarmerDetails();
  }, [params.id]);

  const updateVerificationStatus = async () => {
    if (!farmer) return;
    
    setIsUpdating(true);
    try {
      const response = await fetch(`https://freshxpress-backend.onrender.com/api/farmers/${params.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          is_verify: !farmer.is_verify
        }),
      });

      if (response.ok) {
        setFarmer(prev => prev ? {...prev, is_verify: !prev.is_verify} : null);
      }
    } catch (error) {
      console.error('Error updating verification status:', error);
    } finally {
      setIsUpdating(false);
      setShowModal(false);
    }
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#00843D]"></div>
      </div>
    );
  }

  if (!farmer) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-red-500 text-xl">Farmer not found</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-5xl mx-auto bg-white rounded-lg shadow-lg p-6">
        <div className="border-b border-gray-200 pb-4 mb-6 flex justify-between items-start">
          <div>
            <h1 className="text-3xl font-bold text-[#00843D]">{farmer.full_name || '-'}</h1>
            <p className="text-gray-600">Farmer ID: {farmer.id || '-'}</p>
          </div>
          <div className="flex items-center gap-4 mt-2">
            <div className="flex items-center space-x-2">
              <span className="font-medium text-[#00843D]">Verification Status:</span>
              {farmer.is_verify ? 
                <span className="text-green-600 font-bold">Verified ✓</span> : 
                <span className="text-red-600 font-bold">Not Verified ✗</span>
              }
            </div>
          </div>
        </div>

        {/* Confirmation Modal */}
        {showModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 text-gray-600">
            <div className="bg-white p-6 rounded-lg max-w-md w-full">
              <h3 className="text-xl font-bold mb-4 text-[#00843D]">Confirm Action</h3>
              <p className="mb-6">
                Are you sure you want to {farmer.is_verify ? 'revoke verification from' : 'verify'} this farmer?
              </p>
              <div className="flex justify-end gap-4">
                <button
                  onClick={() => setShowModal(false)}
                  className="px-4 py-2 bg-gray-200 rounded-lg hover:bg-gray-300"
                >
                  Cancel
                </button>
                <button
                  onClick={updateVerificationStatus}
                  className={`px-4 py-2 rounded-lg text-white ${
                    farmer.is_verify ? 'bg-red-500 hover:bg-red-600' : 'bg-green-500 hover:bg-green-600'
                  }`}
                >
                  Confirm
                </button>
              </div>
            </div>
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <h2 className="text-xl font-semibold text-[#00843D]">Personal Information</h2>
            <div className="space-y-2 text-gray-600">
              <p><span className="font-medium text-[#00843D]">Contact:</span> {farmer.contact_number || '-'}</p>
              <p><span className="font-medium text-[#00843D]">Email:</span> {farmer.email || '-'}</p>
              <p><span className="font-medium text-[#00843D]">Aadhaar:</span> {farmer.aadhaar || '-'}</p>
            </div>

            <h2 className="text-xl font-semibold text-[#00843D] pt-4">Farm Details</h2>
            <div className="space-y-2 text-gray-600">
              <p><span className="font-medium text-[#00843D]">Total Land Area:</span> {farmer.total_land_area || '-'}</p>
              <p><span className="font-medium text-[#00843D]">Farming Type:</span> {farmer.farming_type || '-'}</p>
              <p><span className="font-medium text-[#00843D]">Irrigation Method:</span> {farmer.irrigation_method || '-'}</p>
              <p><span className="font-medium text-[#00843D]">Fertilizer Usage:</span> {farmer.fertilizer_usage || '-'}</p>
              <p><span className="font-medium text-[#00843D]">Harvest Seasons:</span> {farmer.harvest_seasons || '-'}</p>
              <p><span className="font-medium text-[#00843D]">Average Yield:</span> {farmer.average_yield || '-'}</p>
              <div>
                <span className="font-medium text-[#00843D]">Crops Grown:</span>
                {farmer.crops_grown && farmer.crops_grown.length > 0 ? (
                  <ul className="list-disc list-inside pl-4">
                    {farmer.crops_grown.map((crop, index) => (
                      <li key={index}>{crop}</li>
                    ))}
                  </ul>
                ) : '-'}
              </div>
            </div>
          </div>

          <div className="space-y-4 text-gray-600">
            <h2 className="text-xl font-semibold text-[#00843D]">Location Details</h2>
            <div className="space-y-2">
              <p><span className="font-medium text-[#00843D]">Village:</span> {farmer.village || '-'}</p>
              <p><span className="font-medium text-[#00843D]">Taluk:</span> {farmer.taluk || '-'}</p>
              <p><span className="font-medium text-[#00843D]">District:</span> {farmer.district || '-'}</p>
              <p><span className="font-medium text-[#00843D]">State:</span> {farmer.state || '-'}</p>
              <p><span className="font-medium text-[#00843D]">PIN Code:</span> {farmer.pin_code || '-'}</p>
              <p><span className="font-medium text-[#00843D]">Geo Location:</span> {farmer.geo_location || '-'}</p>
              <p><span className="font-medium text-[#00843D]">Nearest Market:</span> {farmer.nearest_market || '-'}</p>
              <p><span className="font-medium text-[#00843D]">Distance to Road:</span> {farmer.distance_to_road || '-'}</p>
            </div>

            {farmer.latitude && farmer.longitude && (
              <div className="h-64 w-full mt-4">
                <MapContainer 
                  center={[farmer.latitude, farmer.longitude]} 
                  zoom={13} 
                  style={{ height: '100%', width: '100%' }}
                >
                  <TileLayer
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                  />
                  <Marker position={[farmer.latitude, farmer.longitude]} />
                </MapContainer>
              </div>
            )}
          </div>
        </div>

        <div className="mt-8 pt-6 border-t border-gray-200">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h2 className="text-xl font-semibold text-[#00843D] mb-4">Additional Information</h2>
              <div className="space-y-2 text-gray-600">
                <p><span className="font-medium text-[#00843D]">Storage Facilities:</span> {farmer.storage_facilities || '-'}</p>
                <p><span className="font-medium text-[#00843D]">Transport Availability:</span> {farmer.transport_availability || '-'}</p>
                <p><span className="font-medium text-[#00843D]">Delivery Mode:</span> {farmer.delivery_mode || '-'}</p>
                <p><span className="font-medium text-[#00843D]">Previous Buyers:</span> {farmer.previous_buyers || '-'}</p>
                <p><span className="font-medium text-[#00843D]">Long Term Partnership:</span> {farmer.long_term_partnership || '-'}</p>
                <p><span className="font-medium text-[#00843D]">Additional Remarks:</span> {farmer.additional_remarks || '-'}</p>
              </div>
            </div>

            <div>
              <h2 className="text-xl font-semibold text-[#00843D] mb-4">Banking Details</h2>
              <div className="space-y-2 text-gray-600">
                <p><span className="font-medium text-[#00843D]">Payment Method:</span> {farmer.payment_method || '-'}</p>
                <p><span className="font-medium text-[#00843D]">Bank Name:</span> {farmer.bank_name || '-'}</p>
                <p><span className="font-medium text-[#00843D]">Account Number:</span> {farmer.bank_account || '-'}</p>
                <p><span className="font-medium text-[#00843D]">IFSC Code:</span> {farmer.ifsc_code || '-'}</p>
                <p><span className="font-medium text-[#00843D]">UPI ID:</span> {farmer.upi_id || '-'}</p>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-8 pt-6 border-t border-gray-200">
          <h2 className="text-xl font-semibold text-[#00843D] mb-4">Documents</h2>
          <div className="space-y-4">
            {farmer.land_ownership_proof && (
              <div>
                <p className="font-medium text-[#00843D] mb-2">Land Ownership Proof:</p>
                <a 
                  href={farmer.land_ownership_proof}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:text-blue-800 underline"
                >
                  View Document
                </a>
              </div>
            )}
          </div>
          
          <div className="mt-8 flex justify-center">
            <button
              onClick={() => setShowModal(true)}
              disabled={isUpdating}
              className={`px-6 py-3 rounded-lg text-white text-lg transition duration-200 ${
                farmer.is_verify 
                ? 'bg-red-500 hover:bg-red-600' 
                : 'bg-green-500 hover:bg-green-600'
              } ${isUpdating ? 'opacity-50 cursor-not-allowed' : ''}`}
            >
              {isUpdating ? 'Updating...' : farmer.is_verify ? 'Revoke Verification' : 'Verify Farmer'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
