export default function PhotoPending({
  caption,
  note = "写真は許可が下り次第、掲載します。"
}: { caption?: string; note?: string }) {
  return (
    <figure className="my-6">
      <div
        aria-label="写真は準備中です"
        className="flex h-56 w-full items-center justify-center rounded-lg border border-dashed border-slate-300 bg-slate-50 text-slate-400"
      >
        <span className="text-xl">📷 No image</span>
      </div>
      <figcaption className="mt-2 text-sm text-slate-500">
        {caption ? `${caption} — ` : ""}{note}
      </figcaption>
    </figure>
  );
}
