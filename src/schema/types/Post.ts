/* eslint-disable import/prefer-default-export */
import {
  arg,
  extendType, objectType,
} from 'nexus';

export const Post = objectType({
  name: 'Post',
  nonNullDefaults: {
    output: true,
  },
  definition(t) {
    t.model.id();
    t.model.title();
    t.model.content();
    t.model.published();
    t.model.author();
    t.model.authorId();
    t.model.categories();
  },
});

export const QueryPost = extendType({
  type: 'Query',
  definition(t) {
    t.crud.post();

    t.list.field('filterPosts', {
      type: 'Post',
      args: {
        searchString: arg({
          type: 'String',
          description: 'Searches the title or content',
        }),
      },
      resolve: (_, args, ctx) => {
        const { searchString } = args;

        return ctx.prisma.post.findMany({
          where: {
            OR: [
              { title: { contains: searchString?.toLowerCase() } },
              { content: { contains: searchString?.toLowerCase() } },
            ],
          },
        });
      },
    });
  },
});

export const MutationPost = extendType({
  type: 'Mutation',
  definition(t) {
    t.crud.createOnePost();
    t.crud.deleteOnePost();
    t.crud.updateOnePost();
  },
});
