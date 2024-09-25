import { createQueue } from 'kue';

// Create a job queue using Kue for managing background jobs
const queue = createQueue();

// Job data for the notification (phone number and message to send)
const jobData = { 
  phoneNumber: '+254111222', 
  message: 'Your order is on its way. Thank you for shopping with us.' 
};

// Create a new job in the 'push_notification_code' queue with the specified job data
const job = queue.create('push_notification_code', jobData).save((error) => {
  // If the job is successfully saved, log the job ID
  if (!error) console.log(`Notification job created: ${job.id}`);
});

// Event listener for when the job is completed successfully
job.on('complete', () => console.log('Notification job completed'));

// Event listener for when the job fails
job.on('failed', () => console.log('Notification job failed'));
