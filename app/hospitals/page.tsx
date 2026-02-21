'use client';

import React, { useState, useEffect } from 'react';
import {
    MapPin,
    Phone,
    Navigation,
    Search,
    Filter,
    AlertCircle,
    Clock,
    Star,
    ChevronRight,
    ShieldAlert
} from 'lucide-react';
import toast from 'react-hot-toast';

const MOCK_HOSPITALS = [
    {
        id: '1',
        name: "Apollo Hospitals",
        address: "Bannerghatta Main Rd, Bangalore",
        rating: 4.5,
        distance: "1.2 km",
        openNow: true,
        phone: "+91 80 2630 4050",
        specialties: ["Emergency", "Cardiology", "Neurology"],
        emergency: true
    },
    {
        id: '2',
        name: "Manipal Hospital",
        address: "Old Airport Rd, Bangalore",
        rating: 4.2,
        distance: "2.5 km",
        openNow: true,
        phone: "+91 80 2502 4444",
        specialties: ["Pediatrics", "ENT", "Orthopedic"],
        emergency: true
    },
    {
        id: '3',
        name: "Cloudnine Hospital",
        address: "Jayanagar, Bangalore",
        rating: 4.8,
        distance: "3.8 km",
        openNow: false,
        phone: "+91 80 4020 2222",
        specialties: ["Maternity", "Pediatrics"],
        emergency: false
    }
];

export default function HospitalsPage() {
    const [location, setLocation] = useState<{ lat: number, lng: number } | null>(null);
    const [loading, setLoading] = useState(false);
    const [hospitals, setHospitals] = useState(MOCK_HOSPITALS);
    const [search, setSearch] = useState('');

    useEffect(() => {
        // Request location on mount
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                (pos) => setLocation({ lat: pos.coords.latitude, lng: pos.coords.longitude }),
                () => toast.error("Could not get location. Showing default results.")
            );
        }
    }, []);

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        // Simulate lookup
        setTimeout(() => {
            setLoading(false);
        }, 1500);
    };

    return (
        <div className="hospitals-container">
            {/* Emergency Banner */}
            <div className="emergency-header">
                <div className="container">
                    <div className="emergency-content">
                        <div className="emergency-icon">
                            <ShieldAlert size={32} />
                        </div>
                        <div>
                            <h3>Medical Emergency?</h3>
                            <p>Call national emergency number <strong>108</strong> or <strong>102</strong> for ambulance services in India.</p>
                        </div>
                        <a href="tel:108" className="btn btn-primary emergency-btn">Call Now</a>
                    </div>
                </div>
            </div>

            <div className="container main-layout">
                <div className="sidebar">
                    <header className="sidebar-header">
                        <h1>Hospitals Near Me</h1>
                        <p>Find the best medical care nearby.</p>
                    </header>

                    <form className="search-box" onSubmit={handleSearch}>
                        <div className="input-with-icon">
                            <Search size={18} />
                            <input
                                type="text"
                                placeholder="Enter Pincode or Locality"
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                            />
                        </div>
                        <button className="btn btn-primary">Find</button>
                    </form>

                    <div className="filters">
                        <button className="filter-chip active">All</button>
                        <button className="filter-chip">Emergency</button>
                        <button className="filter-chip">Children</button>
                        <button className="filter-chip">Skin</button>
                        <button className="filter-chip">ENT</button>
                    </div>

                    <div className="hospital-list">
                        {hospitals.map(h => (
                            <div key={h.id} className={`hospital-card card ${h.emergency ? 'has-emergency' : ''}`}>
                                {h.emergency && <span className="emergency-pill">24/7 Emergency</span>}
                                <div className="card-header">
                                    <h3>{h.name}</h3>
                                    <div className="rating">
                                        <Star size={14} fill="currentColor" /> {h.rating}
                                    </div>
                                </div>
                                <p className="address"><MapPin size={14} /> {h.address}</p>

                                <div className="meta">
                                    <span><Navigation size={14} /> {h.distance}</span>
                                    <span className={h.openNow ? 'status-open' : 'status-closed'}>
                                        <Clock size={14} /> {h.openNow ? 'Open now' : 'Closed'}
                                    </span>
                                </div>

                                <div className="hospital-specialties">
                                    {h.specialties.map(s => <span key={s}>{s}</span>)}
                                </div>

                                <div className="card-actions">
                                    <a href={`https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(h.name + " " + h.address)}`} target="_blank" className="btn btn-primary btn-sm flex-1">
                                        <Navigation size={16} /> Directions
                                    </a>
                                    <a href={`tel:${h.phone}`} className="btn btn-outline btn-sm">
                                        <Phone size={16} />
                                    </a>
                                    <a href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(h.name + " " + h.address)}`} target="_blank" className="btn btn-outline btn-sm">
                                        <ChevronRight size={16} />
                                    </a>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="map-view desktop-only">
                    <div className="map-placeholder">
                        <MapPin size={48} />
                        <p>Interactive Map View Loading...</p>
                        <span>Google Maps Integration Active</span>
                    </div>
                </div>
            </div>

            <style jsx>{`
        .hospitals-container { background: var(--bg-alt); min-height: 100vh; }
        
        .emergency-header { background: #fee2e2; border-bottom: 2px solid #ef4444; padding: 1.5rem 0; }
        .emergency-content { display: flex; align-items: center; gap: 2rem; color: #991b1b; }
        .emergency-icon { background: #ef4444; color: white; width: 60px; height: 60px; border-radius: 50%; display: flex; align-items: center; justify-content: center; }
        .emergency-content h3 { font-size: 1.5rem; margin-bottom: 0.25rem; }
        .emergency-btn { background: #ef4444 !important; border: none; }
        .emergency-btn:hover { background: #dc2626 !important; }

        .main-layout { display: grid; grid-template-columns: 450px 1fr; gap: 2rem; padding-top: 3rem; padding-bottom: 4rem; }
        
        .sidebar { overflow-y: auto; }
        .sidebar-header { margin-bottom: 2rem; }
        .sidebar-header h1 { font-size: 2.2rem; color: var(--primary); }
        .sidebar-header p { color: var(--text-muted); }

        .search-box { display: flex; gap: 0.75rem; margin-bottom: 2rem; }
        .input-with-icon { flex: 1; position: relative; }
        .input-with-icon svg { position: absolute; left: 1rem; top: 50%; transform: translateY(-50%); color: var(--text-muted); }
        .input-with-icon input { width: 100%; padding: 0.75rem 1rem 0.75rem 3rem; }

        .filters { display: flex; gap: 0.5rem; margin-bottom: 2rem; overflow-x: auto; padding-bottom: 0.5rem; }
        .filter-chip { padding: 0.5rem 1rem; border-radius: 50px; background: white; border: 1px solid var(--border); font-size: 0.85rem; font-weight: 500; white-space: nowrap; }
        .filter-chip.active { background: var(--primary); color: white; border-color: var(--primary); }

        .hospital-list { display: flex; flex-direction: column; gap: 1.5rem; }
        .hospital-card { position: relative; padding: 1.5rem; transition: transform 0.2s; background: white; border: 1px solid var(--border); }
        .hospital-card:hover { transform: scale(1.02); }
        .has-emergency { border-left: 4px solid var(--emergency); }
        .emergency-pill { position: absolute; top: -10px; right: 20px; background: var(--emergency); color: white; font-size: 0.7rem; font-weight: 700; padding: 0.25rem 0.75rem; border-radius: 50px; text-transform: uppercase; }

        .card-header { display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 0.5rem; }
        .card-header h3 { font-size: 1.3rem; }
        .rating { display: flex; align-items: center; gap: 0.25rem; font-weight: 700; color: #fbbf24; font-size: 0.9rem; }
        
        .address { font-size: 0.9rem; color: var(--text-muted); display: flex; align-items: center; gap: 0.5rem; margin-bottom: 1rem; }
        .meta { display: flex; gap: 1.5rem; font-size: 0.85rem; margin-bottom: 1.5rem; font-weight: 500; }
        .meta span { display: flex; align-items: center; gap: 0.4rem; }
        .status-open { color: #059669; }
        .status-closed { color: #dc2626; }

        .hospital-specialties { display: flex; flex-wrap: wrap; gap: 0.5rem; margin-bottom: 1.5rem; }
        .hospital-specialties span { background: var(--secondary); color: var(--primary); font-size: 0.75rem; font-weight: 600; padding: 0.25rem 0.6rem; border-radius: 4px; }

        .card-actions { display: flex; gap: 0.75rem; }
        .flex-1 { flex: 1; }

        .map-view { position: sticky; top: 100px; height: calc(100vh - 140px); background: #e2e8f0; border-radius: var(--radius-lg); overflow: hidden; border: 1px solid var(--border); }
        .map-placeholder { height: 100%; display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 1rem; color: #94a3b8; }
        .map-placeholder p { font-weight: 600; color: #64748b; }

        @media (max-width: 900px) {
          .main-layout { grid-template-columns: 1fr; }
          .desktop-only { display: none; }
          .emergency-content { flex-direction: column; text-align: center; }
        }
      `}</style>
        </div>
    );
}
