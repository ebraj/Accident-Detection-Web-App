"use client";

import React, { useEffect, useState } from "react";
import { MapContainer, TileLayer, useMap, useMapEvents } from "react-leaflet";
import { Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { Icon } from "leaflet";

type Props = {};

const mapPin = new Icon({
  iconUrl: "/assets/MapPin.png",
  iconSize: [25, 35],
});

export default function CustomMap({}: Props) {
  return (
    <div className="overflow-hidden h-[320px] rounded-md border-2">
      <MapContainer
        className="w-full h-full"
        center={[28.2367583, 83.9960459255522]}
        zoom={15}
        scrollWheelZoom={false}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Marker position={[28.2367583, 83.9960459255522]} icon={mapPin}>
          <Popup position={[28.2367583, 83.9960459255522]}>
            <div>
              <p>Pokhara</p>
            </div>
          </Popup>
        </Marker>
      </MapContainer>
    </div>
  );
}
