import React from "react";
import { useNavigate } from "react-router-dom";
import "../components/style/LocationCard.css";

const LocationCard = ({ locationId, name, image, features }) => {
  const navigate = useNavigate();

  const handleViewLocation = () => {
    navigate(`/locations/${locationId}`);
  };

  return (
    <div className="location-card group">
      <div className="relative overflow-hidden rounded-lg shadow-md transition-transform transform duration-300 group-hover:scale-105">
        <img
          src={image}
          alt={name}
          className="w-full h-48 object-cover sm:h-56 md:h-64 lg:h-72"
        />
      </div>
      <div className="p-4 bg-white">
        <h2 className="text-lg font-bold text-gray-800 mb-4">{name}</h2>
        <div className="flex flex-wrap justify-center gap-2 my-2">
          {features.map((feature, index) => (
            <span
              key={index}
              className="bg-black text-white px-3 py-1 text-xs rounded-full"
            >
              {feature}
            </span>
          ))}
        </div>
        <button
          className="mt-4 px-4 py-2 bg-blue-600 text-white font-bold rounded-md uppercase hover:bg-blue-700 w-full sm:w-auto"
          onClick={handleViewLocation}
        >
          View Location
        </button>
      </div>
    </div>
  );
};

export default LocationCard;

