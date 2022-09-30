/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const createRegret = /* GraphQL */ `
  mutation CreateRegret(
    $input: CreateRegretInput!
    $condition: ModelRegretConditionInput
  ) {
    createRegret(input: $input, condition: $condition) {
      id
      text
      location
      createdAt
      updatedAt
    }
  }
`;
export const updateRegret = /* GraphQL */ `
  mutation UpdateRegret(
    $input: UpdateRegretInput!
    $condition: ModelRegretConditionInput
  ) {
    updateRegret(input: $input, condition: $condition) {
      id
      text
      location
      createdAt
      updatedAt
    }
  }
`;
export const deleteRegret = /* GraphQL */ `
  mutation DeleteRegret(
    $input: DeleteRegretInput!
    $condition: ModelRegretConditionInput
  ) {
    deleteRegret(input: $input, condition: $condition) {
      id
      text
      location
      createdAt
      updatedAt
    }
  }
`;
