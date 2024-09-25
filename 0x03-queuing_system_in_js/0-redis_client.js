import { createClient } from 'redis';

// Create a Redis client instance to interact with the Redis server
const redisClient = createClient();

// Handle connection errors
redisClient.on('error', (error) => {
  // Log the error message if the client fails to connect
  console.log(`Redis client not connected to server: ${error.message}`);
  // Gracefully close the Redis client connection in case of an error
  redisClient.quit();
});

// Handle successful connection
redisClient.on('connect', () => 
  // Log a message when the client successfully connects to the server
  console.log('Redis client connected to the server')
);
