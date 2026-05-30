import { MDXRemote, MDXRemoteSerializeResult } from "next-mdx-remote";
import AffStoreLinks from "@/components/AffStoreLinks";
import AffButton from "@/components/AffButton";

function Callout({
  children,
  type = "info",
}: {
  children: React.ReactNode;
  type?: "info" | "tip" | "warning";
}) {
  const styles = {
    info: "border-blue-200 bg-blue-50 text-blue-950",
    tip: "border-emerald-200 bg-emerald-50 text-emerald-950",
    warning: "border-amber-200 bg-amber-50 text-amber-950",
  } as const;

  return (
    <div className={`my-6 rounded-xl border p-4 ${styles[type] ?? styles.info}`}>
      {children}
    </div>
  );
}

export default function MdxRendererHotPicks({
  mdx,
}: { mdx: MDXRemoteSerializeResult }) {
  return (
    <MDXRemote
      {...mdx}
      components={{
        AffStoreLinks,
        AffButton,
        Callout,
        strong: (props: any) => <strong className="font-bold text-gray-900" {...props} />,
        p: (props: any) => <p className="mb-4 leading-relaxed" {...props} />,
        li: (props: any) => <li className="text-gray-700 mb-1" {...props} />,
        ul: (props: any) => <ul className="list-disc list-inside mb-4 space-y-2" {...props} />,
        span: (props: any) => <span {...props} />,
      }}
    />
  );
}
