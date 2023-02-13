# Fullstack Authentication Example with Next.js and NextAuth.js

This is the starter project for the fullstack tutorial with Next.js and Prisma. You can find the final version of this project in the [`final`](https://github.com/prisma/blogr-nextjs-prisma/tree/final) branch of this repo.

https://vercel.com/guides/nextjs-prisma-postgres

# Todos

## Email validation upon sign up

use this? https://www.prisma.io/docs/concepts/components/prisma-client/advanced-type-safety/prisma-validator

## Add cookie for signed in users

- When the visitor signs out, destroy the cookie.

Every time that visitor wants to do something that cookie should be part of the request and you can use that username to look up the account, etc etc

## Add SWR

https://swr.vercel.app/
good ex here? https://github.com/vercel/next.js/tree/canary/examples/api-routes-rest/pages/user
https://www.prisma.io/docs/concepts/overview/prisma-in-your-stack/rest
https://nextjs.org/docs/api-routes/introduction
