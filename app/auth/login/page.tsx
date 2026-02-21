'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Mail, Lock, LogIn, ChevronRight, Grape as Google } from 'lucide-react';
import toast from 'react-hot-toast';

export default function LoginPage() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);

    const handleLogin = (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setTimeout(() => {
            setLoading(false);
            toast.success("Successfully logged in!");
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
                    <h1>Welcome Back</h1>
                    <p>Access your saved reports and medical history.</p>
                </div>

                <form className="auth-form" onSubmit={handleLogin}>
                    <div className="input-group">
                        <label>Email Address</label>
                        <div className="input-wrapper">
                            <Mail size={18} />
                            <input
                                type="email"
                                placeholder="doctor@medai.in"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                            />
                        </div>
                    </div>

                    <div className="input-group">
                        <div className="label-row">
                            <label>Password</label>
                            <Link href="/auth/forgot" className="forgot-link">Forgot?</Link>
                        </div>
                        <div className="input-wrapper">
                            <Lock size={18} />
                            <input
                                type="password"
                                placeholder="••••••••"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            />
                        </div>
                    </div>

                    <button className="btn btn-primary auth-btn" disabled={loading}>
                        {loading ? 'Signing in...' : 'Sign In'} <LogIn size={18} />
                    </button>
                </form>

                <div className="divider">
                    <span>OR</span>
                </div>

                <button className="btn btn-outline btn-full google-btn">
                    <img src="https://www.google.com/favicon.ico" alt="Google" width={18} />
                    Sign in with Google
                </button>

                <p className="auth-footer">
                    Don't have an account? <Link href="/auth/signup">Create Account</Link>
                </p>
            </motion.div>

            <style jsx>{`
        .auth-container {
          min-height: 90vh;
          display: flex;
          align-items: center;
          justify-content: center;
          background: var(--bg-alt);
          padding: 2rem;
        }
        .auth-card {
          width: 100%;
          max-width: 450px;
          padding: 3rem;
          background: white;
          border-radius: var(--radius-lg);
        }
        .auth-header {
          text-align: center;
          margin-bottom: 2.5rem;
        }
        .auth-logo {
          width: 50px;
          height: 50px;
          background: var(--primary);
          color: white;
          display: flex;
          align-items: center;
          justify-content: center;
          border-radius: 12px;
          font-size: 1.5rem;
          font-weight: 700;
          margin: 0 auto 1.5rem;
        }
        .auth-header h1 { margin-bottom: 0.5rem; }
        .auth-header p { color: var(--text-muted); font-size: 0.95rem; }

        .auth-form {
          display: flex;
          flex-direction: column;
          gap: 1.5rem;
        }
        .input-group {
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
        }
        .label-row { display: flex; justify-content: space-between; align-items: center; }
        .forgot-link { font-size: 0.8rem; color: var(--primary); font-weight: 600; }
        .input-group label { font-weight: 600; color: var(--text-main); font-size: 0.9rem; }
        
        .input-wrapper {
          position: relative;
        }
        .input-wrapper svg {
          position: absolute;
          left: 1rem;
          top: 50%;
          transform: translateY(-50%);
          color: var(--text-muted);
        }
        .input-wrapper input {
          width: 100%;
          padding: 0.85rem 1rem 0.85rem 3rem;
          border: 1px solid var(--border);
          border-radius: var(--radius-sm);
          font-size: 1rem;
        }
        
        .auth-btn { width: 100%; height: 50px; }
        .btn-full { width: 100%; height: 50px; }
        .google-btn { gap: 0.75rem; font-weight: 600; }

        .divider {
          position: relative;
          text-align: center;
          margin: 2rem 0;
        }
        .divider::before {
          content: '';
          position: absolute;
          top: 50%;
          left: 0;
          right: 0;
          height: 1px;
          background: var(--border);
        }
        .divider span {
          position: relative;
          background: white;
          padding: 0 1rem;
          color: var(--text-muted);
          font-size: 0.75rem;
          font-weight: 700;
        }

        .auth-footer {
          text-align: center;
          margin-top: 2rem;
          font-size: 0.9rem;
          color: var(--text-muted);
        }
        .auth-footer a {
          color: var(--primary);
          font-weight: 700;
        }
      `}</style>
        </div>
    );
}
