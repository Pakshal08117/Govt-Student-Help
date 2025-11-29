import type { ServiceItem } from "./services";

export type ApplicationStatus = 
  | "submitted"
  | "under_review"
  | "documents_required"
  | "approved"
  | "rejected"
  | "completed"
  | "cancelled";

export type ApplicationTracking = {
  id: string;
  serviceId: string;
  serviceName: string;
  applicantName: string;
  applicantEmail: string;
  applicantPhone: string;
  status: ApplicationStatus;
  submittedDate: string;
  lastUpdated: string;
  estimatedCompletion?: string;
  remarks?: string;
  documents?: {
    idProof: boolean;
    addressProof: boolean;
    incomeProof: boolean;
    medicalReports?: boolean;
    otherDocuments?: boolean;
  };
  timeline: {
    date: string;
    status: ApplicationStatus;
    remarks: string;
  }[];
};

// Mock applications data - in a real app, this would come from a database
export const mockApplications: ApplicationTracking[] = [
  {
    id: "APP2024001",
    serviceId: "COLL001",
    serviceName: "District Collectorate - Ahmednagar",
    applicantName: "Rajesh Kumar",
    applicantEmail: "rajesh.kumar@email.com",
    applicantPhone: "9876543210",
    status: "under_review",
    submittedDate: "2024-01-15",
    lastUpdated: "2024-01-20",
    estimatedCompletion: "2024-02-15",
    remarks: "Application is being reviewed by the revenue department",
    documents: {
      idProof: true,
      addressProof: true,
      incomeProof: true,
    },
    timeline: [
      {
        date: "2024-01-15",
        status: "submitted",
        remarks: "Application submitted successfully"
      },
      {
        date: "2024-01-18",
        status: "under_review",
        remarks: "Application forwarded to revenue department for review"
      },
      {
        date: "2024-01-20",
        status: "under_review",
        remarks: "Documents verified, awaiting final approval"
      }
    ]
  },
  {
    id: "APP2024002",
    serviceId: "HEALTH001",
    serviceName: "District Hospital - Pune",
    applicantName: "Priya Sharma",
    applicantEmail: "priya.sharma@email.com",
    applicantPhone: "8765432109",
    status: "approved",
    submittedDate: "2024-01-10",
    lastUpdated: "2024-01-25",
    estimatedCompletion: "2024-01-30",
    remarks: "Medical certificate approved, appointment scheduled",
    documents: {
      idProof: true,
      addressProof: true,
      medicalReports: true,
    },
    timeline: [
      {
        date: "2024-01-10",
        status: "submitted",
        remarks: "Application submitted for medical consultation"
      },
      {
        date: "2024-01-15",
        status: "under_review",
        remarks: "Medical reports under review by specialist"
      },
      {
        date: "2024-01-20",
        status: "approved",
        remarks: "Application approved, appointment confirmed"
      },
      {
        date: "2024-01-25",
        status: "approved",
        remarks: "Appointment scheduled for January 30, 2024"
      }
    ]
  },
  {
    id: "APP2024003",
    serviceId: "EDU001",
    serviceName: "Education Officer - Mumbai",
    applicantName: "Amit Patel",
    applicantEmail: "amit.patel@email.com",
    applicantPhone: "7654321098",
    status: "documents_required",
    submittedDate: "2024-01-12",
    lastUpdated: "2024-01-22",
    remarks: "Additional income certificate required",
    documents: {
      idProof: true,
      addressProof: true,
      incomeProof: false,
    },
    timeline: [
      {
        date: "2024-01-12",
        status: "submitted",
        remarks: "Application submitted for student scholarship"
      },
      {
        date: "2024-01-18",
        status: "under_review",
        remarks: "Application under review"
      },
      {
        date: "2024-01-22",
        status: "documents_required",
        remarks: "Income certificate not provided. Please submit latest income certificate"
      }
    ]
  },
  {
    id: "APP2024004",
    serviceId: "AGRI001",
    serviceName: "Krishi Vigyan Kendra - Baramati",
    applicantName: "Suresh Yadav",
    applicantEmail: "suresh.yadav@email.com",
    applicantPhone: "6543210987",
    status: "completed",
    submittedDate: "2023-12-20",
    lastUpdated: "2024-01-15",
    estimatedCompletion: "2024-01-15",
    remarks: "Farmer subsidy successfully processed and disbursed",
    documents: {
      idProof: true,
      addressProof: true,
      incomeProof: true,
    },
    timeline: [
      {
        date: "2023-12-20",
        status: "submitted",
        remarks: "Application submitted for agricultural subsidy"
      },
      {
        date: "2023-12-28",
        status: "under_review",
        remarks: "Application under review by agriculture department"
      },
      {
        date: "2024-01-05",
        status: "approved",
        remarks: "Application approved for subsidy"
      },
      {
        date: "2024-01-15",
        status: "completed",
        remarks: "Subsidy amount disbursed to bank account"
      }
    ]
  },
  {
    id: "APP2024005",
    serviceId: "RTO001",
    serviceName: "Regional Transport Office - Mumbai",
    applicantName: "Neha Singh",
    applicantEmail: "neha.singh@email.com",
    applicantPhone: "5432109876",
    status: "rejected",
    submittedDate: "2024-01-08",
    lastUpdated: "2024-01-18",
    remarks: "Application rejected due to incomplete medical certificate",
    documents: {
      idProof: true,
      addressProof: true,
      incomeProof: true,
    },
    timeline: [
      {
        date: "2024-01-08",
        status: "submitted",
        remarks: "Application submitted for driving license renewal"
      },
      {
        date: "2024-01-12",
        status: "under_review",
        remarks: "Application under review"
      },
      {
        date: "2024-01-18",
        status: "rejected",
        remarks: "Medical certificate incomplete. Please submit complete medical fitness certificate"
      }
    ]
  }
];

// Function to generate a new application ID
export const generateApplicationId = (): string => {
  const year = new Date().getFullYear();
  const randomNum = Math.floor(Math.random() * 10000).toString().padStart(4, '0');
  return `APP${year}${randomNum}`;
};

// Function to get status display text
export const getStatusDisplayText = (status: ApplicationStatus): string => {
  switch (status) {
    case "submitted":
      return "Submitted";
    case "under_review":
      return "Under Review";
    case "documents_required":
      return "Documents Required";
    case "approved":
      return "Approved";
    case "rejected":
      return "Rejected";
    case "completed":
      return "Completed";
    case "cancelled":
      return "Cancelled";
    default:
      return "Unknown";
  }
};

// Function to get status color
export const getStatusColor = (status: ApplicationStatus): string => {
  switch (status) {
    case "submitted":
      return "bg-blue-100 text-blue-800";
    case "under_review":
      return "bg-yellow-100 text-yellow-800";
    case "documents_required":
      return "bg-orange-100 text-orange-800";
    case "approved":
      return "bg-green-100 text-green-800";
    case "rejected":
      return "bg-red-100 text-red-800";
    case "completed":
      return "bg-green-100 text-green-800";
    case "cancelled":
      return "bg-gray-100 text-gray-800";
    default:
      return "bg-gray-100 text-gray-800";
  }
};

// Function to find application by tracking ID
export const findApplicationByTrackingId = (trackingId: string): ApplicationTracking | undefined => {
  return mockApplications.find(app => app.id === trackingId);
};

// Function to find applications by email or phone
export const findApplicationsByContact = (email: string, phone: string): ApplicationTracking[] => {
  return mockApplications.filter(app => 
    app.applicantEmail === email || app.applicantPhone === phone
  );
};
