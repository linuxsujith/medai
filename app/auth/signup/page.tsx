'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Mail, Lock, User, UserPlus, Shield } from 'lucide-react';
import toast from 'react-hot-toast';

export default function SignupPage() {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        consent: false
    });
    const [loading, setLoading] = useState(false);

    const handleSignup = (e: React.FormEvent) => {
        e.preventDefault();
        if (!formData.consent) {
            toast.error("You must agree to the data policy.");
            return;
        }
        setLoading(true);
        setTimeout(() => {
            setLoading(false);
            toast.success("Account created successfully!");
        }, 1500);
    };

    return (
        <div className="auth-container">
            <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="auth-card card"
            >
                <div className="auth-header">
                    <Link href="/" className="auth-logo">M</Link>
                    <h1>Join MEDAI</h1>
                    <p>The smartest way to manage your health guidance.</p>
                </div>

                <form className="auth-form" onSubmit={handleSignup}>
                    <div className="input-group">
                        <label>Full Name</label>
                        <div className="input-wrapper">
                            <User size={18} />
                            <input
                                type="text"
                                placeholder="Dr. John Doe"
                                value={formData.name}
                                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                required
                            />
                        </div>
                    </div>

                    <div className="input-group">
                        <label>Email Address</label>
                        <div className="input-wrapper">
                            <Mail size={18} />
                            <input
                                type="email"
                                placeholder="doctor@medai.in"
                                value={formData.email}
                                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                required
                            />
                        </div>
                    </div>

                    <div className="input-group">
                        <label>Password</label>
                        <div className="input-wrapper">
                            <Lock size={18} />
                            <input
                                type="password"
                                placeholder="Create a strong password"
                                value={formData.password}
                                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                                required
                            />
                        </div>
                    </div>

                    <div className="consent-group">
                        <label className="checkbox-container">
                            <input
                                type="checkbox"
                                checked={formData.consent}
                                onChange={(e) => setFormData({ ...formData, consent: e.target.checked })}
                            />
                            <span className="checkmark"></span>
                            <span className="consent-text">I agree to the <Link href="/privacy">Privacy Policy</Link> and data processing for analysis.</span>
                        </label>
                    </div>

                    <button className="btn btn-primary auth-btn" disabled={loading}>
                        {loading ? 'Creating Account...' : 'Create Account'} <UserPlus size={18} />
                    </button>
                </form>

                <div className="trust-footer">
                    <Shield size={14} />
                    <span>Your medical data is encrypted and secure.</span>
                </div>

                <p className="auth-footer">
                    Already have an account? <Link href="/auth/login">Sign In</Link>
                </p>
            </motion.div>

            <style jsx>{`
        .auth-container { min-height: 90vh; display: flex; align-items: center; justify-content: center; background: var(--bg-alt); padding: 2rem; }
        .auth-card { width: 100%; max-width: 450px; padding: 3rem; background: white; border-radius: var(--radius-lg); }
        .auth-header { text-align: center; margin-bottom: 2.5rem; }
        .auth-logo { width: 50px; height: 50px; background: var(--primary); color: white; display: flex; align-items: center; justify-content: center; border-radius: 12px; font-size: 1.5rem; font-weight: 700; margin: 0 auto 1.5rem; }
        .auth-header h1 { margin-bottom: 0.5rem; }
        .auth-header p { color: var(--text-muted); font-size: 0.95rem; }

        .auth-form { display: flex; flex-direction: column; gap: 1.25rem; }
        .input-group { display: flex; flex-direction: column; gap: 0.5rem; }
        .input-group label { font-weight: 600; color: var(--text-main); font-size: 0.9rem; }
        
        .input-wrapper { position: relative; }
        .input-wrapper svg { position: absolute; left: 1rem; top: 50%; transform: translateY(-50%); color: var(--text-muted); }
        .input-wrapper input { width: 100%; padding: 0.85rem 1rem 0.85rem 3rem; border: 1px solid var(--border); border-radius: var(--radius-sm); font-size: 1rem; }
        
        .consent-group { margin-top: 0.5rem; }
        .checkbox-container { display: flex; align-items: flex-start; gap: 0.75rem; cursor: pointer; font-size: 0.85rem; color: var(--text-muted); }
        .consent-text a { color: var(--primary); font-weight: 600; }
        
        .auth-btn { width: 100%; height: 50px; margin-top: 1rem; }
        .trust-footer { display: flex; align-items: center; justify-content: center; gap: 0.5rem; margin-top: 1.5rem; color: var(--accent); font-size: 0.75rem; font-weight: 600; }

        .auth-footer { text-align: center; margin-top: 2rem; font-size: 0.9rem; color: var(--text-muted); }
        .auth-footer a { color: var(--primary); font-weight: 700; }
      `}</style>
        </div>
    );
}
