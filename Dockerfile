# Step 1: Specify a base image
# Use the official Node.js image as a base
FROM node:20-alpine 

# Step 2: Set the working directory inside the container
WORKDIR /usr/src/app

# Step 3: Copy the package.json and package-lock.json files to the container
COPY package*.json ./

# Step 4: Install dependencies (inside the container)
RUN npm install --only=production && npm cache clean --force

# Step 5: Copy the rest of the application code to the container
COPY . .

# Step 6: Expose the port your app will run on (same as the one in your app)
EXPOSE 3000

# Step 7: Define the command to run your app
CMD ["node","test.js"]
