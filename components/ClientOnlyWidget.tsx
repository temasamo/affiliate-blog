'use client';

import { useState, useEffect } from 'react';

export default function ClientOnlyWidget() {
  const [browserInfo, setBrowserInfo] = useState<string>('');
  const [screenSize, setScreenSize] = useState<string>('');
  const [localStorageValue, setLocalStorageValue] = useState<string>('');

  useEffect(() => {
    // ブラウザ固有の情報を取得
    const userAgent = navigator.userAgent;
    const isChrome = userAgent.includes('Chrome');
    const isFirefox = userAgent.includes('Firefox');
    const isSafari = userAgent.includes('Safari');
    
    let browser = 'Unknown';
    if (isChrome) browser = 'Chrome';
    else if (isFirefox) browser = 'Firefox';
    else if (isSafari) browser = 'Safari';
    
    setBrowserInfo(browser);

    // スクリーンサイズを取得
    setScreenSize(`${window.innerWidth} x ${window.innerHeight}`);

    // localStorage から値を取得
    const stored = localStorage.getItem('test-value') || 'No value stored';
    setLocalStorageValue(stored);

    // リサイズイベントリスナー
    const handleResize = () => {
      setScreenSize(`${window.innerWidth} x ${window.innerHeight}`);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const handleSetLocalStorage = () => {
    const value = `Updated at ${new Date().toLocaleTimeString()}`;
    localStorage.setItem('test-value', value);
    setLocalStorageValue(value);
  };

  return (
    <div className="p-6 bg-white rounded-lg shadow-md max-w-md mx-auto">
      <h2 className="text-xl font-bold mb-4">Client-Only Widget</h2>
      
      <div className="space-y-3">
        <div>
          <strong>Browser:</strong> {browserInfo}
        </div>
        
        <div>
          <strong>Screen Size:</strong> {screenSize}
        </div>
        
        <div>
          <strong>LocalStorage:</strong> {localStorageValue}
        </div>
        
        <button
          onClick={handleSetLocalStorage}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          Update LocalStorage
        </button>
      </div>
    </div>
  );
} 