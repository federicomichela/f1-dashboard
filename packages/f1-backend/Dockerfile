FROM node:20

# Install jq
RUN apt-get update && apt-get install -y jq && rm -rf /var/lib/apt/lists/*

WORKDIR /app

#COPY . .

COPY package.json ./
COPY packages/f1-backend ./packages/f1-backend

# Extract dependencies with @f1/ scope and copy relevant directories
RUN jq -r '.dependencies | to_entries[] | select(.key | test("^@f1/")) | .key' packages/f1-backend/package.json | \
    mkdir "packages"; \
    while read -r dep; do \
        dep_dir=$(echo $dep | sed 's/@f1\///'); \
        echo "Copying $dep_dir"; \
        cp -r "packages/f1-$dep_dir" "packages/f1-$dep_dir"; \
    done

RUN npm install --workspaces # Installs dependencies for all workspaces

#WORKDIR /app/packages/f1-backend
#
#RUN npm run build
#
#EXPOSE 10000
#
#CMD ["npm", "start"]