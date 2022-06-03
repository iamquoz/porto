# Porto

Uni course work | Advertisement agency management software

## Used

- Prisma (on top of PostgreSQL)  
- Next  
- Nextauth  
- Mantine  
- Leaflet  

## Why?

The stack looked interesting enough  
Doesn't really utilize Next's SSR capabilities but on a dynamic website like that they weren't needed either way  

## .env files

### .env requires

- `DATABASE_URL` variable set to postgres connection string
- (optional) `SHADOW_DATABASE_URL` if pg database is deployed on heroku and such

### .env.local

- `secret`, a random base64 encoded string of 32 chars
- `{PROVIDER}_CLIENT_ID`, where `PROVIDER` is oauth provider  
- `{PROVIDER}_CLIENT_SECRET`, where `PROVIDER` is oauth provider
- `NEXTAUTH_URL`, localhost:3000 for local deployment
