# Fullstack Authentication Example with Next.js and NextAuth.js

This is the starter project for the fullstack tutorial with Next.js and Prisma. You can find the final version of this project in the [`final`](https://github.com/prisma/blogr-nextjs-prisma/tree/final) branch of this repo.

https://vercel.com/guides/nextjs-prisma-postgres

## To run

`npm run dev`

## Tools and services

- Database is postgres, hosted on supabase.com
- prisma is ORM
- nextjs is framework
- typescript is language

# Todos

## Add cookie for signed in users

- reload header on sign in/up/out
- Every time that visitor wants to do something, that cookie should be part of the request and you can use that username to look up the account, etc etc

## Email validation upon sign up

use this? https://www.prisma.io/docs/concepts/components/prisma-client/advanced-type-safety/prisma-validator

## Decide what this is ;)

A game? Place for people to add and share fav quotes?
Poetry? Missed connections? Creative prompts made from fav quotes / poetry / any kind of post or submission from a user?

## Add SWR

https://swr.vercel.app/
good ex here? https://github.com/vercel/next.js/tree/canary/examples/api-routes-rest/pages/user
https://www.prisma.io/docs/concepts/overview/prisma-in-your-stack/rest
https://nextjs.org/docs/api-routes/introduction
