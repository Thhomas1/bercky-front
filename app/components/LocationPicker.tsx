"use client";

import "leaflet/dist/leaflet.css";
import {
  MapContainer,
  TileLayer,
  CircleMarker,
  useMapEvents,
} from "react-leaflet";
import type { ReportLocation } from "@/types/report";

// Bernal, default center when there is no point yet
const DEFAULT_CENTER: [number, number] = [-34.709, -58.28];

interface LocationPickerProps {
  value: ReportLocation | null;
  onChange: (location: ReportLocation) => void;
}

const ClickHandler = ({ onChange }: Pick<LocationPickerProps, "onChange">) => {
  useMapEvents({
    click: (e) => onChange({ lat: e.latlng.lat, lng: e.latlng.lng }),
  });
  return null;
};

export default function LocationPicker({
  value,
  onChange,
}: LocationPickerProps) {
  return (
    <div className="h-64 overflow-hidden rounded-xl border border-zinc-200 dark:border-zinc-800">
      <MapContainer
        center={value ? [value.lat, value.lng] : DEFAULT_CENTER}
        zoom={15}
        className="h-full w-full"
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <ClickHandler onChange={onChange} />
        {value && <CircleMarker center={[value.lat, value.lng]} radius={10} />}
      </MapContainer>
    </div>
  );
}
