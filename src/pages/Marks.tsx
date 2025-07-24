import React, { useState } from 'react';
import { Header } from '@/components/Header';
import { GradeCard } from '@/components/GradeCard';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Download, TrendingUp, BookOpen } from 'lucide-react';
import { mockMarks } from '@/data/mockData';
import { cn } from '@/lib/utils';

const Marks: React.FC = () => {
  const [selectedTerm, setSelectedTerm] = useState('Q1');
  const [selectedSubject, setSelectedSubject] = useState('all');

  const terms = ['Q1', 'Q2', 'Q3', 'Q4'];
  const subjects = ['all', ...Array.from(new Set(mockMarks.map(mark => mark.subject)))];

  const filteredMarks = mockMarks.filter(mark => {
    const termMatch = mark.term === selectedTerm;
    const subjectMatch = selectedSubject === 'all' || mark.subject === selectedSubject;
    return termMatch && subjectMatch;
  });

  const calculateGPA = () => {
    const gradePoints: { [key: string]: number } = { 'A': 4.0, 'B+': 3.5, 'B': 3.0, 'C': 2.0, 'D': 1.0, 'F': 0.0 };
    const total = filteredMarks.reduce((sum, mark) => sum + (gradePoints[mark.grade] || 0), 0);
    return (total / filteredMarks.length).toFixed(2);
  };

  const getAverageScore = () => {
    const total = filteredMarks.reduce((sum, mark) => sum + mark.score, 0);
    const maxTotal = filteredMarks.reduce((sum, mark) => sum + mark.total, 0);
    return ((total / maxTotal) * 100).toFixed(1);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-muted pb-20">
      <Header title="Academic Performance" />
      
      <div className="px-4 py-6 space-y-6">
        {/* Term and Subject Filters */}
        <div className="flex flex-col sm:flex-row gap-4">
          <Select value={selectedTerm} onValueChange={setSelectedTerm}>
            <SelectTrigger className="w-full sm:w-32">
              <SelectValue placeholder="Term" />
            </SelectTrigger>
            <SelectContent>
              {terms.map(term => (
                <SelectItem key={term} value={term}>{term}</SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Select value={selectedSubject} onValueChange={setSelectedSubject}>
            <SelectTrigger className="w-full sm:flex-1">
              <SelectValue placeholder="Subject" />
            </SelectTrigger>
            <SelectContent>
              {subjects.map(subject => (
                <SelectItem key={subject} value={subject}>
                  {subject === 'all' ? 'All Subjects' : subject}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Performance Summary */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium flex items-center space-x-2">
                <TrendingUp size={16} />
                <span>GPA</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-0">
              <div className="text-2xl font-bold text-foreground">{calculateGPA()}</div>
              <p className="text-sm text-muted-foreground">out of 4.0</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium flex items-center space-x-2">
                <BookOpen size={16} />
                <span>Average</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-0">
              <div className="text-2xl font-bold text-foreground">{getAverageScore()}%</div>
              <p className="text-sm text-muted-foreground">overall score</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium">Tests</CardTitle>
            </CardHeader>
            <CardContent className="pt-0">
              <div className="text-2xl font-bold text-foreground">{filteredMarks.length}</div>
              <p className="text-sm text-muted-foreground">completed</p>
            </CardContent>
          </Card>
        </div>

        {/* Report Card Download */}
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-semibold text-foreground">Report Card</h3>
                <p className="text-sm text-muted-foreground">Download {selectedTerm} report card</p>
              </div>
              <Button variant="outline" size="sm" className="flex items-center space-x-2">
                <Download size={16} />
                <span>Download PDF</span>
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Marks by Subject */}
        <Tabs defaultValue="grid" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="grid">Card View</TabsTrigger>
            <TabsTrigger value="list">List View</TabsTrigger>
          </TabsList>
          
          <TabsContent value="grid" className="space-y-4 mt-6">
            {filteredMarks.length > 0 ? (
              filteredMarks.map((mark) => (
                <GradeCard
                  key={mark.id}
                  subject={mark.subject}
                  score={mark.score}
                  total={mark.total}
                  grade={mark.grade}
                  classAverage={mark.classAverage}
                  feedback={mark.feedback}
                  testName={mark.testName}
                  date={mark.date}
                />
              ))
            ) : (
              <Card>
                <CardContent className="py-12 text-center">
                  <BookOpen size={48} className="mx-auto text-muted-foreground mb-4" />
                  <h3 className="text-lg font-semibold text-foreground mb-2">No marks found</h3>
                  <p className="text-muted-foreground">No marks available for the selected term and subject.</p>
                </CardContent>
              </Card>
            )}
          </TabsContent>

          <TabsContent value="list" className="space-y-3 mt-6">
            {filteredMarks.length > 0 ? (
              filteredMarks.map((mark) => (
                <Card key={mark.id} className="overflow-hidden">
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <div className="flex-1">
                        <div className="flex items-center space-x-3 mb-1">
                          <h3 className="font-semibold text-foreground">{mark.subject}</h3>
                          <Badge className={cn(
                            mark.grade === 'A' ? 'bg-grade-a' :
                            mark.grade === 'B' || mark.grade === 'B+' ? 'bg-grade-b' :
                            mark.grade === 'C' ? 'bg-grade-c' :
                            mark.grade === 'D' ? 'bg-grade-d' : 'bg-grade-f'
                          )}>
                            {mark.grade}
                          </Badge>
                        </div>
                        <p className="text-sm text-muted-foreground">{mark.testName}</p>
                        <p className="text-xs text-muted-foreground">{mark.date}</p>
                      </div>
                      <div className="text-right">
                        <div className="text-lg font-bold text-foreground">{mark.score}/{mark.total}</div>
                        <div className="text-sm text-muted-foreground">
                          {((mark.score / mark.total) * 100).toFixed(1)}%
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))
            ) : (
              <Card>
                <CardContent className="py-12 text-center">
                  <BookOpen size={48} className="mx-auto text-muted-foreground mb-4" />
                  <h3 className="text-lg font-semibold text-foreground mb-2">No marks found</h3>
                  <p className="text-muted-foreground">No marks available for the selected term and subject.</p>
                </CardContent>
              </Card>
            )}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Marks;