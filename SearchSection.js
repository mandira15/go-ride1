'use client';

import { useState } from 'react';
import GooglePlacesAutocomplete from 'react-google-places-autocomplete';

export default function SearchSection({ onLocationSelect, selectedLocation }) {
  const [pickup, setPickup] = useState(null);
  const [destination, setDestination] = useState(null);

  const handlePlaceSelect = async (place, type) => {
    // Get place details and coordinates
    const geocoder = new google.maps.Geocoder();
    geocoder.geocode({ placeId: place.value.place_id }, (results, status) => {
      if (status === 'OK') {
        const location = {
          lat: results[0].geometry.location.lat(),
          lng: results[0].geometry.location.lng(),
          address: place.value.description
        };
        onLocationSelect(type, location);
      }
    });
  };

  return (
    <div className="p-4">
      <h2 className="text-xl font-semibold mb-4">Book a Ride</h2>
      
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Pickup Location
          </label>
          <GooglePlacesAutocomplete
            selectProps={{
              value: pickup,
              onChange: (place) => {
                setPickup(place);
                handlePlaceSelect(place, 'pickup');
              },
              placeholder: 'Enter pickup location',
              styles: {
                control: (provided) => ({
                  ...provided,
                  borderRadius: '0.375rem',
                })
              }
            }}
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Destination
          </label>
          <GooglePlacesAutocomplete
            selectProps={{
              value: destination,
              onChange: (place) => {
                setDestination(place);
                handlePlaceSelect(place, 'destination');
              },
              placeholder: 'Enter destination',
              styles: {
                control: (provided) => ({
                  ...provided,
                  borderRadius: '0.375rem',
                })
              }
            }}
          />
        </div>
      </div>
    </div>
  );
}