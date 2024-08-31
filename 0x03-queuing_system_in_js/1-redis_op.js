import { print, createClient } from 'redis';

const redisClient = createClient();

redisClient.on('error', (error) => {
  console.error(`Redis client not connected to server: ${error.message}`);
});

// Ensure client is connected before performing operations
redisClient.on('connect', () => {
  console.log('Redis client connected to the server');
  
  // Call your functions here after ensuring connection
  // Wrap function calls in an async function to handle them properly
  (async () => {
    try {
      await displaySchoolValue('Holberton');
      await setNewSchool('HolbertonSanFrancisco', '100');
      await displaySchoolValue('HolbertonSanFrancisco');
    } catch (error) {
      console.error('Error performing Redis operations:', error.message);
    } finally {
      redisClient.quit(); // Close the client after operations are complete
    }
  })();
});

/**
 * Set a key-value pair in Redis
 * @param {string} schoolName - key
 * @param {string} value      - value
 */
function setNewSchool(schoolName, value) {
  return new Promise((resolve, reject) => {
    redisClient.set(schoolName, value, (err, reply) => {
      if (err) {
        return reject(err);
      }
      console.log(`Reply: ${reply}`);
      resolve(reply);
    });
  });
}

/**
 * Get and display the value associated with a given key
 * @param {string} schoolName - key to search in Redis
 */
function displaySchoolValue(schoolName) {
  return new Promise((resolve, reject) => {
    redisClient.get(schoolName, (err, value) => {
      if (err) {
        return reject(err);
      }
      if (value) {
        console.log(value);
      } else {
        console.log('Key not found');
      }
      resolve(value);
    });
  });
}

