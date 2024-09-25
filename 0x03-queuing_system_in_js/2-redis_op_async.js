import { print, createClient } from 'redis';
import { promisify } from 'util';

// Create a Redis client instance
const redisClient = createClient();

// Handle connection errors
redisClient.on('error', (error) => {
  // Log error message and close the connection if the client fails to connect
  console.log(`Redis client not connected to server: ${error.message}`);
  redisClient.quit();
});

// Promisify the redisClient.get function to use async/await
const getAsync = promisify(redisClient.get).bind(redisClient);

/**
 * Set a key-value pair in Redis
 * @param {string} schoolName - The key to be set in Redis
 * @param {string} value      - The value associated with the key
 */
function setNewSchool(schoolName, value) {
  // Set a new key-value pair in Redis and print a confirmation
  redisClient.set(schoolName, value, print);
}

/**
 * Get and display the value associated with the given key in Redis store (asynchronously)
 * @param {string} schoolName - The key to search for in Redis
 */
async function displaySchoolValue(schoolName) {
  // Fetch the value for the provided key asynchronously
  const value = await getAsync(schoolName);
  // If a value exists for the key, log it to the console
  if (value) console.log(value);
}

/**
 * Main function that serves as the entry point
 */
async function main() {
  // Display the value for 'Holberton' key
  await displaySchoolValue('Holberton');
  // Set a new key-value pair 'HolbertonSanFrancisco' : '100'
  setNewSchool('HolbertonSanFrancisco', '100');
  // Display the value for 'HolbertonSanFrancisco' key
  await displaySchoolValue('HolbertonSanFrancisco');
}

// Handle successful Redis connection
redisClient.on('connect', () => {
  // Log a success message when connected to the Redis server
  console.log('Redis client connected to the server');
  // Call the main function after the connection is established
  main();
});
