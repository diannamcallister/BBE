const graphql = require('graphql');
const { Publication } = require("../models/publication.js");

const { GraphQLObjectType, GraphQLString, 
       GraphQLID, GraphQLInt, GraphQLSchema, GraphQLNonNull} = graphql;

//Schema defines data on the Graph like object types(book type), relation between 
//these object types and descibes how it can reach into the graph to interact with 
//the data to retrieve or mutate the data   

const PublicationType = new GraphQLObjectType({
    name: 'Publication',
    fields: () => ({
        doi: { type: GraphQLString  },
        abstract: { type: GraphQLString }, 
        title: { type: GraphQLString },
        author: { type: GraphQLString },
        journal: { type: GraphQLString },
        date: { type: GraphQLString },
        concepts: { type: GraphQLString },
        summaryByUs: { type: GraphQLString } 
    })
});

const RootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
        publication: {
            type: PublicationType,
            args: { doi: { type: GraphQLString } },
            resolve(parent, args) {
                return Publication.find((item) => {
                    return item.doi == args.doi
                });
            }
        }
    }
});

const Mutation = new GraphQLObjectType({
    name: 'Mutation',
    fields: {
        addPublication: {
            type: PublicationType,
            args: {
                //GraphQLNonNull make these field required
                doi: { type: new GraphQLNonNull(GraphQLString)  },
                abstract: { type: new GraphQLNonNull(GraphQLString) }, 
                title: { type: new GraphQLNonNull(GraphQLString) },
                author: { type: new GraphQLNonNull(GraphQLString) },
                journal: { type: new GraphQLNonNull(GraphQLString) },
                date: { type: new GraphQLNonNull(GraphQLString) },
                concepts: { type: new GraphQLNonNull(GraphQLString) }
            },
            resolve(parent, args) {
                let publication = new Publication({
                    doi: args.doi,
                    abstract: args.abstract,
                    title: args.title,
                    author: args.author,
                    journal: args.journal,
                    date: args.date,
                    concepts: args.concepts
                });
                return publication.save();
            }
        }
    }
});
 
module.exports = new GraphQLSchema({
    query: RootQuery,
    mutation: Mutation
});