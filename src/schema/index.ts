import { makeSchema } from 'nexus';
import { nexusPrisma } from 'nexus-plugin-prisma';
import * as Path from 'path';
import * as types from './types';

const schema = makeSchema({
  types,
  plugins: [nexusPrisma({ experimentalCRUD: true })],
  outputs: {
    typegen: Path.join(__dirname, '../../node_modules/@types/typegen-nexus/index.d.ts'),
    schema: Path.join(__dirname, '../../', 'schema.graphql'),
  },
  contextType: {
    module: Path.join(__dirname, '../context.ts'),
    export: 'Context',
  },
  sourceTypes: {
    modules: [
      {
        module: '@prisma/client',
        alias: 'prisma',
      },
    ],
  },
});

export default schema;
