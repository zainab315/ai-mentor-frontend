export const usStates = [
  "Alabama",
  "Alaska",
  "Arizona",
  "Arkansas",
  "California",
  "Colorado",
  "Connecticut",
  "Delaware",
  "Florida",
  "Georgia",
  "Hawaii",
  "Idaho",
  "Illinois",
  "Indiana",
  "Iowa",
  "Kansas",
  "Kentucky",
  "Louisiana",
  "Maine",
  "Maryland",
  "Massachusetts",
  "Michigan",
  "Minnesota",
  "Mississippi",
  "Missouri",
  "Montana",
  "Nebraska",
  "Nevada",
  "New Hampshire",
  "New Jersey",
  "New Mexico",
  "New York",
  "North Carolina",
  "North Dakota",
  "Ohio",
  "Oklahoma",
  "Oregon",
  "Pennsylvania",
  "Rhode Island",
  "South Carolina",
  "South Dakota",
  "Tennessee",
  "Texas",
  "Utah",
  "Vermont",
  "Virginia",
  "Washington",
  "West Virginia",
  "Wisconsin",
  "Wyoming",
];

export const difficultyLevels = [
  {
    value: "School",
    type: "Easy",
  },
  {
    value: "Graduate",
    type: "Medium",
  },
  {
    value: "PhD",
    type: "Hard",
  },
  {
    value: "Masters",
    type: "Very Hard",
  },
  {
    value: "Doctorate",
    type: "Expert",
  },
  {
    value: "Professor",
    type: "Insane",
  },
];

export const subjects = [
  { name: "Mathematics", icon: "🧮" },
  { name: "Science", icon: "🔬" },
  { name: "Language_Arts", icon: "📚" },
  { name: "Social_Studies", icon: "🌍" },
  { name: "Computer_Science", icon: "💻" },
  { name: "Foreign_Language", icon: "🌐" },
] as const;

export const sub_branch_subjects = {
  Mathematics: [
    "Algebra",
    "Calculus",
    "Geometry",
    "Statistics",
    "Trigonometry",
    "Linear Algebra",
    "Differential Equations",
    "Number Theory",
    "Probability",
    "Mathematical Logic",
    "Combinatorics",
    "Real Analysis",
    "Complex Analysis",
    "Topology",
    "Mathematical Modelling",
    "Abstract Algebra",
    "Set Theory",
    "Graph Theory",
    "Mathematical Optimization",
    "Game Theory",
  ],
  Science: [
    "Physics",
    "Chemistry",
    "Biology",
    "Earth Science",
    "Astronomy",
    "Environmental Science",
    "Geology",
    "Genetics",
    "Botany",
    "Zoology",
    "Microbiology",
    "Ecology",
    "Physics of Matter",
    "Organic Chemistry",
    "Inorganic Chemistry",
    "Quantum Physics",
    "Thermodynamics",
    "Marine Biology",
    "Atmospheric Science",
    "Material Science",
  ],
  Language_Arts: [
    "Grammar",
    "Literature",
    "Writing",
    "Vocabulary",
    "Poetry",
    "Creative Writing",
    "Essay Writing",
    "Public Speaking",
    "Speech Communication",
    "Rhetoric",
    "Language Acquisition",
    "Phonetics",
    "Syntax",
    "Semantics",
    "Literary Analysis",
    "Journalism",
    "Playwriting",
    "Storytelling",
    "Media Studies",
    "Linguistics",
  ],
  Social_Studies: [
    "History",
    "Geography",
    "Economics",
    "Civics",
    "Political Science",
    "Sociology",
    "Anthropology",
    "International Relations",
    "Psychology",
    "Law",
    "Public Policy",
    "Criminal Justice",
    "Urban Studies",
    "Global Studies",
    "Social Work",
    "Comparative Politics",
    "Economic Theory",
    "Philosophy",
    "Religious Studies",
    "Cultural Studies",
  ],
  Computer_Science: [
    "Algorithms",
    "Data Structures",
    "Artificial Intelligence",
    "Machine Learning",
    "Cybersecurity",
    "Software Engineering",
    "Database Systems",
    "Operating Systems",
    "Computer Networks",
    "Computer Graphics",
    "Human-Computer Interaction",
    "Web Development",
    "Mobile App Development",
    "Cloud Computing",
    "Big Data",
    "Internet of Things",
    "Blockchain",
    "Virtual Reality",
    "Game Development",
    "Compiler Design",
  ],
  Foreign_Language: [
    "Spanish",
    "French",
    "German",
    "Mandarin",
    "Italian",
    "Russian",
    "Japanese",
    "Arabic",
    "Portuguese",
    "Korean",
    "Dutch",
    "Greek",
    "Hindi",
    "Turkish",
    "Swedish",
    "Hebrew",
    "Polish",
    "Bengali",
    "Vietnamese",
    "Cantonese",
  ],
};

export function formattedSelectedSubject(subjectName: string) {
  return subjectName.replace("_", " ");
}

export const quizTestData = [
  {
    id: 1,
    question:
      "What is the area of the region enclosed by the function y = x^2 and the line y = x + 2?",
    answers: ["1.5 units²", "3 units²", "4.5 units²", "6 units²"],
    correct_answer: "4.5 units²",
  },
  {
    id: 2,
    question: "Solve the integral of e^(2x) with respect to x.",
    answers: ["(1/2)e^(2x) + C", "e^(2x) + C", "2e^(2x) + C", "-e^(2x) + C"],
    correct_answer: "(1/2)e^(2x) + C",
  },
  {
    id: 3,
    question:
      "Evaluate the limit: lim_{x -> ∞} (3x^3 - 2x + 4)/(6x^3 + x - 1).",
    answers: ["1", "1/2", "1/3", "0"],
    correct_answer: "1/2",
  },
  {
    id: 4,
    question:
      "Consider a function f(x) = ln(x). What is the derivative of f with respect to x?",
    answers: ["1/x", "ln(x)", "x", "xln(x)"],
    correct_answer: "1/x",
  },
  {
    id: 5,
    question:
      "What is the radius of convergence for the power series ∑ (n=0 to ∞) (x^n)/n! ?",
    answers: ["1", "2", "Infinity", "Converges for all x"],
    correct_answer: "Converges for all x",
  },
  {
    id: 6,
    question:
      "Analyze the critical points of the function f(x, y) = x^2 + y^2 + 4xy + 2x + 2y and identify their nature.",
    answers: ["Minimum", "Maximum", "Saddle point", "None"],
    correct_answer: "Saddle point",
  },
  {
    id: 7,
    question: "For which values of p does the series ∑ (1/n^p) converge?",
    answers: ["p > 1", "p < 1", "p > 0", "All values of p"],
    correct_answer: "p > 1",
  },
  {
    id: 8,
    question:
      "Which of the following functions are linearly independent? f1(x) = x, f2(x) = x^2, f3(x) = x^3 ",
    answers: ["f1 and f2", "f2 and f3", "f1, f2, and f3", "None"],
    correct_answer: "f1, f2, and f3",
  },
  {
    id: 9,
    question: "Find the determinant of the matrix A = [[2, 3], [4, 5]].",
    answers: ["-2", "-1", "1", "2"],
    correct_answer: "-2",
  },
];

export function categorizeMarks(marks: string) {
  const [obtained, total] = marks.split("/").map(Number);
  if (isNaN(obtained) || isNaN(total) || total === 0) {
    return "Invalid marks";
  }

  const percentage = (obtained / total) * 100;

  if (percentage >= 80) {
    return "High";
  } else if (percentage >= 50) {
    return "Medium";
  } else {
    return "Low";
  }
}

export const quizResults: any = [
  {
    id: 1,
    student: "John Smith",
    date: new Date("2024-03-20"),
    marks: 9,
  },
  {
    id: 2,
    student: "Emma Wilson",
    date: new Date("2024-03-20"),
    marks: 8,
  },
  {
    id: 3,
    student: "Michael Brown",
    date: new Date("2024-03-20"),
    marks: 9,
  },
  {
    id: 4,
    student: "Sarah Davis",
    date: new Date("2024-03-20"),
    marks: 10,
  },
  {
    id: 5,
    student: "James Johnson",
    date: new Date("2024-03-20"),
    marks: 9,
  },
]



export function capitalizeCustom(str:string) {
  return str.replace(/\b\w|(?<=-)\w|(?<=&)\w/g, match => match.toUpperCase());
}


export const copyToClipboard = async (text: string) => {
  try {
      await navigator.clipboard.writeText(text);
      console.log("Text copied to clipboard:", text);
  } catch (err) {
      console.error("Failed to copy text:", err);
  }
};


export function formatMongoDate(createdAt:Date, daysToAdd:number) {
  const date = new Date(createdAt);
  date.setDate(date.getDate() + daysToAdd);

  return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric"
  });
}

export const logout = () => {
  // Clear local storage
  localStorage.clear();

  // Clear session storage
  sessionStorage.clear();

  // Clear all cookies
  document.cookie.split(";").forEach((cookie) => {
    const [name] = cookie.split("=");
    document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/; domain=${window.location.hostname}`;
  });

  console.log("Local storage, session storage, and cookies cleared!");
};


export function countTokens(text:string) {
  return text.split(/\s+/).length; // Approximate token count
}
