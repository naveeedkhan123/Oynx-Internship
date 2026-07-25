export const mockUser = {
  id: "USR-101",
  name: "Alexander Wright",
  email: "alexander.wright@academia.edu",
  role: "student", // "student" | "teacher" | "admin"
  avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=250",
  studentId: "ACAD-2024-8891",
  department: "Computer Science & Engineering",
  semester: "6th Semester",
  cgpa: "3.88",
  joinedDate: "Sept 2022",
  phone: "+1 (555) 234-5678",
  address: "452 Academic Way, Cambridge, MA",
  bio: "Passionate CS major focusing on Artificial Intelligence, Web Systems, and Distributed Algorithms."
};

export const mockTeachersList = [
  {
    id: "TCH-001",
    name: "Dr. Eleanor Vance",
    role: "Senior Professor & HOD",
    department: "Computer Science",
    email: "e.vance@academia.edu",
    avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=200",
    courses: 4,
    rating: 4.9,
    status: "Active"
  },
  {
    id: "TCH-002",
    name: "Prof. Marcus Thorne",
    role: "Associate Professor",
    department: "Data Science",
    email: "m.thorne@academia.edu",
    avatar: "https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&q=80&w=200",
    courses: 3,
    rating: 4.8,
    status: "Active"
  },
  {
    id: "TCH-003",
    name: "Dr. Sophia Martinez",
    role: "Assistant Professor",
    department: "Cyber Security",
    email: "s.martinez@academia.edu",
    avatar: "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&q=80&w=200",
    courses: 2,
    rating: 4.7,
    status: "On Leave"
  },
  {
    id: "TCH-004",
    name: "Prof. David Miller",
    role: "Lecturer",
    department: "Software Engineering",
    email: "d.miller@academia.edu",
    avatar: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&q=80&w=200",
    courses: 5,
    rating: 4.9,
    status: "Active"
  }
];

export const mockStudentsList = [
  {
    id: "STD-101",
    name: "Alexander Wright",
    email: "alexander.wright@academia.edu",
    department: "Computer Science",
    semester: "6th",
    cgpa: "3.88",
    attendance: "94%",
    status: "Active"
  },
  {
    id: "STD-102",
    name: "Olivia Chen",
    email: "olivia.c@academia.edu",
    department: "Computer Science",
    semester: "6th",
    cgpa: "3.95",
    attendance: "98%",
    status: "Active"
  },
  {
    id: "STD-103",
    name: "Liam O'Connor",
    email: "liam.oc@academia.edu",
    department: "Data Science",
    semester: "4th",
    cgpa: "3.45",
    attendance: "88%",
    status: "Active"
  },
  {
    id: "STD-104",
    name: "Emma Watson",
    email: "emma.w@academia.edu",
    department: "Cyber Security",
    semester: "6th",
    cgpa: "3.72",
    attendance: "91%",
    status: "Active"
  },
  {
    id: "STD-105",
    name: "Noah Kim",
    email: "noah.k@academia.edu",
    department: "Software Engineering",
    semester: "2nd",
    cgpa: "3.60",
    attendance: "85%",
    status: "Pending"
  },
  {
    id: "STD-106",
    name: "Sophia Taylor",
    email: "sophia.t@academia.edu",
    department: "Computer Science",
    semester: "8th",
    cgpa: "3.91",
    attendance: "96%",
    status: "Active"
  }
];

export const mockCourses = [
  {
    id: "CS-401",
    title: "Advanced Data Structures & Algorithms",
    category: "Computer Science",
    instructor: "Dr. Eleanor Vance",
    instructorAvatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=200",
    banner: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&q=80&w=600",
    progress: 82,
    completedLessons: 28,
    totalLessons: 34,
    duration: "42 Hours",
    rating: 4.9,
    enrolledCount: 142,
    nextClass: "Tomorrow, 10:00 AM",
    description: "Master graph algorithms, dynamic programming, space-time complexity analysis, and advanced tree data structures essential for high-performance software systems.",
    modules: [
      {
        id: "mod-1",
        title: "Module 1: Dynamic Programming Fundamentals",
        lessons: [
          { id: "les-1", title: "1.1 Introduction to Memoization & Tabulation", duration: "25 min", completed: true, videoUrl: "https://www.w3schools.com/html/mov_bbb.mp4" },
          { id: "les-2", title: "1.2 Knapsack & Coin Change Problems", duration: "40 min", completed: true, videoUrl: "https://www.w3schools.com/html/mov_bbb.mp4" },
          { id: "les-3", title: "1.3 Longest Common Subsequence", duration: "35 min", completed: true, videoUrl: "https://www.w3schools.com/html/mov_bbb.mp4" }
        ]
      },
      {
        id: "mod-2",
        title: "Module 2: Advanced Graph Algorithms",
        lessons: [
          { id: "les-4", title: "2.1 Dijkstra & Bellman-Ford Pathfinding", duration: "45 min", completed: true, videoUrl: "https://www.w3schools.com/html/mov_bbb.mp4" },
          { id: "les-5", title: "2.2 Minimum Spanning Trees (Kruskal & Prim)", duration: "38 min", completed: true, videoUrl: "https://www.w3schools.com/html/mov_bbb.mp4" },
          { id: "les-6", title: "2.3 Network Flow & Ford-Fulkerson Algorithm", duration: "50 min", completed: false, videoUrl: "https://www.w3schools.com/html/mov_bbb.mp4" }
        ]
      },
      {
        id: "mod-3",
        title: "Module 3: Balanced Search Trees & Heaps",
        lessons: [
          { id: "les-7", title: "3.1 Red-Black Trees & AVL Rotations", duration: "45 min", completed: false, videoUrl: "https://www.w3schools.com/html/mov_bbb.mp4" },
          { id: "les-8", title: "3.2 Fibonacci Heaps & Priority Queues", duration: "30 min", completed: false, videoUrl: "https://www.w3schools.com/html/mov_bbb.mp4" }
        ]
      }
    ]
  },
  {
    id: "CS-402",
    title: "Full-Stack Web Engineering with React & Node",
    category: "Software Engineering",
    instructor: "Prof. David Miller",
    instructorAvatar: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&q=80&w=200",
    banner: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&q=80&w=600",
    progress: 65,
    completedLessons: 19,
    totalLessons: 29,
    duration: "38 Hours",
    rating: 4.8,
    enrolledCount: 188,
    nextClass: "Thursday, 2:00 PM",
    description: "Build robust scalable web applications with React 19, Tailwind CSS, REST APIs, GraphQL, and microservices server architecture.",
    modules: [
      {
        id: "mod-10",
        title: "Module 1: React State & Context API Architecture",
        lessons: [
          { id: "les-10", title: "1.1 Deep Dive into React Hooks & Custom Hooks", duration: "30 min", completed: true, videoUrl: "https://www.w3schools.com/html/mov_bbb.mp4" },
          { id: "les-11", title: "1.2 Global State Management with Context & Zustand", duration: "45 min", completed: true, videoUrl: "https://www.w3schools.com/html/mov_bbb.mp4" }
        ]
      },
      {
        id: "mod-11",
        title: "Module 2: Server Architecture with Express & MongoDB",
        lessons: [
          { id: "les-12", title: "2.1 RESTful API Route Controllers & Middleware", duration: "40 min", completed: true, videoUrl: "https://www.w3schools.com/html/mov_bbb.mp4" },
          { id: "les-13", title: "2.2 JWT Authentication & Security Headers", duration: "50 min", completed: false, videoUrl: "https://www.w3schools.com/html/mov_bbb.mp4" }
        ]
      }
    ]
  },
  {
    id: "DS-301",
    title: "Applied Machine Learning & Neural Networks",
    category: "Data Science",
    instructor: "Prof. Marcus Thorne",
    instructorAvatar: "https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&q=80&w=200",
    banner: "https://images.unsplash.com/photo-1527474305487-b87b222841cc?auto=format&fit=crop&q=80&w=600",
    progress: 40,
    completedLessons: 12,
    totalLessons: 30,
    duration: "46 Hours",
    rating: 4.9,
    enrolledCount: 165,
    nextClass: "Friday, 11:30 AM",
    description: "Hands-on supervised and unsupervised learning using Scikit-Learn, PyTorch, Convolutional Neural Networks, and Transformers.",
    modules: [
      {
        id: "mod-20",
        title: "Module 1: Supervised Regression & Classification",
        lessons: [
          { id: "les-20", title: "1.1 Linear & Logistic Regression Breakdown", duration: "35 min", completed: true, videoUrl: "https://www.w3schools.com/html/mov_bbb.mp4" },
          { id: "les-21", title: "1.2 Decision Trees & Random Forests", duration: "42 min", completed: true, videoUrl: "https://www.w3schools.com/html/mov_bbb.mp4" }
        ]
      }
    ]
  },
  {
    id: "CY-502",
    title: "Ethical Hacking & Network Defense",
    category: "Cyber Security",
    instructor: "Dr. Sophia Martinez",
    instructorAvatar: "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&q=80&w=200",
    banner: "https://images.unsplash.com/photo-1563986768609-322da13575f3?auto=format&fit=crop&q=80&w=600",
    progress: 100,
    completedLessons: 24,
    totalLessons: 24,
    duration: "32 Hours",
    rating: 4.95,
    enrolledCount: 110,
    nextClass: "Completed",
    description: "Comprehensive vulnerability assessment, penetration testing techniques, cryptographic protocols, and secure network infrastructure design.",
    modules: [
      {
        id: "mod-30",
        title: "Module 1: Network Reconnaissance & Penetration Testing",
        lessons: [
          { id: "les-30", title: "1.1 Nmap Scanning & Port Enumeration", duration: "30 min", completed: true, videoUrl: "https://www.w3schools.com/html/mov_bbb.mp4" },
          { id: "les-31", title: "1.2 Metasploit Framework Exploitation", duration: "50 min", completed: true, videoUrl: "https://www.w3schools.com/html/mov_bbb.mp4" }
        ]
      }
    ]
  }
];

export const mockAssignments = [
  {
    id: "ASN-101",
    courseId: "CS-401",
    courseTitle: "Advanced Data Structures & Algorithms",
    title: "Graph Shortest Path & Flow Network Optimization",
    dueDate: "2026-07-28",
    dueTime: "11:59 PM",
    points: 100,
    status: "Pending", // "Pending" | "Submitted" | "Graded"
    grade: null,
    instructor: "Dr. Eleanor Vance",
    description: "Implement Dijkstra's algorithm with binary heap priority queues and evaluate maximum flow in directed graphs using Ford-Fulkerson."
  },
  {
    id: "ASN-102",
    courseId: "CS-402",
    courseTitle: "Full-Stack Web Engineering",
    title: "Custom React Context & Auth Middleware Implementation",
    dueDate: "2026-08-02",
    dueTime: "05:00 PM",
    points: 100,
    status: "Submitted",
    grade: null,
    submissionDate: "2026-07-24",
    instructor: "Prof. David Miller",
    description: "Create a fully protected router configuration using React Context, local storage JWT persistence, and custom hook wrappers."
  },
  {
    id: "ASN-103",
    courseId: "DS-301",
    courseTitle: "Applied Machine Learning",
    title: "Classification Analysis on Medical Heart Disease Dataset",
    dueDate: "2026-07-18",
    dueTime: "11:59 PM",
    points: 100,
    status: "Graded",
    grade: "96 / 100",
    instructor: "Prof. Marcus Thorne",
    description: "Preprocess tabular healthcare data, train XGBoost classifier, compute ROC-AUC curves, and write hyperparameter optimization report."
  },
  {
    id: "ASN-104",
    courseId: "CY-502",
    courseTitle: "Ethical Hacking & Network Defense",
    title: "Web Vulnerability Audit & Exploit Write-Up",
    dueDate: "2026-07-10",
    dueTime: "11:59 PM",
    points: 50,
    status: "Graded",
    grade: "48 / 50",
    instructor: "Dr. Sophia Martinez",
    description: "Audit target sandbox environment for SQL injection and Cross-Site Scripting (XSS). Document attack vectors and mitigation steps."
  }
];

export const mockQuizzes = [
  {
    id: "QZ-201",
    title: "Algorithms & Complexity Mid-Term Assessment",
    course: "Advanced Data Structures & Algorithms",
    durationMinutes: 15,
    questionsCount: 5,
    questions: [
      {
        id: 1,
        question: "What is the worst-case time complexity of Lookup in a balanced Red-Black Tree?",
        options: ["O(1)", "O(log N)", "O(N)", "O(N log N)"],
        correctAnswer: 1,
        explanation: "Red-Black Trees maintain height bounded by 2 * log2(N + 1), guaranteeing logarithmic time search."
      },
      {
        id: 2,
        question: "Which graph algorithm guarantees finding the shortest path in a graph with non-negative edge weights?",
        options: ["Floyd-Warshall", "Dijkstra's Algorithm", "Bellman-Ford", "Kruskal's Algorithm"],
        correctAnswer: 1,
        explanation: "Dijkstra's algorithm uses a greedy approach to compute single-source shortest paths when edge weights are positive."
      },
      {
        id: 3,
        question: "What is the primary recurrence relation for the Fibonacci sequence using Dynamic Programming?",
        options: ["F(n) = F(n-1) * F(n-2)", "F(n) = F(n-1) + F(n-2)", "F(n) = 2 * F(n-1)", "F(n) = F(n/2) + O(1)"],
        correctAnswer: 1,
        explanation: "Dynamic programming computes F(n) by caching the sum of previous two subproblems F(n-1) and F(n-2)."
      },
      {
        id: 4,
        question: "In Ford-Fulkerson algorithm, what does an augmenting path represent in the residual graph?",
        options: ["Minimum cut capacity", "A path from source to sink with available capacity", "Shortest topological ordering", "Cyclic path with negative weight"],
        correctAnswer: 1,
        explanation: "An augmenting path is a simple path from source to sink in the residual network along which additional flow can be pushed."
      },
      {
        id: 5,
        question: "What is the space complexity of Depth First Search (DFS) on a graph with max depth D?",
        options: ["O(1)", "O(V + E)", "O(D)", "O(V^2)"],
        correctAnswer: 2,
        explanation: "The recursion stack in DFS requires space proportional to the maximum depth of the search tree (O(D))."
      }
    ]
  }
];

export const mockAttendanceData = {
  overallPercentage: 94.2,
  presentDays: 114,
  absentDays: 7,
  lateDays: 3,
  subjectBreakdown: [
    { subject: "Advanced Algorithms", percentage: 95.5, attended: 42, total: 44 },
    { subject: "Full-Stack Web Eng.", percentage: 92.8, attended: 39, total: 42 },
    { subject: "Machine Learning", percentage: 94.0, attended: 47, total: 50 },
    { subject: "Ethical Hacking", percentage: 100.0, attended: 36, total: 36 }
  ],
  monthlyLog: [
    { month: "Jan", present: 22, absent: 1, percentage: 95.6 },
    { month: "Feb", present: 20, absent: 2, percentage: 90.9 },
    { month: "Mar", present: 24, absent: 1, percentage: 96.0 },
    { month: "Apr", present: 22, absent: 0, percentage: 100.0 },
    { month: "May", present: 21, absent: 2, percentage: 91.3 },
    { month: "Jun", present: 23, absent: 1, percentage: 95.8 }
  ]
};

export const mockGradesData = {
  cgpa: 3.88,
  totalCredits: 96,
  completedSemesters: 5,
  subjects: [
    { code: "CS-401", title: "Advanced Data Structures & Algorithms", credit: 4, grade: "A", points: 4.0, marks: 94 },
    { code: "CS-402", title: "Full-Stack Web Engineering", credit: 4, grade: "A-", points: 3.7, marks: 89 },
    { code: "DS-301", title: "Applied Machine Learning", credit: 3, grade: "A", points: 4.0, marks: 96 },
    { code: "CY-502", title: "Ethical Hacking & Network Defense", credit: 3, grade: "A+", points: 4.0, marks: 98 },
    { code: "MATH-302", title: "Discrete Mathematics & Linear Algebra", credit: 4, grade: "A", points: 4.0, marks: 92 }
  ],
  semesterTrend: [
    { semester: "Sem 1", gpa: 3.75 },
    { semester: "Sem 2", gpa: 3.82 },
    { semester: "Sem 3", gpa: 3.85 },
    { semester: "Sem 4", gpa: 3.90 },
    { semester: "Sem 5", gpa: 3.88 }
  ]
};

export const mockCertificates = [
  {
    id: "CERT-CY-2026-991",
    courseTitle: "Ethical Hacking & Network Defense",
    issueDate: "July 12, 2026",
    instructor: "Dr. Sophia Martinez",
    credentialId: "ACAD-CERT-8849102",
    grade: "Grade A+ (98%)",
    skills: ["Penetration Testing", "Nmap", "Cryptography", "Wireshark", "Network Security"]
  },
  {
    id: "CERT-DS-2025-412",
    courseTitle: "Fundamentals of Data Analytics & Python",
    issueDate: "December 20, 2025",
    instructor: "Prof. Marcus Thorne",
    credentialId: "ACAD-CERT-7738219",
    grade: "Grade A (95%)",
    skills: ["Pandas", "NumPy", "Data Visualization", "Statistical Analysis"]
  }
];

export const mockNotifications = [
  {
    id: "NTF-1",
    title: "New Assignment Posted",
    message: "Dr. Eleanor Vance published 'Graph Shortest Path & Flow Network Optimization'",
    time: "10 minutes ago",
    unread: true,
    type: "assignment"
  },
  {
    id: "NTF-2",
    title: "Grade Released",
    message: "Your grade for 'Classification Analysis' is 96/100 (A)",
    time: "2 hours ago",
    unread: true,
    type: "grade"
  },
  {
    id: "NTF-3",
    title: "Live Class Reminder",
    message: "Full-Stack Web Engineering session starts in 30 minutes.",
    time: "3 hours ago",
    unread: false,
    type: "event"
  },
  {
    id: "NTF-4",
    title: "Campus Announcement",
    message: "Library extended hours during final examination week.",
    time: "1 day ago",
    unread: false,
    type: "announcement"
  }
];

export const mockAnnouncements = [
  {
    id: "ANC-1",
    title: "Annual Hackathon & Innovation Summit 2026",
    date: "July 24, 2026",
    author: "Department of Computer Science",
    badge: "Event",
    content: "Registration for the 48-hour Academia Hackathon is now open! Top projects win $5,000 in seed grants and tech mentorship."
  },
  {
    id: "ANC-2",
    title: "Mid-Term Examination Schedule Released",
    date: "July 20, 2026",
    author: "Academic Registrar",
    badge: "Important",
    content: "The official timetable for Fall mid-terms is live in your student portal under the examination tab."
  },
  {
    id: "ANC-3",
    title: "Guest Speaker Series: Scalable AI Infrastructure",
    date: "July 18, 2026",
    author: "Prof. Marcus Thorne",
    badge: "Seminar",
    content: "Join us this Friday at the Main Auditorium for a talk by Senior AI Engineers on deploying LLMs at scale."
  }
];

export const mockUpcomingEvents = [
  { id: 1, title: "Graph Algorithms Lecture", time: "10:00 AM - 11:30 AM", type: "class", date: "Today" },
  { id: 2, title: "Web Architecture Quiz", time: "02:00 PM - 02:45 PM", type: "quiz", date: "Today" },
  { id: 3, title: "AI Lab Submission Due", time: "11:59 PM", type: "deadline", date: "Tomorrow" },
  { id: 4, title: "Faculty Mentorship Hour", time: "04:00 PM - 05:00 PM", type: "meeting", date: "Jul 28" }
];

export const mockAdminStats = {
  totalStudents: 3420,
  totalTeachers: 184,
  totalCourses: 126,
  activeDepartments: 8,
  systemUptime: "99.98%",
  monthlyEnrolments: [
    { month: "Jan", students: 420, revenue: 124000 },
    { month: "Feb", students: 510, revenue: 148000 },
    { month: "Mar", students: 680, revenue: 192000 },
    { month: "Apr", students: 740, revenue: 210000 },
    { month: "May", students: 890, revenue: 260000 },
    { month: "Jun", students: 950, revenue: 285000 }
  ],
  departmentStats: [
    { name: "Computer Science", students: 1240, courses: 42 },
    { name: "Data Science", students: 860, courses: 28 },
    { name: "Software Eng.", students: 720, courses: 24 },
    { name: "Cyber Security", students: 600, courses: 20 }
  ]
};
