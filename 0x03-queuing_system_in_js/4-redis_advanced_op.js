import { print, createClient } from 'redis';

// Create the Redis client
const redisClient = createClient();

// Handle errors
redisClient.on('error', (error) => {
  console.error(`Redis client not connected to server: ${error.message}`);
});
redisClient.on('connect', () => {
  console.log('Redis client connected to the server');
});

// Define the key and hash values
const hashKey = 'HolbertonSchools';
const hashValues = {
  Portland: '50',
  Seattle: '80',
  'New York': '20',
  Bogota: '20',
  Cali: '40',
  Paris: '2'
};

// Store hash values in Redis
for (const [field, value] of Object.entries(hashValues)) {
  redisClient.hset(hashKey, field, value, print);
}

// Display the hash stored in Redis
redisClient.hgetall(hashKey, (error, object) => {
  if (error) {
    console.error(`Error retrieving hash ${hashKey}: ${error.message}`);
  } else {
    console.log(object);
  }
});

