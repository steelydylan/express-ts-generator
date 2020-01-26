import { resolve } from 'path';
import * as fs from 'fs';
import { TypescriptParser, Resource } from 'typescript-parser';

const parser = new TypescriptParser();

const buildRequest = (
  type: string,
  resource: Resource,
  name: string,
  params: boolean
): string => {
  let render = `  export type ${type} = Controller<{\n`;
  const { declarations, resources } = resource;
  const RequestBody = declarations.find(dec => dec.name === 'RequestBody');
  const response = resources.find((res: any) => res.name === 'Responses');
  let $200 = null;
  if (response) {
    $200 = response.declarations.find(res => res.name === '$200');
  }

  if (RequestBody) {
    render += `    body: Paths.${name}.${type}.RequestBody;\n`;
  }
  if ($200) {
    render += `    response: Paths.${name}.${type}.Responses.$200;\n`;
  }
  if (params) {
    render += `    params: Paths.${name}.PathParameters\n`;
  }
  render += '  }>;\n';
  return render;
};

type Config = {
  src: string;
  dist: string;
}

module.exports = async (config: Config) => {
  const program = await parser.parseFile(
    resolve(config.src),
    './'
  );
  // We can either get the schema for one file and one type...
  const { resources } = program;
  const Paths = resources.find((resource: any) => resource.name === 'Paths');
  if (!Paths) {
    return;
  }
  const items = Paths.resources.map(path => {
    const tmpPath: any = path;
    const { name } = tmpPath;
    let render = `export namespace ${name}Controller {\n`;
    const Get = path.resources.find((resource: any) => resource.name === 'Get');
    const Post = path.resources.find(
      (resource: any) => resource.name === 'Post'
    );
    const Put = path.resources.find((resource: any) => resource.name === 'Put');
    const Delete = path.resources.find(
      (resource: any) => resource.name === 'Delete'
    );

    const Parameters = path.resources.some(
      (resource: any) => resource.name === 'Parameters'
    );

    if (Get) {
      render += buildRequest('Get', Get, name, Parameters);
    }
    if (Post) {
      render += buildRequest('Post', Post, name, Parameters);
    }
    if (Put) {
      render += buildRequest('Put', Put, name, Parameters);
    }
    if (Delete) {
      render += buildRequest('Delete', Delete, name, Parameters);
    }
    render += '}\n';
    return render;
  });
  let render = `/* eslint-disable @typescript-eslint/no-namespace */
/* eslint-disable @typescript-eslint/no-explicit-any */
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { Controller } from 'express-api-generator';
`;
  render += items.join('');
  fs.writeFile(resolve(config.dist), render, err => {
    console.log(err);
  });
}
