FROM node:24

WORKDIR /app

RUN apt-get update && \
    npm i -g @nestjs/cli && \
    chown -R node:node /app && \ 
    apt-get clean && \
    rm -rf /var/lib/apt/lists/*

COPY --chown=node:node . . 

USER node

RUN npm ci && npm run build

CMD ["npm", "run", "start:prod"]
