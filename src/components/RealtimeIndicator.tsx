import { useRealtime } from "@/contexts/RealtimeContext";
import { Wifi, WifiOff } from "lucide-react";
import { Badge } from "@/components/ui/badge";

export default function RealtimeIndicator() {
  const { isConnected, lastUpdate } = useRealtime();

  return (
    <div className="fixed bottom-4 left-4 z-50">
      <Badge
        variant={isConnected ? "default" : "secondary"}
        className="flex items-center gap-2 px-3 py-2"
      >
        {isConnected ? (
          <>
            <Wifi className="h-4 w-4 animate-pulse" />
            <span>Live Updates</span>
          </>
        ) : (
          <>
            <WifiOff className="h-4 w-4" />
            <span>Offline</span>
          </>
        )}
        {lastUpdate && (
          <span className="text-xs opacity-75 ml-2">
            {lastUpdate.toLocaleTimeString()}
          </span>
        )}
      </Badge>
    </div>
  );
}
