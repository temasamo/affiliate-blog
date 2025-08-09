// pages/pillow-diagnosis.tsx
import { useState, useEffect } from 'react';
import DiagnosisForm from '@/components/DiagnosisForm';

export default function PillowDiagnosisPage() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      padding: '0',
      margin: '0',
      fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif'
    }}>
      {/* Header */}
      <div style={{
        background: 'rgba(255, 255, 255, 0.1)',
        backdropFilter: 'blur(10px)',
        borderBottom: '1px solid rgba(255, 255, 255, 0.2)',
        padding: '20px 0',
        textAlign: 'center'
      }}>
        <h1 style={{
          margin: '0',
          color: 'white',
          fontSize: '2.5rem',
          fontWeight: '700',
          textShadow: '0 2px 4px rgba(0,0,0,0.3)',
          letterSpacing: '0.05em'
        }}>
          🌙 枕診断
        </h1>
        <p style={{
          margin: '8px 0 0 0',
          color: 'rgba(255, 255, 255, 0.8)',
          fontSize: '1.1rem',
          fontWeight: '300'
        }}>
          あなたに最適な枕を見つけましょう
        </p>
      </div>

      {/* Main Content */}
      <div style={{
        maxWidth: '800px',
        margin: '0 auto',
        padding: '40px 20px'
      }}>
        {/* Form Container */}
        <div style={{
          background: 'rgba(255, 255, 255, 0.95)',
          borderRadius: '20px',
          padding: '40px',
          boxShadow: '0 20px 40px rgba(0,0,0,0.1)',
          backdropFilter: 'blur(10px)',
          border: '1px solid rgba(255, 255, 255, 0.2)',
          marginBottom: '30px'
        }}>
          {mounted ? <DiagnosisForm /> : <div>読み込み中...</div>}
        </div>
      </div>

      {/* Footer */}
      <div style={{
        textAlign: 'center',
        padding: '30px 20px',
        color: 'rgba(255, 255, 255, 0.7)',
        fontSize: '0.9rem'
      }}>
        <p style={{ margin: '0' }}>
          © 2025 枕診断システム - あなたの快適な睡眠をサポート
        </p>
      </div>
    </div>
  );
} 