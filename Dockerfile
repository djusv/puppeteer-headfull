FROM sitespeedio/webbrowsers:chrome-71-firefox-64

# Cd into /app
WORKDIR /app

# Copy package.json into app folder
COPY package.json /app

# Install dependencies
ENV PUPPETEER_SKIP_CHROMIUM_DOWNLOAD 1
RUN npm install
COPY . /app

CMD xvfb-run --server-args="-screen 0 1024x768x24" npm start
