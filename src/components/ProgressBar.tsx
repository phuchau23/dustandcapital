import { Progress } from "./ui/progress";
import { Badge } from "./ui/badge";

interface ProgressBarProps {
  currentScene: number;
  totalScenes: number;
  currentPercentage: number;
}

export function ProgressBar({ currentScene, totalScenes, currentPercentage }: ProgressBarProps) {
  const progressPercentage = (currentScene / totalScenes) * 100;
  
  const getEndingType = (percentage: number) => {
    if (percentage <= 25) return { name: "Khép kín", color: "bg-red-500" };
    if (percentage <= 50) return { name: "Ảo tưởng sụp đổ", color: "bg-orange-500" };
    if (percentage <= 75) return { name: "Hạt mầm nhỏ", color: "bg-yellow-500" };
    return { name: "Cộng đồng thật sự", color: "bg-green-500" };
  };

  const endingType = getEndingType(currentPercentage);

  return (
    <div className="w-full max-w-4xl mx-auto p-4 space-y-3">
      <div className="flex justify-between items-center">
        <span className="text-sm text-muted-foreground">
          Scene {currentScene} / {totalScenes}
        </span>
        <div className="flex items-center gap-2">
          <span className="text-sm">Xu hướng:</span>
          <Badge 
            variant="secondary" 
            className={`${endingType.color} text-white`}
          >
            {endingType.name} ({Math.round(currentPercentage)}%)
          </Badge>
        </div>
      </div>
      <Progress value={progressPercentage} className="h-2" />
    </div>
  );
}