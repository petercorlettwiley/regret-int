/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getRegret = /* GraphQL */ `
  query GetRegret($id: ID!) {
    getRegret(id: $id) {
      id
      text
      latitude
      longitude
      createdAt
      updatedAt
    }
  }
`;
export const listRegrets = /* GraphQL */ `
  query ListRegrets(
    $filter: ModelRegretFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listRegrets(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        text
        latitude
        longitude
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
