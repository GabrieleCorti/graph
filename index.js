const express = require("express");
const { graphqlHTTP } = require("express-graphql");
const { buildSchema } = require("graphql");

const schema = buildSchema(`
  type Query {
    post(id: Int!): Post
    posts: [Post]
  }

  type Mutation {
      createPost(title: String, comment: String): Post
  }

  type Post {
    id: Int,
    title: String
    comments: [Comment]
  }

  type Comment {
      user: String
      text: String
  }
`);

let id = 4
class Post {
    constructor(title) {
        this.title = title 
        this.comments = []
        this.id = id++ 
    }
}

const posts = [
  {
    id: 1,
    title: "ciao",
    comments: [{
        user: 'Marco',
        text: 'aaaaaaaaaaaaaa'
    }]
  },
  {
    id: 2,
    title: "ciao",
    comments: [{
        user: 'Luca',
        text: 'bbbbbbbbbbbbbbb'
    }]
  },
  {
    id: 3,
    title: "ciao",
    comments: [{
        user: 'Giorgio',
        text: 'ccccccccccccccc'
    }]
  },
];

var root = {
  post: ({ id }) => {
    return posts.find((e) => e.id === id);
  },
  posts: () => posts,
  createPost: ({title}) => {
    const post = new Post(title);
    posts.push(post);
    return post
  }
};

var app = express();
app.use(
  "/graphql",
  graphqlHTTP({
    schema: schema,
    rootValue: root,
    graphiql: true,
  })
);
app.listen(4000, () => console.log("Now browse to localhost:4000/graphql"));
