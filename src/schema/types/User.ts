import {
  extendType,
  objectType,
} from 'nexus';

export const User = objectType({
  name: 'User',
  definition(t) {
    t.model.id();
    t.model.name();
    t.model.email();
    t.model.posts();
  },
});

export const QueryUser = extendType({
  type: 'Query',
  definition(t) {
    t.crud.users();
    t.crud.user();
  },
});

export const MutationUser = extendType({
  type: 'Mutation',
  definition(t) {
    t.crud.createOneUser();
    t.crud.deleteOneUser();
    t.crud.updateOneUser();
  },
});
