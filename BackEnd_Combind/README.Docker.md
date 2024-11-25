### Building and running your application

### On macOS, you can comment out FRONT_END_BASE_URL = http://localhost:5173 and NODE_ENV = development in the .env file, and you're ready to run on Docker using the guide below.
### On Windows, there are some issues with Docker and WSL. Use the full .env file and run npm install, and then you're ready to start the application with npm start.

When you're ready, start your application by running:
`docker compose up --build`.

Your application will be available at http://localhost:3000.

### Deploying your application to the cloud

First, build your image, e.g.: `docker build -t myapp .`.
If your cloud uses a different CPU architecture than your development
machine (e.g., you are on a Mac M1 and your cloud provider is amd64),
you'll want to build the image for that platform, e.g.:
`docker build --platform=linux/amd64 -t myapp .`.

Then, push it to your registry, e.g. `docker push myregistry.com/myapp`.

Consult Docker's [getting started](https://docs.docker.com/go/get-started-sharing/)
docs for more detail on building and pushing.

### References
* [Docker's Node.js guide](https://docs.docker.com/language/nodejs/)