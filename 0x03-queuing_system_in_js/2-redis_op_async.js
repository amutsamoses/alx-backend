import { print, createClient } from 'redis';
import { promisify } from 'util';

// Create the Redis client
const redisClient = createClient();

// Promisify Redis client methods
const getAsync = promisify(redisClient.get).bind(redisClient);
const setAsync = promisify(redisClient.set).bind(redisClient);

// Ensure the client is connected before performing any operations
redisClient.on('error', (error) => {
  console.error(`Redis client not connected to server: ${error.message}`);
});
redisClient.on('connect', () => {
  console.log('Redis client connected to the server');
});

// Function to set a key-value pair in Redis
async function setNewSchool(schoolName, value) {
  try {
    const reply = await setAsync(schoolName, value);
    print(null, reply);
  } catch (error) {
    console.error(`Error setting key ${schoolName}: ${error.message}`);
  }
}

// Function to get and display the value associated with a given key in Redis
async function displaySchoolValue(schoolName) {
  try {
    const value = await getAsync(schoolName);
    if (value) {
      console.log(value);
    } else {
      console.log('School not found');
    }
  } catch (error) {
    console.error(`Error getting key ${schoolName}: ${error.message}`);
  }
}

// Run the functions
(async () => {
  // Ensure the client is connected before executing functions
  redisClient.on('connect', async () => {
    await displaySchoolValue('Holberton');
    await setNewSchool('HolbertonSanFrancisco', '100');
    await displaySchoolValue('HolbertonSanFrancisco');
    
    // Close the client after all operations are complete
    redisClient.quit();
  });
})();

