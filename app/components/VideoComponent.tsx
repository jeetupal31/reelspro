import { IKVideo } from "imagekitio-next";
import Link from "next/link";
import { IVideo } from "@/models/Video";

export default function VideoComponent({ video }: { video: IVideo }) {
  return (
    <div className="group overflow-hidden rounded-2xl border border-white/10 bg-white/[0.03] transition-all duration-300 hover:-translate-y-1 hover:border-fuchsia-500/40 hover:bg-white/[0.06]">
      <Link href={`/videos/${video._id}`} className="block">
        <div
          className="relative w-full overflow-hidden"
          style={{ aspectRatio: "9/16" }}
        >
          <IKVideo
            path={video.videoUrl}
            transformation={[{ height: "1920", width: "1080" }]}
            controls={video.controls}
            className="h-full w-full object-cover"
          />
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 transition-opacity group-hover:opacity-100" />
        </div>
      </Link>

      <div className="p-4">
        <Link href={`/videos/${video._id}`}>
          <h2 className="truncate text-base font-semibold text-white transition-colors group-hover:text-fuchsia-300">
            {video.title}
          </h2>
        </Link>
        <p className="mt-1 line-clamp-2 text-sm text-zinc-400">
          {video.description}
        </p>
      </div>
    </div>
  );
}
