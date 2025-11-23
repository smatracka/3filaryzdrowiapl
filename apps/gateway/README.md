# API Gateway / BFF

GraphQL-based API Gateway for 3filaryzdrowia.pl microservices.

## Setup

### Fix npm cache permissions (if needed)
```bash
sudo chown -R $(whoami) ~/.npm
```

### Install dependencies
```bash
npm install @nestjs/graphql @nestjs/apollo @apollo/server graphql
```

### Run
```bash
npm run start:dev
```

GraphQL Playground will be available at: http://localhost:3000/graphql

## Architecture

This gateway aggregates:
- Auth Service
- User Service
- PIM Service
- Product Service
- Inventory Service
- Pricing Service
- Cart Service
- Order Service
- Payment Service
