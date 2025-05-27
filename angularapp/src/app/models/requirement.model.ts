export interface Requirement {
  requirementId?: number;
  title: string;
  description: string;
  department: string;
  postedDate: Date;
  status: string;
  duration: string;
  mode: string;
  location: string;
  skillLevel: string;
  budget: number;
  priority: string;
  trainerId?: number;
  assignedTrainerId?: number; // Added: To link a requirement to an assigned trainer
  assignedTrainerName?: string; // Added: Optional, if backend provides trainer name directly
}