const {
  graphql,
  GraphQLSchema,
  GraphQLObjectType,
  GraphQLInt,
  GraphQLString,
  GraphQLList
} = require('graphql');
const fetch = require('node-fetch');

const UserType = new GraphQLObjectType({
  name: 'User',
  fields: () => ({
    id: { type: GraphQLInt },
    name: { type: GraphQLString },
  })
});

const AccountingType = new GraphQLObjectType({
  name: 'Accounting',
  fields: () => ({
    id: { type: GraphQLString },
    title: { type: GraphQLString },
    payment: {
       type: UserType,
       resolve(parentValue, args) {
         return fetch(`http://localhost:3000/users/${parentValue.payment}`)
         .then(res => res.json());
       }
    },
    amount: {type: GraphQLInt },
  })
});

const TravelType = new GraphQLObjectType({
  name: 'Travel',
  fields: () => ({
    id: { type: GraphQLString },
    title: { type: GraphQLString },
    accounting: {
      type: new GraphQLList(AccountingType),
      resolve(parentValue, args) {
        return fetch(`http://localhost:3000/travels/${parentValue.id}/accountingMap`)
        .then(res => res.json());
      }
    },
  })
})

module.exports = new GraphQLSchema({
  query: new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
      hello: {
        type: GraphQLString,
        resolve() {
          return 'world';
        }
      },
      travels: {
        type: TravelType,
        args: { id: { type: GraphQLString } },
        resolve(parentValue, args) {
          return fetch(`http://localhost:3000/travels/${args.id}`)
          .then(res => res.json());
        }
      }
    }
  })
});
