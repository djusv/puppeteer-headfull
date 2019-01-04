docker build -t docker-puppeteer .
docker run -v %cd%\output:/app/output docker-puppeteer