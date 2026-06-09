"use client";
import React, { useState, useEffect } from "react";
import apiClient from "@/utils/apiClient";


export default function PropertyOverview({ property }) {
  const price = property?.price ? Number(property.price).toLocaleString() : "—";
  const isRent = property?.adType === "For Rent";
  const [isFav, setIsFav] = useState(false);
  const [favLoading, setFavLoading] = useState(false);

  const isLoggedIn = () => {
    try { return !!localStorage.getItem("authToken"); } catch { return false; }
  };

  useEffect(() => {
    if (!property?._id || !isLoggedIn()) return;
    apiClient.get(`/favorites/check/${property._id}`)
      .then((res) => setIsFav(res.data?.isFavorited ?? false))
      .catch(() => {});
  }, [property?._id]);

  const toggleFav = async () => {
    if (!isLoggedIn()) {
      window.location.href = "/login";
      return;
    }
    if (favLoading) return;
    setFavLoading(true);
    try {
      if (isFav) {
        await apiClient.delete(`/favorites/${property._id}`);
        setIsFav(false);
      } else {
        await apiClient.post("/favorites", { propertyId: property._id });
        setIsFav(true);
      }
    } catch (err) {
      // If already favorited error, just mark as fav
      if (err?.response?.data?.message?.includes("already")) setIsFav(true);
    } finally {
      setFavLoading(false);
    }
  };

  return (
    <>
      <div className="heading flex justify-between">
        <div className="title text-5 fw-6 text-color-heading">
          {property?.title || "Property"}
        </div>
        <div className="price text-5 fw-6 text-color-heading">
          ${price}
          {isRent && <span className="h5 lh-30 fw-4 text-color-default">/month</span>}
        </div>
      </div>

      <div className="info flex justify-between">
        <div className="feature">
          <p className="location text-1 flex items-center gap-10">
            <i className="icon-location" />
            {property?.location || "Location not specified"}
          </p>
          <ul className="meta-list flex">
            <li className="text-1 flex"><span>{property?.beds ?? "—"}</span>Bed</li>
            <li className="text-1 flex"><span>{property?.baths ?? "—"}</span>Bath</li>
            <li className="text-1 flex"><span>{property?.sqft ?? "—"}</span>Sqft</li>
          </ul>
        </div>
        <div className="action">
          <ul className="list-action">
            <li>
              <button
                type="button"
                onClick={toggleFav}
                disabled={favLoading}
                title={isFav ? "Remove from favourites" : "Add to favourites"}
                style={{ background: "none", border: "none", cursor: favLoading ? "wait" : "pointer", padding: 0, display: "flex", alignItems: "center", justifyContent: "center" }}
              >
                <svg width={18} height={18} viewBox="0 0 18 18" fill={isFav ? "#f0822d" : "none"} xmlns="http://www.w3.org/2000/svg">
                  <path d="M15.75 6.1875C15.75 4.32375 14.1758 2.8125 12.234 2.8125C10.7828 2.8125 9.53625 3.657 9 4.86225C8.46375 3.657 7.21725 2.8125 5.76525 2.8125C3.825 2.8125 2.25 4.32375 2.25 6.1875C2.25 11.6025 9 15.1875 9 15.1875C9 15.1875 15.75 11.6025 15.75 6.1875Z" stroke={isFav ? "#f0822d" : "#5C5E61"} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>
            </li>
            <li>
              <a href="#">
                <svg width={18} height={18} viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M5.625 15.75L2.25 12.375M2.25 12.375L5.625 9M2.25 12.375H12.375M12.375 2.25L15.75 5.625M15.75 5.625L12.375 9M15.75 5.625H5.625" stroke="#5C5E61" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </a>
            </li>
            <li>
              <a href="#">
                <svg width={18} height={18} viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M5.41251 8.18028C5.23091 7.85351 4.94594 7.5963 4.60234 7.44902C4.25874 7.30173 3.87596 7.27271 3.51408 7.36651C3.1522 7.46032 2.83171 7.67163 2.60293 7.96728C2.37414 8.26293 2.25 8.62619 2.25 9.00003C2.25 9.37387 2.37414 9.73712 2.60293 10.0328C2.83171 10.3284 3.1522 10.5397 3.51408 10.6335C3.87596 10.7273 4.25874 10.6983 4.60234 10.551C4.94594 10.4038 5.23091 10.1465 5.41251 9.81978M5.41251 8.18028C5.54751 8.42328 5.62476 8.70228 5.62476 9.00003C5.62476 9.29778 5.54751 9.57753 5.41251 9.81978M5.41251 8.18028L12.587 4.19478M5.41251 9.81978L12.587 13.8053M12.587 4.19478C12.6922 4.39288 12.8358 4.56803 13.0095 4.70998C13.1832 4.85192 13.3834 4.95782 13.5985 5.02149C13.8135 5.08515 14.0392 5.1053 14.2621 5.08075C14.4851 5.0562 14.7009 4.98745 14.897 4.87853C15.093 4.7696 15.2654 4.62267 15.404 4.44634C15.5427 4.27001 15.6448 4.06781 15.7043 3.85157C15.7639 3.63532 15.7798 3.40937 15.751 3.18693C15.7222 2.96448 15.6494 2.75 15.5368 2.55603C15.3148 2.17378 14.9518 1.89388 14.5256 1.77649C14.0995 1.6591 13.6443 1.71359 13.2579 1.92824C12.8715 2.1429 12.5848 2.50059 12.4593 2.92442C12.3339 3.34826 12.3797 3.80439 12.587 4.19478ZM12.587 13.8053C12.4794 13.9991 12.4109 14.2121 12.3856 14.4324C12.3603 14.6526 12.3787 14.8757 12.4396 15.0888C12.5005 15.3019 12.6028 15.501 12.7406 15.6746C12.8784 15.8482 13.0491 15.993 13.2429 16.1007C13.4367 16.2083 13.6498 16.2767 13.87 16.302C14.0902 16.3273 14.3133 16.309 14.5264 16.2481C14.7396 16.1872 14.9386 16.0849 15.1122 15.9471C15.2858 15.8092 15.4306 15.6386 15.5383 15.4448C15.7557 15.0534 15.8087 14.5917 15.6857 14.1613C15.5627 13.7308 15.2737 13.3668 14.8824 13.1494C14.491 12.932 14.0293 12.879 13.5989 13.002C13.1684 13.125 12.8044 13.4139 12.587 13.8053Z" stroke="#5C5E61" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div className="info-detail">
        <div className="wrap-box">
          <div className="box-icon">
            <div className="icons"><i className="icon-SlidersHorizontal" /></div>
            <div className="content">
              <div className="text-4 text-color-default">Type:</div>
              <div className="text-1 text-color-heading">{property?.propertyType || "—"}</div>
            </div>
          </div>
          <div className="box-icon">
            <div className="icons"><i className="icon-Bathtub" /></div>
            <div className="content">
              <div className="text-4 text-color-default">Bathrooms:</div>
              <div className="text-1 text-color-heading">{property?.baths ?? "—"}</div>
            </div>
          </div>
        </div>
        <div className="wrap-box">
          <div className="box-icon">
            <div className="icons"><i className="icon-Bed-2" /></div>
            <div className="content">
              <div className="text-4 text-color-default">Bedrooms:</div>
              <div className="text-1 text-color-heading">{property?.beds ?? "—"}</div>
            </div>
          </div>
          <div className="box-icon">
            <div className="icons"><i className="icon-Crop" /></div>
            <div className="content">
              <div className="text-4 text-color-default">Size:</div>
              <div className="text-1 text-color-heading">{property?.sqft ?? "—"} SqFt</div>
            </div>
          </div>
        </div>
        <div className="wrap-box">
          <div className="box-icon">
            <div className="icons"><i className="icon-Hammer" /></div>
            <div className="content">
              <div className="text-4 text-color-default">Property Age:</div>
              <div className="text-1 text-color-heading">{property?.propertyAge || "—"} yrs</div>
            </div>
          </div>
          <div className="box-icon">
            <div className="icons"><i className="icon-Garage-1" /></div>
            <div className="content">
              <div className="text-4 text-color-default">Parking:</div>
              <div className="text-1 text-color-heading capitalize">{property?.parking || "—"}</div>
            </div>
          </div>
        </div>
        {property?.furnishing && (
          <div className="wrap-box">
            <div className="box-icon">
              <div className="icons"><i className="icon-HouseLine" /></div>
              <div className="content">
                <div className="text-4 text-color-default">Furnishing:</div>
                <div className="text-1 text-color-heading capitalize">{property.furnishing.replace(/-/g, " ")}</div>
              </div>
            </div>
            {property?.balconies != null && (
              <div className="box-icon">
                <div className="icons"><i className="icon-Ruler" /></div>
                <div className="content">
                  <div className="text-4 text-color-default">Balconies:</div>
                  <div className="text-1 text-color-heading">{property.balconies}</div>
                </div>
              </div>
            )}
          </div>
        )}
      </div>

      {property?.description && (
        <div style={{ marginTop: 24, marginBottom: 16 }}>
          <h6 style={{ marginBottom: 8, fontWeight: 600 }}>Description</h6>
          <p className="text-1" style={{ lineHeight: 1.7, color: "#555" }}>{property.description}</p>
        </div>
      )}

      <div style={{ display: "flex", gap: 12, flexWrap: "wrap", alignItems: "center", marginTop: 8 }}>
        <a href="#contact-seller" onClick={e => { e.preventDefault(); document.getElementById("contact-seller")?.scrollIntoView({ behavior: "smooth" }); }} className="tf-btn bg-color-primary pd-21 fw-6" style={{ cursor: "pointer" }}>Ask a question</a>
      </div>
    </>
  );
}
