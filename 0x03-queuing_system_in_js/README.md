# Redis Setup and Basic Operations

This project demonstrates how to set up a Redis server, perform basic key-value operations, and manage Redis database files for the `0x03-queuing_system_in_js` project.

## Prerequisites

- Ubuntu/Linux environment
- wget (to download Redis)
- Basic knowledge of terminal commands

## Installation and Setup

1. **Download and Compile Redis**

   Download the latest stable version of Redis (version 6.0.10):

   ```bash
   wget http://download.redis.io/releases/redis-6.0.10.tar.gz
   tar xzf redis-6.0.10.tar.gz
   cd redis-6.0.10
   make

