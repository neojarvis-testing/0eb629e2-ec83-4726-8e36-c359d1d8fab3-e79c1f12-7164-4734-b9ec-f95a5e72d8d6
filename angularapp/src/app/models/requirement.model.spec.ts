import { Requirement } from "./requirement.model";

describe('Requirement Model', () => {

  fit('Frontend_Requirement_model_should_create_an_instance_with_defined_properties', () => {
    // Create a sample Requirement object
    const requirement: Requirement = {
      requirementId: 301,
      title: 'Fitness Trainer Needed',
      description: 'Looking for an experienced fitness trainer for our gym.',
      department: 'Fitness',
      postedDate: new Date('2024-12-01'),
      status: 'Active',
      duration: '6 months',
      mode: 'Full-time',
      location: 'New York',
      skillLevel: 'Advanced',
      budget: 5000,
      priority: 'High',
      trainerId: 202
    };

    expect(requirement).toBeTruthy();
    expect(requirement.requirementId).toBe(301);
    expect(requirement.title).toBe('Fitness Trainer Needed');
    expect(requirement.description).toBe('Looking for an experienced fitness trainer for our gym.');
    expect(requirement.department).toBe('Fitness');
    expect(requirement.postedDate).toEqual(new Date('2024-12-01'));
    expect(requirement.status).toBe('Active');
    expect(requirement.duration).toBe('6 months');
    expect(requirement.mode).toBe('Full-time');
    expect(requirement.location).toBe('New York');
    expect(requirement.skillLevel).toBe('Advanced');
    expect(requirement.budget).toBe(5000);
    expect(requirement.priority).toBe('High');
    expect(requirement.trainerId).toBe(202);
  });

});
