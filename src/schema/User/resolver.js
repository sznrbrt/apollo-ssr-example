const User = {
  User: {
    // Convert the "_id" field from MongoDB to "id" from the schema.
    id: root => {
      return root._id || root.id;
    }
  }
}

export {User};
