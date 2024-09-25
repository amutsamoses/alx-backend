import { createClient } from 'redis';

// Create a Redis client instance to interact with the Redis server
const redisClient = createClient();

// Handle connection errors
redisClient.on('error', (error) => {
  // Log an error message if the client fails to connect to the Redis server
  console.log(`Redis client not connected to server: ${error.message}`);
});

// Handle successful connection
redisClient.on('connect', () => {
  // Log a success message when the client successfully connects to the Redis server
  console.log('Redis client connected to the server');
});

/**
 * Command pattern: Encapsulates the message-publishing action
 * 
 * @param {string} message - The message to publish to the Redis channel
 * @param {number} time - The delay time in milliseconds before publishing the message
 */
function publishMessage(message, time) {
  // Delay the message publishing using setTimeout
  setTimeout(() => {
    // Log the message before sending
    console.log(`About to send ${message}`);
    // Publish the message to the 'holberton school channel' on Redis
    redisClient.publish('holberton school channel', message);
  }, time);
}

// Schedule several messages to be published with different delays
publishMessage('Holberton Student #1 starts course', 100);
publishMessage('Holberton Student #2 starts course', 200);
publishMessage('KILL_SERVER', 300);
publishMessage('Holberton Student #3 starts course', 400);
