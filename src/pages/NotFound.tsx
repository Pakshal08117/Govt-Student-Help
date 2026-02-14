import { useLocation, Link } from "react-router-dom";
import { useEffect } from "react";
import GatewayBackground from "@/components/GatewayBackground";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <>
      {/* Gateway of India Background */}
      <GatewayBackground />

      <div className="relative min-h-screen flex items-center justify-center z-10">
        <div className="text-center bg-white/90 dark:bg-gray-900/90 p-8 rounded-lg border-2 border-orange-500">
          <h1 className="text-4xl font-bold mb-4 text-black dark:text-white">404</h1>
          <p className="text-xl text-black dark:text-white font-bold mb-4">Oops! Page not found</p>
          <Link to="/" className="text-orange-600 hover:text-orange-700 underline font-bold">
            Return to Home
          </Link>
        </div>
      </div>
    </>
  );
};

export default NotFound;
