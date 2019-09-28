# Blog application with NextJS and Contentful

This is a codebase for blog application that I build using NextJS with Contentful API

## How to use

### Clone this repo to your machine

```bash
git clone git@github.com:martindavid/nextjs-contentful-app.git nextjs-app
cd nextjs-app
```

Build it with docker:

```bash
# build
docker build -t nextjs-app .
# or, use multi-stage builds to build a smaller docker image
docker build -t nextjs-app -f ./Dockerfile.multistage .
```

Run it:

```bash
docker run --rm -it \
  -p 3000:3000 \
  -e "API_URL=https://example.com" \
  next-app
```

Deploy it to the cloud with [now](https://zeit.co/now) ([download](https://zeit.co/download))

```bash
now --docker -e API_URL="https://example.com"
```
