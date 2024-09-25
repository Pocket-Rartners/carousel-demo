## Getting Started

First, run the development server:

you need to have node.js installed: https://nodejs.org/en/download/package-manager

WIREMOCK Config
docker desktop -> 
1. pull the wiremock image
![img.png](wiremock/img.png)
2. run this command in a terminal: docker run --name wiremock -p 8080:8080 wiremock/wiremock
3. Traverse to the docker container files tab then home/wiremock
![img_1.png](wiremock/img_1.png)
4. add the response.jsons to the __files directory
5. add the carousels.json and carousel-id.json to the mappings directory

```bash
npm install
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
# carrousel-demo
