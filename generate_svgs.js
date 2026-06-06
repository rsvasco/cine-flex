import fs from 'fs';
import path from 'path';

const IMAGES_DIR = './public/images';

if (!fs.existsSync(IMAGES_DIR)) {
  fs.mkdirSync(IMAGES_DIR, { recursive: true });
}

const movieDesigns = {
  leo: {
    title: "LEO",
    tagline: "Bloody Sweet",
    gradientStart: "#4a0e17",
    gradientEnd: "#0f0204",
    icon: `<path d="M250 150 L270 200 L320 200 L280 230 L300 280 L250 250 L200 280 L220 230 L180 200 L230 200 Z" fill="#E50914" />
           <circle cx="250" cy="220" r="40" fill="none" stroke="#E50914" stroke-width="4" stroke-dasharray="5,5"/>
           <path d="M220 350 Q250 310 280 350" stroke="#D4AF37" stroke-width="6" fill="none" stroke-linecap="round"/>`,
    themeColor: "#E50914",
    bgPattern: `<g opacity="0.1">
      <circle cx="250" cy="375" r="200" fill="none" stroke="#fff" stroke-width="1"/>
      <circle cx="250" cy="375" r="300" fill="none" stroke="#fff" stroke-width="1"/>
    </g>`
  },
  interstellar: {
    title: "INTERSTELLAR",
    tagline: "Mankind was born on Earth. It was never meant to die here.",
    gradientStart: "#0d1b2a",
    gradientEnd: "#010811",
    icon: `<circle cx="250" cy="300" r="90" fill="#000" stroke="#fff" stroke-width="2"/>
           <ellipse cx="250" cy="300" rx="140" ry="15" fill="none" stroke="#D4AF37" stroke-width="6" transform="rotate(-15, 250, 300)" opacity="0.8"/>
           <circle cx="250" cy="300" r="85" fill="none" stroke="#415a77" stroke-width="1"/>
           <circle cx="220" cy="260" r="2" fill="#fff"/>
           <circle cx="280" cy="340" r="3" fill="#fff"/>`,
    themeColor: "#D4AF37",
    bgPattern: `<g opacity="0.2">
      ${Array.from({ length: 50 }, () => {
        const x = Math.floor(Math.random() * 500);
        const y = Math.floor(Math.random() * 750);
        const r = Math.random() * 2 + 0.5;
        return `<circle cx="${x}" cy="${y}" r="${r}" fill="#fff" />`;
      }).join('')}
    </g>`
  },
  master: {
    title: "MASTER",
    tagline: "The Class is in Session",
    gradientStart: "#1c1a27",
    gradientEnd: "#09080d",
    icon: `<rect x="180" y="220" width="140" height="100" rx="10" fill="none" stroke="#D4AF37" stroke-width="4"/>
           <path d="M210 270 L240 270 L250 290 L260 270 L290 270" stroke="#D4AF37" stroke-width="4" fill="none"/>
           <circle cx="250" cy="250" r="12" fill="#E50914"/>`,
    themeColor: "#D4AF37",
    bgPattern: `<g opacity="0.05">
      <path d="M 0,100 L 500,100 M 0,200 L 500,200 M 0,300 L 500,300 M 0,400 L 500,400 M 0,500 L 500,500" stroke="#fff" stroke-width="2"/>
    </g>`
  },
  inception: {
    title: "INCEPTION",
    tagline: "Your mind is the scene of the crime.",
    gradientStart: "#1f2421",
    gradientEnd: "#0d0e0d",
    icon: `<path d="M250 200 L290 270 L210 270 Z" fill="none" stroke="#E50914" stroke-width="4"/>
           <path d="M250 180 L250 230" stroke="#fff" stroke-width="4" stroke-linecap="round"/>
           <circle cx="250" cy="280" r="10" fill="#fff"/>
           <circle cx="250" cy="300" r="30" fill="none" stroke="#E50914" stroke-width="2" stroke-dasharray="10,5"/>`,
    themeColor: "#E50914",
    bgPattern: `<g opacity="0.08">
      <circle cx="250" cy="375" r="50" fill="none" stroke="#fff" stroke-width="2"/>
      <circle cx="250" cy="375" r="150" fill="none" stroke="#fff" stroke-width="2"/>
      <circle cx="250" cy="375" r="250" fill="none" stroke="#fff" stroke-width="2"/>
    </g>`
  },
  oppenheimer: {
    title: "OPPENHEIMER",
    tagline: "The World Will Remember This Day.",
    gradientStart: "#3d1e03",
    gradientEnd: "#0b0500",
    icon: `<circle cx="250" cy="300" r="80" fill="none" stroke="#D4AF37" stroke-width="4"/>
           <circle cx="250" cy="300" r="40" fill="none" stroke="#E50914" stroke-width="6"/>
           <path d="M250 150 L250 450 M100 300 L400 300" stroke="#D4AF37" stroke-width="1" stroke-dasharray="4,4" opacity="0.5"/>
           <circle cx="250" cy="300" r="5" fill="#fff"/>`,
    themeColor: "#D4AF37",
    bgPattern: `<g opacity="0.15">
      <radialGradient id="fire" cx="50%" cy="50%" r="50%">
        <stop offset="0%" stop-color="#ff9f1c" stop-opacity="1"/>
        <stop offset="100%" stop-color="#ff9f1c" stop-opacity="0"/>
      </radialGradient>
      <circle cx="250" cy="300" r="150" fill="url(#fire)"/>
    </g>`
  },
  mersal: {
    title: "MERSAL",
    tagline: "The Magic Within",
    gradientStart: "#3e0e40",
    gradientEnd: "#0e030f",
    icon: `<path d="M250 210 L300 260 L200 260 Z" fill="#D4AF37" />
           <path d="M250 320 L270 300 L230 300 Z" fill="#fff" />
           <circle cx="250" cy="270" r="45" fill="none" stroke="#E50914" stroke-width="3"/>
           <path d="M190 270 Q250 200 310 270" stroke="#D4AF37" stroke-width="3" fill="none"/>`,
    themeColor: "#D4AF37",
    bgPattern: `<g opacity="0.08">
      <path d="M0,0 L500,750 M500,0 L0,750" stroke="#fff" stroke-width="1"/>
    </g>`
  },
  darkknight: {
    title: "THE DARK KNIGHT",
    tagline: "Why So Serious?",
    gradientStart: "#14213d",
    gradientEnd: "#000000",
    icon: `<path d="M170 270 Q250 220 330 270 Q290 280 250 260 Q210 280 170 270" fill="#fff" stroke="#14213d" stroke-width="2"/>
           <path d="M230 255 L240 240 L250 250 L260 240 L270 255" fill="#fff"/>
           <circle cx="250" cy="310" r="40" fill="none" stroke="#E50914" stroke-width="3" stroke-dasharray="10,5"/>`,
    themeColor: "#E50914",
    bgPattern: `<g opacity="0.1">
      <path d="M0,250 C150,200 350,300 500,250" fill="none" stroke="#fff" stroke-width="2"/>
      <path d="M0,270 C150,220 350,320 500,270" fill="none" stroke="#fff" stroke-width="1"/>
    </g>`
  },
  theri: {
    title: "THERI",
    tagline: "The Spark",
    gradientStart: "#4f121a",
    gradientEnd: "#0d0204",
    icon: `<path d="M220 230 L280 230 L250 290 Z" fill="#E50914" />
           <circle cx="250" cy="260" r="35" fill="none" stroke="#D4AF37" stroke-width="4"/>
           <path d="M210 320 Q250 290 290 320" stroke="#fff" stroke-width="3" fill="none"/>`,
    themeColor: "#E50914",
    bgPattern: `<g opacity="0.1">
      <circle cx="250" cy="260" r="90" fill="none" stroke="#E50914" stroke-width="1"/>
    </g>`
  },
  vikram: {
    title: "VIKRAM",
    tagline: "Once a King, Always a King",
    gradientStart: "#1a1a1a",
    gradientEnd: "#050505",
    icon: `<path d="M200 220 L300 220 L270 320 L230 320 Z" fill="none" stroke="#D4AF37" stroke-width="5"/>
           <circle cx="250" cy="270" r="20" fill="#E50914"/>
           <path d="M220 250 L280 250" stroke="#fff" stroke-width="3"/>`,
    themeColor: "#D4AF37",
    bgPattern: `<g opacity="0.1">
      <line x1="250" y1="0" x2="250" y2="750" stroke="#fff" stroke-width="1"/>
      <line x1="0" y1="375" x2="500" y2="375" stroke="#fff" stroke-width="1"/>
    </g>`
  },
  jailer: {
    title: "JAILER",
    tagline: "Alappara Kelapparom",
    gradientStart: "#2c1a04",
    gradientEnd: "#080501",
    icon: `<path d="M220 200 L280 200 L290 300 L210 300 Z" fill="none" stroke="#D4AF37" stroke-width="4"/>
           <circle cx="250" cy="240" r="15" fill="#E50914"/>
           <path d="M230 270 L270 270" stroke="#fff" stroke-width="3" stroke-linecap="round"/>`,
    themeColor: "#D4AF37",
    bgPattern: `<g opacity="0.15">
      <polygon points="250,50 450,375 250,700 50,375" fill="none" stroke="#fff" stroke-width="1"/>
    </g>`
  }
};

Object.entries(movieDesigns).forEach(([key, design]) => {
  const posterSvg = `
<svg width="500" height="750" viewBox="0 0 500 750" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="bgGrad" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" stop-color="${design.gradientStart}" />
      <stop offset="100%" stop-color="${design.gradientEnd}" />
    </linearGradient>
  </defs>
  
  <rect width="500" height="750" fill="url(#bgGrad)" />
  
  <!-- Outer border -->
  <rect x="20" y="20" width="460" height="710" fill="none" stroke="${design.themeColor}" stroke-opacity="0.3" stroke-width="2" />
  
  <!-- Background Art Pattern -->
  ${design.bgPattern}
  
  <!-- Center Graphic Group -->
  <g transform="translate(0, 50)">
    ${design.icon}
  </g>
  
  <!-- Typography -->
  <g text-anchor="middle" font-family="'Outfit', 'Inter', sans-serif">
    <text x="250" y="580" fill="#ffffff" font-size="36" font-weight="900" letter-spacing="4">${design.title}</text>
    <text x="250" y="620" fill="${design.themeColor}" font-size="12" font-weight="700" letter-spacing="8" opacity="0.8">FIRST LOOK</text>
    <rect x="150" y="640" width="200" height="1" fill="${design.themeColor}" opacity="0.5" />
    <text x="250" y="675" fill="#cccccc" font-size="11" font-weight="500" letter-spacing="1" font-style="italic" opacity="0.7">
      ${design.tagline}
    </text>
  </g>
</svg>
`;

  const backdropSvg = `
<svg width="1280" height="720" viewBox="0 0 1280 720" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="bgGradBack" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" stop-color="${design.gradientStart}" />
      <stop offset="40%" stop-color="${design.gradientStart}" />
      <stop offset="100%" stop-color="${design.gradientEnd}" />
    </linearGradient>
  </defs>
  
  <rect width="1280" height="720" fill="url(#bgGradBack)" />
  
  <!-- Abstract Shapes for Backdrop -->
  <g opacity="0.15">
    <circle cx="900" cy="360" r="300" fill="${design.themeColor}" filter="blur(80px)" />
    <circle cx="1100" cy="200" r="200" fill="#000" />
  </g>

  <!-- Large text behind -->
  <text x="640" y="420" fill="${design.themeColor}" font-family="'Outfit', sans-serif" font-size="180" font-weight="900" text-anchor="middle" opacity="0.05" letter-spacing="20">
    ${design.title}
  </text>
  
  <!-- Overlay Content -->
  <g transform="translate(100, 220)" font-family="'Outfit', sans-serif">
    <text x="0" y="0" fill="#ffffff" font-size="72" font-weight="900" letter-spacing="2">${design.title}</text>
    <text x="0" y="45" fill="${design.themeColor}" font-size="14" font-weight="700" letter-spacing="8">OFFICIAL FIRST LOOK</text>
    <text x="0" y="110" fill="#cccccc" font-size="18" width="600" opacity="0.8" font-style="italic">
      "${design.tagline}"
    </text>
  </g>
</svg>
`;

  fs.writeFileSync(path.join(IMAGES_DIR, `${key}.svg`), posterSvg.trim());
  fs.writeFileSync(path.join(IMAGES_DIR, `${key}_bg.svg`), backdropSvg.trim());
  console.log(`Generated SVG poster and backdrop for: ${design.title}`);
});
