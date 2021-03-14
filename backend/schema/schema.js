const graphql = require('graphql');
const { Publication } = require("../models/publication.js");

const R = require('ramda');
const { GraphQLObjectType, GraphQLString, 
       GraphQLList, GraphQLInt, GraphQLSchema, GraphQLNonNull} = graphql;

//Schema defines data on the Graph like object types(book type), relation between 
//these object types and descibes how it can reach into the graph to interact with 
//the data to retrieve or mutate the data   

const PublicationType = new GraphQLObjectType({
    name: 'Publication',
    fields: () => ({
        doi: { type: GraphQLString  },
        abstract: { type: GraphQLString }, 
        title: { type: GraphQLString },
        authors: { type: GraphQLList(GraphQLString) },
        journal: { type: GraphQLString },
        date: { type: GraphQLString },
        concepts: { type: GraphQLList(GraphQLString) },
        citations: { type: GraphQLInt },
        link: { type: GraphQLString },
        summaryByUs: { type: GraphQLString } 
    })
});

const RootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
        publications: {
            type: new GraphQLList(PublicationType),
            async resolve(parent, args) {
                const publications = await Publication.find()
                return publications
            }
        },
        publicationByConcept: {
            type: new GraphQLList(PublicationType),
            args: { concepts: { type: new GraphQLList(GraphQLString) } },
            async resolve(parent, args) {
                const publications = await Publication.find( { concepts: args.concepts } )
                console.log(publications);
                return publications
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
                authors: { type: new GraphQLList(GraphQLString) },
                journal: { type: new GraphQLNonNull(GraphQLString) },
                date: { type: new GraphQLNonNull(GraphQLString) },
                concepts: { type: new GraphQLList(GraphQLString) },
                citations: { type: new GraphQLNonNull(GraphQLInt) },
                link: { type: new GraphQLNonNull(GraphQLString) }
            },
            async resolve(parent, args) {
                const existing = await Publication.find( { doi: args.doi } )
                if(R.isEmpty(existing)){
                    const publication = await new Publication({
                        doi: args.doi,
                        abstract: args.abstract,
                        title: args.title,
                        authors: args.authors,
                        journal: args.journal,
                        date: args.date,
                        concepts: args.concepts,
                        citations: args.citations,
                        link: args.link
                    });
                    return publication.save();
                }
                else{
                    console.log("doi w pub exists!")
                    return null
                }
                
            }
        }
    }
});
 
module.exports = new GraphQLSchema({
    query: RootQuery,
    mutation: Mutation
});