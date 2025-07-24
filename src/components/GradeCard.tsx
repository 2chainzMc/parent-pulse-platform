import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { cn } from '@/lib/utils';

interface GradeCardProps {
  subject: string;
  score: number;
  total: number;
  grade: string;
  classAverage: number;
  feedback?: string;
  testName: string;
  date: string;
}

export const GradeCard: React.FC<GradeCardProps> = ({
  subject,
  score,
  total,
  grade,
  classAverage,
  feedback,
  testName,
  date,
}) => {
  const percentage = (score / total) * 100;
  const classPercentage = (classAverage / total) * 100;
  
  const getGradeColor = (grade: string) => {
    switch (grade.toUpperCase()) {
      case 'A': return 'bg-grade-a text-white';
      case 'B': return 'bg-grade-b text-white';
      case 'C': return 'bg-grade-c text-white';
      case 'D': return 'bg-grade-d text-white';
      case 'F': return 'bg-grade-f text-white';
      default: return 'bg-muted text-muted-foreground';
    }
  };

  const getPerformanceText = () => {
    if (percentage > classPercentage + 10) return 'Excellent! Above average';
    if (percentage > classPercentage) return 'Good! Above average';
    if (percentage > classPercentage - 5) return 'Near average';
    return 'Needs improvement';
  };

  return (
    <Card className="overflow-hidden hover:shadow-md transition-shadow duration-200">
      <CardContent className="p-4">
        <div className="flex items-start justify-between mb-3">
          <div className="flex-1">
            <h3 className="font-semibold text-foreground">{subject}</h3>
            <p className="text-sm text-muted-foreground">{testName}</p>
            <p className="text-xs text-muted-foreground">{date}</p>
          </div>
          <Badge className={cn("ml-2", getGradeColor(grade))}>
            {grade}
          </Badge>
        </div>

        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-2xl font-bold text-foreground">
              {score}/{total}
            </span>
            <span className="text-lg font-semibold text-muted-foreground">
              {percentage.toFixed(1)}%
            </span>
          </div>

          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Your score</span>
              <span className="font-medium">{percentage.toFixed(1)}%</span>
            </div>
            <Progress value={percentage} className="h-2" />
            
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Class average</span>
              <span className="font-medium">{classPercentage.toFixed(1)}%</span>
            </div>
            <Progress value={classPercentage} className="h-1 opacity-50" />
          </div>

          <div className="pt-2 border-t border-border">
            <p className="text-sm font-medium text-muted-foreground">
              {getPerformanceText()}
            </p>
            {feedback && (
              <p className="text-sm text-foreground mt-1 italic">
                "{feedback}"
              </p>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};