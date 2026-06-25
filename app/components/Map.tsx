interface MapPreviewProps {
  lat: number;
  lng: number;
  label?: string;
  height?: string;
}

export const Map = ({ lat, lng, label, height = "h-48" }: MapPreviewProps) => {
  const delta = 0.005;
  const bbox = `${lng - delta},${lat - delta},${lng + delta},${lat + delta}`;
  const src = `https://www.openstreetmap.org/export/embed.html?bbox=${bbox}&marker=${lat},${lng}&layer=mapnik`;

  return (
    <div className={`overflow-hidden rounded-xl border border-border ${height}`}>
      <iframe
        src={src}
        title={label ?? "Ubicación en el mapa"}
        className="h-full w-full"
        loading="lazy"
      />
    </div>
  );
};

export default Map;