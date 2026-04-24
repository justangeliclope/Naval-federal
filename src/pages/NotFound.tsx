import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { useError } from "@/contexts/ErrorContext";

const NotFound = () => {
  const location = useLocation();
  const { showError } = useError();

  useEffect(() => {
    console.error("404 Error: User attempted to access non-existent route:", location.pathname);
    showError(`Page not found: ${location.pathname}`);
  }, [location.pathname, showError]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="max-w-md w-full bg-white rounded-lg shadow-xl p-8 text-center">
        <h1 className="text-6xl font-bold text-gray-900 mb-4">404</h1>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Page Not Found</h2>
        <p className="text-gray-600 mb-8">The page you&apos;re looking for doesn&apos;t exist.</p>
        <a 
          href="/" 
          className="inline-flex items-center px-6 py-3 bg-navy text-white font-semibold rounded-lg hover:bg-orange transition-colors"
        >
          Go Home
        </a>
      </div>
    </div>
  );
};

export default NotFound;
