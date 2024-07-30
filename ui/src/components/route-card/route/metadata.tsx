import { type Route } from "@/lib/types";

export default function Metadata({
  metadata,
}: {
  metadata: Route["metadata"];
}) {
  return (
    <div className="flex gap-3">
      <div>
        <p className="text-sm text-gray-400">Gas Price</p>
        <p className="text-lg text-white">{metadata.gasPrice}</p>
      </div>
      <div>
        <p className="text-sm text-gray-400">Time</p>
        <p className="text-lg text-white">{metadata.time}</p>
      </div>
    </div>
  );
}
