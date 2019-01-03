module.exports = {
        typeDefs: /* GraphQL */ `type AggregateMsicApplication {
  count: Int!
}

type AggregateUser {
  count: Int!
}

type BatchPayload {
  count: Long!
}

scalar DateTime

scalar Long

type MsicApplication {
  id: ID!
  status: MsicApplicationStatus!
  user: User!
  firstName: String
  lastName: String
  address: String
  dob: DateTime
}

type MsicApplicationConnection {
  pageInfo: PageInfo!
  edges: [MsicApplicationEdge]!
  aggregate: AggregateMsicApplication!
}

input MsicApplicationCreateInput {
  status: MsicApplicationStatus
  user: UserCreateOneWithoutMsicApplicationsInput!
  firstName: String
  lastName: String
  address: String
  dob: DateTime
}

input MsicApplicationCreateManyWithoutUserInput {
  create: [MsicApplicationCreateWithoutUserInput!]
  connect: [MsicApplicationWhereUniqueInput!]
}

input MsicApplicationCreateWithoutUserInput {
  status: MsicApplicationStatus
  firstName: String
  lastName: String
  address: String
  dob: DateTime
}

type MsicApplicationEdge {
  node: MsicApplication!
  cursor: String!
}

enum MsicApplicationOrderByInput {
  id_ASC
  id_DESC
  status_ASC
  status_DESC
  firstName_ASC
  firstName_DESC
  lastName_ASC
  lastName_DESC
  address_ASC
  address_DESC
  dob_ASC
  dob_DESC
  createdAt_ASC
  createdAt_DESC
  updatedAt_ASC
  updatedAt_DESC
}

type MsicApplicationPreviousValues {
  id: ID!
  status: MsicApplicationStatus!
  firstName: String
  lastName: String
  address: String
  dob: DateTime
}

input MsicApplicationScalarWhereInput {
  id: ID
  id_not: ID
  id_in: [ID!]
  id_not_in: [ID!]
  id_lt: ID
  id_lte: ID
  id_gt: ID
  id_gte: ID
  id_contains: ID
  id_not_contains: ID
  id_starts_with: ID
  id_not_starts_with: ID
  id_ends_with: ID
  id_not_ends_with: ID
  status: MsicApplicationStatus
  status_not: MsicApplicationStatus
  status_in: [MsicApplicationStatus!]
  status_not_in: [MsicApplicationStatus!]
  firstName: String
  firstName_not: String
  firstName_in: [String!]
  firstName_not_in: [String!]
  firstName_lt: String
  firstName_lte: String
  firstName_gt: String
  firstName_gte: String
  firstName_contains: String
  firstName_not_contains: String
  firstName_starts_with: String
  firstName_not_starts_with: String
  firstName_ends_with: String
  firstName_not_ends_with: String
  lastName: String
  lastName_not: String
  lastName_in: [String!]
  lastName_not_in: [String!]
  lastName_lt: String
  lastName_lte: String
  lastName_gt: String
  lastName_gte: String
  lastName_contains: String
  lastName_not_contains: String
  lastName_starts_with: String
  lastName_not_starts_with: String
  lastName_ends_with: String
  lastName_not_ends_with: String
  address: String
  address_not: String
  address_in: [String!]
  address_not_in: [String!]
  address_lt: String
  address_lte: String
  address_gt: String
  address_gte: String
  address_contains: String
  address_not_contains: String
  address_starts_with: String
  address_not_starts_with: String
  address_ends_with: String
  address_not_ends_with: String
  dob: DateTime
  dob_not: DateTime
  dob_in: [DateTime!]
  dob_not_in: [DateTime!]
  dob_lt: DateTime
  dob_lte: DateTime
  dob_gt: DateTime
  dob_gte: DateTime
  AND: [MsicApplicationScalarWhereInput!]
  OR: [MsicApplicationScalarWhereInput!]
  NOT: [MsicApplicationScalarWhereInput!]
}

enum MsicApplicationStatus {
  DRAFT
  SUBMITTED_TO_AUSPOST
  AUSPOST_VERIFIED
  AUSPOST_REJECTED
  SUBMITTED_TO_AUSCHECK
  AUSCHECK_VERIFIED
  AUSCHECK_REJECTED
  AWAITING_PICKUP
  COMPLETE
  ERROR
  CANCELLED
}

type MsicApplicationSubscriptionPayload {
  mutation: MutationType!
  node: MsicApplication
  updatedFields: [String!]
  previousValues: MsicApplicationPreviousValues
}

input MsicApplicationSubscriptionWhereInput {
  mutation_in: [MutationType!]
  updatedFields_contains: String
  updatedFields_contains_every: [String!]
  updatedFields_contains_some: [String!]
  node: MsicApplicationWhereInput
  AND: [MsicApplicationSubscriptionWhereInput!]
  OR: [MsicApplicationSubscriptionWhereInput!]
  NOT: [MsicApplicationSubscriptionWhereInput!]
}

input MsicApplicationUpdateInput {
  status: MsicApplicationStatus
  user: UserUpdateOneRequiredWithoutMsicApplicationsInput
  firstName: String
  lastName: String
  address: String
  dob: DateTime
}

input MsicApplicationUpdateManyDataInput {
  status: MsicApplicationStatus
  firstName: String
  lastName: String
  address: String
  dob: DateTime
}

input MsicApplicationUpdateManyMutationInput {
  status: MsicApplicationStatus
  firstName: String
  lastName: String
  address: String
  dob: DateTime
}

input MsicApplicationUpdateManyWithoutUserInput {
  create: [MsicApplicationCreateWithoutUserInput!]
  delete: [MsicApplicationWhereUniqueInput!]
  connect: [MsicApplicationWhereUniqueInput!]
  disconnect: [MsicApplicationWhereUniqueInput!]
  update: [MsicApplicationUpdateWithWhereUniqueWithoutUserInput!]
  upsert: [MsicApplicationUpsertWithWhereUniqueWithoutUserInput!]
  deleteMany: [MsicApplicationScalarWhereInput!]
  updateMany: [MsicApplicationUpdateManyWithWhereNestedInput!]
}

input MsicApplicationUpdateManyWithWhereNestedInput {
  where: MsicApplicationScalarWhereInput!
  data: MsicApplicationUpdateManyDataInput!
}

input MsicApplicationUpdateWithoutUserDataInput {
  status: MsicApplicationStatus
  firstName: String
  lastName: String
  address: String
  dob: DateTime
}

input MsicApplicationUpdateWithWhereUniqueWithoutUserInput {
  where: MsicApplicationWhereUniqueInput!
  data: MsicApplicationUpdateWithoutUserDataInput!
}

input MsicApplicationUpsertWithWhereUniqueWithoutUserInput {
  where: MsicApplicationWhereUniqueInput!
  update: MsicApplicationUpdateWithoutUserDataInput!
  create: MsicApplicationCreateWithoutUserInput!
}

input MsicApplicationWhereInput {
  id: ID
  id_not: ID
  id_in: [ID!]
  id_not_in: [ID!]
  id_lt: ID
  id_lte: ID
  id_gt: ID
  id_gte: ID
  id_contains: ID
  id_not_contains: ID
  id_starts_with: ID
  id_not_starts_with: ID
  id_ends_with: ID
  id_not_ends_with: ID
  status: MsicApplicationStatus
  status_not: MsicApplicationStatus
  status_in: [MsicApplicationStatus!]
  status_not_in: [MsicApplicationStatus!]
  user: UserWhereInput
  firstName: String
  firstName_not: String
  firstName_in: [String!]
  firstName_not_in: [String!]
  firstName_lt: String
  firstName_lte: String
  firstName_gt: String
  firstName_gte: String
  firstName_contains: String
  firstName_not_contains: String
  firstName_starts_with: String
  firstName_not_starts_with: String
  firstName_ends_with: String
  firstName_not_ends_with: String
  lastName: String
  lastName_not: String
  lastName_in: [String!]
  lastName_not_in: [String!]
  lastName_lt: String
  lastName_lte: String
  lastName_gt: String
  lastName_gte: String
  lastName_contains: String
  lastName_not_contains: String
  lastName_starts_with: String
  lastName_not_starts_with: String
  lastName_ends_with: String
  lastName_not_ends_with: String
  address: String
  address_not: String
  address_in: [String!]
  address_not_in: [String!]
  address_lt: String
  address_lte: String
  address_gt: String
  address_gte: String
  address_contains: String
  address_not_contains: String
  address_starts_with: String
  address_not_starts_with: String
  address_ends_with: String
  address_not_ends_with: String
  dob: DateTime
  dob_not: DateTime
  dob_in: [DateTime!]
  dob_not_in: [DateTime!]
  dob_lt: DateTime
  dob_lte: DateTime
  dob_gt: DateTime
  dob_gte: DateTime
  AND: [MsicApplicationWhereInput!]
  OR: [MsicApplicationWhereInput!]
  NOT: [MsicApplicationWhereInput!]
}

input MsicApplicationWhereUniqueInput {
  id: ID
}

type Mutation {
  createMsicApplication(data: MsicApplicationCreateInput!): MsicApplication!
  updateMsicApplication(data: MsicApplicationUpdateInput!, where: MsicApplicationWhereUniqueInput!): MsicApplication
  updateManyMsicApplications(data: MsicApplicationUpdateManyMutationInput!, where: MsicApplicationWhereInput): BatchPayload!
  upsertMsicApplication(where: MsicApplicationWhereUniqueInput!, create: MsicApplicationCreateInput!, update: MsicApplicationUpdateInput!): MsicApplication!
  deleteMsicApplication(where: MsicApplicationWhereUniqueInput!): MsicApplication
  deleteManyMsicApplications(where: MsicApplicationWhereInput): BatchPayload!
  createUser(data: UserCreateInput!): User!
  updateUser(data: UserUpdateInput!, where: UserWhereUniqueInput!): User
  updateManyUsers(data: UserUpdateManyMutationInput!, where: UserWhereInput): BatchPayload!
  upsertUser(where: UserWhereUniqueInput!, create: UserCreateInput!, update: UserUpdateInput!): User!
  deleteUser(where: UserWhereUniqueInput!): User
  deleteManyUsers(where: UserWhereInput): BatchPayload!
}

enum MutationType {
  CREATED
  UPDATED
  DELETED
}

interface Node {
  id: ID!
}

type PageInfo {
  hasNextPage: Boolean!
  hasPreviousPage: Boolean!
  startCursor: String
  endCursor: String
}

type Query {
  msicApplication(where: MsicApplicationWhereUniqueInput!): MsicApplication
  msicApplications(where: MsicApplicationWhereInput, orderBy: MsicApplicationOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): [MsicApplication]!
  msicApplicationsConnection(where: MsicApplicationWhereInput, orderBy: MsicApplicationOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): MsicApplicationConnection!
  user(where: UserWhereUniqueInput!): User
  users(where: UserWhereInput, orderBy: UserOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): [User]!
  usersConnection(where: UserWhereInput, orderBy: UserOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): UserConnection!
  node(id: ID!): Node
}

type Subscription {
  msicApplication(where: MsicApplicationSubscriptionWhereInput): MsicApplicationSubscriptionPayload
  user(where: UserSubscriptionWhereInput): UserSubscriptionPayload
}

type User {
  id: ID!
  email: String
  password: String!
  MsicApplications(where: MsicApplicationWhereInput, orderBy: MsicApplicationOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): [MsicApplication!]
  isVerified: Boolean
}

type UserConnection {
  pageInfo: PageInfo!
  edges: [UserEdge]!
  aggregate: AggregateUser!
}

input UserCreateInput {
  email: String
  password: String!
  MsicApplications: MsicApplicationCreateManyWithoutUserInput
  isVerified: Boolean
}

input UserCreateOneWithoutMsicApplicationsInput {
  create: UserCreateWithoutMsicApplicationsInput
  connect: UserWhereUniqueInput
}

input UserCreateWithoutMsicApplicationsInput {
  email: String
  password: String!
  isVerified: Boolean
}

type UserEdge {
  node: User!
  cursor: String!
}

enum UserOrderByInput {
  id_ASC
  id_DESC
  email_ASC
  email_DESC
  password_ASC
  password_DESC
  isVerified_ASC
  isVerified_DESC
  createdAt_ASC
  createdAt_DESC
  updatedAt_ASC
  updatedAt_DESC
}

type UserPreviousValues {
  id: ID!
  email: String
  password: String!
  isVerified: Boolean
}

type UserSubscriptionPayload {
  mutation: MutationType!
  node: User
  updatedFields: [String!]
  previousValues: UserPreviousValues
}

input UserSubscriptionWhereInput {
  mutation_in: [MutationType!]
  updatedFields_contains: String
  updatedFields_contains_every: [String!]
  updatedFields_contains_some: [String!]
  node: UserWhereInput
  AND: [UserSubscriptionWhereInput!]
  OR: [UserSubscriptionWhereInput!]
  NOT: [UserSubscriptionWhereInput!]
}

input UserUpdateInput {
  email: String
  password: String
  MsicApplications: MsicApplicationUpdateManyWithoutUserInput
  isVerified: Boolean
}

input UserUpdateManyMutationInput {
  email: String
  password: String
  isVerified: Boolean
}

input UserUpdateOneRequiredWithoutMsicApplicationsInput {
  create: UserCreateWithoutMsicApplicationsInput
  update: UserUpdateWithoutMsicApplicationsDataInput
  upsert: UserUpsertWithoutMsicApplicationsInput
  connect: UserWhereUniqueInput
}

input UserUpdateWithoutMsicApplicationsDataInput {
  email: String
  password: String
  isVerified: Boolean
}

input UserUpsertWithoutMsicApplicationsInput {
  update: UserUpdateWithoutMsicApplicationsDataInput!
  create: UserCreateWithoutMsicApplicationsInput!
}

input UserWhereInput {
  id: ID
  id_not: ID
  id_in: [ID!]
  id_not_in: [ID!]
  id_lt: ID
  id_lte: ID
  id_gt: ID
  id_gte: ID
  id_contains: ID
  id_not_contains: ID
  id_starts_with: ID
  id_not_starts_with: ID
  id_ends_with: ID
  id_not_ends_with: ID
  email: String
  email_not: String
  email_in: [String!]
  email_not_in: [String!]
  email_lt: String
  email_lte: String
  email_gt: String
  email_gte: String
  email_contains: String
  email_not_contains: String
  email_starts_with: String
  email_not_starts_with: String
  email_ends_with: String
  email_not_ends_with: String
  password: String
  password_not: String
  password_in: [String!]
  password_not_in: [String!]
  password_lt: String
  password_lte: String
  password_gt: String
  password_gte: String
  password_contains: String
  password_not_contains: String
  password_starts_with: String
  password_not_starts_with: String
  password_ends_with: String
  password_not_ends_with: String
  MsicApplications_every: MsicApplicationWhereInput
  MsicApplications_some: MsicApplicationWhereInput
  MsicApplications_none: MsicApplicationWhereInput
  isVerified: Boolean
  isVerified_not: Boolean
  AND: [UserWhereInput!]
  OR: [UserWhereInput!]
  NOT: [UserWhereInput!]
}

input UserWhereUniqueInput {
  id: ID
  email: String
}
`
      }
    