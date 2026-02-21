'use client';

import React, { useState } from 'react';
import {
    Play,
    Search,
    Video,
    ExternalLink,
    Filter,
    CheckCircle2,
    AlertCircle,
    Clock,
    ThumbsUp
} from 'lucide-react';
import toast from 'react-hot-toast';

const CATEGORIES = [
    { id: 'cold', label: 'Cold & Cough', keywords: 'cold cough sore throat care' },
    { id: 'stomach', label: 'Acidity & Gas', keywords: 'acidity gas stomach relief' },
    { id: 'fever', label: 'Fever Care', keywords: 'fever care home remedy' },
    { id: 'skin', label: 'Skin Irritation', keywords: 'skin irritation relief' },
    { id: 'headache', label: 'Headache', keywords: 'headache relief safe' },
    { id: 'hydration', label: 'ORS & Hydration', keywords: 'ors hydration diarrhea care' }
];

const MOCK_VIDEOS = [
    {
        id: 'v1',
        title: "How to treat a Cold and Cough at Home - Doctor Explains",
        channel: "Healthline",
        thumbnail: "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=500&q=80",
        duration: "5:20",
        views: "1.2M",
        date: "2 months ago",
        safe: true
    },
    {
        id: 'v2',
        title: "Natural Remedies for Acid Reflux & GERD",
        channel: "Mayo Clinic",
        thumbnail: "https://images.unsplash.com/photo-1471864190281-a93a3070b6de?w=500&q=80",
        duration: "8:45",
        views: "800K",
        date: "1 year ago",
        safe: true
    },
    {
        id: 'v3',
        title: "Managing Fever in Adults and Children Safely",
        channel: "Cleveland Clinic",
        thumbnail: "https://images.unsplash.com/photo-1511174511562-5f7f18b874f8?w=500&q=80",
        duration: "6:10",
        views: "500K",
        date: "5 months ago",
        safe: true
    }
];

export default function RemediesPage() {
    const [activeTab, setActiveTab] = useState('cold');
    const [search, setSearch] = useState('');
    const [loading, setLoading] = useState(false);

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setTimeout(() => setLoading(false), 1000);
    };

    return (
        <div className="remedies-container">
            <div className="container">
                <header className="page-header">
                    <div className="icon-badge"><Video size={24} /></div>
                    <h1>Health Remedies</h1>
                    <p>Verified, safe guidance from credible medical professionals and hospitals.</p>
                </header>

                <section className="curation-banner">
                    <div className="banner-content">
                        <CheckCircle2 color="#10B981" size={24} />
                        <div>
                            <h3>Safety First Curation</h3>
                            <p>We filter out sensationalist "miracle cure" content. All videos shown follow standard medical guidelines for safe home care.</p>
                        </div>
                    </div>
                </section>

                <div className="remedies-layout">
                    <aside className="tabs-sidebar">
                        <h3>Categories</h3>
                        <div className="tab-list">
                            {CATEGORIES.map(cat => (
                                <button
                                    key={cat.id}
                                    className={`tab-btn ${activeTab === cat.id ? 'active' : ''}`}
                                    onClick={() => setActiveTab(cat.id)}
                                >
                                    {cat.label}
                                </button>
                            ))}
                        </div>
                    </aside>

                    <main className="video-feed">
                        <form className="search-bar" onSubmit={handleSearch}>
                            <Search size={18} />
                            <input
                                type="text"
                                placeholder="Search for a condition or remedy..."
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                            />
                            <button className="btn btn-primary btn-sm">Search</button>
                        </form>

                        <div className="video-grid">
                            {MOCK_VIDEOS.map(video => (
                                <div key={video.id} className="video-card card">
                                    <div className="video-thumb-wrapper">
                                        <img src={video.thumbnail} alt={video.title} className="video-thumb" />
                                        <span className="video-duration">{video.duration}</span>
                                        <div className="play-overlay">
                                            <Play size={40} fill="white" />
                                        </div>
                                    </div>
                                    <div className="video-info">
                                        <h3 className="video-title">{video.title}</h3>
                                        <div className="channel-box">
                                            <span className="channel-name">{video.channel}</span>
                                            <CheckCircle2 size={12} fill="#10B981" color="white" />
                                        </div>
                                        <div className="video-meta">
                                            <span>{video.views} views</span>
                                            <span>•</span>
                                            <span>{video.date}</span>
                                        </div>
                                        <a
                                            href={`https://www.youtube.com/results?search_query=${encodeURIComponent(video.title)}`}
                                            target="_blank"
                                            className="btn btn-outline btn-sm watch-btn"
                                        >
                                            Watch on YouTube <ExternalLink size={14} />
                                        </a>
                                    </div>
                                </div>
                            ))}
                        </div>

                        <div className="load-more">
                            <button className="btn btn-secondary">Load More Results</button>
                        </div>
                    </main>
                </div>
            </div>

            <style jsx>{`
        .remedies-container { padding: 4rem 0; background: var(--bg-alt); min-height: 100vh; }
        
        .page-header { text-align: center; margin-bottom: 3rem; }
        .icon-badge { width: 50px; height: 50px; background: #EF4444; color: white; border-radius: 50%; display: flex; align-items: center; justify-content: center; margin: 0 auto 1.5rem; }
        .page-header h1 { font-size: 3rem; margin-bottom: 0.5rem; }

        .curation-banner { background: white; border: 1px solid #d1fae5; border-radius: var(--radius-md); padding: 1.5rem 2rem; margin-bottom: 3rem; box-shadow: var(--shadow-sm); }
        .banner-content { display: flex; align-items: center; gap: 1.5rem; color: #065f46; }
        .banner-content h3 { margin-bottom: 0.25rem; }
        .banner-content p { font-size: 0.9rem; opacity: 0.8; }

        .remedies-layout { display: grid; grid-template-columns: 250px 1fr; gap: 3rem; }
        
        .tabs-sidebar h3 { font-size: 1.2rem; margin-bottom: 1.5rem; color: var(--primary); }
        .tab-list { display: flex; flex-direction: column; gap: 0.5rem; }
        .tab-btn { padding: 1rem; text-align: left; background: white; border: 1px solid var(--border); border-radius: var(--radius-sm); font-weight: 600; font-size: 0.9rem; transition: all 0.2s; color: var(--text-muted); }
        .tab-btn:hover { background: var(--bg-alt); color: var(--primary); }
        .tab-btn.active { background: var(--primary); color: white; border-color: var(--primary); }

        .search-bar { background: white; padding: 0.5rem; border-radius: var(--radius-sm); border: 1px solid var(--border); display: flex; align-items: center; gap: 1rem; margin-bottom: 2rem; box-shadow: var(--shadow-sm); }
        .search-bar input { flex: 1; border: none; padding: 0.5rem; font-size: 1rem; }
        .search-bar input:focus { outline: none; }
        .search-bar svg { color: var(--text-muted); margin-left: 0.5rem; }

        .video-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(300px, 1fr)); gap: 2rem; }
        .video-card { padding: 0; overflow: hidden; border: none; background: white; border-radius: var(--radius-md); transition: transform 0.2s; }
        .video-card:hover { transform: translateY(-5px); box-shadow: var(--shadow-lg); }
        .video-thumb-wrapper { position: relative; height: 180px; }
        .video-thumb { width: 100%; height: 100%; object-fit: cover; }
        .video-duration { position: absolute; bottom: 10px; right: 10px; background: rgba(0,0,0,0.8); color: white; font-size: 0.75rem; padding: 0.2rem 0.5rem; border-radius: 4px; font-weight: 600; }
        .play-overlay { position: absolute; top: 0; left: 0; right: 0; bottom: 0; background: rgba(0,0,0,0.2); display: flex; align-items: center; justify-content: center; opacity: 0; transition: opacity 0.2s; }
        .video-card:hover .play-overlay { opacity: 1; }

        .video-info { padding: 1.5rem; }
        .video-title { font-size: 1.1rem; line-height: 1.4; margin-bottom: 0.75rem; height: 3rem; display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; overflow: hidden; }
        .channel-box { display: flex; align-items: center; gap: 0.4rem; margin-bottom: 0.5rem; }
        .channel-name { font-size: 0.85rem; color: var(--text-muted); font-weight: 600; }
        .video-meta { font-size: 0.8rem; color: #888; margin-bottom: 1.5rem; }
        .watch-btn { width: 100%; justify-content: center; border-radius: var(--radius-sm); gap: 0.5rem; }

        .load-more { margin-top: 4rem; text-align: center; }

        @media (max-width: 900px) {
          .remedies-layout { grid-template-columns: 1fr; }
          .tabs-sidebar { display: none; }
          .page-header h1 { font-size: 2.2rem; }
        }
      `}</style>
        </div>
    );
}
