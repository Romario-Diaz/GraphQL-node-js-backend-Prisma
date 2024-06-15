import { GraphQLScalarType, Kind } from "graphql";

export const DateTime = new GraphQLScalarType({
  name: 'DateTime',
  description: 'Represents a date time object',
  serialize(value) {
    return value.toISOString() // Convert outgoing Date in ISOString for JSON
  },
  parseValue(value) {
    return new Date(value) //convert incoming integer to Date
  },
  parseLiteral(ast) {
    if(ast.kind === Kind.INT) {
      return new Date(parseInt(ast.value, 10))
    }
    return null // Invalid hard-coded value (not an integer)
  },
})
