import { SchoolConfig, User, Child } from '@/contexts/SchoolContext';

export const mockSchools: SchoolConfig[] = [
  {
    id: 'oakwood-academy',
    name: 'Oakwood Academy',
    logo: 'https://images.unsplash.com/photo-1562774053-701939374585?auto=format&fit=crop&w=100&h=100',
    primaryColor: '#3B82F6',
    secondaryColor: '#10B981',
    accentColor: '#F59E0B',
    contactEmail: 'info@oakwoodacademy.edu',
    contactPhone: '+1 (555) 123-4567',
    address: '123 Education Drive, Learning City, LC 12345',
    motto: 'Excellence in Education',
    features: {
      messaging: true,
      events: true,
      reportDownload: true,
      payments: true,
    },
  },
  {
    id: 'sunshine-elementary',
    name: 'Sunshine Elementary',
    logo: 'https://images.unsplash.com/photo-1580582932707-520aed937b7b?auto=format&fit=crop&w=100&h=100',
    primaryColor: '#F59E0B',
    secondaryColor: '#EF4444',
    accentColor: '#8B5CF6',
    contactEmail: 'contact@sunshine-elem.edu',
    contactPhone: '+1 (555) 987-6543',
    address: '456 Sunny Lane, Bright Town, BT 67890',
    motto: 'Growing Bright Minds',
    features: {
      messaging: true,
      events: true,
      reportDownload: false,
      payments: false,
    },
  },
];

export const mockChildren: Child[] = [
  {
    id: 'child-1',
    name: 'Emma Johnson',
    grade: '8th Grade',
    class: '8A',
    studentId: 'STU-2024-001',
  },
  {
    id: 'child-2',
    name: 'Lucas Johnson',
    grade: '5th Grade',
    class: '5B',
    studentId: 'STU-2024-002',
  },
];

export const mockUser: User = {
  id: 'user-1',
  name: 'Sarah Johnson',
  email: 'sarah.johnson@email.com',
  role: 'parent',
  schoolId: 'oakwood-academy',
  children: mockChildren,
};

export const mockMarks = [
  {
    id: 'mark-1',
    subject: 'Mathematics',
    testName: 'Algebra Quiz',
    score: 92,
    total: 100,
    grade: 'A',
    classAverage: 78,
    feedback: 'Excellent work! Keep up the great problem-solving.',
    date: '2024-01-15',
    term: 'Q1',
  },
  {
    id: 'mark-2',
    subject: 'Science',
    testName: 'Chemistry Lab Report',
    score: 85,
    total: 100,
    grade: 'B',
    classAverage: 82,
    feedback: 'Good understanding of concepts. Improve lab technique.',
    date: '2024-01-12',
    term: 'Q1',
  },
  {
    id: 'mark-3',
    subject: 'English',
    testName: 'Essay: Climate Change',
    score: 88,
    total: 100,
    grade: 'B+',
    classAverage: 75,
    feedback: 'Well-structured argument. Work on conclusion strength.',
    date: '2024-01-10',
    term: 'Q1',
  },
  {
    id: 'mark-4',
    subject: 'History',
    testName: 'World War II Test',
    score: 95,
    total: 100,
    grade: 'A',
    classAverage: 80,
    feedback: 'Outstanding knowledge of historical events!',
    date: '2024-01-08',
    term: 'Q1',
  },
];

export const mockMessages = [
  {
    id: 'msg-1',
    teacherName: 'Ms. Rodriguez',
    subject: 'Mathematics',
    lastMessage: "Emma's performance has been excellent this quarter!",
    timestamp: '2024-01-15T10:30:00Z',
    unread: true,
    messages: [
      {
        id: 'msg-1-1',
        sender: 'teacher',
        content: "Hi Sarah! I wanted to update you on Emma's progress in mathematics.",
        timestamp: '2024-01-15T09:00:00Z',
      },
      {
        id: 'msg-1-2',
        sender: 'parent',
        content: 'Thank you for reaching out! How is she doing?',
        timestamp: '2024-01-15T09:15:00Z',
      },
      {
        id: 'msg-1-3',
        sender: 'teacher',
        content: "Emma's performance has been excellent this quarter! She shows great problem-solving skills.",
        timestamp: '2024-01-15T10:30:00Z',
      },
    ],
  },
  {
    id: 'msg-2',
    teacherName: 'Mr. Thompson',
    subject: 'Science',
    lastMessage: 'Please remind Emma to bring her lab notebook tomorrow.',
    timestamp: '2024-01-14T15:45:00Z',
    unread: false,
    messages: [
      {
        id: 'msg-2-1',
        sender: 'teacher',
        content: 'Please remind Emma to bring her lab notebook tomorrow.',
        timestamp: '2024-01-14T15:45:00Z',
      },
    ],
  },
];

export const mockEvents = [
  {
    id: 'event-1',
    title: 'Parent-Teacher Conference',
    description: 'Individual meetings with teachers to discuss student progress.',
    date: '2024-01-25',
    time: '14:00',
    location: 'Main Building - Classroom 8A',
    category: 'Parent Meeting',
    rsvpRequired: true,
    rsvpStatus: null,
  },
  {
    id: 'event-2',
    title: 'Science Fair',
    description: 'Annual science fair showcasing student projects.',
    date: '2024-02-05',
    time: '10:00',
    location: 'School Gymnasium',
    category: 'Academic',
    rsvpRequired: true,
    rsvpStatus: 'yes',
  },
  {
    id: 'event-3',
    title: 'Basketball Tournament',
    description: 'Inter-school basketball competition.',
    date: '2024-02-12',
    time: '16:00',
    location: 'Sports Complex',
    category: 'Sports',
    rsvpRequired: false,
    rsvpStatus: null,
  },
  {
    id: 'event-4',
    title: 'Grade 8 Trip to Museum',
    description: 'Educational trip to the Natural History Museum.',
    date: '2024-02-20',
    time: '09:00',
    location: 'Natural History Museum',
    category: 'Grade Trip',
    rsvpRequired: true,
    rsvpStatus: 'no',
  },
];

export const mockAnnouncements = [
  {
    id: 'ann-1',
    title: 'Winter Break Schedule',
    content: 'School will be closed from December 23rd to January 8th. Classes resume on January 9th.',
    date: '2024-01-10',
    priority: 'high',
  },
  {
    id: 'ann-2',
    title: 'New Library Hours',
    content: 'Library is now open from 7:30 AM to 6:00 PM on weekdays.',
    date: '2024-01-08',
    priority: 'medium',
  },
  {
    id: 'ann-3',
    title: 'Lunch Menu Update',
    content: 'New healthy options added to the cafeteria menu starting next week.',
    date: '2024-01-05',
    priority: 'low',
  },
];

export const mockAttendance = {
  thisWeek: {
    present: 4,
    absent: 1,
    late: 0,
    total: 5,
  },
  thisMonth: {
    present: 18,
    absent: 2,
    late: 1,
    total: 21,
  },
  details: [
    { date: '2024-01-15', status: 'present', time: '08:00' },
    { date: '2024-01-14', status: 'late', time: '08:15' },
    { date: '2024-01-13', status: 'present', time: '07:55' },
    { date: '2024-01-12', status: 'present', time: '08:02' },
    { date: '2024-01-11', status: 'absent', time: null },
  ],
};