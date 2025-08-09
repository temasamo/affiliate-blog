import { GetServerSideProps } from 'next';
import DiagnosisForm from '@/components/DiagnosisForm';

export const getServerSideProps: GetServerSideProps = async () => {
  // SSR側で固定化したい値はここで生成（ロケール依存などが出ないように ISO などで固定）
  return { props: { serverIssuedAtISO: new Date().toISOString() } };
};

export default function PillowDiagnosisPage({
  serverIssuedAtISO,
}: { serverIssuedAtISO: string }) {
  return <DiagnosisForm serverIssuedAtISO={serverIssuedAtISO} />;
} 