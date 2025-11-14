export type Priority = "High" | "Medium" | "Low";
export type Status = "WAITING" | "PLEASE PROCEED" | "COMPLETED" | "NOW BEING SEEN" | "SKIPPED";
export type VisitType = "New" | "Follow-up" | "Reports-only";

export interface Patient {
  token: string;
  name: string;
  age: number;
  gender: string;
  visitType: VisitType;
  symptoms: string;
  phone?: string;
  priority: Priority;
  department: string;
  location: {
    floor: number;
    room: string;
  };
  vitalsDone: boolean;
  waiting: string;
  since?: string;
  status: Status;
  position?: number;
  etaMinutes?: number;
}

export interface Vitals {
  bp: string;
  pulse: number;
  temp: number;
  spo2: number;
  rr: number;
  notes?: string;
}

export const mockPatients: Patient[] = [
  {
    token: "CARD-H-014",
    name: "Rajan Patel",
    age: 42,
    gender: "Male",
    visitType: "New",
    symptoms: "Chest pain and shortness of breath since morning",
    phone: "+91 98765 43210",
    priority: "High",
    department: "Cardiology",
    location: { floor: 3, room: "305" },
    vitalsDone: true,
    waiting: "—",
    since: "10:35",
    status: "NOW BEING SEEN",
    position: 0,
    etaMinutes: 0,
  },
  {
    token: "CARD-H-015",
    name: "Sunita Sharma",
    age: 55,
    gender: "Female",
    visitType: "New",
    symptoms: "Severe chest discomfort",
    priority: "High",
    department: "Cardiology",
    location: { floor: 3, room: "305" },
    vitalsDone: false,
    waiting: "08m",
    status: "WAITING",
    position: 1,
    etaMinutes: 8,
  },
  {
    token: "CARD-M-042",
    name: "Amit Khan",
    age: 33,
    gender: "Male",
    visitType: "Follow-up",
    symptoms: "Follow-up for hypertension",
    priority: "Medium",
    department: "Cardiology",
    location: { floor: 3, room: "305" },
    vitalsDone: true,
    waiting: "16m",
    status: "WAITING",
    position: 2,
    etaMinutes: 16,
  },
  {
    token: "GEN-M-211",
    name: "Priya Singh",
    age: 28,
    gender: "Female",
    visitType: "New",
    symptoms: "Fever since last night",
    priority: "Medium",
    department: "General OPD",
    location: { floor: 2, room: "201" },
    vitalsDone: false,
    waiting: "12m",
    status: "WAITING",
    position: 1,
    etaMinutes: 12,
  },
  {
    token: "GEN-L-089",
    name: "Rahul Verma",
    age: 45,
    gender: "Male",
    visitType: "Reports-only",
    symptoms: "Routine checkup reports",
    priority: "Low",
    department: "General OPD",
    location: { floor: 2, room: "201" },
    vitalsDone: true,
    waiting: "25m",
    status: "WAITING",
    position: 3,
    etaMinutes: 25,
  },
];

export const triageKeywords = {
  high: ["chest pain", "breathless", "unconscious", "stroke", "severe bleeding", "heart", "cardiac"],
  medium: ["fever", "vomiting", "moderate pain", "dizziness", "headache", "cough"],
  low: ["routine checkup", "mild cold", "prescription refill", "reports", "follow-up"],
};

export const departments = [
  "Cardiology",
  "General OPD",
  "Pulmonology",
  "Neurology",
  "Orthopedics",
  "Pediatrics",
  "Emergency",
];

export function suggestDepartmentAndTriage(symptoms: string): { department: string; priority: Priority } {
  const lowerSymptoms = symptoms.toLowerCase();
  
  let priority: Priority = "Low";
  let department = "General OPD";

  // Check for high priority keywords
  if (triageKeywords.high.some(keyword => lowerSymptoms.includes(keyword))) {
    priority = "High";
  } else if (triageKeywords.medium.some(keyword => lowerSymptoms.includes(keyword))) {
    priority = "Medium";
  }

  // Suggest department based on keywords
  if (lowerSymptoms.includes("chest") || lowerSymptoms.includes("heart") || lowerSymptoms.includes("cardiac")) {
    department = "Cardiology";
  } else if (lowerSymptoms.includes("breath") || lowerSymptoms.includes("lung") || lowerSymptoms.includes("cough")) {
    department = "Pulmonology";
  } else if (lowerSymptoms.includes("head") || lowerSymptoms.includes("stroke") || lowerSymptoms.includes("seizure")) {
    department = "Neurology";
  } else if (lowerSymptoms.includes("bone") || lowerSymptoms.includes("fracture") || lowerSymptoms.includes("joint")) {
    department = "Orthopedics";
  }

  return { department, priority };
}
