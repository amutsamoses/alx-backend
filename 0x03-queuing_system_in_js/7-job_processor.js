import { createQueue } from 'kue';

// List of blacklisted phone numbers that should not receive notifications
const blacklistedNumbers = ['4153518780', '4153518781'];

// Create a Kue job queue instance to manage notification jobs
const queue = createQueue();

/**
 * Handles notification jobs from the 'push_notification_code_2' queue.
 * Sends notifications to non-blacklisted phone numbers.
 *
 * @param {string} phoneNumber - The phone number to send the notification to
 * @param {string} message - The push notification message content
 * @param {import('kue').Job} job - The Kue job instance representing the notification task
 * @param {import('kue').DoneCallback} done - Callback to indicate job completion or failure
 * @returns {void}
 */
function sendNotification(phoneNumber, message, job, done) {
  // Update job progress to 0% at the start
  job.progress(0, 100);

  // Check if the phone number is in the blacklist
  if (blacklistedNumbers.some((number) => number === phoneNumber)) {
    // If blacklisted, pass an error to the done callback
    done(new Error(`Phone number ${phoneNumber} is blacklisted`));
    return; // Stop further execution
  }

  // Update job progress to 50% after passing blacklist check
  job.progress(50, 100);

  // Simulate sending a notification and log the message
  console.log(`Sending notification to ${phoneNumber}, with message: ${message}`);

  // Complete the job successfully by calling done() without an error
  done();
}

// Define a worker to process jobs from the 'push_notification_code_2' queue
// It processes up to 2 jobs concurrently
queue.process('push_notification_code_2', 2, (job, done) => {
  // Extract phoneNumber and message from the job data
  const { phoneNumber, message } = job.data;

  // Call the sendNotification function to handle the job
  sendNotification(phoneNumber, message, job, done);
});
