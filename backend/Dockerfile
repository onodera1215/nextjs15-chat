FROM node:24

WORKDIR /backend

RUN apt-get update && \
    npm i -g @nestjs/cli && \
    chown -R node:node /backend && \ 
    apt-get clean && \
    rm -rf /var/lib/apt/lists/*

COPY --chown=node:node . . 

USER node

RUN npm ci && npx prisma generate && npm run build

CMD ["npm", "run", "start:prod"]
