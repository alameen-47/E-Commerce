import React, { useEffect } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

import pointerIcon from "../assets/icons/locationMark.png";
import { t } from "i18next";

const MapComponent = ({ onSelectLocation, locations }) => {
  useEffect(() => {
    const map = L.map("map").setView(
      [locations[0].latitude, locations[0].longitude],
      13
    );

    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution: "",
    }).addTo(map);

    const customIcon = L.icon({
      iconUrl: pointerIcon,
      iconSize: [25, 41], // Size of the icon
      iconAnchor: [12, 41], // Point of the icon which corresponds to marker's location
      popupAnchor: [0, -41], // Point from which the popup should open relative to the iconAnchor
    });
    locations.forEach((locations) => {
      const marker = L.marker([locations.latitude, locations.longitude], {
        draggable: true,
        icon: customIcon,
      }).addTo(map);
      marker.bindPopup(locations.name).openPopup(); // Replace with the actual address if needed

      marker.on("dragend", (event) => {
        const { lat, lng } = marker.getLatLng();
        onSelectLocation({ id: locations.id, lat, lng });
      });
    });
    return () => {
      map.remove();
    };
  }, [onSelectLocation, locations]);

  return (
    <div
      className="w-screen sm:w-screen sm:h-72 xl:h-72 xl:w-72 md:lg:w-screen md:h-72"
      id="map"
    ></div>
  );
};

export default MapComponent;
