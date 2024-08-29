import React, { useEffect, useState } from 'react';
import logo from '../assets/data/logo.png';

const BackdropLoader: React.FC = () => {
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 3000); // 3 seconds loading duration
    return () => clearTimeout(timer);
  }, []);

  return (
    <div>
      {loading && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-75 z-50">
          <img
            src={logo}
            alt="Loading..."
            className="opacity-0 animate-fadeInOut"
            style={{ width: '100px', height: '100px' }}
          />
        </div>
      )}
    </div>
  );
};

export default BackdropLoader;
