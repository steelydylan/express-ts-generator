declare namespace Components {
    namespace Schemas {
        export interface ErrorMessage {
            /**
             * example:
             * エラー内容
             */
            message?: string;
        }
        export interface Music {
            id?: number; // int32
            /**
             * 音楽の種別
             * example:
             * ミックスチャー
             */
            category?: "トランス" | "ロック" | "EDM" | "レゲエ" | "ミックスチャー";
            /**
             * レコード名
             * example:
             * 白日
             */
            name?: string;
        }
    }
}
declare namespace Paths {
    namespace Music$MusicId {
        namespace Get {
            namespace Parameters {
                export type MusicId = number; // int32
            }
            export interface PathParameters {
                musicId: Parameters.MusicId; // int32
            }
            namespace Responses {
                export type $200 = Components.Schemas.Music;
            }
        }
    }
    namespace Musics {
        namespace Get {
            namespace Responses {
                export type $200 = Components.Schemas.Music[];
            }
        }
        namespace Post {
            export interface RequestBody {
                /**
                 * お酒の種別
                 */
                category?: "ビール" | "日本酒" | "ワイン" | "ウイスキー";
                /**
                 * 銘柄
                 */
                name?: string;
            }
            namespace Responses {
                export type $201 = Components.Schemas.Music;
                export type $400 = Components.Schemas.ErrorMessage;
            }
        }
    }
}
