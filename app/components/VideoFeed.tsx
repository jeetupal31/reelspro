import { IVideo } from "@/models/Video";
import VideoComponent from "./VideoComponent";

interface VideoFeedProps {
  videos: IVideo[];
}

export default function VideoFeed({ videos }: VideoFeedProps) {
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
      {videos.map((video) => (
        <VideoComponent key={video._id?.toString()} video={video} />
      ))}

      {videos.length === 0 && (
        <div className="col-span-full flex flex-col items-center rounded-2xl border border-dashed border-white/10 py-16 text-center">
          <span className="text-5xl">🎬</span>
          <p className="mt-4 font-semibold text-white">No reels yet</p>
          <p className="mt-1 text-sm text-zinc-500">
            Be the first to upload — your video will appear here.
          </p>
        </div>
      )}
    </div>
  );
}