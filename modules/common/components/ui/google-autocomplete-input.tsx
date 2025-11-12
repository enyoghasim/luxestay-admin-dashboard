"use client";
import React, { useRef, useEffect, useState } from "react";
import { useJsApiLoader, Autocomplete } from "@react-google-maps/api";
import { Input } from "./input";
import { AnimatePresence, motion } from "framer-motion";

const libraries: "places"[] = ["places"];

interface GoogleAutocompleteInputProps {
  value: string;
  onChange: (value: string, placeDetails?: PlaceDetails) => void;
  label?: string;
  placeholder?: string;
  error?: string;
  required?: boolean;
  name?: string;
}

export interface PlaceDetails {
  fullAddress: string;
  city: string;
  country: string;
  state: string;
  postalCode: string;
  latitude?: number;
  longitude?: number;
}

export const GoogleAutocompleteInput: React.FC<
  GoogleAutocompleteInputProps
> = ({ value, onChange, label, placeholder, error, required, name }) => {
  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || "",
    libraries,
  });

  const autocompleteRef = useRef<google.maps.places.Autocomplete | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const [localValue, setLocalValue] = useState(value);
  const [isLoadingPlace, setIsLoadingPlace] = useState(false);

  useEffect(() => {
    setLocalValue(value);
  }, [value]);

  useEffect(() => {
    // Move pac-container outside of any parent containers after it's created
    const handleDOMNodeInserted = () => {
      const pacContainers = document.querySelectorAll(".pac-container");
      pacContainers.forEach((container) => {
        if (container.parentElement !== document.body) {
          document.body.appendChild(container);
        }
      });
    };

    document.addEventListener("DOMNodeInserted", handleDOMNodeInserted);

    return () => {
      document.removeEventListener("DOMNodeInserted", handleDOMNodeInserted);
    };
  }, []);

  const handlePlaceSelect = () => {
    if (autocompleteRef.current) {
      setIsLoadingPlace(true);
      const place = autocompleteRef.current.getPlace();

      if (place.formatted_address) {
        const addressComponents = place.address_components || [];

        let city = "";
        let country = "";
        let state = "";
        let postalCode = "";

        // Extract city (locality)
        const cityComponent = addressComponents.find((component) =>
          component.types.includes("locality")
        );
        if (cityComponent) {
          city = cityComponent.long_name;
        }

        // Extract state
        const stateComponent = addressComponents.find((component) =>
          component.types.includes("administrative_area_level_1")
        );
        if (stateComponent) {
          state = stateComponent.long_name;
        }

        // If no city found, use state as city
        if (!city && state) {
          city = state;
        }

        // Extract country
        const countryComponent = addressComponents.find((component) =>
          component.types.includes("country")
        );
        if (countryComponent) {
          country = countryComponent.long_name;
        }

        // Extract postal code
        const postalCodeComponent = addressComponents.find((component) =>
          component.types.includes("postal_code")
        );
        if (postalCodeComponent) {
          postalCode = postalCodeComponent.long_name;
        }

        const placeDetails: PlaceDetails = {
          fullAddress: place.formatted_address,
          city,
          country,
          state,
          postalCode,
          latitude: place.geometry?.location?.lat(),
          longitude: place.geometry?.location?.lng(),
        };

        setLocalValue(place.formatted_address);
        onChange(place.formatted_address, placeDetails);

        // Small delay to show loading state
        setTimeout(() => {
          setIsLoadingPlace(false);
        }, 300);
      } else {
        setIsLoadingPlace(false);
      }
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    setLocalValue(newValue);
    onChange(newValue);
  };

  if (!isLoaded) {
    return (
      <div className="relative flex flex-col w-full">
        {label && (
          <label className="mb-1 text-sm font-medium text-neutral-900">
            {label}
            {required && <span className="text-blue">*</span>}
          </label>
        )}
        <div className="relative">
          <Input
            value={value}
            onChange={(e) => onChange(e.target.value)}
            placeholder={placeholder}
            name={name}
            error={error}
            disabled
          />
          <div className="absolute inset-0 flex items-center justify-center bg-white/50">
            <p className="text-xs text-neutral-500">Loading Google Maps...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="relative flex flex-col w-full">
      {label && (
        <label className="mb-1 text-sm font-medium text-neutral-900">
          {label}
          {required && <span className="text-blue">*</span>}
        </label>
      )}
      <div className="relative">
        <Autocomplete
          onLoad={(autocomplete) => {
            autocompleteRef.current = autocomplete;
          }}
          onPlaceChanged={handlePlaceSelect}
          options={{
            types: ["address"],
            fields: ["formatted_address", "address_components", "geometry"],
          }}
        >
          <input
            ref={inputRef}
            type="text"
            value={localValue}
            onChange={handleInputChange}
            placeholder={placeholder}
            name={name}
            aria-invalid={!!error}
            disabled={isLoadingPlace}
            autoComplete="off"
            className={`file:text-foreground placeholder:text-muted-foreground selection:bg-primary selection:text-primary-foreground dark:bg-input/30 border-input flex h-10 w-full min-w-0 rounded-md border bg-transparent px-3 py-1 text-base shadow-xs transition-[color,box-shadow] outline-none file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm ${
              error
                ? "border-red-500 focus-visible:border-red-500 ring-red-500/20 dark:ring-red-500/40"
                : "focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive"
            }`}
          />
        </Autocomplete>
        {isLoadingPlace && (
          <div className="absolute inset-0 flex items-center justify-center bg-white/80 rounded-md pointer-events-none">
            <p className="text-xs text-neutral-600 font-medium">
              Loading location details...
            </p>
          </div>
        )}
      </div>
      <AnimatePresence mode="wait">
        {error && (
          <motion.p
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="text-xs text-red-500 mt-1"
          >
            {error}
          </motion.p>
        )}
      </AnimatePresence>
      <style jsx global>{`
        .pac-container {
          z-index: 99999 !important;
          margin-top: 4px;
          border-radius: 8px;
          box-shadow: 0 4px 6px -1px rgb(0 0 0 / 0.1),
            0 2px 4px -2px rgb(0 0 0 / 0.1);
          border: 1px solid rgb(229 231 235);
          background-color: white;
        }
        .pac-item {
          padding: 8px 12px;
          cursor: pointer !important;
          font-size: 14px;
          line-height: 1.5;
          pointer-events: auto !important;
        }
        .pac-item:hover {
          background-color: rgb(249 250 251) !important;
        }
        .pac-item-selected,
        .pac-item-selected:hover {
          background-color: rgb(243 244 246) !important;
        }
        .pac-icon {
          margin-top: 4px;
        }
        .pac-item-query {
          font-size: 14px;
          color: rgb(17 24 39);
        }
        .pac-matched {
          font-weight: 600;
        }
      `}</style>
    </div>
  );
};
