// Code generated by Prisma (prisma@1.22.2). DO NOT EDIT.
// Please don't change this file manually but run `prisma generate` to update it.
// For more information, please read the docs: https://www.prisma.io/docs/prisma-client/

import { DocumentNode, GraphQLSchema } from "graphql";
import { makePrismaClientClass, BaseClientOptions } from "prisma-client-lib";
import { typeDefs } from "./prisma-schema";

type AtLeastOne<T, U = { [K in keyof T]: Pick<T, K> }> = Partial<T> &
  U[keyof U];

export interface Exists {
  msicApplication: (where?: MsicApplicationWhereInput) => Promise<boolean>;
  user: (where?: UserWhereInput) => Promise<boolean>;
}

export interface Node {}

export type FragmentableArray<T> = Promise<Array<T>> & Fragmentable;

export interface Fragmentable {
  $fragment<T>(fragment: string | DocumentNode): Promise<T>;
}

export interface Prisma {
  $exists: Exists;
  $graphql: <T = any>(
    query: string,
    variables?: { [key: string]: any }
  ) => Promise<T>;

  /**
   * Queries
   */

  msicApplication: (
    where: MsicApplicationWhereUniqueInput
  ) => MsicApplicationPromise;
  msicApplications: (
    args?: {
      where?: MsicApplicationWhereInput;
      orderBy?: MsicApplicationOrderByInput;
      skip?: Int;
      after?: String;
      before?: String;
      first?: Int;
      last?: Int;
    }
  ) => FragmentableArray<MsicApplication>;
  msicApplicationsConnection: (
    args?: {
      where?: MsicApplicationWhereInput;
      orderBy?: MsicApplicationOrderByInput;
      skip?: Int;
      after?: String;
      before?: String;
      first?: Int;
      last?: Int;
    }
  ) => MsicApplicationConnectionPromise;
  user: (where: UserWhereUniqueInput) => UserPromise;
  users: (
    args?: {
      where?: UserWhereInput;
      orderBy?: UserOrderByInput;
      skip?: Int;
      after?: String;
      before?: String;
      first?: Int;
      last?: Int;
    }
  ) => FragmentableArray<User>;
  usersConnection: (
    args?: {
      where?: UserWhereInput;
      orderBy?: UserOrderByInput;
      skip?: Int;
      after?: String;
      before?: String;
      first?: Int;
      last?: Int;
    }
  ) => UserConnectionPromise;
  node: (args: { id: ID_Output }) => Node;

  /**
   * Mutations
   */

  createMsicApplication: (
    data: MsicApplicationCreateInput
  ) => MsicApplicationPromise;
  updateMsicApplication: (
    args: {
      data: MsicApplicationUpdateInput;
      where: MsicApplicationWhereUniqueInput;
    }
  ) => MsicApplicationPromise;
  updateManyMsicApplications: (
    args: {
      data: MsicApplicationUpdateManyMutationInput;
      where?: MsicApplicationWhereInput;
    }
  ) => BatchPayloadPromise;
  upsertMsicApplication: (
    args: {
      where: MsicApplicationWhereUniqueInput;
      create: MsicApplicationCreateInput;
      update: MsicApplicationUpdateInput;
    }
  ) => MsicApplicationPromise;
  deleteMsicApplication: (
    where: MsicApplicationWhereUniqueInput
  ) => MsicApplicationPromise;
  deleteManyMsicApplications: (
    where?: MsicApplicationWhereInput
  ) => BatchPayloadPromise;
  createUser: (data: UserCreateInput) => UserPromise;
  updateUser: (
    args: { data: UserUpdateInput; where: UserWhereUniqueInput }
  ) => UserPromise;
  updateManyUsers: (
    args: { data: UserUpdateManyMutationInput; where?: UserWhereInput }
  ) => BatchPayloadPromise;
  upsertUser: (
    args: {
      where: UserWhereUniqueInput;
      create: UserCreateInput;
      update: UserUpdateInput;
    }
  ) => UserPromise;
  deleteUser: (where: UserWhereUniqueInput) => UserPromise;
  deleteManyUsers: (where?: UserWhereInput) => BatchPayloadPromise;

  /**
   * Subscriptions
   */

  $subscribe: Subscription;
}

export interface Subscription {
  msicApplication: (
    where?: MsicApplicationSubscriptionWhereInput
  ) => MsicApplicationSubscriptionPayloadSubscription;
  user: (
    where?: UserSubscriptionWhereInput
  ) => UserSubscriptionPayloadSubscription;
}

export interface ClientConstructor<T> {
  new (options?: BaseClientOptions): T;
}

/**
 * Types
 */

export type MsicApplicationStatus =
  | "DRAFT"
  | "SUBMITTED_TO_AUSPOST"
  | "AUSPOST_VERIFIED"
  | "AUSPOST_REJECTED"
  | "SUBMITTED_TO_AUSCHECK"
  | "AUSCHECK_VERIFIED"
  | "AUSCHECK_REJECTED"
  | "AWAITING_PICKUP"
  | "COMPLETE"
  | "ERROR"
  | "CANCELLED";

export type MsicApplicationOrderByInput =
  | "id_ASC"
  | "id_DESC"
  | "status_ASC"
  | "status_DESC"
  | "firstName_ASC"
  | "firstName_DESC"
  | "lastName_ASC"
  | "lastName_DESC"
  | "address_ASC"
  | "address_DESC"
  | "dob_ASC"
  | "dob_DESC"
  | "createdAt_ASC"
  | "createdAt_DESC"
  | "updatedAt_ASC"
  | "updatedAt_DESC";

export type UserOrderByInput =
  | "id_ASC"
  | "id_DESC"
  | "email_ASC"
  | "email_DESC"
  | "password_ASC"
  | "password_DESC"
  | "createdAt_ASC"
  | "createdAt_DESC"
  | "updatedAt_ASC"
  | "updatedAt_DESC";

export type MutationType = "CREATED" | "UPDATED" | "DELETED";

export type MsicApplicationWhereUniqueInput = AtLeastOne<{
  id: ID_Input;
}>;

export interface MsicApplicationWhereInput {
  id?: ID_Input;
  id_not?: ID_Input;
  id_in?: ID_Input[] | ID_Input;
  id_not_in?: ID_Input[] | ID_Input;
  id_lt?: ID_Input;
  id_lte?: ID_Input;
  id_gt?: ID_Input;
  id_gte?: ID_Input;
  id_contains?: ID_Input;
  id_not_contains?: ID_Input;
  id_starts_with?: ID_Input;
  id_not_starts_with?: ID_Input;
  id_ends_with?: ID_Input;
  id_not_ends_with?: ID_Input;
  status?: MsicApplicationStatus;
  status_not?: MsicApplicationStatus;
  status_in?: MsicApplicationStatus[] | MsicApplicationStatus;
  status_not_in?: MsicApplicationStatus[] | MsicApplicationStatus;
  user?: UserWhereInput;
  firstName?: String;
  firstName_not?: String;
  firstName_in?: String[] | String;
  firstName_not_in?: String[] | String;
  firstName_lt?: String;
  firstName_lte?: String;
  firstName_gt?: String;
  firstName_gte?: String;
  firstName_contains?: String;
  firstName_not_contains?: String;
  firstName_starts_with?: String;
  firstName_not_starts_with?: String;
  firstName_ends_with?: String;
  firstName_not_ends_with?: String;
  lastName?: String;
  lastName_not?: String;
  lastName_in?: String[] | String;
  lastName_not_in?: String[] | String;
  lastName_lt?: String;
  lastName_lte?: String;
  lastName_gt?: String;
  lastName_gte?: String;
  lastName_contains?: String;
  lastName_not_contains?: String;
  lastName_starts_with?: String;
  lastName_not_starts_with?: String;
  lastName_ends_with?: String;
  lastName_not_ends_with?: String;
  address?: String;
  address_not?: String;
  address_in?: String[] | String;
  address_not_in?: String[] | String;
  address_lt?: String;
  address_lte?: String;
  address_gt?: String;
  address_gte?: String;
  address_contains?: String;
  address_not_contains?: String;
  address_starts_with?: String;
  address_not_starts_with?: String;
  address_ends_with?: String;
  address_not_ends_with?: String;
  dob?: DateTimeInput;
  dob_not?: DateTimeInput;
  dob_in?: DateTimeInput[] | DateTimeInput;
  dob_not_in?: DateTimeInput[] | DateTimeInput;
  dob_lt?: DateTimeInput;
  dob_lte?: DateTimeInput;
  dob_gt?: DateTimeInput;
  dob_gte?: DateTimeInput;
  AND?: MsicApplicationWhereInput[] | MsicApplicationWhereInput;
  OR?: MsicApplicationWhereInput[] | MsicApplicationWhereInput;
  NOT?: MsicApplicationWhereInput[] | MsicApplicationWhereInput;
}

export interface UserWhereInput {
  id?: ID_Input;
  id_not?: ID_Input;
  id_in?: ID_Input[] | ID_Input;
  id_not_in?: ID_Input[] | ID_Input;
  id_lt?: ID_Input;
  id_lte?: ID_Input;
  id_gt?: ID_Input;
  id_gte?: ID_Input;
  id_contains?: ID_Input;
  id_not_contains?: ID_Input;
  id_starts_with?: ID_Input;
  id_not_starts_with?: ID_Input;
  id_ends_with?: ID_Input;
  id_not_ends_with?: ID_Input;
  email?: String;
  email_not?: String;
  email_in?: String[] | String;
  email_not_in?: String[] | String;
  email_lt?: String;
  email_lte?: String;
  email_gt?: String;
  email_gte?: String;
  email_contains?: String;
  email_not_contains?: String;
  email_starts_with?: String;
  email_not_starts_with?: String;
  email_ends_with?: String;
  email_not_ends_with?: String;
  password?: String;
  password_not?: String;
  password_in?: String[] | String;
  password_not_in?: String[] | String;
  password_lt?: String;
  password_lte?: String;
  password_gt?: String;
  password_gte?: String;
  password_contains?: String;
  password_not_contains?: String;
  password_starts_with?: String;
  password_not_starts_with?: String;
  password_ends_with?: String;
  password_not_ends_with?: String;
  MsicApplications_every?: MsicApplicationWhereInput;
  MsicApplications_some?: MsicApplicationWhereInput;
  MsicApplications_none?: MsicApplicationWhereInput;
  AND?: UserWhereInput[] | UserWhereInput;
  OR?: UserWhereInput[] | UserWhereInput;
  NOT?: UserWhereInput[] | UserWhereInput;
}

export type UserWhereUniqueInput = AtLeastOne<{
  id: ID_Input;
  email?: String;
}>;

export interface MsicApplicationCreateInput {
  status?: MsicApplicationStatus;
  user: UserCreateOneWithoutMsicApplicationsInput;
  firstName?: String;
  lastName?: String;
  address?: String;
  dob?: DateTimeInput;
}

export interface UserCreateOneWithoutMsicApplicationsInput {
  create?: UserCreateWithoutMsicApplicationsInput;
  connect?: UserWhereUniqueInput;
}

export interface UserCreateWithoutMsicApplicationsInput {
  email?: String;
  password: String;
}

export interface MsicApplicationUpdateInput {
  status?: MsicApplicationStatus;
  user?: UserUpdateOneRequiredWithoutMsicApplicationsInput;
  firstName?: String;
  lastName?: String;
  address?: String;
  dob?: DateTimeInput;
}

export interface UserUpdateOneRequiredWithoutMsicApplicationsInput {
  create?: UserCreateWithoutMsicApplicationsInput;
  update?: UserUpdateWithoutMsicApplicationsDataInput;
  upsert?: UserUpsertWithoutMsicApplicationsInput;
  connect?: UserWhereUniqueInput;
}

export interface UserUpdateWithoutMsicApplicationsDataInput {
  email?: String;
  password?: String;
}

export interface UserUpsertWithoutMsicApplicationsInput {
  update: UserUpdateWithoutMsicApplicationsDataInput;
  create: UserCreateWithoutMsicApplicationsInput;
}

export interface MsicApplicationUpdateManyMutationInput {
  status?: MsicApplicationStatus;
  firstName?: String;
  lastName?: String;
  address?: String;
  dob?: DateTimeInput;
}

export interface UserCreateInput {
  email?: String;
  password: String;
  MsicApplications?: MsicApplicationCreateManyWithoutUserInput;
}

export interface MsicApplicationCreateManyWithoutUserInput {
  create?:
    | MsicApplicationCreateWithoutUserInput[]
    | MsicApplicationCreateWithoutUserInput;
  connect?: MsicApplicationWhereUniqueInput[] | MsicApplicationWhereUniqueInput;
}

export interface MsicApplicationCreateWithoutUserInput {
  status?: MsicApplicationStatus;
  firstName?: String;
  lastName?: String;
  address?: String;
  dob?: DateTimeInput;
}

export interface UserUpdateInput {
  email?: String;
  password?: String;
  MsicApplications?: MsicApplicationUpdateManyWithoutUserInput;
}

export interface MsicApplicationUpdateManyWithoutUserInput {
  create?:
    | MsicApplicationCreateWithoutUserInput[]
    | MsicApplicationCreateWithoutUserInput;
  delete?: MsicApplicationWhereUniqueInput[] | MsicApplicationWhereUniqueInput;
  connect?: MsicApplicationWhereUniqueInput[] | MsicApplicationWhereUniqueInput;
  disconnect?:
    | MsicApplicationWhereUniqueInput[]
    | MsicApplicationWhereUniqueInput;
  update?:
    | MsicApplicationUpdateWithWhereUniqueWithoutUserInput[]
    | MsicApplicationUpdateWithWhereUniqueWithoutUserInput;
  upsert?:
    | MsicApplicationUpsertWithWhereUniqueWithoutUserInput[]
    | MsicApplicationUpsertWithWhereUniqueWithoutUserInput;
  deleteMany?:
    | MsicApplicationScalarWhereInput[]
    | MsicApplicationScalarWhereInput;
  updateMany?:
    | MsicApplicationUpdateManyWithWhereNestedInput[]
    | MsicApplicationUpdateManyWithWhereNestedInput;
}

export interface MsicApplicationUpdateWithWhereUniqueWithoutUserInput {
  where: MsicApplicationWhereUniqueInput;
  data: MsicApplicationUpdateWithoutUserDataInput;
}

export interface MsicApplicationUpdateWithoutUserDataInput {
  status?: MsicApplicationStatus;
  firstName?: String;
  lastName?: String;
  address?: String;
  dob?: DateTimeInput;
}

export interface MsicApplicationUpsertWithWhereUniqueWithoutUserInput {
  where: MsicApplicationWhereUniqueInput;
  update: MsicApplicationUpdateWithoutUserDataInput;
  create: MsicApplicationCreateWithoutUserInput;
}

export interface MsicApplicationScalarWhereInput {
  id?: ID_Input;
  id_not?: ID_Input;
  id_in?: ID_Input[] | ID_Input;
  id_not_in?: ID_Input[] | ID_Input;
  id_lt?: ID_Input;
  id_lte?: ID_Input;
  id_gt?: ID_Input;
  id_gte?: ID_Input;
  id_contains?: ID_Input;
  id_not_contains?: ID_Input;
  id_starts_with?: ID_Input;
  id_not_starts_with?: ID_Input;
  id_ends_with?: ID_Input;
  id_not_ends_with?: ID_Input;
  status?: MsicApplicationStatus;
  status_not?: MsicApplicationStatus;
  status_in?: MsicApplicationStatus[] | MsicApplicationStatus;
  status_not_in?: MsicApplicationStatus[] | MsicApplicationStatus;
  firstName?: String;
  firstName_not?: String;
  firstName_in?: String[] | String;
  firstName_not_in?: String[] | String;
  firstName_lt?: String;
  firstName_lte?: String;
  firstName_gt?: String;
  firstName_gte?: String;
  firstName_contains?: String;
  firstName_not_contains?: String;
  firstName_starts_with?: String;
  firstName_not_starts_with?: String;
  firstName_ends_with?: String;
  firstName_not_ends_with?: String;
  lastName?: String;
  lastName_not?: String;
  lastName_in?: String[] | String;
  lastName_not_in?: String[] | String;
  lastName_lt?: String;
  lastName_lte?: String;
  lastName_gt?: String;
  lastName_gte?: String;
  lastName_contains?: String;
  lastName_not_contains?: String;
  lastName_starts_with?: String;
  lastName_not_starts_with?: String;
  lastName_ends_with?: String;
  lastName_not_ends_with?: String;
  address?: String;
  address_not?: String;
  address_in?: String[] | String;
  address_not_in?: String[] | String;
  address_lt?: String;
  address_lte?: String;
  address_gt?: String;
  address_gte?: String;
  address_contains?: String;
  address_not_contains?: String;
  address_starts_with?: String;
  address_not_starts_with?: String;
  address_ends_with?: String;
  address_not_ends_with?: String;
  dob?: DateTimeInput;
  dob_not?: DateTimeInput;
  dob_in?: DateTimeInput[] | DateTimeInput;
  dob_not_in?: DateTimeInput[] | DateTimeInput;
  dob_lt?: DateTimeInput;
  dob_lte?: DateTimeInput;
  dob_gt?: DateTimeInput;
  dob_gte?: DateTimeInput;
  AND?: MsicApplicationScalarWhereInput[] | MsicApplicationScalarWhereInput;
  OR?: MsicApplicationScalarWhereInput[] | MsicApplicationScalarWhereInput;
  NOT?: MsicApplicationScalarWhereInput[] | MsicApplicationScalarWhereInput;
}

export interface MsicApplicationUpdateManyWithWhereNestedInput {
  where: MsicApplicationScalarWhereInput;
  data: MsicApplicationUpdateManyDataInput;
}

export interface MsicApplicationUpdateManyDataInput {
  status?: MsicApplicationStatus;
  firstName?: String;
  lastName?: String;
  address?: String;
  dob?: DateTimeInput;
}

export interface UserUpdateManyMutationInput {
  email?: String;
  password?: String;
}

export interface MsicApplicationSubscriptionWhereInput {
  mutation_in?: MutationType[] | MutationType;
  updatedFields_contains?: String;
  updatedFields_contains_every?: String[] | String;
  updatedFields_contains_some?: String[] | String;
  node?: MsicApplicationWhereInput;
  AND?:
    | MsicApplicationSubscriptionWhereInput[]
    | MsicApplicationSubscriptionWhereInput;
  OR?:
    | MsicApplicationSubscriptionWhereInput[]
    | MsicApplicationSubscriptionWhereInput;
  NOT?:
    | MsicApplicationSubscriptionWhereInput[]
    | MsicApplicationSubscriptionWhereInput;
}

export interface UserSubscriptionWhereInput {
  mutation_in?: MutationType[] | MutationType;
  updatedFields_contains?: String;
  updatedFields_contains_every?: String[] | String;
  updatedFields_contains_some?: String[] | String;
  node?: UserWhereInput;
  AND?: UserSubscriptionWhereInput[] | UserSubscriptionWhereInput;
  OR?: UserSubscriptionWhereInput[] | UserSubscriptionWhereInput;
  NOT?: UserSubscriptionWhereInput[] | UserSubscriptionWhereInput;
}

export interface NodeNode {
  id: ID_Output;
}

export interface MsicApplication {
  id: ID_Output;
  status: MsicApplicationStatus;
  firstName?: String;
  lastName?: String;
  address?: String;
  dob?: DateTimeOutput;
}

export interface MsicApplicationPromise
  extends Promise<MsicApplication>,
    Fragmentable {
  id: () => Promise<ID_Output>;
  status: () => Promise<MsicApplicationStatus>;
  user: <T = UserPromise>() => T;
  firstName: () => Promise<String>;
  lastName: () => Promise<String>;
  address: () => Promise<String>;
  dob: () => Promise<DateTimeOutput>;
}

export interface MsicApplicationSubscription
  extends Promise<AsyncIterator<MsicApplication>>,
    Fragmentable {
  id: () => Promise<AsyncIterator<ID_Output>>;
  status: () => Promise<AsyncIterator<MsicApplicationStatus>>;
  user: <T = UserSubscription>() => T;
  firstName: () => Promise<AsyncIterator<String>>;
  lastName: () => Promise<AsyncIterator<String>>;
  address: () => Promise<AsyncIterator<String>>;
  dob: () => Promise<AsyncIterator<DateTimeOutput>>;
}

export interface User {
  id: ID_Output;
  email?: String;
  password: String;
}

export interface UserPromise extends Promise<User>, Fragmentable {
  id: () => Promise<ID_Output>;
  email: () => Promise<String>;
  password: () => Promise<String>;
  MsicApplications: <T = FragmentableArray<MsicApplication>>(
    args?: {
      where?: MsicApplicationWhereInput;
      orderBy?: MsicApplicationOrderByInput;
      skip?: Int;
      after?: String;
      before?: String;
      first?: Int;
      last?: Int;
    }
  ) => T;
}

export interface UserSubscription
  extends Promise<AsyncIterator<User>>,
    Fragmentable {
  id: () => Promise<AsyncIterator<ID_Output>>;
  email: () => Promise<AsyncIterator<String>>;
  password: () => Promise<AsyncIterator<String>>;
  MsicApplications: <T = Promise<AsyncIterator<MsicApplicationSubscription>>>(
    args?: {
      where?: MsicApplicationWhereInput;
      orderBy?: MsicApplicationOrderByInput;
      skip?: Int;
      after?: String;
      before?: String;
      first?: Int;
      last?: Int;
    }
  ) => T;
}

export interface MsicApplicationConnection {}

export interface MsicApplicationConnectionPromise
  extends Promise<MsicApplicationConnection>,
    Fragmentable {
  pageInfo: <T = PageInfoPromise>() => T;
  edges: <T = FragmentableArray<MsicApplicationEdge>>() => T;
  aggregate: <T = AggregateMsicApplicationPromise>() => T;
}

export interface MsicApplicationConnectionSubscription
  extends Promise<AsyncIterator<MsicApplicationConnection>>,
    Fragmentable {
  pageInfo: <T = PageInfoSubscription>() => T;
  edges: <T = Promise<AsyncIterator<MsicApplicationEdgeSubscription>>>() => T;
  aggregate: <T = AggregateMsicApplicationSubscription>() => T;
}

export interface PageInfo {
  hasNextPage: Boolean;
  hasPreviousPage: Boolean;
  startCursor?: String;
  endCursor?: String;
}

export interface PageInfoPromise extends Promise<PageInfo>, Fragmentable {
  hasNextPage: () => Promise<Boolean>;
  hasPreviousPage: () => Promise<Boolean>;
  startCursor: () => Promise<String>;
  endCursor: () => Promise<String>;
}

export interface PageInfoSubscription
  extends Promise<AsyncIterator<PageInfo>>,
    Fragmentable {
  hasNextPage: () => Promise<AsyncIterator<Boolean>>;
  hasPreviousPage: () => Promise<AsyncIterator<Boolean>>;
  startCursor: () => Promise<AsyncIterator<String>>;
  endCursor: () => Promise<AsyncIterator<String>>;
}

export interface MsicApplicationEdge {
  cursor: String;
}

export interface MsicApplicationEdgePromise
  extends Promise<MsicApplicationEdge>,
    Fragmentable {
  node: <T = MsicApplicationPromise>() => T;
  cursor: () => Promise<String>;
}

export interface MsicApplicationEdgeSubscription
  extends Promise<AsyncIterator<MsicApplicationEdge>>,
    Fragmentable {
  node: <T = MsicApplicationSubscription>() => T;
  cursor: () => Promise<AsyncIterator<String>>;
}

export interface AggregateMsicApplication {
  count: Int;
}

export interface AggregateMsicApplicationPromise
  extends Promise<AggregateMsicApplication>,
    Fragmentable {
  count: () => Promise<Int>;
}

export interface AggregateMsicApplicationSubscription
  extends Promise<AsyncIterator<AggregateMsicApplication>>,
    Fragmentable {
  count: () => Promise<AsyncIterator<Int>>;
}

export interface UserConnection {}

export interface UserConnectionPromise
  extends Promise<UserConnection>,
    Fragmentable {
  pageInfo: <T = PageInfoPromise>() => T;
  edges: <T = FragmentableArray<UserEdge>>() => T;
  aggregate: <T = AggregateUserPromise>() => T;
}

export interface UserConnectionSubscription
  extends Promise<AsyncIterator<UserConnection>>,
    Fragmentable {
  pageInfo: <T = PageInfoSubscription>() => T;
  edges: <T = Promise<AsyncIterator<UserEdgeSubscription>>>() => T;
  aggregate: <T = AggregateUserSubscription>() => T;
}

export interface UserEdge {
  cursor: String;
}

export interface UserEdgePromise extends Promise<UserEdge>, Fragmentable {
  node: <T = UserPromise>() => T;
  cursor: () => Promise<String>;
}

export interface UserEdgeSubscription
  extends Promise<AsyncIterator<UserEdge>>,
    Fragmentable {
  node: <T = UserSubscription>() => T;
  cursor: () => Promise<AsyncIterator<String>>;
}

export interface AggregateUser {
  count: Int;
}

export interface AggregateUserPromise
  extends Promise<AggregateUser>,
    Fragmentable {
  count: () => Promise<Int>;
}

export interface AggregateUserSubscription
  extends Promise<AsyncIterator<AggregateUser>>,
    Fragmentable {
  count: () => Promise<AsyncIterator<Int>>;
}

export interface BatchPayload {
  count: Long;
}

export interface BatchPayloadPromise
  extends Promise<BatchPayload>,
    Fragmentable {
  count: () => Promise<Long>;
}

export interface BatchPayloadSubscription
  extends Promise<AsyncIterator<BatchPayload>>,
    Fragmentable {
  count: () => Promise<AsyncIterator<Long>>;
}

export interface MsicApplicationSubscriptionPayload {
  mutation: MutationType;
  updatedFields?: String[];
}

export interface MsicApplicationSubscriptionPayloadPromise
  extends Promise<MsicApplicationSubscriptionPayload>,
    Fragmentable {
  mutation: () => Promise<MutationType>;
  node: <T = MsicApplicationPromise>() => T;
  updatedFields: () => Promise<String[]>;
  previousValues: <T = MsicApplicationPreviousValuesPromise>() => T;
}

export interface MsicApplicationSubscriptionPayloadSubscription
  extends Promise<AsyncIterator<MsicApplicationSubscriptionPayload>>,
    Fragmentable {
  mutation: () => Promise<AsyncIterator<MutationType>>;
  node: <T = MsicApplicationSubscription>() => T;
  updatedFields: () => Promise<AsyncIterator<String[]>>;
  previousValues: <T = MsicApplicationPreviousValuesSubscription>() => T;
}

export interface MsicApplicationPreviousValues {
  id: ID_Output;
  status: MsicApplicationStatus;
  firstName?: String;
  lastName?: String;
  address?: String;
  dob?: DateTimeOutput;
}

export interface MsicApplicationPreviousValuesPromise
  extends Promise<MsicApplicationPreviousValues>,
    Fragmentable {
  id: () => Promise<ID_Output>;
  status: () => Promise<MsicApplicationStatus>;
  firstName: () => Promise<String>;
  lastName: () => Promise<String>;
  address: () => Promise<String>;
  dob: () => Promise<DateTimeOutput>;
}

export interface MsicApplicationPreviousValuesSubscription
  extends Promise<AsyncIterator<MsicApplicationPreviousValues>>,
    Fragmentable {
  id: () => Promise<AsyncIterator<ID_Output>>;
  status: () => Promise<AsyncIterator<MsicApplicationStatus>>;
  firstName: () => Promise<AsyncIterator<String>>;
  lastName: () => Promise<AsyncIterator<String>>;
  address: () => Promise<AsyncIterator<String>>;
  dob: () => Promise<AsyncIterator<DateTimeOutput>>;
}

export interface UserSubscriptionPayload {
  mutation: MutationType;
  updatedFields?: String[];
}

export interface UserSubscriptionPayloadPromise
  extends Promise<UserSubscriptionPayload>,
    Fragmentable {
  mutation: () => Promise<MutationType>;
  node: <T = UserPromise>() => T;
  updatedFields: () => Promise<String[]>;
  previousValues: <T = UserPreviousValuesPromise>() => T;
}

export interface UserSubscriptionPayloadSubscription
  extends Promise<AsyncIterator<UserSubscriptionPayload>>,
    Fragmentable {
  mutation: () => Promise<AsyncIterator<MutationType>>;
  node: <T = UserSubscription>() => T;
  updatedFields: () => Promise<AsyncIterator<String[]>>;
  previousValues: <T = UserPreviousValuesSubscription>() => T;
}

export interface UserPreviousValues {
  id: ID_Output;
  email?: String;
  password: String;
}

export interface UserPreviousValuesPromise
  extends Promise<UserPreviousValues>,
    Fragmentable {
  id: () => Promise<ID_Output>;
  email: () => Promise<String>;
  password: () => Promise<String>;
}

export interface UserPreviousValuesSubscription
  extends Promise<AsyncIterator<UserPreviousValues>>,
    Fragmentable {
  id: () => Promise<AsyncIterator<ID_Output>>;
  email: () => Promise<AsyncIterator<String>>;
  password: () => Promise<AsyncIterator<String>>;
}

/*
The `ID` scalar type represents a unique identifier, often used to refetch an object or as key for a cache. The ID type appears in a JSON response as a String; however, it is not intended to be human-readable. When expected as an input type, any string (such as `"4"`) or integer (such as `4`) input value will be accepted as an ID.
*/
export type ID_Input = string | number;
export type ID_Output = string;

/*
The `String` scalar type represents textual data, represented as UTF-8 character sequences. The String type is most often used by GraphQL to represent free-form human-readable text.
*/
export type String = string;

/*
DateTime scalar input type, allowing Date
*/
export type DateTimeInput = Date | string;

/*
DateTime scalar output type, which is always a string
*/
export type DateTimeOutput = string;

/*
The `Int` scalar type represents non-fractional signed whole numeric values. Int can represent values between -(2^31) and 2^31 - 1. 
*/
export type Int = number;

/*
The `Boolean` scalar type represents `true` or `false`.
*/
export type Boolean = boolean;

export type Long = string;

/**
 * Model Metadata
 */

export const models = [
  {
    name: "MsicApplication",
    embedded: false
  },
  {
    name: "MsicApplicationStatus",
    embedded: false
  },
  {
    name: "User",
    embedded: false
  }
];

/**
 * Type Defs
 */

export const prisma: Prisma;
