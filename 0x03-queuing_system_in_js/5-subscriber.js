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

// Listen for messages on subscribed channels
redisClient.on('message', (channel, message) => {
  // Log the received message from the subscribed channel
  console.log(message);

  // If the message is 'KILL_SERVER', unsubscribe from the channel and quit the Redis client
  if (message === 'KILL_SERVER') {
    redisClient.unsubscribe(channel);  // Unsubscribe from the channel
    redisClient.quit();  // Gracefully close the Redis client connection
  }
});

// Subscribe to the 'holberton school channel' to receive messages from it
redisClient.subscribe('holberton school channel');
