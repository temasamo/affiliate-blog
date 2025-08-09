import dynamic from 'next/dynamic';
 
// コンポーネント本体を分けて ssr:false で動的 import
export default dynamic(() => import('@/components/DiagTestPage'), { ssr: false }); 