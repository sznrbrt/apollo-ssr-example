import User from '../User/schema';

const Query = `
  type Query {
    allUsers: [User!]!
    me: User!
  }
`;

export default () => [Query, User];
