"use client";
import { useState, useEffect } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import FarmerDetailsContent from "@/components/FarmerDetailsContent";
import LoadingSpinner from "@/components/loading";
import NotFound from "@/components/not-found";

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
const customIcon = L.icon({
    iconUrl: "/leaflet/marker-icon.png",
  iconRetinaUrl: "/leaflet/marker-icon-2x.png",
  shadowUrl: "/leaflet/marker-shadow.png",
    iconSize: [25, 41], // Default Leaflet size
    iconAnchor: [12, 41], // Anchor to bottom center
    popupAnchor: [1, -34],
    shadowSize: [41, 41],
  });

export default function FarmerDetails({ farmerId }: { farmerId: string }) {
  const [farmer, setFarmer] = useState<FarmerDetails | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchFarmerDetails = async () => {
      try {
        const response = await fetch(`https://freshxpress-backend.onrender.com/api/farmers/${farmerId}`);
        const data = await response.json();
        setFarmer(data);
      } catch (error) {
        console.error("Error fetching farmer details:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchFarmerDetails();
  }, [farmerId]);

  useEffect(() => {
    if (farmer?.latitude && farmer?.longitude) {
      const map = L.map("map").setView([farmer.latitude, farmer.longitude], 13);

      L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
      }).addTo(map);

      L.marker([farmer.latitude, farmer.longitude], { icon: customIcon }).addTo(map);

      return () => {
        map.remove();
      };
    }
  }, [farmer]);

  if (isLoading) return <LoadingSpinner />;
  if (!farmer) return <NotFound />;

  return <FarmerDetailsContent farmer={farmer} />;
}
