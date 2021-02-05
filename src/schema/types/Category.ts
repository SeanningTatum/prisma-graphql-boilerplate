/* eslint-disable import/prefer-default-export */
import {
  extendType, nonNull, objectType, stringArg,
} from 'nexus';

export const Category = objectType({
  name: 'Category',
  nonNullDefaults: {
    output: true,
  },
  definition(t) {
    t.model.id();
    t.model.name();
    t.model.posts();
  },
});

export const QueryCategory = extendType({
  type: 'Query',
  definition(t) {
    t.crud.categories();

    t.field('categoryCount', {
      type: 'Int',
      description: 'Fetches count of category',
      args: {
        categoryName: nonNull(stringArg()),
      },
      resolve: (parent, args, ctx) => ctx.prisma.category.count({
        where: { name: args.categoryName },
      }),
    });
  },
});

export const MutationCategory = extendType({
  type: 'Mutation',
  definition(t) {
    t.crud.createOneCategory();
  },
});
