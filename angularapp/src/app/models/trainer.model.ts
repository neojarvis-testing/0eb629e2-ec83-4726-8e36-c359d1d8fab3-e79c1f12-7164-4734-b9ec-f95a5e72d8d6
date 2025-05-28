export interface Trainer {
    
    trainerId?: number;
    name: string;
    email: string;
    phone: string;
    expertise: string;
    experience: string;
    certification: string;
    resume: string;
    joiningDate: Date;
    status: 'Active' | 'Inactive';

}
