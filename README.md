# express-api-generator

It strongly support type definition to express request and response model in accordance with Open API


## Install

```sh
$ npm install dtsgenerator express-api-generator --save
```

```sh
$ dtsgen openapi/openapi.yaml -o ./src/@types/openapi.d.ts && api-gen -s ./src/@types/openapi.d.ts -d ./src/@types/api.d.ts
```

## Usage

register it's types to tsconfig.json

```json
{
  "compilerOptions": {
    "types": [
      "express-api-generator"
    ]
  }
}
```


```ts
import { SomeController } from './types/api';
export const Post: SomeController.Post = async (
  request,
  response
): Promise<void> => {
  // request and response will be typed automatically
};

export const Get: SomeController.Get = async (
  request,
  response
): Promise<void> => {
  // request and response will be typed automatically
};
```