import { Trainer } from "./trainer.model";

describe('Trainer Model', () => {

  fit('Frontend_Trainer_model_should_create_an_instance_with_defined_properties', () => {
    // Create a sample Trainer object
    const trainer: Trainer = {
      trainerId: 101,
      name: 'John Doe',
      email: 'john.doe@example.com',
      phone: '1234567890',
      expertise: 'Fitness',
      experience: '5 years',
      certification: 'Certified Fitness Trainer',
      resume: 'path/to/resume.pdf',
      joiningDate: new Date('2020-01-15'),
      status: 'Active'
    };

    expect(trainer).toBeTruthy();
    expect(trainer.trainerId).toBe(101);
    expect(trainer.name).toBe('John Doe');
    expect(trainer.email).toBe('john.doe@example.com');
    expect(trainer.phone).toBe('1234567890');
    expect(trainer.expertise).toBe('Fitness');
    expect(trainer.experience).toBe('5 years');
    expect(trainer.certification).toBe('Certified Fitness Trainer');
    expect(trainer.resume).toBe('path/to/resume.pdf');
    expect(trainer.joiningDate).toEqual(new Date('2020-01-15'));
    expect(trainer.status).toBe('Active');
  });

});
