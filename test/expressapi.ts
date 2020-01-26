/* eslint-disable @typescript-eslint/no-namespace */
/* eslint-disable @typescript-eslint/no-explicit-any */
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { Controller } from 'express-api-generator';
export namespace Music$MusicIdController {
  export type Get = Controller<{
    response: Paths.Music$MusicId.Get.Responses.$200;
  }>;
}
export namespace MusicsController {
  export type Get = Controller<{
    response: Paths.Musics.Get.Responses.$200;
  }>;
  export type Post = Controller<{
    body: Paths.Musics.Post.RequestBody;
  }>;
}
