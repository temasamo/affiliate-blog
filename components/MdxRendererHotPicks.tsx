import { MDXRemote, MDXRemoteSerializeResult } from "next-mdx-remote";
import AffStoreLinks from "@/components/AffStoreLinks";
import AffButton from "@/components/AffButton";

export default function MdxRendererHotPicks({
  mdx,
}: { mdx: MDXRemoteSerializeResult }) {
  return <MDXRemote {...mdx} components={{ AffStoreLinks, AffButton }} />;
}
