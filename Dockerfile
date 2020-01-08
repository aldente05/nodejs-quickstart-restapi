FROM node:latest
RUN mkdir -p /usr/src/app
RUN mkdir /usr/src/app/uploads
WORKDIR /usr/src/app
COPY ./package.json /usr/src/app/
RUN apt-get update && apt-get install -y gconf-service libasound2 libatk1.0-0 libatk-bridge2.0-0 libc6 libcairo2 libcups2 libdbus-1-3 libexpat1 libfontconfig1 libgcc1 libgconf-2-4 libgdk-pixbuf2.0-0 libglib2.0-0 libgtk-3-0 libnspr4 libpango-1.0-0 libpangocairo-1.0-0 libstdc++6 libx11-6 libx11-xcb1 libxcb1 libxcomposite1 libxcursor1 libxdamage1 libxext6 libxfixes3 libxi6 libxrandr2 libxrender1 libxss1 libxtst6 ca-certificates fonts-liberation libappindicator1 libnss3 lsb-release xdg-utils wget
RUN yarn global add pm2
RUN yarn install
COPY ./ /usr/src/app
## THE LIFE SAVER
ADD https://github.com/ufoscout/docker-compose-wait/releases/download/2.5.0/wait /wait
RUN chmod +x /wait
## Launch the wait tool and then your application
CMD /wait && yarn deploy
