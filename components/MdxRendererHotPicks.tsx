import { MDXRemote, MDXRemoteSerializeResult } from "next-mdx-remote";
import AffStoreLinks from "@/components/AffStoreLinks";
import AffButton from "@/components/AffButton";

export default function MdxRendererHotPicks({
  mdx,
}: { mdx: MDXRemoteSerializeResult }) {
  return (
    <MDXRemote
      {...mdx}
      components={{
        AffStoreLinks,
        AffButton,
        strong: (props: any) => <strong className="font-bold text-gray-900" {...props} />,
        p: (props: any) => <p className="mb-4 leading-relaxed" {...props} />,
        li: (props: any) => <li className="text-gray-700 mb-1" {...props} />,
        ul: (props: any) => <ul className="list-disc list-inside mb-4 space-y-2" {...props} />,
      }}
    />
  );
}
