const bcrypt = require('bcryptjs');
const { makeToken } = require('../../helpers/auth');

const Mutation = {
  Mutation: {
    createUser: async (root, data, {mongo: {Users}}) => {
      console.log('1.', data);
      const email = data.authProvider.email.email;
      const password = data.authProvider.email.password;

      await assertValidEmail({ email, Users });

      const hash = await hashPassword({password});

      const newUser = {
        email: email,
        password: hash,
        name: data.name,
        phone: data.phone,
        role: data.role
      };

      const response = await Users.insert(newUser);

      return Object.assign({id: response.insertedIds[0]}, newUser);
    },

    signinUser: async (root, data, {mongo: {Users} }) => {
      const user = await Users.findOne({"email": data.email.email});
      if(!user) throw new Error('Not registered user!');
      const isPasswordCorrect = await bcrypt.compare(data.email.password, user.password);
      if(!isPasswordCorrect) throw new Error('Invalid credentials!');

      const token = await makeToken({ 'role': user.role, '_id': user._id});

      return { token: `token-${token}`, user};
    },

    fbAuth: async (root, data, {mongo: {Users} }) => {
      const { email, fbUserId, name } = data.facebook;

      const user = await Users.findOne({ "email": email });
      if(user) {
        const token = await makeToken({ 'role': 'user', '_id': user._id});
        return { token: `token-${token}`, user};
      } else {
        await assertValidEmail({ email, Users });
        const newUser = { name: name, email: email, fbUserId: fbUserId };
        const response = await Users.insert(newUser);
        const token = await makeToken({ 'role': 'user', '_id': response._id});
        return { token: `token-${token}`, response};
      }
    }
  }
};


class ValidationError extends Error {
  constructor(message, field) {
    super(message);
    this.field = field;
  }
}

async function hashPassword ({password}) {
  const hash = await bcrypt.hash(password, 8);
  return hash;
}

async function assertValidEmail ({email, Users}) {
  try {
    const usersWithSameEmail = await Users.find({ 'email': email }).toArray();
    if(usersWithSameEmail.length > 0) throw new Error('Email is already registered!');
  } catch (error) {
    throw new ValidationError(error);
  }
}

export {Mutation};
