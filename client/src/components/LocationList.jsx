import React from "react";
import LocationCard from "./LocationCard.jsx";
import './style/LocationList.css';

const LocationList = () => {
    const locations = [
        {
          id: 1,
          name: "LIBERTY BY SCOPE CINEMAS - Colpetty",
          image: "https://theatersollution.s3.amazonaws.com/17d0d2b3-02c3-4fe3-9c0d-8b16241480ae.jpg",
          features: ["Digital 3D", "Digital 2D", "7.1", "5.1"],
        },
        {
          id: 2,
          name: "SCOPE CINEMAS MULTIPLEX - Havelock City Mall",
          image: "https://theatersollution.s3.amazonaws.com/60ee8ca3-e8ee-448d-a5bd-ebbc768bf3b7.jpg",
          features: ["Digital 3D", "Digital 2D", "7.1", "5.1"],
        },
        {
          id: 3,
          name: "SCOPE CINEMAS MULTIPLEX - Colombo City Centre",
          image: "https://theatersollution.s3.amazonaws.com/c615697a-fd01-48bf-b40b-4067badf0189.jpeg",
          features: ["Digital 3D", "Digital 2D", "7.1", "5.1"],
        },
        {
          id: 4,
          name: "LIBERTY BY SCOPE CINEMAS - Kiribathgoda",
          image: "https://theatersollution.s3.amazonaws.com/7f3ad000-a850-43d8-81f6-af2520b2605a.png",
          features: ["Digital 3D", "Digital 2D", "7.1", "5.1"],
        },
      ];    
    return(
        <div className="locations-section">
        <h1 className="text-black text-3xl font-bold uppercase mt-5 mb-5">Location</h1>
        <div className="locations-grid">
          {locations.map((location) => (
            <LocationCard
              locationId={location.id}
              name={location.name}
              image={location.image}
              features={location.features}
            />

          ))}
        </div>

      </div>
    );
}
export default LocationList;