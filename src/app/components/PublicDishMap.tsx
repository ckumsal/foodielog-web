"use client";

import "maplibre-gl/dist/maplibre-gl.css";

import maplibregl, { Map, Marker, type StyleSpecification } from "maplibre-gl";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useMemo, useRef, useState } from "react";
import Supercluster from "supercluster";
import type { PointFeature } from "supercluster";
import type { PublicMapDish } from "@/lib/publicMapDishes";

type DishFeatureProps = PublicMapDish & { cluster: false };
type ClusterFeatureProps = {
  cluster: true;
  cluster_id: number;
  point_count: number;
};
type DishFeature = PointFeature<DishFeatureProps>;
type ClusterFeature = PointFeature<ClusterFeatureProps>;

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
        "raster-saturation": -0.9,
        "raster-brightness-min": 0.08,
        "raster-brightness-max": 0.43,
        "raster-contrast": 0.25,
      },
    },
  ],
};

export default function PublicDishMap({ dishes }: { dishes: PublicMapDish[] }) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const mapRef = useRef<Map | null>(null);
  const markersRef = useRef<Marker[]>([]);
  const [selectedDish, setSelectedDish] = useState<PublicMapDish | null>(null);
  const [boundsZoom, setBoundsZoom] = useState({
    bounds: [-180, -85, 180, 85] as [number, number, number, number],
    zoom: 2,
  });

  const features = useMemo<DishFeature[]>(
    () =>
      dishes.map((dish) => ({
        type: "Feature",
        properties: { ...dish, cluster: false },
        geometry: {
          type: "Point",
          coordinates: [dish.longitude, dish.latitude],
        },
      })),
    [dishes],
  );

  const index = useMemo(
    () =>
      new Supercluster<DishFeatureProps, ClusterFeatureProps>({
        radius: 72,
        maxZoom: 18,
      }).load(features),
    [features],
  );

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
    map.on("moveend", () => updateViewport(map));
    map.on("load", () => {
      map.resize();
      updateViewport(map);
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

    const clusters = index.getClusters(boundsZoom.bounds, Math.round(boundsZoom.zoom)) as Array<
      DishFeature | ClusterFeature
    >;

    clusters.forEach((feature) => {
      const [lng, lat] = feature.geometry.coordinates;
      const properties = feature.properties;
      const markerElement = document.createElement("button");
      markerElement.type = "button";

      if ("point_count" in properties) {
        markerElement.className = "cluster-pin";
        markerElement.textContent = String(properties.point_count);
        markerElement.ariaLabel = `${properties.point_count} dishes`;
        markerElement.addEventListener("click", () => {
          map.easeTo({
            center: [lng, lat],
            zoom: Math.min(index.getClusterExpansionZoom(properties.cluster_id), 17),
            duration: 500,
          });
        });
      } else {
        const dish = properties;
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
      }

      const marker = new maplibregl.Marker({ element: markerElement })
        .setLngLat([lng, lat])
        .addTo(map);
      markersRef.current.push(marker);
    });
  }, [boundsZoom, index]);

  function updateViewport(map: Map) {
    const bounds = map.getBounds();
    setBoundsZoom({
      bounds: [bounds.getWest(), bounds.getSouth(), bounds.getEast(), bounds.getNorth()],
      zoom: map.getZoom(),
    });
  }

  return (
    <div id="map" className="map-stage">
      <div ref={containerRef} className="map-canvas" />
      <div className="map-vignette" />

      <div className="map-status">
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
