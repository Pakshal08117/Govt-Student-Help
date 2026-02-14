// Gateway of India Background Component with Animations
export default function GatewayBackground() {
  return (
    <div className="fixed inset-0 z-0">
      {/* Real Gateway of India Background Image */}
      <div className="absolute inset-0">
        {/* Background Image with Overlay */}
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: `url('https://images.unsplash.com/photo-1587474260584-136574528ed5?q=80&w=2070&auto=format&fit=crop')`,
            filter: 'brightness(0.4) contrast(1.1)',
          }}
        ></div>
        
        {/* Animated Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-orange-900/60 via-yellow-900/40 to-orange-800/70 animate-pulse-slower"></div>
        
        {/* Animated Light Rays */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-0 left-1/4 w-1 h-full bg-gradient-to-b from-yellow-400/20 to-transparent animate-float-slow"></div>
          <div className="absolute top-0 right-1/3 w-1 h-full bg-gradient-to-b from-orange-400/20 to-transparent animate-float-slower"></div>
        </div>
        
        {/* Animated Particles/Dust */}
        <div className="absolute inset-0">
          <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-yellow-300/30 rounded-full animate-float-slow"></div>
          <div className="absolute top-1/3 right-1/4 w-3 h-3 bg-orange-300/20 rounded-full animate-float-slower"></div>
          <div className="absolute bottom-1/3 left-1/3 w-2 h-2 bg-yellow-400/25 rounded-full animate-pulse-slow"></div>
          <div className="absolute top-2/3 right-1/3 w-2 h-2 bg-orange-400/30 rounded-full animate-pulse-slower"></div>
        </div>
        
        {/* Bottom Fade for Content Readability */}
        <div className="absolute inset-0 bg-gradient-to-t from-white via-white/80 to-transparent dark:from-gray-900 dark:via-gray-900/80"></div>
      </div>
    </div>
  );
}
