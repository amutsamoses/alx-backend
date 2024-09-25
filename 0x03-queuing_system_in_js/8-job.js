/**
 * Adds jobs to the 'push_notification_code_3' queue.
 * Each job represents a notification that will be processed by the queue.
 *
 * @param {Array} jobs - List of objects, where each object contains the job data
 * @param {import('kue').Queue} queue - The queue instance where jobs will be added
 * @throws {Error} Throws an error if jobs is not an array
 */
export default function createPushNotificationsJobs(jobs, queue) {
  // Check if the jobs parameter is an array; throw an error if not
  if (!Array.isArray(jobs)) throw new Error('Jobs is not an array');

  // Iterate through each jobData object in the jobs array
  jobs.forEach((jobData) => {
    // Create a new job in the 'push_notification_code_3' queue with the given job data
    const job = queue.create('push_notification_code_3', jobData);

    // Save the job to the queue and log the job ID upon successful creation
    job.save((error) => {
      if (!error) console.log(`Notification job created: ${job.id}`);
    });

    // Add an event listener for when the job is completed
    job.on('complete', () => console.log(`Notification job ${job.id} completed`));

    // Add an event listener to track the job's progress
    job.on('progress', (progress) => {
      console.log(`Notification job ${job.id} ${progress}% completed`);
    });

    // Add an event listener for when the job fails, and log the error message
    job.on('failed', (errorMessage) => {
      console.log(`Notification job ${job.id} failed: ${errorMessage}`);
    });
  });
}
