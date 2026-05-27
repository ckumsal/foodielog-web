"use client";

export default function ExploreMapButton() {
  return (
    <button
      className="hero-cta"
      type="button"
      onClick={() => {
        document.documentElement.classList.add("map-explore-mode");
      }}
    >
      Explore map
    </button>
  );
}
