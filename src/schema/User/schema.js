
const AUTH_ROLE = `
  enum AUTH_ROLE {
    CUSTOMER
    ADMIN
  }
`

const User = `
  type User {
    id: ID!
    name: String!
    email: String!
    fbUserId: String
    password: String
    phone: String
    role: AUTH_ROLE!
  }
`;

export default () => [User, AUTH_ROLE];
