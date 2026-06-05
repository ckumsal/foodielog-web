"use client";

import "maplibre-gl/dist/maplibre-gl.css";

import maplibregl, { Map, Marker, type StyleSpecification } from "maplibre-gl";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import type { PublicMapDish } from "@/lib/publicMapDishes";

const tileStyle: StyleSpecification = {
  version: 8,
  sources: {
    osm: {
      type: "raster",
      tiles: ["https://tile.openstreetmap.org/{z}/{x}/{y}.png"],
      tileSize: 256,
      attribution: "© OpenStreetMap",
    },
  },
  layers: [
    {
      id: "osm",
      type: "raster",
      source: "osm",
      paint: {
        "raster-saturation": -0.25,
        "raster-brightness-min": 0.18,
        "raster-brightness-max": 0.9,
        "raster-contrast": 0.02,
      },
    },
  ],
};

export default function PublicDishMap({ dishes }: { dishes: PublicMapDish[] }) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const mapRef = useRef<Map | null>(null);
  const markersRef = useRef<Marker[]>([]);
  const [selectedDish, setSelectedDish] = useState<PublicMapDish | null>(null);
  useEffect(() => {
    if (!containerRef.current || mapRef.current) return;

    const map = new maplibregl.Map({
      container: containerRef.current,
      style: tileStyle,
      center: [-20, 22],
      zoom: 1.65,
      minZoom: 1.1,
      maxZoom: 17,
      attributionControl: false,
    });

    map.addControl(new maplibregl.AttributionControl({ compact: true }), "bottom-left");
    map.addControl(new maplibregl.NavigationControl({ showCompass: false }), "bottom-right");
    map.on("load", () => {
      map.resize();
    });

    mapRef.current = map;

    return () => {
      markersRef.current.forEach((marker) => marker.remove());
      map.remove();
      mapRef.current = null;
    };
  }, []);

  useEffect(() => {
    const map = mapRef.current;
    if (!map) return;

    markersRef.current.forEach((marker) => marker.remove());
    markersRef.current = [];

    dishes.forEach((dish) => {
      const markerElement = document.createElement("button");
      markerElement.type = "button";
      markerElement.className = "photo-pin";
      markerElement.ariaLabel = `${dish.dish_name} at ${dish.restaurant_name}`;
      markerElement.style.backgroundImage = `url("${dish.photo_url}")`;
      markerElement.addEventListener("click", () => {
        setSelectedDish(dish);
        map.easeTo({
          center: [dish.longitude, dish.latitude],
          zoom: Math.max(map.getZoom(), 8),
          duration: 450,
        });
      });

      const marker = new maplibregl.Marker({ element: markerElement })
        .setLngLat([dish.longitude, dish.latitude])
        .addTo(map);
      markersRef.current.push(marker);
    });
  }, [dishes]);

  return (
    <div id="map" className="map-stage">
      <div ref={containerRef} className="map-canvas" />
      <div className="map-vignette" />

      <div className="map-status">
        <img src="/app-icon.svg" alt="" width="24" height="24" className="map-status-icon" />
        <span>{dishes.length ? `${dishes.length} public dishes` : "Waiting for public dishes"}</span>
      </div>

      {selectedDish ? (
        <article className="dish-card">
          <div className="dish-photo-wrap">
            <Image
              src={selectedDish.photo_url}
              alt={selectedDish.dish_name}
              fill
              unoptimized
              sizes="(max-width: 720px) 86vw, 340px"
              className="dish-photo"
            />
          </div>
          <div className="dish-card-body">
            <p className="dish-location">
              {[selectedDish.city, selectedDish.country].filter(Boolean).join(", ")}
            </p>
            <h2>{selectedDish.dish_name}</h2>
            <p>{selectedDish.restaurant_name}</p>
            <Link className="dish-link" href={`/dish/${selectedDish.dish_post_id}`}>
              View dish
            </Link>
          </div>
        </article>
      ) : null}
    </div>
  );
}
