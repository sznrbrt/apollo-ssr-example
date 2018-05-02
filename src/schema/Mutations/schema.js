import User from '../User/schema';

const SigninPayload = `
  type SigninPayload {
    token: String
    user: User
  }
`;

const AuthProviderSignupData = `
  input AuthProviderSignupData {
      email: AUTH_PROVIDER_EMAIL
  }
`;

const AUTH_PROVIDER_EMAIL = `
  input AUTH_PROVIDER_EMAIL {
      email: String!
      password: String!
  }
`

const AUTH_PROVIDER_FB = `
  input AUTH_PROVIDER_FB {
      email: String!
      fbUserId: String!
      name: String
  }
`

const MutationsSchema = `
  type Mutation {
    createUser(name: String!, phone: String!, authProvider: AuthProviderSignupData!, role: AUTH_ROLE = CUSTOMER): User
    signinUser(email: AUTH_PROVIDER_EMAIL, role: AUTH_ROLE = CUSTOMER): SigninPayload
    fbAuth(facebook: AUTH_PROVIDER_FB): SigninPayload
  }
`;

export default () => [SigninPayload, AuthProviderSignupData, AUTH_PROVIDER_EMAIL, AUTH_PROVIDER_FB, MutationsSchema, User];
