// Application Management Data

export interface Application {
  id: string;
  userId: string;
  serviceId: string;
  serviceName: string;
  applicantName: string;
  email: string;
  phone: string;
  status: "submitted" | "under_review" | "documents_required" | "approved" | "rejected" | "completed";
  submittedDate: string;
  lastUpdated: string;
  documents: string[];
  notes?: string;
  estimatedCompletion?: string;
}

// Generate unique application ID
export function generateApplicationId(): string {
  const timestamp = Date.now().toString(36);
  const random = Math.random().toString(36).substr(2, 5);
  return `APP-${timestamp}-${random}`.toUpperCase();
}

// Sample applications data
export const applications: Application[] = [];

// Application status helpers
export function getApplicationsByStatus(status: Application['status']): Application[] {
  return applications.filter(app => app.status === status);
}

export function getApplicationsByUser(userId: string): Application[] {
  return applications.filter(app => app.userId === userId);
}

export function updateApplicationStatus(
  applicationId: string, 
  status: Application['status'], 
  notes?: string
): boolean {
  const appIndex = applications.findIndex(app => app.id === applicationId);
  if (appIndex !== -1) {
    applications[appIndex].status = status;
    applications[appIndex].lastUpdated = new Date().toISOString();
    if (notes) applications[appIndex].notes = notes;
    return true;
  }
  return false;
}