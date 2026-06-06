import React from 'react';
import { Play, Github, Twitter, Instagram, Mail } from 'lucide-react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-surface/30 border-t border-white/5 py-12 pb-20">
      <div className="container mx-auto px-4 md:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          <div className="col-span-1 md:col-span-1">
            <Link to="/" className="flex items-center gap-2 mb-6 group">
              <div className="bg-primary p-1 rounded group-hover:rotate-12 transition-transform">
                <Play className="fill-white text-white w-4 h-4 ml-0.2" />
              </div>
              <span className="text-xl font-bold font-cinematic tracking-tighter">
                CINE<span className="text-primary">FLIX</span>
              </span>
            </Link>
            <p className="text-white/50 text-sm leading-relaxed mb-6">
              Your ultimate destination for discovering the world's most cinematic experiences. Powered by TMDB.
            </p>
            <div className="flex gap-4">
              <a href="#" className="p-2 bg-white/5 rounded-full hover:bg-white/10 hover:text-primary transition-all">
                <Twitter className="w-4 h-4" />
              </a>
              <a href="#" className="p-2 bg-white/5 rounded-full hover:bg-white/10 hover:text-primary transition-all">
                <Github className="w-4 h-4" />
              </a>
              <a href="#" className="p-2 bg-white/5 rounded-full hover:bg-white/10 hover:text-primary transition-all">
                <Instagram className="w-4 h-4" />
              </a>
            </div>
          </div>

          <div>
            <h4 className="text-white font-bold mb-6 uppercase tracking-widest text-xs">Categories</h4>
            <ul className="space-y-4 text-sm text-white/50">
              <li><Link to="/?type=popular" className="hover:text-white transition-colors">Popular Movies</Link></li>
              <li><Link to="/?type=top_rated" className="hover:text-white transition-colors">Top Rated</Link></li>
              <li><Link to="/?type=upcoming" className="hover:text-white transition-colors">Upcoming</Link></li>
              <li><Link to="/?type=now_playing" className="hover:text-white transition-colors">Now Playing</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-bold mb-6 uppercase tracking-widest text-xs">Account</h4>
            <ul className="space-y-4 text-sm text-white/50">
              <li><Link to="/watchlist" className="hover:text-white transition-colors">Watchlist</Link></li>
              <li><Link to="/watchlist" className="hover:text-white transition-colors">Favorites</Link></li>
              <li><a href="#" className="hover:text-white transition-colors">Settings</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Profile</a></li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-bold mb-6 uppercase tracking-widest text-xs">Stay Updated</h4>
            <div className="glass p-1 rounded-lg flex items-center">
              <input 
                type="email" 
                placeholder="Email address" 
                className="bg-transparent border-none outline-none text-xs px-3 py-2 flex-1"
              />
              <button className="bg-primary p-2 rounded-md hover:bg-accent transition-colors">
                 <Mail className="w-4 h-4" />
              </button>
            </div>
            <p className="text-[10px] text-white/30 mt-3">
               Subscribe to get the latest movie news and trailers.
            </p>
          </div>
        </div>
        
        <div className="mt-16 pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-[12px] text-white/40">
            © 2026 CineFlix. All rights reserved. 
          </p>
          <div className="flex gap-6 text-[11px] text-white/40">
             <a href="#" className="hover:text-white">Privacy Policy</a>
             <a href="#" className="hover:text-white">Terms of Use</a>
             <a href="#" className="hover:text-white">Cookie Policy</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
