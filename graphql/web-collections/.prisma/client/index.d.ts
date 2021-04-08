
/**
 * Client
**/

import * as runtime from './runtime';
declare const prisma: unique symbol
export type PrismaPromise<A> = Promise<A> & {[prisma]: true}
type UnwrapPromise<P extends any> = P extends Promise<infer R> ? R : P
type UnwrapTuple<Tuple extends readonly unknown[]> = {
  [K in keyof Tuple]: K extends `${number}` ? Tuple[K] extends PrismaPromise<infer X> ? X : UnwrapPromise<Tuple[K]> : UnwrapPromise<Tuple[K]>
};


/**
 * Model User
 */

export type User = {
  id: string
  username: string
  hash: string
  createdAt: Date
  updatedAt: Date
}

/**
 * Model RefreshToken
 */

export type RefreshToken = {
  id: string
  createdAt: Date
  updatedAt: Date
  userId: string
}

/**
 * Model LinkEdge
 */

export type LinkEdge = {
  createdAt: Date
  userId: string
  linkId: string
}

/**
 * Model Link
 */

export type Link = {
  id: string
  createdAt: Date
  updatedAt: Date
  canonicalUrl: string
  title: string | null
  description: string | null
  image: string | null
}


/**
 * ##  Prisma Client ʲˢ
 * 
 * Type-safe database client for TypeScript & Node.js (ORM replacement)
 * @example
 * ```
 * const prisma = new PrismaClient()
 * // Fetch zero or more Users
 * const users = await prisma.user.findMany()
 * ```
 *
 * 
 * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
 */
export class PrismaClient<
  T extends Prisma.PrismaClientOptions = Prisma.PrismaClientOptions,
  U = 'log' extends keyof T ? T['log'] extends Array<Prisma.LogLevel | Prisma.LogDefinition> ? Prisma.GetEvents<T['log']> : never : never,
  GlobalReject = 'rejectOnNotFound' extends keyof T
    ? T['rejectOnNotFound']
    : false
      > {
      /**
       * @private
       */
      private fetcher;
      /**
       * @private
       */
      private readonly dmmf;
      /**
       * @private
       */
      private connectionPromise?;
      /**
       * @private
       */
      private disconnectionPromise?;
      /**
       * @private
       */
      private readonly engineConfig;
      /**
       * @private
       */
      private readonly measurePerformance;

    /**
   * ##  Prisma Client ʲˢ
   * 
   * Type-safe database client for TypeScript & Node.js (ORM replacement)
   * @example
   * ```
   * const prisma = new PrismaClient()
   * // Fetch zero or more Users
   * const users = await prisma.user.findMany()
   * ```
   *
   * 
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
   */

  constructor(optionsArg ?: Prisma.Subset<T, Prisma.PrismaClientOptions>);
  $on<V extends (U | 'beforeExit')>(eventType: V, callback: (event: V extends 'query' ? Prisma.QueryEvent : V extends 'beforeExit' ? () => Promise<void> : Prisma.LogEvent) => void): void;

  /**
   * Connect with the database
   */
  $connect(): Promise<void>;

  /**
   * Disconnect from the database
   */
  $disconnect(): Promise<any>;

  /**
   * Add a middleware
   */
  $use(cb: Prisma.Middleware): void

  /**
   * Executes a raw query and returns the number of affected rows
   * @example
   * ```
   * // With parameters use prisma.executeRaw``, values will be escaped automatically
   * const result = await prisma.executeRaw`UPDATE User SET cool = ${true} WHERE id = ${1};`
   * // Or
   * const result = await prisma.executeRaw('UPDATE User SET cool = $1 WHERE id = $2 ;', true, 1)
  * ```
  * 
  * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
  */
  $executeRaw < T = any > (query: string | TemplateStringsArray | Prisma.Sql, ...values: any[]): PrismaPromise<number>;

  /**
   * Performs a raw query and returns the SELECT data
   * @example
   * ```
   * // With parameters use prisma.queryRaw``, values will be escaped automatically
   * const result = await prisma.queryRaw`SELECT * FROM User WHERE id = ${1} OR email = ${'ema.il'};`
   * // Or
   * const result = await prisma.queryRaw('SELECT * FROM User WHERE id = $1 OR email = $2;', 1, 'ema.il')
  * ```
  * 
  * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
  */
  $queryRaw < T = any > (query: string | TemplateStringsArray | Prisma.Sql, ...values: any[]): PrismaPromise<T>;

  /**
   * Allows the running of a sequence of read/write operations that are guaranteed to either succeed or fail as a whole.
   * @example
   * ```
   * const [george, bob, alice] = await prisma.transaction([
   *   prisma.user.create({ data: { name: 'George' } }),
   *   prisma.user.create({ data: { name: 'Bob' } }),
   *   prisma.user.create({ data: { name: 'Alice' } }),
   * ])
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/concepts/components/prisma-client/transactions).
   */
  $transaction<P extends PrismaPromise<any>[]>(arg: [...P]): Promise<UnwrapTuple<P>>

      /**
   * `prisma.user`: Exposes CRUD operations for the **User** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Users
    * const users = await prisma.user.findMany()
    * ```
    */
  get user(): Prisma.UserDelegate<GlobalReject>;

  /**
   * `prisma.refreshToken`: Exposes CRUD operations for the **RefreshToken** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more RefreshTokens
    * const refreshTokens = await prisma.refreshToken.findMany()
    * ```
    */
  get refreshToken(): Prisma.RefreshTokenDelegate<GlobalReject>;

  /**
   * `prisma.linkEdge`: Exposes CRUD operations for the **LinkEdge** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more LinkEdges
    * const linkEdges = await prisma.linkEdge.findMany()
    * ```
    */
  get linkEdge(): Prisma.LinkEdgeDelegate<GlobalReject>;

  /**
   * `prisma.link`: Exposes CRUD operations for the **Link** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Links
    * const links = await prisma.link.findMany()
    * ```
    */
  get link(): Prisma.LinkDelegate<GlobalReject>;
}

export namespace Prisma {
  export import DMMF = runtime.DMMF

  /**
   * Prisma Errors
   */
  export import PrismaClientKnownRequestError = runtime.PrismaClientKnownRequestError
  export import PrismaClientUnknownRequestError = runtime.PrismaClientUnknownRequestError
  export import PrismaClientRustPanicError = runtime.PrismaClientRustPanicError
  export import PrismaClientInitializationError = runtime.PrismaClientInitializationError
  export import PrismaClientValidationError = runtime.PrismaClientValidationError

  /**
   * Re-export of sql-template-tag
   */
  export import sql = runtime.sqltag
  export import empty = runtime.empty
  export import join = runtime.join
  export import raw = runtime.raw
  export import Sql = runtime.Sql

  /**
   * Decimal.js
   */
  export import Decimal = runtime.Decimal

  /**
   * Prisma Client JS version: 2.19.0
   * Query Engine version: c1455d0b443d66b0d9db9bcb1bb9ee0d5bbc511d
   */
  export type PrismaVersion = {
    client: string
  }

  export const prismaVersion: PrismaVersion 

  /**
   * Utility Types
   */

  /**
   * From https://github.com/sindresorhus/type-fest/
   * Matches a JSON object.
   * This type can be useful to enforce some input to be JSON-compatible or as a super-type to be extended from. 
   */
  export type JsonObject = {[Key in string]?: JsonValue}
 
  /**
   * From https://github.com/sindresorhus/type-fest/
   * Matches a JSON array.
   */
  export interface JsonArray extends Array<JsonValue> {}
 
  /**
   * From https://github.com/sindresorhus/type-fest/
   * Matches any valid JSON value.
   */
  export type JsonValue = string | number | boolean | null | JsonObject | JsonArray

  /**
   * Same as JsonObject, but allows undefined
   */
  export type InputJsonObject = {[Key in string]?: JsonValue}
 
  export interface InputJsonArray extends Array<JsonValue> {}
 
  export type InputJsonValue = undefined |  string | number | boolean | null | InputJsonObject | InputJsonArray
   type SelectAndInclude = {
    select: any
    include: any
  }
  type HasSelect = {
    select: any
  }
  type HasInclude = {
    include: any
  }
  type CheckSelect<T, S, U> = T extends SelectAndInclude
    ? 'Please either choose `select` or `include`'
    : T extends HasSelect
    ? U
    : T extends HasInclude
    ? U
    : S

  /**
   * Get the type of the value, that the Promise holds.
   */
  export type PromiseType<T extends PromiseLike<any>> = T extends PromiseLike<infer U> ? U : T;

  /**
   * Get the return type of a function which returns a Promise.
   */
  export type PromiseReturnType<T extends (...args: any) => Promise<any>> = PromiseType<ReturnType<T>>

  /**
   * From T, pick a set of properties whose keys are in the union K
   */
  type Prisma__Pick<T, K extends keyof T> = {
      [P in K]: T[P];
  };


  export type Enumerable<T> = T | Array<T>;

  export type RequiredKeys<T> = {
    [K in keyof T]-?: {} extends Prisma__Pick<T, K> ? never : K
  }[keyof T]

  export type TruthyKeys<T> = {
    [key in keyof T]: T[key] extends false | undefined | null ? never : key
  }[keyof T]

  export type TrueKeys<T> = TruthyKeys<Prisma__Pick<T, RequiredKeys<T>>>

  /**
   * Subset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection
   */
  export type Subset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never;
  };

  /**
   * SelectSubset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection.
   * Additionally, it validates, if both select and include are present. If the case, it errors.
   */
  export type SelectSubset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    (T extends SelectAndInclude
      ? 'Please either choose `select` or `include`.'
      : {})

  /**
   * Subset + Intersection
   * @desc From `T` pick properties that exist in `U` and intersect `K`
   */
  export type SubsetIntersection<T, U, K> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    K

  type Without<T, U> = { [P in Exclude<keyof T, keyof U>]?: never };

  /**
   * XOR is needed to have a real mutually exclusive union type
   * https://stackoverflow.com/questions/42123407/does-typescript-support-mutually-exclusive-types
   */
  type XOR<T, U> = (T | U) extends object ? (Without<T, U> & U) | (Without<U, T> & T) : T | U;


  /**
   * Is T a Record?
   */
  type IsObject<T extends any> = T extends Array<any>
  ? False
  : T extends Date
  ? False
  : T extends Buffer
  ? False
  : T extends BigInt
  ? False
  : T extends object
  ? True
  : False


  /**
   * If it's T[], return T
   */
  export type UnEnumerate<T extends unknown> = T extends Array<infer U> ? U : T

  /**
   * From ts-toolbelt
   */

  export type Union = any

  /** Helper Types for "Merge" **/
  export type IntersectOf<U extends Union> = (
    U extends unknown ? (k: U) => void : never
  ) extends (k: infer I) => void
    ? I
    : never

  export type Overwrite<O extends object, O1 extends object> = {
      [K in keyof O]: K extends keyof O1 ? O1[K] : O[K];
  } & {};

  type _Merge<U extends object> = IntersectOf<Overwrite<U, {
      [K in keyof U]-?: At<U, K>;
  }>>;

  type Key = string | number | symbol;
  type AtBasic<O extends object, K extends Key> = K extends keyof O ? O[K] : never;
  type AtStrict<O extends object, K extends Key> = O[K & keyof O];
  type AtLoose<O extends object, K extends Key> = O extends unknown ? AtStrict<O, K> : never;
  export type At<O extends object, K extends Key, strict extends Boolean = 1> = {
      1: AtStrict<O, K>;
      0: AtLoose<O, K>;
  }[strict];

  export type ComputeRaw<A extends any> = A extends Function ? A : {
    [K in keyof A]: A[K];
  } & {};

  export type OptionalFlat<O> = {
    [K in keyof O]?: O[K];
  } & {};

  type _Record<K extends keyof any, T> = {
    [P in K]: T;
  };

  type _Strict<U, _U = U> = U extends unknown ? U & OptionalFlat<_Record<Exclude<Keys<_U>, keyof U>, never>> : never;

  export type Strict<U extends object> = ComputeRaw<_Strict<U>>;
  /** End Helper Types for "Merge" **/

  export type Merge<U extends object> = ComputeRaw<_Merge<Strict<U>>>;

  /**
  A [[Boolean]]
  */
  export type Boolean = True | False

  // /**
  // 1
  // */
  export type True = 1

  /**
  0
  */
  export type False = 0

  export type Not<B extends Boolean> = {
    0: 1
    1: 0
  }[B]

  export type Extends<A1 extends any, A2 extends any> = [A1] extends [never]
    ? 0 // anything `never` is false
    : A1 extends A2
    ? 1
    : 0

  export type Has<U extends Union, U1 extends Union> = Not<
    Extends<Exclude<U1, U>, U1>
  >

  export type Or<B1 extends Boolean, B2 extends Boolean> = {
    0: {
      0: 0
      1: 1
    }
    1: {
      0: 1
      1: 1
    }
  }[B1][B2]

  export type Keys<U extends Union> = U extends unknown ? keyof U : never

  type Exact<A, W = unknown> = 
  W extends unknown ? A extends Narrowable ? Cast<A, W> : Cast<
  {[K in keyof A]: K extends keyof W ? Exact<A[K], W[K]> : never},
  {[K in keyof W]: K extends keyof A ? Exact<A[K], W[K]> : W[K]}>
  : never;

  type Narrowable = string | number | boolean | bigint;

  type Cast<A, B> = A extends B ? A : B;

  export const type: unique symbol;

  export function validator<V>(): <S>(select: Exact<S, V>) => S;

  /**
   * Used by group by
   */

  export type GetScalarType<T, O> = O extends object ? {
    [P in keyof T]: P extends keyof O
      ? O[P]
      : never
  } : never

  type FieldPaths<
    T,
    U = Omit<T, 'avg' | 'sum' | 'count' | 'min' | 'max'>
  > = IsObject<T> extends True ? U : T

  type GetHavingFields<T> = {
    [K in keyof T]: Or<
      Or<Extends<'OR', K>, Extends<'AND', K>>,
      Extends<'NOT', K>
    > extends True
      ? // infer is only needed to not hit TS limit
        // based on the brilliant idea of Pierre-Antoine Mills
        // https://github.com/microsoft/TypeScript/issues/30188#issuecomment-478938437
        T[K] extends infer TK
        ? GetHavingFields<UnEnumerate<TK> extends object ? Merge<UnEnumerate<TK>> : never>
        : never
      : {} extends FieldPaths<T[K]>
      ? never
      : K
  }[keyof T]

  /**
   * Convert tuple to union
   */
  type _TupleToUnion<T> = T extends (infer E)[] ? E : never
  type TupleToUnion<K extends readonly any[]> = _TupleToUnion<K>
  type MaybeTupleToUnion<T> = T extends any[] ? TupleToUnion<T> : T

  /**
   * Like `Pick`, but with an array
   */
  type PickArray<T, K extends Array<keyof T>> = Prisma__Pick<T, TupleToUnion<K>>

  class PrismaClientFetcher {
    private readonly prisma;
    private readonly debug;
    private readonly hooks?;
    constructor(prisma: PrismaClient<any, any>, debug?: boolean, hooks?: Hooks | undefined);
    request<T>(document: any, dataPath?: string[], rootField?: string, typeName?: string, isList?: boolean, callsite?: string): Promise<T>;
    sanitizeMessage(message: string): string;
    protected unpack(document: any, data: any, path: string[], rootField?: string, isList?: boolean): any;
  }

  export const ModelName: {
    User: 'User',
    RefreshToken: 'RefreshToken',
    LinkEdge: 'LinkEdge',
    Link: 'Link'
  };

  export type ModelName = (typeof ModelName)[keyof typeof ModelName]


  export type Datasources = {
    db?: Datasource
  }

  export type RejectOnNotFound = boolean | ((error: Error) => Error)
  export type RejectPerModel = { [P in ModelName]?: RejectOnNotFound }
  export type RejectPerOperation =  { [P in "findUnique" | "findFirst"]?: RejectPerModel | RejectOnNotFound } 
  type IsReject<T> = T extends true ? True : T extends (err: Error) => Error ? True : False
  export type HasReject<
    GlobalRejectSettings extends Prisma.PrismaClientOptions['rejectOnNotFound'],
    LocalRejectSettings,
    Action extends PrismaAction,
    Model extends ModelName
  > = LocalRejectSettings extends RejectOnNotFound
    ? IsReject<LocalRejectSettings>
    : GlobalRejectSettings extends RejectPerOperation
    ? Action extends keyof GlobalRejectSettings
      ? GlobalRejectSettings[Action] extends boolean
        ? IsReject<GlobalRejectSettings[Action]>
        : GlobalRejectSettings[Action] extends RejectPerModel
        ? Model extends keyof GlobalRejectSettings[Action]
          ? IsReject<GlobalRejectSettings[Action][Model]>
          : False
        : False
      : False
    : IsReject<GlobalRejectSettings>
  export type ErrorFormat = 'pretty' | 'colorless' | 'minimal'

  export interface PrismaClientOptions {
    /**
     * Configure findUnique/findFirst to throw an error if the query returns null. 
     *  * @example
     * ```
     * // Reject on both findUnique/findFirst
     * rejectOnNotFound: true
     * // Reject only on findFirst with a custom error
     * rejectOnNotFound: { findFirst: (err) => new Error("Custom Error")}
     * // Reject on user.findUnique with a custom error
     * rejectOnNotFound: { findUnique: {User: (err) => new Error("User not found")}}
     * ```
     */
    rejectOnNotFound?: RejectOnNotFound | RejectPerOperation
    /**
     * Overwrites the datasource url from your prisma.schema file
     */
    datasources?: Datasources

    /**
     * @default "colorless"
     */
    errorFormat?: ErrorFormat

    /**
     * @example
     * ```
     * // Defaults to stdout
     * log: ['query', 'info', 'warn', 'error']
     * 
     * // Emit as events
     * log: [
     *  { emit: 'stdout', level: 'query' },
     *  { emit: 'stdout', level: 'info' },
     *  { emit: 'stdout', level: 'warn' }
     *  { emit: 'stdout', level: 'error' }
     * ]
     * ```
     * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/logging#the-log-option).
     */
    log?: Array<LogLevel | LogDefinition>
  }

  export type Hooks = {
    beforeRequest?: (options: { query: string, path: string[], rootField?: string, typeName?: string, document: any }) => any
  }

  /* Types for Logging */
  export type LogLevel = 'info' | 'query' | 'warn' | 'error'
  export type LogDefinition = {
    level: LogLevel
    emit: 'stdout' | 'event'
  }

  export type GetLogType<T extends LogLevel | LogDefinition> = T extends LogDefinition ? T['emit'] extends 'event' ? T['level'] : never : never
  export type GetEvents<T extends any> = T extends Array<LogLevel | LogDefinition> ?
    GetLogType<T[0]> | GetLogType<T[1]> | GetLogType<T[2]> | GetLogType<T[3]>
    : never

  export type QueryEvent = {
    timestamp: Date
    query: string
    params: string
    duration: number
    target: string
  }

  export type LogEvent = {
    timestamp: Date
    message: string
    target: string
  }
  /* End Types for Logging */


  export type PrismaAction =
    | 'findUnique'
    | 'findMany'
    | 'findFirst'
    | 'create'
    | 'createMany'
    | 'update'
    | 'updateMany'
    | 'upsert'
    | 'delete'
    | 'deleteMany'
    | 'executeRaw'
    | 'queryRaw'
    | 'aggregate'
    | 'count'

  /**
   * These options are being passed in to the middleware as "params"
   */
  export type MiddlewareParams = {
    model?: ModelName
    action: PrismaAction
    args: any
    dataPath: string[]
    runInTransaction: boolean
  }

  /**
   * The `T` type makes sure, that the `return proceed` is not forgotten in the middleware implementation
   */
  export type Middleware<T = any> = (
    params: MiddlewareParams,
    next: (params: MiddlewareParams) => Promise<T>,
  ) => Promise<T>

  // tested in getLogLevel.test.ts
  export function getLogLevel(log: Array<LogLevel | LogDefinition>): LogLevel | undefined; 
  export type Datasource = {
    url?: string
  }


  /**
   * Model User
   */


  export type AggregateUser = {
    count: UserCountAggregateOutputType | null
    min: UserMinAggregateOutputType | null
    max: UserMaxAggregateOutputType | null
  }

  export type UserMinAggregateOutputType = {
    id: string | null
    username: string | null
    hash: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type UserMaxAggregateOutputType = {
    id: string | null
    username: string | null
    hash: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type UserCountAggregateOutputType = {
    id: number | null
    username: number | null
    hash: number | null
    createdAt: number | null
    updatedAt: number | null
    _all: number
  }


  export type UserMinAggregateInputType = {
    id?: true
    username?: true
    hash?: true
    createdAt?: true
    updatedAt?: true
  }

  export type UserMaxAggregateInputType = {
    id?: true
    username?: true
    hash?: true
    createdAt?: true
    updatedAt?: true
  }

  export type UserCountAggregateInputType = {
    id?: true
    username?: true
    hash?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type UserAggregateArgs = {
    /**
     * Filter which User to aggregate.
    **/
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
    **/
    orderBy?: Enumerable<UserOrderByWithRelationInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
    **/
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
    **/
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
    **/
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Users
    **/
    count?: true | UserCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    min?: UserMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    max?: UserMaxAggregateInputType
  }

  export type GetUserAggregateType<T extends UserAggregateArgs> = {
    [P in keyof T & keyof AggregateUser]: P extends 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateUser[P]>
      : GetScalarType<T[P], AggregateUser[P]>
  }



  export type UserSelect = {
    id?: boolean
    username?: boolean
    hash?: boolean
    links?: boolean | LinkEdgeFindManyArgs
    refreshTokens?: boolean | RefreshTokenFindManyArgs
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type UserInclude = {
    links?: boolean | LinkEdgeFindManyArgs
    refreshTokens?: boolean | RefreshTokenFindManyArgs
  }

  export type UserGetPayload<
    S extends boolean | null | undefined | UserArgs,
    U = keyof S
      > = S extends true
        ? User
    : S extends undefined
    ? never
    : S extends UserArgs | UserFindManyArgs
    ?'include' extends U
    ? User  & {
    [P in TrueKeys<S['include']>]: 
          P extends 'links'
        ? Array < LinkEdgeGetPayload<S['include'][P]>>  :
        P extends 'refreshTokens'
        ? Array < RefreshTokenGetPayload<S['include'][P]>>  : never
  } 
    : 'select' extends U
    ? {
    [P in TrueKeys<S['select']>]: P extends keyof User ?User [P]
  : 
          P extends 'links'
        ? Array < LinkEdgeGetPayload<S['select'][P]>>  :
        P extends 'refreshTokens'
        ? Array < RefreshTokenGetPayload<S['select'][P]>>  : never
  } 
    : User
  : User


  type UserCountArgs = Merge<
    Omit<UserFindManyArgs, 'select' | 'include'> & {
      select?: UserCountAggregateInputType | true
    }
  >

  export interface UserDelegate<GlobalRejectSettings> {
    /**
     * Find zero or one User that matches the filter.
     * @param {UserFindUniqueArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findUnique<T extends UserFindUniqueArgs,  LocalRejectSettings = T["rejectOnNotFound"] extends RejectOnNotFound ? T['rejectOnNotFound'] : undefined>(
      args: SelectSubset<T, UserFindUniqueArgs>
    ): HasReject<GlobalRejectSettings, LocalRejectSettings, 'findUnique', 'User'> extends True ? CheckSelect<T, Prisma__UserClient<User>, Prisma__UserClient<UserGetPayload<T>>> : CheckSelect<T, Prisma__UserClient<User | null >, Prisma__UserClient<UserGetPayload<T> | null >>

    /**
     * Find the first User that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindFirstArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findFirst<T extends UserFindFirstArgs,  LocalRejectSettings = T["rejectOnNotFound"] extends RejectOnNotFound ? T['rejectOnNotFound'] : undefined>(
      args?: SelectSubset<T, UserFindFirstArgs>
    ): HasReject<GlobalRejectSettings, LocalRejectSettings, 'findFirst', 'User'> extends True ? CheckSelect<T, Prisma__UserClient<User>, Prisma__UserClient<UserGetPayload<T>>> : CheckSelect<T, Prisma__UserClient<User | null >, Prisma__UserClient<UserGetPayload<T> | null >>

    /**
     * Find zero or more Users that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindManyArgs=} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Users
     * const users = await prisma.user.findMany()
     * 
     * // Get first 10 Users
     * const users = await prisma.user.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const userWithIdOnly = await prisma.user.findMany({ select: { id: true } })
     * 
    **/
    findMany<T extends UserFindManyArgs>(
      args?: SelectSubset<T, UserFindManyArgs>
    ): CheckSelect<T, PrismaPromise<Array<User>>, PrismaPromise<Array<UserGetPayload<T>>>>

    /**
     * Create a User.
     * @param {UserCreateArgs} args - Arguments to create a User.
     * @example
     * // Create one User
     * const User = await prisma.user.create({
     *   data: {
     *     // ... data to create a User
     *   }
     * })
     * 
    **/
    create<T extends UserCreateArgs>(
      args: SelectSubset<T, UserCreateArgs>
    ): CheckSelect<T, Prisma__UserClient<User>, Prisma__UserClient<UserGetPayload<T>>>

    /**
     * Delete a User.
     * @param {UserDeleteArgs} args - Arguments to delete one User.
     * @example
     * // Delete one User
     * const User = await prisma.user.delete({
     *   where: {
     *     // ... filter to delete one User
     *   }
     * })
     * 
    **/
    delete<T extends UserDeleteArgs>(
      args: SelectSubset<T, UserDeleteArgs>
    ): CheckSelect<T, Prisma__UserClient<User>, Prisma__UserClient<UserGetPayload<T>>>

    /**
     * Update one User.
     * @param {UserUpdateArgs} args - Arguments to update one User.
     * @example
     * // Update one User
     * const user = await prisma.user.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
    **/
    update<T extends UserUpdateArgs>(
      args: SelectSubset<T, UserUpdateArgs>
    ): CheckSelect<T, Prisma__UserClient<User>, Prisma__UserClient<UserGetPayload<T>>>

    /**
     * Delete zero or more Users.
     * @param {UserDeleteManyArgs} args - Arguments to filter Users to delete.
     * @example
     * // Delete a few Users
     * const { count } = await prisma.user.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
    **/
    deleteMany<T extends UserDeleteManyArgs>(
      args?: SelectSubset<T, UserDeleteManyArgs>
    ): PrismaPromise<BatchPayload>

    /**
     * Update zero or more Users.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Users
     * const user = await prisma.user.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
    **/
    updateMany<T extends UserUpdateManyArgs>(
      args: SelectSubset<T, UserUpdateManyArgs>
    ): PrismaPromise<BatchPayload>

    /**
     * Create or update one User.
     * @param {UserUpsertArgs} args - Arguments to update or create a User.
     * @example
     * // Update or create a User
     * const user = await prisma.user.upsert({
     *   create: {
     *     // ... data to create a User
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the User we want to update
     *   }
     * })
    **/
    upsert<T extends UserUpsertArgs>(
      args: SelectSubset<T, UserUpsertArgs>
    ): CheckSelect<T, Prisma__UserClient<User>, Prisma__UserClient<UserGetPayload<T>>>

    /**
     * Count the number of Users.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserCountArgs} args - Arguments to filter Users to count.
     * @example
     * // Count the number of Users
     * const count = await prisma.user.count({
     *   where: {
     *     // ... the filter for the Users we want to count
     *   }
     * })
    **/
    count<T extends UserCountArgs>(
      args?: Subset<T, UserCountArgs>,
    ): PrismaPromise<
      T extends _Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], UserCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a User.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends UserAggregateArgs>(args: Subset<T, UserAggregateArgs>): PrismaPromise<GetUserAggregateType<T>>


  }

  /**
   * The delegate class that acts as a "Promise-like" for User.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in 
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export class Prisma__UserClient<T> implements PrismaPromise<T> {
    [prisma]: true;
    private readonly _dmmf;
    private readonly _fetcher;
    private readonly _queryType;
    private readonly _rootField;
    private readonly _clientMethod;
    private readonly _args;
    private readonly _dataPath;
    private readonly _errorFormat;
    private readonly _measurePerformance?;
    private _isList;
    private _callsite;
    private _requestPromise?;
    constructor(_dmmf: runtime.DMMFClass, _fetcher: PrismaClientFetcher, _queryType: 'query' | 'mutation', _rootField: string, _clientMethod: string, _args: any, _dataPath: string[], _errorFormat: ErrorFormat, _measurePerformance?: boolean | undefined, _isList?: boolean);
    readonly [Symbol.toStringTag]: 'PrismaClientPromise';

    links<T extends LinkEdgeFindManyArgs = {}>(args?: Subset<T, LinkEdgeFindManyArgs>): CheckSelect<T, PrismaPromise<Array<LinkEdge>>, PrismaPromise<Array<LinkEdgeGetPayload<T>>>>;

    refreshTokens<T extends RefreshTokenFindManyArgs = {}>(args?: Subset<T, RefreshTokenFindManyArgs>): CheckSelect<T, PrismaPromise<Array<RefreshToken>>, PrismaPromise<Array<RefreshTokenGetPayload<T>>>>;

    private get _document();
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): Promise<TResult1 | TResult2>;
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): Promise<T | TResult>;
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): Promise<T>;
  }

  // Custom InputTypes

  /**
   * User findUnique
   */
  export type UserFindUniqueArgs = {
    /**
     * Select specific fields to fetch from the User
    **/
    select?: UserSelect | null
    /**
     * Choose, which related nodes to fetch as well.
    **/
    include?: UserInclude | null
    /**
     * Throw an Error if a User can't be found
    **/
    rejectOnNotFound?: RejectOnNotFound
    /**
     * Filter, which User to fetch.
    **/
    where: UserWhereUniqueInput
  }


  /**
   * User findFirst
   */
  export type UserFindFirstArgs = {
    /**
     * Select specific fields to fetch from the User
    **/
    select?: UserSelect | null
    /**
     * Choose, which related nodes to fetch as well.
    **/
    include?: UserInclude | null
    /**
     * Throw an Error if a User can't be found
    **/
    rejectOnNotFound?: RejectOnNotFound
    /**
     * Filter, which User to fetch.
    **/
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
    **/
    orderBy?: Enumerable<UserOrderByWithRelationInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Users.
    **/
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
    **/
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
    **/
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Users.
    **/
    distinct?: Enumerable<UserScalarFieldEnum>
  }


  /**
   * User findMany
   */
  export type UserFindManyArgs = {
    /**
     * Select specific fields to fetch from the User
    **/
    select?: UserSelect | null
    /**
     * Choose, which related nodes to fetch as well.
    **/
    include?: UserInclude | null
    /**
     * Filter, which Users to fetch.
    **/
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
    **/
    orderBy?: Enumerable<UserOrderByWithRelationInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Users.
    **/
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
    **/
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
    **/
    skip?: number
    distinct?: Enumerable<UserScalarFieldEnum>
  }


  /**
   * User create
   */
  export type UserCreateArgs = {
    /**
     * Select specific fields to fetch from the User
    **/
    select?: UserSelect | null
    /**
     * Choose, which related nodes to fetch as well.
    **/
    include?: UserInclude | null
    /**
     * The data needed to create a User.
    **/
    data: XOR<UserCreateInput, UserUncheckedCreateInput>
  }


  /**
   * User update
   */
  export type UserUpdateArgs = {
    /**
     * Select specific fields to fetch from the User
    **/
    select?: UserSelect | null
    /**
     * Choose, which related nodes to fetch as well.
    **/
    include?: UserInclude | null
    /**
     * The data needed to update a User.
    **/
    data: XOR<UserUpdateInput, UserUncheckedUpdateInput>
    /**
     * Choose, which User to update.
    **/
    where: UserWhereUniqueInput
  }


  /**
   * User updateMany
   */
  export type UserUpdateManyArgs = {
    data: XOR<UserUpdateManyMutationInput, UserUncheckedUpdateManyInput>
    where?: UserWhereInput
  }


  /**
   * User upsert
   */
  export type UserUpsertArgs = {
    /**
     * Select specific fields to fetch from the User
    **/
    select?: UserSelect | null
    /**
     * Choose, which related nodes to fetch as well.
    **/
    include?: UserInclude | null
    /**
     * The filter to search for the User to update in case it exists.
    **/
    where: UserWhereUniqueInput
    /**
     * In case the User found by the `where` argument doesn't exist, create a new User with this data.
    **/
    create: XOR<UserCreateInput, UserUncheckedCreateInput>
    /**
     * In case the User was found with the provided `where` argument, update it with this data.
    **/
    update: XOR<UserUpdateInput, UserUncheckedUpdateInput>
  }


  /**
   * User delete
   */
  export type UserDeleteArgs = {
    /**
     * Select specific fields to fetch from the User
    **/
    select?: UserSelect | null
    /**
     * Choose, which related nodes to fetch as well.
    **/
    include?: UserInclude | null
    /**
     * Filter which User to delete.
    **/
    where: UserWhereUniqueInput
  }


  /**
   * User deleteMany
   */
  export type UserDeleteManyArgs = {
    where?: UserWhereInput
  }


  /**
   * User without action
   */
  export type UserArgs = {
    /**
     * Select specific fields to fetch from the User
    **/
    select?: UserSelect | null
    /**
     * Choose, which related nodes to fetch as well.
    **/
    include?: UserInclude | null
  }



  /**
   * Model RefreshToken
   */


  export type AggregateRefreshToken = {
    count: RefreshTokenCountAggregateOutputType | null
    min: RefreshTokenMinAggregateOutputType | null
    max: RefreshTokenMaxAggregateOutputType | null
  }

  export type RefreshTokenMinAggregateOutputType = {
    id: string | null
    createdAt: Date | null
    updatedAt: Date | null
    userId: string | null
  }

  export type RefreshTokenMaxAggregateOutputType = {
    id: string | null
    createdAt: Date | null
    updatedAt: Date | null
    userId: string | null
  }

  export type RefreshTokenCountAggregateOutputType = {
    id: number | null
    createdAt: number | null
    updatedAt: number | null
    userId: number | null
    _all: number
  }


  export type RefreshTokenMinAggregateInputType = {
    id?: true
    createdAt?: true
    updatedAt?: true
    userId?: true
  }

  export type RefreshTokenMaxAggregateInputType = {
    id?: true
    createdAt?: true
    updatedAt?: true
    userId?: true
  }

  export type RefreshTokenCountAggregateInputType = {
    id?: true
    createdAt?: true
    updatedAt?: true
    userId?: true
    _all?: true
  }

  export type RefreshTokenAggregateArgs = {
    /**
     * Filter which RefreshToken to aggregate.
    **/
    where?: RefreshTokenWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of RefreshTokens to fetch.
    **/
    orderBy?: Enumerable<RefreshTokenOrderByWithRelationInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
    **/
    cursor?: RefreshTokenWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` RefreshTokens from the position of the cursor.
    **/
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` RefreshTokens.
    **/
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned RefreshTokens
    **/
    count?: true | RefreshTokenCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    min?: RefreshTokenMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    max?: RefreshTokenMaxAggregateInputType
  }

  export type GetRefreshTokenAggregateType<T extends RefreshTokenAggregateArgs> = {
    [P in keyof T & keyof AggregateRefreshToken]: P extends 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateRefreshToken[P]>
      : GetScalarType<T[P], AggregateRefreshToken[P]>
  }



  export type RefreshTokenSelect = {
    id?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    userId?: boolean
    user?: boolean | UserArgs
  }

  export type RefreshTokenInclude = {
    user?: boolean | UserArgs
  }

  export type RefreshTokenGetPayload<
    S extends boolean | null | undefined | RefreshTokenArgs,
    U = keyof S
      > = S extends true
        ? RefreshToken
    : S extends undefined
    ? never
    : S extends RefreshTokenArgs | RefreshTokenFindManyArgs
    ?'include' extends U
    ? RefreshToken  & {
    [P in TrueKeys<S['include']>]: 
          P extends 'user'
        ? UserGetPayload<S['include'][P]> : never
  } 
    : 'select' extends U
    ? {
    [P in TrueKeys<S['select']>]: P extends keyof RefreshToken ?RefreshToken [P]
  : 
          P extends 'user'
        ? UserGetPayload<S['select'][P]> : never
  } 
    : RefreshToken
  : RefreshToken


  type RefreshTokenCountArgs = Merge<
    Omit<RefreshTokenFindManyArgs, 'select' | 'include'> & {
      select?: RefreshTokenCountAggregateInputType | true
    }
  >

  export interface RefreshTokenDelegate<GlobalRejectSettings> {
    /**
     * Find zero or one RefreshToken that matches the filter.
     * @param {RefreshTokenFindUniqueArgs} args - Arguments to find a RefreshToken
     * @example
     * // Get one RefreshToken
     * const refreshToken = await prisma.refreshToken.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findUnique<T extends RefreshTokenFindUniqueArgs,  LocalRejectSettings = T["rejectOnNotFound"] extends RejectOnNotFound ? T['rejectOnNotFound'] : undefined>(
      args: SelectSubset<T, RefreshTokenFindUniqueArgs>
    ): HasReject<GlobalRejectSettings, LocalRejectSettings, 'findUnique', 'RefreshToken'> extends True ? CheckSelect<T, Prisma__RefreshTokenClient<RefreshToken>, Prisma__RefreshTokenClient<RefreshTokenGetPayload<T>>> : CheckSelect<T, Prisma__RefreshTokenClient<RefreshToken | null >, Prisma__RefreshTokenClient<RefreshTokenGetPayload<T> | null >>

    /**
     * Find the first RefreshToken that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RefreshTokenFindFirstArgs} args - Arguments to find a RefreshToken
     * @example
     * // Get one RefreshToken
     * const refreshToken = await prisma.refreshToken.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findFirst<T extends RefreshTokenFindFirstArgs,  LocalRejectSettings = T["rejectOnNotFound"] extends RejectOnNotFound ? T['rejectOnNotFound'] : undefined>(
      args?: SelectSubset<T, RefreshTokenFindFirstArgs>
    ): HasReject<GlobalRejectSettings, LocalRejectSettings, 'findFirst', 'RefreshToken'> extends True ? CheckSelect<T, Prisma__RefreshTokenClient<RefreshToken>, Prisma__RefreshTokenClient<RefreshTokenGetPayload<T>>> : CheckSelect<T, Prisma__RefreshTokenClient<RefreshToken | null >, Prisma__RefreshTokenClient<RefreshTokenGetPayload<T> | null >>

    /**
     * Find zero or more RefreshTokens that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RefreshTokenFindManyArgs=} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all RefreshTokens
     * const refreshTokens = await prisma.refreshToken.findMany()
     * 
     * // Get first 10 RefreshTokens
     * const refreshTokens = await prisma.refreshToken.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const refreshTokenWithIdOnly = await prisma.refreshToken.findMany({ select: { id: true } })
     * 
    **/
    findMany<T extends RefreshTokenFindManyArgs>(
      args?: SelectSubset<T, RefreshTokenFindManyArgs>
    ): CheckSelect<T, PrismaPromise<Array<RefreshToken>>, PrismaPromise<Array<RefreshTokenGetPayload<T>>>>

    /**
     * Create a RefreshToken.
     * @param {RefreshTokenCreateArgs} args - Arguments to create a RefreshToken.
     * @example
     * // Create one RefreshToken
     * const RefreshToken = await prisma.refreshToken.create({
     *   data: {
     *     // ... data to create a RefreshToken
     *   }
     * })
     * 
    **/
    create<T extends RefreshTokenCreateArgs>(
      args: SelectSubset<T, RefreshTokenCreateArgs>
    ): CheckSelect<T, Prisma__RefreshTokenClient<RefreshToken>, Prisma__RefreshTokenClient<RefreshTokenGetPayload<T>>>

    /**
     * Delete a RefreshToken.
     * @param {RefreshTokenDeleteArgs} args - Arguments to delete one RefreshToken.
     * @example
     * // Delete one RefreshToken
     * const RefreshToken = await prisma.refreshToken.delete({
     *   where: {
     *     // ... filter to delete one RefreshToken
     *   }
     * })
     * 
    **/
    delete<T extends RefreshTokenDeleteArgs>(
      args: SelectSubset<T, RefreshTokenDeleteArgs>
    ): CheckSelect<T, Prisma__RefreshTokenClient<RefreshToken>, Prisma__RefreshTokenClient<RefreshTokenGetPayload<T>>>

    /**
     * Update one RefreshToken.
     * @param {RefreshTokenUpdateArgs} args - Arguments to update one RefreshToken.
     * @example
     * // Update one RefreshToken
     * const refreshToken = await prisma.refreshToken.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
    **/
    update<T extends RefreshTokenUpdateArgs>(
      args: SelectSubset<T, RefreshTokenUpdateArgs>
    ): CheckSelect<T, Prisma__RefreshTokenClient<RefreshToken>, Prisma__RefreshTokenClient<RefreshTokenGetPayload<T>>>

    /**
     * Delete zero or more RefreshTokens.
     * @param {RefreshTokenDeleteManyArgs} args - Arguments to filter RefreshTokens to delete.
     * @example
     * // Delete a few RefreshTokens
     * const { count } = await prisma.refreshToken.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
    **/
    deleteMany<T extends RefreshTokenDeleteManyArgs>(
      args?: SelectSubset<T, RefreshTokenDeleteManyArgs>
    ): PrismaPromise<BatchPayload>

    /**
     * Update zero or more RefreshTokens.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RefreshTokenUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many RefreshTokens
     * const refreshToken = await prisma.refreshToken.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
    **/
    updateMany<T extends RefreshTokenUpdateManyArgs>(
      args: SelectSubset<T, RefreshTokenUpdateManyArgs>
    ): PrismaPromise<BatchPayload>

    /**
     * Create or update one RefreshToken.
     * @param {RefreshTokenUpsertArgs} args - Arguments to update or create a RefreshToken.
     * @example
     * // Update or create a RefreshToken
     * const refreshToken = await prisma.refreshToken.upsert({
     *   create: {
     *     // ... data to create a RefreshToken
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the RefreshToken we want to update
     *   }
     * })
    **/
    upsert<T extends RefreshTokenUpsertArgs>(
      args: SelectSubset<T, RefreshTokenUpsertArgs>
    ): CheckSelect<T, Prisma__RefreshTokenClient<RefreshToken>, Prisma__RefreshTokenClient<RefreshTokenGetPayload<T>>>

    /**
     * Count the number of RefreshTokens.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RefreshTokenCountArgs} args - Arguments to filter RefreshTokens to count.
     * @example
     * // Count the number of RefreshTokens
     * const count = await prisma.refreshToken.count({
     *   where: {
     *     // ... the filter for the RefreshTokens we want to count
     *   }
     * })
    **/
    count<T extends RefreshTokenCountArgs>(
      args?: Subset<T, RefreshTokenCountArgs>,
    ): PrismaPromise<
      T extends _Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], RefreshTokenCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a RefreshToken.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RefreshTokenAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends RefreshTokenAggregateArgs>(args: Subset<T, RefreshTokenAggregateArgs>): PrismaPromise<GetRefreshTokenAggregateType<T>>


  }

  /**
   * The delegate class that acts as a "Promise-like" for RefreshToken.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in 
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export class Prisma__RefreshTokenClient<T> implements PrismaPromise<T> {
    [prisma]: true;
    private readonly _dmmf;
    private readonly _fetcher;
    private readonly _queryType;
    private readonly _rootField;
    private readonly _clientMethod;
    private readonly _args;
    private readonly _dataPath;
    private readonly _errorFormat;
    private readonly _measurePerformance?;
    private _isList;
    private _callsite;
    private _requestPromise?;
    constructor(_dmmf: runtime.DMMFClass, _fetcher: PrismaClientFetcher, _queryType: 'query' | 'mutation', _rootField: string, _clientMethod: string, _args: any, _dataPath: string[], _errorFormat: ErrorFormat, _measurePerformance?: boolean | undefined, _isList?: boolean);
    readonly [Symbol.toStringTag]: 'PrismaClientPromise';

    user<T extends UserArgs = {}>(args?: Subset<T, UserArgs>): CheckSelect<T, Prisma__UserClient<User | null >, Prisma__UserClient<UserGetPayload<T> | null >>;

    private get _document();
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): Promise<TResult1 | TResult2>;
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): Promise<T | TResult>;
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): Promise<T>;
  }

  // Custom InputTypes

  /**
   * RefreshToken findUnique
   */
  export type RefreshTokenFindUniqueArgs = {
    /**
     * Select specific fields to fetch from the RefreshToken
    **/
    select?: RefreshTokenSelect | null
    /**
     * Choose, which related nodes to fetch as well.
    **/
    include?: RefreshTokenInclude | null
    /**
     * Throw an Error if a RefreshToken can't be found
    **/
    rejectOnNotFound?: RejectOnNotFound
    /**
     * Filter, which RefreshToken to fetch.
    **/
    where: RefreshTokenWhereUniqueInput
  }


  /**
   * RefreshToken findFirst
   */
  export type RefreshTokenFindFirstArgs = {
    /**
     * Select specific fields to fetch from the RefreshToken
    **/
    select?: RefreshTokenSelect | null
    /**
     * Choose, which related nodes to fetch as well.
    **/
    include?: RefreshTokenInclude | null
    /**
     * Throw an Error if a RefreshToken can't be found
    **/
    rejectOnNotFound?: RejectOnNotFound
    /**
     * Filter, which RefreshToken to fetch.
    **/
    where?: RefreshTokenWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of RefreshTokens to fetch.
    **/
    orderBy?: Enumerable<RefreshTokenOrderByWithRelationInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for RefreshTokens.
    **/
    cursor?: RefreshTokenWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` RefreshTokens from the position of the cursor.
    **/
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` RefreshTokens.
    **/
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of RefreshTokens.
    **/
    distinct?: Enumerable<RefreshTokenScalarFieldEnum>
  }


  /**
   * RefreshToken findMany
   */
  export type RefreshTokenFindManyArgs = {
    /**
     * Select specific fields to fetch from the RefreshToken
    **/
    select?: RefreshTokenSelect | null
    /**
     * Choose, which related nodes to fetch as well.
    **/
    include?: RefreshTokenInclude | null
    /**
     * Filter, which RefreshTokens to fetch.
    **/
    where?: RefreshTokenWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of RefreshTokens to fetch.
    **/
    orderBy?: Enumerable<RefreshTokenOrderByWithRelationInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing RefreshTokens.
    **/
    cursor?: RefreshTokenWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` RefreshTokens from the position of the cursor.
    **/
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` RefreshTokens.
    **/
    skip?: number
    distinct?: Enumerable<RefreshTokenScalarFieldEnum>
  }


  /**
   * RefreshToken create
   */
  export type RefreshTokenCreateArgs = {
    /**
     * Select specific fields to fetch from the RefreshToken
    **/
    select?: RefreshTokenSelect | null
    /**
     * Choose, which related nodes to fetch as well.
    **/
    include?: RefreshTokenInclude | null
    /**
     * The data needed to create a RefreshToken.
    **/
    data: XOR<RefreshTokenCreateInput, RefreshTokenUncheckedCreateInput>
  }


  /**
   * RefreshToken update
   */
  export type RefreshTokenUpdateArgs = {
    /**
     * Select specific fields to fetch from the RefreshToken
    **/
    select?: RefreshTokenSelect | null
    /**
     * Choose, which related nodes to fetch as well.
    **/
    include?: RefreshTokenInclude | null
    /**
     * The data needed to update a RefreshToken.
    **/
    data: XOR<RefreshTokenUpdateInput, RefreshTokenUncheckedUpdateInput>
    /**
     * Choose, which RefreshToken to update.
    **/
    where: RefreshTokenWhereUniqueInput
  }


  /**
   * RefreshToken updateMany
   */
  export type RefreshTokenUpdateManyArgs = {
    data: XOR<RefreshTokenUpdateManyMutationInput, RefreshTokenUncheckedUpdateManyInput>
    where?: RefreshTokenWhereInput
  }


  /**
   * RefreshToken upsert
   */
  export type RefreshTokenUpsertArgs = {
    /**
     * Select specific fields to fetch from the RefreshToken
    **/
    select?: RefreshTokenSelect | null
    /**
     * Choose, which related nodes to fetch as well.
    **/
    include?: RefreshTokenInclude | null
    /**
     * The filter to search for the RefreshToken to update in case it exists.
    **/
    where: RefreshTokenWhereUniqueInput
    /**
     * In case the RefreshToken found by the `where` argument doesn't exist, create a new RefreshToken with this data.
    **/
    create: XOR<RefreshTokenCreateInput, RefreshTokenUncheckedCreateInput>
    /**
     * In case the RefreshToken was found with the provided `where` argument, update it with this data.
    **/
    update: XOR<RefreshTokenUpdateInput, RefreshTokenUncheckedUpdateInput>
  }


  /**
   * RefreshToken delete
   */
  export type RefreshTokenDeleteArgs = {
    /**
     * Select specific fields to fetch from the RefreshToken
    **/
    select?: RefreshTokenSelect | null
    /**
     * Choose, which related nodes to fetch as well.
    **/
    include?: RefreshTokenInclude | null
    /**
     * Filter which RefreshToken to delete.
    **/
    where: RefreshTokenWhereUniqueInput
  }


  /**
   * RefreshToken deleteMany
   */
  export type RefreshTokenDeleteManyArgs = {
    where?: RefreshTokenWhereInput
  }


  /**
   * RefreshToken without action
   */
  export type RefreshTokenArgs = {
    /**
     * Select specific fields to fetch from the RefreshToken
    **/
    select?: RefreshTokenSelect | null
    /**
     * Choose, which related nodes to fetch as well.
    **/
    include?: RefreshTokenInclude | null
  }



  /**
   * Model LinkEdge
   */


  export type AggregateLinkEdge = {
    count: LinkEdgeCountAggregateOutputType | null
    min: LinkEdgeMinAggregateOutputType | null
    max: LinkEdgeMaxAggregateOutputType | null
  }

  export type LinkEdgeMinAggregateOutputType = {
    createdAt: Date | null
    userId: string | null
    linkId: string | null
  }

  export type LinkEdgeMaxAggregateOutputType = {
    createdAt: Date | null
    userId: string | null
    linkId: string | null
  }

  export type LinkEdgeCountAggregateOutputType = {
    createdAt: number | null
    userId: number | null
    linkId: number | null
    _all: number
  }


  export type LinkEdgeMinAggregateInputType = {
    createdAt?: true
    userId?: true
    linkId?: true
  }

  export type LinkEdgeMaxAggregateInputType = {
    createdAt?: true
    userId?: true
    linkId?: true
  }

  export type LinkEdgeCountAggregateInputType = {
    createdAt?: true
    userId?: true
    linkId?: true
    _all?: true
  }

  export type LinkEdgeAggregateArgs = {
    /**
     * Filter which LinkEdge to aggregate.
    **/
    where?: LinkEdgeWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of LinkEdges to fetch.
    **/
    orderBy?: Enumerable<LinkEdgeOrderByWithRelationInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
    **/
    cursor?: LinkEdgeWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` LinkEdges from the position of the cursor.
    **/
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` LinkEdges.
    **/
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned LinkEdges
    **/
    count?: true | LinkEdgeCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    min?: LinkEdgeMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    max?: LinkEdgeMaxAggregateInputType
  }

  export type GetLinkEdgeAggregateType<T extends LinkEdgeAggregateArgs> = {
    [P in keyof T & keyof AggregateLinkEdge]: P extends 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateLinkEdge[P]>
      : GetScalarType<T[P], AggregateLinkEdge[P]>
  }



  export type LinkEdgeSelect = {
    createdAt?: boolean
    userId?: boolean
    user?: boolean | UserArgs
    linkId?: boolean
    node?: boolean | LinkArgs
  }

  export type LinkEdgeInclude = {
    user?: boolean | UserArgs
    node?: boolean | LinkArgs
  }

  export type LinkEdgeGetPayload<
    S extends boolean | null | undefined | LinkEdgeArgs,
    U = keyof S
      > = S extends true
        ? LinkEdge
    : S extends undefined
    ? never
    : S extends LinkEdgeArgs | LinkEdgeFindManyArgs
    ?'include' extends U
    ? LinkEdge  & {
    [P in TrueKeys<S['include']>]: 
          P extends 'user'
        ? UserGetPayload<S['include'][P]> :
        P extends 'node'
        ? LinkGetPayload<S['include'][P]> : never
  } 
    : 'select' extends U
    ? {
    [P in TrueKeys<S['select']>]: P extends keyof LinkEdge ?LinkEdge [P]
  : 
          P extends 'user'
        ? UserGetPayload<S['select'][P]> :
        P extends 'node'
        ? LinkGetPayload<S['select'][P]> : never
  } 
    : LinkEdge
  : LinkEdge


  type LinkEdgeCountArgs = Merge<
    Omit<LinkEdgeFindManyArgs, 'select' | 'include'> & {
      select?: LinkEdgeCountAggregateInputType | true
    }
  >

  export interface LinkEdgeDelegate<GlobalRejectSettings> {
    /**
     * Find zero or one LinkEdge that matches the filter.
     * @param {LinkEdgeFindUniqueArgs} args - Arguments to find a LinkEdge
     * @example
     * // Get one LinkEdge
     * const linkEdge = await prisma.linkEdge.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findUnique<T extends LinkEdgeFindUniqueArgs,  LocalRejectSettings = T["rejectOnNotFound"] extends RejectOnNotFound ? T['rejectOnNotFound'] : undefined>(
      args: SelectSubset<T, LinkEdgeFindUniqueArgs>
    ): HasReject<GlobalRejectSettings, LocalRejectSettings, 'findUnique', 'LinkEdge'> extends True ? CheckSelect<T, Prisma__LinkEdgeClient<LinkEdge>, Prisma__LinkEdgeClient<LinkEdgeGetPayload<T>>> : CheckSelect<T, Prisma__LinkEdgeClient<LinkEdge | null >, Prisma__LinkEdgeClient<LinkEdgeGetPayload<T> | null >>

    /**
     * Find the first LinkEdge that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {LinkEdgeFindFirstArgs} args - Arguments to find a LinkEdge
     * @example
     * // Get one LinkEdge
     * const linkEdge = await prisma.linkEdge.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findFirst<T extends LinkEdgeFindFirstArgs,  LocalRejectSettings = T["rejectOnNotFound"] extends RejectOnNotFound ? T['rejectOnNotFound'] : undefined>(
      args?: SelectSubset<T, LinkEdgeFindFirstArgs>
    ): HasReject<GlobalRejectSettings, LocalRejectSettings, 'findFirst', 'LinkEdge'> extends True ? CheckSelect<T, Prisma__LinkEdgeClient<LinkEdge>, Prisma__LinkEdgeClient<LinkEdgeGetPayload<T>>> : CheckSelect<T, Prisma__LinkEdgeClient<LinkEdge | null >, Prisma__LinkEdgeClient<LinkEdgeGetPayload<T> | null >>

    /**
     * Find zero or more LinkEdges that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {LinkEdgeFindManyArgs=} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all LinkEdges
     * const linkEdges = await prisma.linkEdge.findMany()
     * 
     * // Get first 10 LinkEdges
     * const linkEdges = await prisma.linkEdge.findMany({ take: 10 })
     * 
     * // Only select the `createdAt`
     * const linkEdgeWithCreatedAtOnly = await prisma.linkEdge.findMany({ select: { createdAt: true } })
     * 
    **/
    findMany<T extends LinkEdgeFindManyArgs>(
      args?: SelectSubset<T, LinkEdgeFindManyArgs>
    ): CheckSelect<T, PrismaPromise<Array<LinkEdge>>, PrismaPromise<Array<LinkEdgeGetPayload<T>>>>

    /**
     * Create a LinkEdge.
     * @param {LinkEdgeCreateArgs} args - Arguments to create a LinkEdge.
     * @example
     * // Create one LinkEdge
     * const LinkEdge = await prisma.linkEdge.create({
     *   data: {
     *     // ... data to create a LinkEdge
     *   }
     * })
     * 
    **/
    create<T extends LinkEdgeCreateArgs>(
      args: SelectSubset<T, LinkEdgeCreateArgs>
    ): CheckSelect<T, Prisma__LinkEdgeClient<LinkEdge>, Prisma__LinkEdgeClient<LinkEdgeGetPayload<T>>>

    /**
     * Delete a LinkEdge.
     * @param {LinkEdgeDeleteArgs} args - Arguments to delete one LinkEdge.
     * @example
     * // Delete one LinkEdge
     * const LinkEdge = await prisma.linkEdge.delete({
     *   where: {
     *     // ... filter to delete one LinkEdge
     *   }
     * })
     * 
    **/
    delete<T extends LinkEdgeDeleteArgs>(
      args: SelectSubset<T, LinkEdgeDeleteArgs>
    ): CheckSelect<T, Prisma__LinkEdgeClient<LinkEdge>, Prisma__LinkEdgeClient<LinkEdgeGetPayload<T>>>

    /**
     * Update one LinkEdge.
     * @param {LinkEdgeUpdateArgs} args - Arguments to update one LinkEdge.
     * @example
     * // Update one LinkEdge
     * const linkEdge = await prisma.linkEdge.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
    **/
    update<T extends LinkEdgeUpdateArgs>(
      args: SelectSubset<T, LinkEdgeUpdateArgs>
    ): CheckSelect<T, Prisma__LinkEdgeClient<LinkEdge>, Prisma__LinkEdgeClient<LinkEdgeGetPayload<T>>>

    /**
     * Delete zero or more LinkEdges.
     * @param {LinkEdgeDeleteManyArgs} args - Arguments to filter LinkEdges to delete.
     * @example
     * // Delete a few LinkEdges
     * const { count } = await prisma.linkEdge.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
    **/
    deleteMany<T extends LinkEdgeDeleteManyArgs>(
      args?: SelectSubset<T, LinkEdgeDeleteManyArgs>
    ): PrismaPromise<BatchPayload>

    /**
     * Update zero or more LinkEdges.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {LinkEdgeUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many LinkEdges
     * const linkEdge = await prisma.linkEdge.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
    **/
    updateMany<T extends LinkEdgeUpdateManyArgs>(
      args: SelectSubset<T, LinkEdgeUpdateManyArgs>
    ): PrismaPromise<BatchPayload>

    /**
     * Create or update one LinkEdge.
     * @param {LinkEdgeUpsertArgs} args - Arguments to update or create a LinkEdge.
     * @example
     * // Update or create a LinkEdge
     * const linkEdge = await prisma.linkEdge.upsert({
     *   create: {
     *     // ... data to create a LinkEdge
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the LinkEdge we want to update
     *   }
     * })
    **/
    upsert<T extends LinkEdgeUpsertArgs>(
      args: SelectSubset<T, LinkEdgeUpsertArgs>
    ): CheckSelect<T, Prisma__LinkEdgeClient<LinkEdge>, Prisma__LinkEdgeClient<LinkEdgeGetPayload<T>>>

    /**
     * Count the number of LinkEdges.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {LinkEdgeCountArgs} args - Arguments to filter LinkEdges to count.
     * @example
     * // Count the number of LinkEdges
     * const count = await prisma.linkEdge.count({
     *   where: {
     *     // ... the filter for the LinkEdges we want to count
     *   }
     * })
    **/
    count<T extends LinkEdgeCountArgs>(
      args?: Subset<T, LinkEdgeCountArgs>,
    ): PrismaPromise<
      T extends _Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], LinkEdgeCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a LinkEdge.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {LinkEdgeAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends LinkEdgeAggregateArgs>(args: Subset<T, LinkEdgeAggregateArgs>): PrismaPromise<GetLinkEdgeAggregateType<T>>


  }

  /**
   * The delegate class that acts as a "Promise-like" for LinkEdge.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in 
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export class Prisma__LinkEdgeClient<T> implements PrismaPromise<T> {
    [prisma]: true;
    private readonly _dmmf;
    private readonly _fetcher;
    private readonly _queryType;
    private readonly _rootField;
    private readonly _clientMethod;
    private readonly _args;
    private readonly _dataPath;
    private readonly _errorFormat;
    private readonly _measurePerformance?;
    private _isList;
    private _callsite;
    private _requestPromise?;
    constructor(_dmmf: runtime.DMMFClass, _fetcher: PrismaClientFetcher, _queryType: 'query' | 'mutation', _rootField: string, _clientMethod: string, _args: any, _dataPath: string[], _errorFormat: ErrorFormat, _measurePerformance?: boolean | undefined, _isList?: boolean);
    readonly [Symbol.toStringTag]: 'PrismaClientPromise';

    user<T extends UserArgs = {}>(args?: Subset<T, UserArgs>): CheckSelect<T, Prisma__UserClient<User | null >, Prisma__UserClient<UserGetPayload<T> | null >>;

    node<T extends LinkArgs = {}>(args?: Subset<T, LinkArgs>): CheckSelect<T, Prisma__LinkClient<Link | null >, Prisma__LinkClient<LinkGetPayload<T> | null >>;

    private get _document();
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): Promise<TResult1 | TResult2>;
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): Promise<T | TResult>;
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): Promise<T>;
  }

  // Custom InputTypes

  /**
   * LinkEdge findUnique
   */
  export type LinkEdgeFindUniqueArgs = {
    /**
     * Select specific fields to fetch from the LinkEdge
    **/
    select?: LinkEdgeSelect | null
    /**
     * Choose, which related nodes to fetch as well.
    **/
    include?: LinkEdgeInclude | null
    /**
     * Throw an Error if a LinkEdge can't be found
    **/
    rejectOnNotFound?: RejectOnNotFound
    /**
     * Filter, which LinkEdge to fetch.
    **/
    where: LinkEdgeWhereUniqueInput
  }


  /**
   * LinkEdge findFirst
   */
  export type LinkEdgeFindFirstArgs = {
    /**
     * Select specific fields to fetch from the LinkEdge
    **/
    select?: LinkEdgeSelect | null
    /**
     * Choose, which related nodes to fetch as well.
    **/
    include?: LinkEdgeInclude | null
    /**
     * Throw an Error if a LinkEdge can't be found
    **/
    rejectOnNotFound?: RejectOnNotFound
    /**
     * Filter, which LinkEdge to fetch.
    **/
    where?: LinkEdgeWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of LinkEdges to fetch.
    **/
    orderBy?: Enumerable<LinkEdgeOrderByWithRelationInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for LinkEdges.
    **/
    cursor?: LinkEdgeWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` LinkEdges from the position of the cursor.
    **/
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` LinkEdges.
    **/
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of LinkEdges.
    **/
    distinct?: Enumerable<LinkEdgeScalarFieldEnum>
  }


  /**
   * LinkEdge findMany
   */
  export type LinkEdgeFindManyArgs = {
    /**
     * Select specific fields to fetch from the LinkEdge
    **/
    select?: LinkEdgeSelect | null
    /**
     * Choose, which related nodes to fetch as well.
    **/
    include?: LinkEdgeInclude | null
    /**
     * Filter, which LinkEdges to fetch.
    **/
    where?: LinkEdgeWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of LinkEdges to fetch.
    **/
    orderBy?: Enumerable<LinkEdgeOrderByWithRelationInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing LinkEdges.
    **/
    cursor?: LinkEdgeWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` LinkEdges from the position of the cursor.
    **/
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` LinkEdges.
    **/
    skip?: number
    distinct?: Enumerable<LinkEdgeScalarFieldEnum>
  }


  /**
   * LinkEdge create
   */
  export type LinkEdgeCreateArgs = {
    /**
     * Select specific fields to fetch from the LinkEdge
    **/
    select?: LinkEdgeSelect | null
    /**
     * Choose, which related nodes to fetch as well.
    **/
    include?: LinkEdgeInclude | null
    /**
     * The data needed to create a LinkEdge.
    **/
    data: XOR<LinkEdgeCreateInput, LinkEdgeUncheckedCreateInput>
  }


  /**
   * LinkEdge update
   */
  export type LinkEdgeUpdateArgs = {
    /**
     * Select specific fields to fetch from the LinkEdge
    **/
    select?: LinkEdgeSelect | null
    /**
     * Choose, which related nodes to fetch as well.
    **/
    include?: LinkEdgeInclude | null
    /**
     * The data needed to update a LinkEdge.
    **/
    data: XOR<LinkEdgeUpdateInput, LinkEdgeUncheckedUpdateInput>
    /**
     * Choose, which LinkEdge to update.
    **/
    where: LinkEdgeWhereUniqueInput
  }


  /**
   * LinkEdge updateMany
   */
  export type LinkEdgeUpdateManyArgs = {
    data: XOR<LinkEdgeUpdateManyMutationInput, LinkEdgeUncheckedUpdateManyInput>
    where?: LinkEdgeWhereInput
  }


  /**
   * LinkEdge upsert
   */
  export type LinkEdgeUpsertArgs = {
    /**
     * Select specific fields to fetch from the LinkEdge
    **/
    select?: LinkEdgeSelect | null
    /**
     * Choose, which related nodes to fetch as well.
    **/
    include?: LinkEdgeInclude | null
    /**
     * The filter to search for the LinkEdge to update in case it exists.
    **/
    where: LinkEdgeWhereUniqueInput
    /**
     * In case the LinkEdge found by the `where` argument doesn't exist, create a new LinkEdge with this data.
    **/
    create: XOR<LinkEdgeCreateInput, LinkEdgeUncheckedCreateInput>
    /**
     * In case the LinkEdge was found with the provided `where` argument, update it with this data.
    **/
    update: XOR<LinkEdgeUpdateInput, LinkEdgeUncheckedUpdateInput>
  }


  /**
   * LinkEdge delete
   */
  export type LinkEdgeDeleteArgs = {
    /**
     * Select specific fields to fetch from the LinkEdge
    **/
    select?: LinkEdgeSelect | null
    /**
     * Choose, which related nodes to fetch as well.
    **/
    include?: LinkEdgeInclude | null
    /**
     * Filter which LinkEdge to delete.
    **/
    where: LinkEdgeWhereUniqueInput
  }


  /**
   * LinkEdge deleteMany
   */
  export type LinkEdgeDeleteManyArgs = {
    where?: LinkEdgeWhereInput
  }


  /**
   * LinkEdge without action
   */
  export type LinkEdgeArgs = {
    /**
     * Select specific fields to fetch from the LinkEdge
    **/
    select?: LinkEdgeSelect | null
    /**
     * Choose, which related nodes to fetch as well.
    **/
    include?: LinkEdgeInclude | null
  }



  /**
   * Model Link
   */


  export type AggregateLink = {
    count: LinkCountAggregateOutputType | null
    min: LinkMinAggregateOutputType | null
    max: LinkMaxAggregateOutputType | null
  }

  export type LinkMinAggregateOutputType = {
    id: string | null
    createdAt: Date | null
    updatedAt: Date | null
    canonicalUrl: string | null
    title: string | null
    description: string | null
    image: string | null
  }

  export type LinkMaxAggregateOutputType = {
    id: string | null
    createdAt: Date | null
    updatedAt: Date | null
    canonicalUrl: string | null
    title: string | null
    description: string | null
    image: string | null
  }

  export type LinkCountAggregateOutputType = {
    id: number | null
    createdAt: number | null
    updatedAt: number | null
    canonicalUrl: number | null
    title: number | null
    description: number | null
    image: number | null
    _all: number
  }


  export type LinkMinAggregateInputType = {
    id?: true
    createdAt?: true
    updatedAt?: true
    canonicalUrl?: true
    title?: true
    description?: true
    image?: true
  }

  export type LinkMaxAggregateInputType = {
    id?: true
    createdAt?: true
    updatedAt?: true
    canonicalUrl?: true
    title?: true
    description?: true
    image?: true
  }

  export type LinkCountAggregateInputType = {
    id?: true
    createdAt?: true
    updatedAt?: true
    canonicalUrl?: true
    title?: true
    description?: true
    image?: true
    _all?: true
  }

  export type LinkAggregateArgs = {
    /**
     * Filter which Link to aggregate.
    **/
    where?: LinkWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Links to fetch.
    **/
    orderBy?: Enumerable<LinkOrderByWithRelationInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
    **/
    cursor?: LinkWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Links from the position of the cursor.
    **/
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Links.
    **/
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Links
    **/
    count?: true | LinkCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    min?: LinkMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    max?: LinkMaxAggregateInputType
  }

  export type GetLinkAggregateType<T extends LinkAggregateArgs> = {
    [P in keyof T & keyof AggregateLink]: P extends 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateLink[P]>
      : GetScalarType<T[P], AggregateLink[P]>
  }



  export type LinkSelect = {
    id?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    canonicalUrl?: boolean
    title?: boolean
    description?: boolean
    image?: boolean
    edges?: boolean | LinkEdgeFindManyArgs
  }

  export type LinkInclude = {
    edges?: boolean | LinkEdgeFindManyArgs
  }

  export type LinkGetPayload<
    S extends boolean | null | undefined | LinkArgs,
    U = keyof S
      > = S extends true
        ? Link
    : S extends undefined
    ? never
    : S extends LinkArgs | LinkFindManyArgs
    ?'include' extends U
    ? Link  & {
    [P in TrueKeys<S['include']>]: 
          P extends 'edges'
        ? Array < LinkEdgeGetPayload<S['include'][P]>>  : never
  } 
    : 'select' extends U
    ? {
    [P in TrueKeys<S['select']>]: P extends keyof Link ?Link [P]
  : 
          P extends 'edges'
        ? Array < LinkEdgeGetPayload<S['select'][P]>>  : never
  } 
    : Link
  : Link


  type LinkCountArgs = Merge<
    Omit<LinkFindManyArgs, 'select' | 'include'> & {
      select?: LinkCountAggregateInputType | true
    }
  >

  export interface LinkDelegate<GlobalRejectSettings> {
    /**
     * Find zero or one Link that matches the filter.
     * @param {LinkFindUniqueArgs} args - Arguments to find a Link
     * @example
     * // Get one Link
     * const link = await prisma.link.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findUnique<T extends LinkFindUniqueArgs,  LocalRejectSettings = T["rejectOnNotFound"] extends RejectOnNotFound ? T['rejectOnNotFound'] : undefined>(
      args: SelectSubset<T, LinkFindUniqueArgs>
    ): HasReject<GlobalRejectSettings, LocalRejectSettings, 'findUnique', 'Link'> extends True ? CheckSelect<T, Prisma__LinkClient<Link>, Prisma__LinkClient<LinkGetPayload<T>>> : CheckSelect<T, Prisma__LinkClient<Link | null >, Prisma__LinkClient<LinkGetPayload<T> | null >>

    /**
     * Find the first Link that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {LinkFindFirstArgs} args - Arguments to find a Link
     * @example
     * // Get one Link
     * const link = await prisma.link.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findFirst<T extends LinkFindFirstArgs,  LocalRejectSettings = T["rejectOnNotFound"] extends RejectOnNotFound ? T['rejectOnNotFound'] : undefined>(
      args?: SelectSubset<T, LinkFindFirstArgs>
    ): HasReject<GlobalRejectSettings, LocalRejectSettings, 'findFirst', 'Link'> extends True ? CheckSelect<T, Prisma__LinkClient<Link>, Prisma__LinkClient<LinkGetPayload<T>>> : CheckSelect<T, Prisma__LinkClient<Link | null >, Prisma__LinkClient<LinkGetPayload<T> | null >>

    /**
     * Find zero or more Links that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {LinkFindManyArgs=} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Links
     * const links = await prisma.link.findMany()
     * 
     * // Get first 10 Links
     * const links = await prisma.link.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const linkWithIdOnly = await prisma.link.findMany({ select: { id: true } })
     * 
    **/
    findMany<T extends LinkFindManyArgs>(
      args?: SelectSubset<T, LinkFindManyArgs>
    ): CheckSelect<T, PrismaPromise<Array<Link>>, PrismaPromise<Array<LinkGetPayload<T>>>>

    /**
     * Create a Link.
     * @param {LinkCreateArgs} args - Arguments to create a Link.
     * @example
     * // Create one Link
     * const Link = await prisma.link.create({
     *   data: {
     *     // ... data to create a Link
     *   }
     * })
     * 
    **/
    create<T extends LinkCreateArgs>(
      args: SelectSubset<T, LinkCreateArgs>
    ): CheckSelect<T, Prisma__LinkClient<Link>, Prisma__LinkClient<LinkGetPayload<T>>>

    /**
     * Delete a Link.
     * @param {LinkDeleteArgs} args - Arguments to delete one Link.
     * @example
     * // Delete one Link
     * const Link = await prisma.link.delete({
     *   where: {
     *     // ... filter to delete one Link
     *   }
     * })
     * 
    **/
    delete<T extends LinkDeleteArgs>(
      args: SelectSubset<T, LinkDeleteArgs>
    ): CheckSelect<T, Prisma__LinkClient<Link>, Prisma__LinkClient<LinkGetPayload<T>>>

    /**
     * Update one Link.
     * @param {LinkUpdateArgs} args - Arguments to update one Link.
     * @example
     * // Update one Link
     * const link = await prisma.link.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
    **/
    update<T extends LinkUpdateArgs>(
      args: SelectSubset<T, LinkUpdateArgs>
    ): CheckSelect<T, Prisma__LinkClient<Link>, Prisma__LinkClient<LinkGetPayload<T>>>

    /**
     * Delete zero or more Links.
     * @param {LinkDeleteManyArgs} args - Arguments to filter Links to delete.
     * @example
     * // Delete a few Links
     * const { count } = await prisma.link.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
    **/
    deleteMany<T extends LinkDeleteManyArgs>(
      args?: SelectSubset<T, LinkDeleteManyArgs>
    ): PrismaPromise<BatchPayload>

    /**
     * Update zero or more Links.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {LinkUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Links
     * const link = await prisma.link.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
    **/
    updateMany<T extends LinkUpdateManyArgs>(
      args: SelectSubset<T, LinkUpdateManyArgs>
    ): PrismaPromise<BatchPayload>

    /**
     * Create or update one Link.
     * @param {LinkUpsertArgs} args - Arguments to update or create a Link.
     * @example
     * // Update or create a Link
     * const link = await prisma.link.upsert({
     *   create: {
     *     // ... data to create a Link
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Link we want to update
     *   }
     * })
    **/
    upsert<T extends LinkUpsertArgs>(
      args: SelectSubset<T, LinkUpsertArgs>
    ): CheckSelect<T, Prisma__LinkClient<Link>, Prisma__LinkClient<LinkGetPayload<T>>>

    /**
     * Count the number of Links.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {LinkCountArgs} args - Arguments to filter Links to count.
     * @example
     * // Count the number of Links
     * const count = await prisma.link.count({
     *   where: {
     *     // ... the filter for the Links we want to count
     *   }
     * })
    **/
    count<T extends LinkCountArgs>(
      args?: Subset<T, LinkCountArgs>,
    ): PrismaPromise<
      T extends _Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], LinkCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Link.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {LinkAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends LinkAggregateArgs>(args: Subset<T, LinkAggregateArgs>): PrismaPromise<GetLinkAggregateType<T>>


  }

  /**
   * The delegate class that acts as a "Promise-like" for Link.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in 
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export class Prisma__LinkClient<T> implements PrismaPromise<T> {
    [prisma]: true;
    private readonly _dmmf;
    private readonly _fetcher;
    private readonly _queryType;
    private readonly _rootField;
    private readonly _clientMethod;
    private readonly _args;
    private readonly _dataPath;
    private readonly _errorFormat;
    private readonly _measurePerformance?;
    private _isList;
    private _callsite;
    private _requestPromise?;
    constructor(_dmmf: runtime.DMMFClass, _fetcher: PrismaClientFetcher, _queryType: 'query' | 'mutation', _rootField: string, _clientMethod: string, _args: any, _dataPath: string[], _errorFormat: ErrorFormat, _measurePerformance?: boolean | undefined, _isList?: boolean);
    readonly [Symbol.toStringTag]: 'PrismaClientPromise';

    edges<T extends LinkEdgeFindManyArgs = {}>(args?: Subset<T, LinkEdgeFindManyArgs>): CheckSelect<T, PrismaPromise<Array<LinkEdge>>, PrismaPromise<Array<LinkEdgeGetPayload<T>>>>;

    private get _document();
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): Promise<TResult1 | TResult2>;
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): Promise<T | TResult>;
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): Promise<T>;
  }

  // Custom InputTypes

  /**
   * Link findUnique
   */
  export type LinkFindUniqueArgs = {
    /**
     * Select specific fields to fetch from the Link
    **/
    select?: LinkSelect | null
    /**
     * Choose, which related nodes to fetch as well.
    **/
    include?: LinkInclude | null
    /**
     * Throw an Error if a Link can't be found
    **/
    rejectOnNotFound?: RejectOnNotFound
    /**
     * Filter, which Link to fetch.
    **/
    where: LinkWhereUniqueInput
  }


  /**
   * Link findFirst
   */
  export type LinkFindFirstArgs = {
    /**
     * Select specific fields to fetch from the Link
    **/
    select?: LinkSelect | null
    /**
     * Choose, which related nodes to fetch as well.
    **/
    include?: LinkInclude | null
    /**
     * Throw an Error if a Link can't be found
    **/
    rejectOnNotFound?: RejectOnNotFound
    /**
     * Filter, which Link to fetch.
    **/
    where?: LinkWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Links to fetch.
    **/
    orderBy?: Enumerable<LinkOrderByWithRelationInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Links.
    **/
    cursor?: LinkWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Links from the position of the cursor.
    **/
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Links.
    **/
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Links.
    **/
    distinct?: Enumerable<LinkScalarFieldEnum>
  }


  /**
   * Link findMany
   */
  export type LinkFindManyArgs = {
    /**
     * Select specific fields to fetch from the Link
    **/
    select?: LinkSelect | null
    /**
     * Choose, which related nodes to fetch as well.
    **/
    include?: LinkInclude | null
    /**
     * Filter, which Links to fetch.
    **/
    where?: LinkWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Links to fetch.
    **/
    orderBy?: Enumerable<LinkOrderByWithRelationInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Links.
    **/
    cursor?: LinkWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Links from the position of the cursor.
    **/
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Links.
    **/
    skip?: number
    distinct?: Enumerable<LinkScalarFieldEnum>
  }


  /**
   * Link create
   */
  export type LinkCreateArgs = {
    /**
     * Select specific fields to fetch from the Link
    **/
    select?: LinkSelect | null
    /**
     * Choose, which related nodes to fetch as well.
    **/
    include?: LinkInclude | null
    /**
     * The data needed to create a Link.
    **/
    data: XOR<LinkCreateInput, LinkUncheckedCreateInput>
  }


  /**
   * Link update
   */
  export type LinkUpdateArgs = {
    /**
     * Select specific fields to fetch from the Link
    **/
    select?: LinkSelect | null
    /**
     * Choose, which related nodes to fetch as well.
    **/
    include?: LinkInclude | null
    /**
     * The data needed to update a Link.
    **/
    data: XOR<LinkUpdateInput, LinkUncheckedUpdateInput>
    /**
     * Choose, which Link to update.
    **/
    where: LinkWhereUniqueInput
  }


  /**
   * Link updateMany
   */
  export type LinkUpdateManyArgs = {
    data: XOR<LinkUpdateManyMutationInput, LinkUncheckedUpdateManyInput>
    where?: LinkWhereInput
  }


  /**
   * Link upsert
   */
  export type LinkUpsertArgs = {
    /**
     * Select specific fields to fetch from the Link
    **/
    select?: LinkSelect | null
    /**
     * Choose, which related nodes to fetch as well.
    **/
    include?: LinkInclude | null
    /**
     * The filter to search for the Link to update in case it exists.
    **/
    where: LinkWhereUniqueInput
    /**
     * In case the Link found by the `where` argument doesn't exist, create a new Link with this data.
    **/
    create: XOR<LinkCreateInput, LinkUncheckedCreateInput>
    /**
     * In case the Link was found with the provided `where` argument, update it with this data.
    **/
    update: XOR<LinkUpdateInput, LinkUncheckedUpdateInput>
  }


  /**
   * Link delete
   */
  export type LinkDeleteArgs = {
    /**
     * Select specific fields to fetch from the Link
    **/
    select?: LinkSelect | null
    /**
     * Choose, which related nodes to fetch as well.
    **/
    include?: LinkInclude | null
    /**
     * Filter which Link to delete.
    **/
    where: LinkWhereUniqueInput
  }


  /**
   * Link deleteMany
   */
  export type LinkDeleteManyArgs = {
    where?: LinkWhereInput
  }


  /**
   * Link without action
   */
  export type LinkArgs = {
    /**
     * Select specific fields to fetch from the Link
    **/
    select?: LinkSelect | null
    /**
     * Choose, which related nodes to fetch as well.
    **/
    include?: LinkInclude | null
  }



  /**
   * Enums
   */

  // Based on
  // https://github.com/microsoft/TypeScript/issues/3192#issuecomment-261720275

  export const UserScalarFieldEnum: {
    id: 'id',
    username: 'username',
    hash: 'hash',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type UserScalarFieldEnum = (typeof UserScalarFieldEnum)[keyof typeof UserScalarFieldEnum]


  export const RefreshTokenScalarFieldEnum: {
    id: 'id',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt',
    userId: 'userId'
  };

  export type RefreshTokenScalarFieldEnum = (typeof RefreshTokenScalarFieldEnum)[keyof typeof RefreshTokenScalarFieldEnum]


  export const LinkEdgeScalarFieldEnum: {
    createdAt: 'createdAt',
    userId: 'userId',
    linkId: 'linkId'
  };

  export type LinkEdgeScalarFieldEnum = (typeof LinkEdgeScalarFieldEnum)[keyof typeof LinkEdgeScalarFieldEnum]


  export const LinkScalarFieldEnum: {
    id: 'id',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt',
    canonicalUrl: 'canonicalUrl',
    title: 'title',
    description: 'description',
    image: 'image'
  };

  export type LinkScalarFieldEnum = (typeof LinkScalarFieldEnum)[keyof typeof LinkScalarFieldEnum]


  export const SortOrder: {
    asc: 'asc',
    desc: 'desc'
  };

  export type SortOrder = (typeof SortOrder)[keyof typeof SortOrder]


  export const QueryMode: {
    default: 'default',
    insensitive: 'insensitive'
  };

  export type QueryMode = (typeof QueryMode)[keyof typeof QueryMode]


  /**
   * Deep Input Types
   */


  export type UserWhereInput = {
    AND?: Enumerable<UserWhereInput>
    OR?: Enumerable<UserWhereInput>
    NOT?: Enumerable<UserWhereInput>
    id?: StringFilter | string
    username?: StringFilter | string
    hash?: StringFilter | string
    links?: LinkEdgeListRelationFilter
    refreshTokens?: RefreshTokenListRelationFilter
    createdAt?: DateTimeFilter | Date | string
    updatedAt?: DateTimeFilter | Date | string
  }

  export type UserOrderByWithRelationInput = {
    id?: SortOrder
    username?: SortOrder
    hash?: SortOrder
    links?: LinkEdgeOrderByAggregateInput
    refreshTokens?: RefreshTokenOrderByAggregateInput
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type UserWhereUniqueInput = {
    id?: string
    username?: string
  }

  export type RefreshTokenWhereInput = {
    AND?: Enumerable<RefreshTokenWhereInput>
    OR?: Enumerable<RefreshTokenWhereInput>
    NOT?: Enumerable<RefreshTokenWhereInput>
    id?: StringFilter | string
    createdAt?: DateTimeFilter | Date | string
    updatedAt?: DateTimeFilter | Date | string
    userId?: StringFilter | string
    user?: XOR<UserRelationFilter, UserWhereInput>
  }

  export type RefreshTokenOrderByWithRelationInput = {
    id?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    userId?: SortOrder
    user?: UserOrderByWithRelationInput
  }

  export type RefreshTokenWhereUniqueInput = {
    id?: string
  }

  export type LinkEdgeWhereInput = {
    AND?: Enumerable<LinkEdgeWhereInput>
    OR?: Enumerable<LinkEdgeWhereInput>
    NOT?: Enumerable<LinkEdgeWhereInput>
    createdAt?: DateTimeFilter | Date | string
    userId?: StringFilter | string
    user?: XOR<UserRelationFilter, UserWhereInput>
    linkId?: StringFilter | string
    node?: XOR<LinkRelationFilter, LinkWhereInput>
  }

  export type LinkEdgeOrderByWithRelationInput = {
    createdAt?: SortOrder
    userId?: SortOrder
    user?: UserOrderByWithRelationInput
    linkId?: SortOrder
    node?: LinkOrderByWithRelationInput
  }

  export type LinkEdgeWhereUniqueInput = {
    userId_linkId?: LinkEdgeUserIdLinkIdCompoundUniqueInput
  }

  export type LinkWhereInput = {
    AND?: Enumerable<LinkWhereInput>
    OR?: Enumerable<LinkWhereInput>
    NOT?: Enumerable<LinkWhereInput>
    id?: StringFilter | string
    createdAt?: DateTimeFilter | Date | string
    updatedAt?: DateTimeFilter | Date | string
    canonicalUrl?: StringFilter | string
    title?: StringNullableFilter | string | null
    description?: StringNullableFilter | string | null
    image?: StringNullableFilter | string | null
    edges?: LinkEdgeListRelationFilter
  }

  export type LinkOrderByWithRelationInput = {
    id?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    canonicalUrl?: SortOrder
    title?: SortOrder
    description?: SortOrder
    image?: SortOrder
    edges?: LinkEdgeOrderByAggregateInput
  }

  export type LinkWhereUniqueInput = {
    id?: string
    canonicalUrl?: string
  }

  export type UserCreateInput = {
    id?: string
    username: string
    hash: string
    createdAt?: Date | string
    updatedAt?: Date | string
    links?: LinkEdgeCreateNestedManyWithoutUserInput
    refreshTokens?: RefreshTokenCreateNestedManyWithoutUserInput
  }

  export type UserUncheckedCreateInput = {
    id?: string
    username: string
    hash: string
    createdAt?: Date | string
    updatedAt?: Date | string
    links?: LinkEdgeUncheckedCreateNestedManyWithoutUserInput
    refreshTokens?: RefreshTokenUncheckedCreateNestedManyWithoutUserInput
  }

  export type UserUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    username?: StringFieldUpdateOperationsInput | string
    hash?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    links?: LinkEdgeUpdateManyWithoutUserInput
    refreshTokens?: RefreshTokenUpdateManyWithoutUserInput
  }

  export type UserUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    username?: StringFieldUpdateOperationsInput | string
    hash?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    links?: LinkEdgeUncheckedUpdateManyWithoutUserInput
    refreshTokens?: RefreshTokenUncheckedUpdateManyWithoutUserInput
  }

  export type UserUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    username?: StringFieldUpdateOperationsInput | string
    hash?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type UserUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    username?: StringFieldUpdateOperationsInput | string
    hash?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type RefreshTokenCreateInput = {
    id?: string
    createdAt?: Date | string
    updatedAt?: Date | string
    user: UserCreateNestedOneWithoutRefreshTokensInput
  }

  export type RefreshTokenUncheckedCreateInput = {
    id?: string
    createdAt?: Date | string
    updatedAt?: Date | string
    userId: string
  }

  export type RefreshTokenUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: UserUpdateOneRequiredWithoutRefreshTokensInput
  }

  export type RefreshTokenUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    userId?: StringFieldUpdateOperationsInput | string
  }

  export type RefreshTokenUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type RefreshTokenUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    userId?: StringFieldUpdateOperationsInput | string
  }

  export type LinkEdgeCreateInput = {
    createdAt?: Date | string
    user: UserCreateNestedOneWithoutLinksInput
    node: LinkCreateNestedOneWithoutEdgesInput
  }

  export type LinkEdgeUncheckedCreateInput = {
    createdAt?: Date | string
    userId: string
    linkId: string
  }

  export type LinkEdgeUpdateInput = {
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: UserUpdateOneRequiredWithoutLinksInput
    node?: LinkUpdateOneRequiredWithoutEdgesInput
  }

  export type LinkEdgeUncheckedUpdateInput = {
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    userId?: StringFieldUpdateOperationsInput | string
    linkId?: StringFieldUpdateOperationsInput | string
  }

  export type LinkEdgeUpdateManyMutationInput = {
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type LinkEdgeUncheckedUpdateManyInput = {
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    userId?: StringFieldUpdateOperationsInput | string
    linkId?: StringFieldUpdateOperationsInput | string
  }

  export type LinkCreateInput = {
    id?: string
    createdAt?: Date | string
    updatedAt?: Date | string
    canonicalUrl: string
    title?: string | null
    description?: string | null
    image?: string | null
    edges?: LinkEdgeCreateNestedManyWithoutNodeInput
  }

  export type LinkUncheckedCreateInput = {
    id?: string
    createdAt?: Date | string
    updatedAt?: Date | string
    canonicalUrl: string
    title?: string | null
    description?: string | null
    image?: string | null
    edges?: LinkEdgeUncheckedCreateNestedManyWithoutNodeInput
  }

  export type LinkUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    canonicalUrl?: StringFieldUpdateOperationsInput | string
    title?: NullableStringFieldUpdateOperationsInput | string | null
    description?: NullableStringFieldUpdateOperationsInput | string | null
    image?: NullableStringFieldUpdateOperationsInput | string | null
    edges?: LinkEdgeUpdateManyWithoutNodeInput
  }

  export type LinkUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    canonicalUrl?: StringFieldUpdateOperationsInput | string
    title?: NullableStringFieldUpdateOperationsInput | string | null
    description?: NullableStringFieldUpdateOperationsInput | string | null
    image?: NullableStringFieldUpdateOperationsInput | string | null
    edges?: LinkEdgeUncheckedUpdateManyWithoutNodeInput
  }

  export type LinkUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    canonicalUrl?: StringFieldUpdateOperationsInput | string
    title?: NullableStringFieldUpdateOperationsInput | string | null
    description?: NullableStringFieldUpdateOperationsInput | string | null
    image?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type LinkUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    canonicalUrl?: StringFieldUpdateOperationsInput | string
    title?: NullableStringFieldUpdateOperationsInput | string | null
    description?: NullableStringFieldUpdateOperationsInput | string | null
    image?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type StringFilter = {
    equals?: string
    in?: Enumerable<string>
    notIn?: Enumerable<string>
    lt?: string
    lte?: string
    gt?: string
    gte?: string
    contains?: string
    startsWith?: string
    endsWith?: string
    mode?: QueryMode
    not?: NestedStringFilter | string
  }

  export type LinkEdgeListRelationFilter = {
    every?: LinkEdgeWhereInput
    some?: LinkEdgeWhereInput
    none?: LinkEdgeWhereInput
  }

  export type RefreshTokenListRelationFilter = {
    every?: RefreshTokenWhereInput
    some?: RefreshTokenWhereInput
    none?: RefreshTokenWhereInput
  }

  export type DateTimeFilter = {
    equals?: Date | string
    in?: Enumerable<Date> | Enumerable<string>
    notIn?: Enumerable<Date> | Enumerable<string>
    lt?: Date | string
    lte?: Date | string
    gt?: Date | string
    gte?: Date | string
    not?: NestedDateTimeFilter | Date | string
  }

  export type LinkEdgeOrderByAggregateInput = {
    count: SortOrder
  }

  export type RefreshTokenOrderByAggregateInput = {
    count: SortOrder
  }

  export type UserRelationFilter = {
    is?: UserWhereInput
    isNot?: UserWhereInput
  }

  export type LinkRelationFilter = {
    is?: LinkWhereInput
    isNot?: LinkWhereInput
  }

  export type LinkEdgeUserIdLinkIdCompoundUniqueInput = {
    userId: string
    linkId: string
  }

  export type StringNullableFilter = {
    equals?: string | null
    in?: Enumerable<string> | null
    notIn?: Enumerable<string> | null
    lt?: string
    lte?: string
    gt?: string
    gte?: string
    contains?: string
    startsWith?: string
    endsWith?: string
    mode?: QueryMode
    not?: NestedStringNullableFilter | string | null
  }

  export type LinkEdgeCreateNestedManyWithoutUserInput = {
    create?: XOR<Enumerable<LinkEdgeCreateWithoutUserInput>, Enumerable<LinkEdgeUncheckedCreateWithoutUserInput>>
    connectOrCreate?: Enumerable<LinkEdgeCreateOrConnectWithoutUserInput>
    connect?: Enumerable<LinkEdgeWhereUniqueInput>
  }

  export type RefreshTokenCreateNestedManyWithoutUserInput = {
    create?: XOR<Enumerable<RefreshTokenCreateWithoutUserInput>, Enumerable<RefreshTokenUncheckedCreateWithoutUserInput>>
    connectOrCreate?: Enumerable<RefreshTokenCreateOrConnectWithoutUserInput>
    connect?: Enumerable<RefreshTokenWhereUniqueInput>
  }

  export type LinkEdgeUncheckedCreateNestedManyWithoutUserInput = {
    create?: XOR<Enumerable<LinkEdgeCreateWithoutUserInput>, Enumerable<LinkEdgeUncheckedCreateWithoutUserInput>>
    connectOrCreate?: Enumerable<LinkEdgeCreateOrConnectWithoutUserInput>
    connect?: Enumerable<LinkEdgeWhereUniqueInput>
  }

  export type RefreshTokenUncheckedCreateNestedManyWithoutUserInput = {
    create?: XOR<Enumerable<RefreshTokenCreateWithoutUserInput>, Enumerable<RefreshTokenUncheckedCreateWithoutUserInput>>
    connectOrCreate?: Enumerable<RefreshTokenCreateOrConnectWithoutUserInput>
    connect?: Enumerable<RefreshTokenWhereUniqueInput>
  }

  export type StringFieldUpdateOperationsInput = {
    set?: string
  }

  export type DateTimeFieldUpdateOperationsInput = {
    set?: Date | string
  }

  export type LinkEdgeUpdateManyWithoutUserInput = {
    create?: XOR<Enumerable<LinkEdgeCreateWithoutUserInput>, Enumerable<LinkEdgeUncheckedCreateWithoutUserInput>>
    connectOrCreate?: Enumerable<LinkEdgeCreateOrConnectWithoutUserInput>
    upsert?: Enumerable<LinkEdgeUpsertWithWhereUniqueWithoutUserInput>
    connect?: Enumerable<LinkEdgeWhereUniqueInput>
    set?: Enumerable<LinkEdgeWhereUniqueInput>
    disconnect?: Enumerable<LinkEdgeWhereUniqueInput>
    delete?: Enumerable<LinkEdgeWhereUniqueInput>
    update?: Enumerable<LinkEdgeUpdateWithWhereUniqueWithoutUserInput>
    updateMany?: Enumerable<LinkEdgeUpdateManyWithWhereWithoutUserInput>
    deleteMany?: Enumerable<LinkEdgeScalarWhereInput>
  }

  export type RefreshTokenUpdateManyWithoutUserInput = {
    create?: XOR<Enumerable<RefreshTokenCreateWithoutUserInput>, Enumerable<RefreshTokenUncheckedCreateWithoutUserInput>>
    connectOrCreate?: Enumerable<RefreshTokenCreateOrConnectWithoutUserInput>
    upsert?: Enumerable<RefreshTokenUpsertWithWhereUniqueWithoutUserInput>
    connect?: Enumerable<RefreshTokenWhereUniqueInput>
    set?: Enumerable<RefreshTokenWhereUniqueInput>
    disconnect?: Enumerable<RefreshTokenWhereUniqueInput>
    delete?: Enumerable<RefreshTokenWhereUniqueInput>
    update?: Enumerable<RefreshTokenUpdateWithWhereUniqueWithoutUserInput>
    updateMany?: Enumerable<RefreshTokenUpdateManyWithWhereWithoutUserInput>
    deleteMany?: Enumerable<RefreshTokenScalarWhereInput>
  }

  export type LinkEdgeUncheckedUpdateManyWithoutUserInput = {
    create?: XOR<Enumerable<LinkEdgeCreateWithoutUserInput>, Enumerable<LinkEdgeUncheckedCreateWithoutUserInput>>
    connectOrCreate?: Enumerable<LinkEdgeCreateOrConnectWithoutUserInput>
    upsert?: Enumerable<LinkEdgeUpsertWithWhereUniqueWithoutUserInput>
    connect?: Enumerable<LinkEdgeWhereUniqueInput>
    set?: Enumerable<LinkEdgeWhereUniqueInput>
    disconnect?: Enumerable<LinkEdgeWhereUniqueInput>
    delete?: Enumerable<LinkEdgeWhereUniqueInput>
    update?: Enumerable<LinkEdgeUpdateWithWhereUniqueWithoutUserInput>
    updateMany?: Enumerable<LinkEdgeUpdateManyWithWhereWithoutUserInput>
    deleteMany?: Enumerable<LinkEdgeScalarWhereInput>
  }

  export type RefreshTokenUncheckedUpdateManyWithoutUserInput = {
    create?: XOR<Enumerable<RefreshTokenCreateWithoutUserInput>, Enumerable<RefreshTokenUncheckedCreateWithoutUserInput>>
    connectOrCreate?: Enumerable<RefreshTokenCreateOrConnectWithoutUserInput>
    upsert?: Enumerable<RefreshTokenUpsertWithWhereUniqueWithoutUserInput>
    connect?: Enumerable<RefreshTokenWhereUniqueInput>
    set?: Enumerable<RefreshTokenWhereUniqueInput>
    disconnect?: Enumerable<RefreshTokenWhereUniqueInput>
    delete?: Enumerable<RefreshTokenWhereUniqueInput>
    update?: Enumerable<RefreshTokenUpdateWithWhereUniqueWithoutUserInput>
    updateMany?: Enumerable<RefreshTokenUpdateManyWithWhereWithoutUserInput>
    deleteMany?: Enumerable<RefreshTokenScalarWhereInput>
  }

  export type UserCreateNestedOneWithoutRefreshTokensInput = {
    create?: XOR<UserCreateWithoutRefreshTokensInput, UserUncheckedCreateWithoutRefreshTokensInput>
    connectOrCreate?: UserCreateOrConnectWithoutRefreshTokensInput
    connect?: UserWhereUniqueInput
  }

  export type UserUpdateOneRequiredWithoutRefreshTokensInput = {
    create?: XOR<UserCreateWithoutRefreshTokensInput, UserUncheckedCreateWithoutRefreshTokensInput>
    connectOrCreate?: UserCreateOrConnectWithoutRefreshTokensInput
    upsert?: UserUpsertWithoutRefreshTokensInput
    connect?: UserWhereUniqueInput
    update?: XOR<UserUpdateWithoutRefreshTokensInput, UserUncheckedUpdateWithoutRefreshTokensInput>
  }

  export type UserCreateNestedOneWithoutLinksInput = {
    create?: XOR<UserCreateWithoutLinksInput, UserUncheckedCreateWithoutLinksInput>
    connectOrCreate?: UserCreateOrConnectWithoutLinksInput
    connect?: UserWhereUniqueInput
  }

  export type LinkCreateNestedOneWithoutEdgesInput = {
    create?: XOR<LinkCreateWithoutEdgesInput, LinkUncheckedCreateWithoutEdgesInput>
    connectOrCreate?: LinkCreateOrConnectWithoutEdgesInput
    connect?: LinkWhereUniqueInput
  }

  export type UserUpdateOneRequiredWithoutLinksInput = {
    create?: XOR<UserCreateWithoutLinksInput, UserUncheckedCreateWithoutLinksInput>
    connectOrCreate?: UserCreateOrConnectWithoutLinksInput
    upsert?: UserUpsertWithoutLinksInput
    connect?: UserWhereUniqueInput
    update?: XOR<UserUpdateWithoutLinksInput, UserUncheckedUpdateWithoutLinksInput>
  }

  export type LinkUpdateOneRequiredWithoutEdgesInput = {
    create?: XOR<LinkCreateWithoutEdgesInput, LinkUncheckedCreateWithoutEdgesInput>
    connectOrCreate?: LinkCreateOrConnectWithoutEdgesInput
    upsert?: LinkUpsertWithoutEdgesInput
    connect?: LinkWhereUniqueInput
    update?: XOR<LinkUpdateWithoutEdgesInput, LinkUncheckedUpdateWithoutEdgesInput>
  }

  export type LinkEdgeCreateNestedManyWithoutNodeInput = {
    create?: XOR<Enumerable<LinkEdgeCreateWithoutNodeInput>, Enumerable<LinkEdgeUncheckedCreateWithoutNodeInput>>
    connectOrCreate?: Enumerable<LinkEdgeCreateOrConnectWithoutNodeInput>
    connect?: Enumerable<LinkEdgeWhereUniqueInput>
  }

  export type LinkEdgeUncheckedCreateNestedManyWithoutNodeInput = {
    create?: XOR<Enumerable<LinkEdgeCreateWithoutNodeInput>, Enumerable<LinkEdgeUncheckedCreateWithoutNodeInput>>
    connectOrCreate?: Enumerable<LinkEdgeCreateOrConnectWithoutNodeInput>
    connect?: Enumerable<LinkEdgeWhereUniqueInput>
  }

  export type NullableStringFieldUpdateOperationsInput = {
    set?: string | null
  }

  export type LinkEdgeUpdateManyWithoutNodeInput = {
    create?: XOR<Enumerable<LinkEdgeCreateWithoutNodeInput>, Enumerable<LinkEdgeUncheckedCreateWithoutNodeInput>>
    connectOrCreate?: Enumerable<LinkEdgeCreateOrConnectWithoutNodeInput>
    upsert?: Enumerable<LinkEdgeUpsertWithWhereUniqueWithoutNodeInput>
    connect?: Enumerable<LinkEdgeWhereUniqueInput>
    set?: Enumerable<LinkEdgeWhereUniqueInput>
    disconnect?: Enumerable<LinkEdgeWhereUniqueInput>
    delete?: Enumerable<LinkEdgeWhereUniqueInput>
    update?: Enumerable<LinkEdgeUpdateWithWhereUniqueWithoutNodeInput>
    updateMany?: Enumerable<LinkEdgeUpdateManyWithWhereWithoutNodeInput>
    deleteMany?: Enumerable<LinkEdgeScalarWhereInput>
  }

  export type LinkEdgeUncheckedUpdateManyWithoutNodeInput = {
    create?: XOR<Enumerable<LinkEdgeCreateWithoutNodeInput>, Enumerable<LinkEdgeUncheckedCreateWithoutNodeInput>>
    connectOrCreate?: Enumerable<LinkEdgeCreateOrConnectWithoutNodeInput>
    upsert?: Enumerable<LinkEdgeUpsertWithWhereUniqueWithoutNodeInput>
    connect?: Enumerable<LinkEdgeWhereUniqueInput>
    set?: Enumerable<LinkEdgeWhereUniqueInput>
    disconnect?: Enumerable<LinkEdgeWhereUniqueInput>
    delete?: Enumerable<LinkEdgeWhereUniqueInput>
    update?: Enumerable<LinkEdgeUpdateWithWhereUniqueWithoutNodeInput>
    updateMany?: Enumerable<LinkEdgeUpdateManyWithWhereWithoutNodeInput>
    deleteMany?: Enumerable<LinkEdgeScalarWhereInput>
  }

  export type NestedStringFilter = {
    equals?: string
    in?: Enumerable<string>
    notIn?: Enumerable<string>
    lt?: string
    lte?: string
    gt?: string
    gte?: string
    contains?: string
    startsWith?: string
    endsWith?: string
    not?: NestedStringFilter | string
  }

  export type NestedDateTimeFilter = {
    equals?: Date | string
    in?: Enumerable<Date> | Enumerable<string>
    notIn?: Enumerable<Date> | Enumerable<string>
    lt?: Date | string
    lte?: Date | string
    gt?: Date | string
    gte?: Date | string
    not?: NestedDateTimeFilter | Date | string
  }

  export type NestedStringNullableFilter = {
    equals?: string | null
    in?: Enumerable<string> | null
    notIn?: Enumerable<string> | null
    lt?: string
    lte?: string
    gt?: string
    gte?: string
    contains?: string
    startsWith?: string
    endsWith?: string
    not?: NestedStringNullableFilter | string | null
  }

  export type LinkEdgeCreateWithoutUserInput = {
    createdAt?: Date | string
    node: LinkCreateNestedOneWithoutEdgesInput
  }

  export type LinkEdgeUncheckedCreateWithoutUserInput = {
    createdAt?: Date | string
    linkId: string
  }

  export type LinkEdgeCreateOrConnectWithoutUserInput = {
    where: LinkEdgeWhereUniqueInput
    create: XOR<LinkEdgeCreateWithoutUserInput, LinkEdgeUncheckedCreateWithoutUserInput>
  }

  export type RefreshTokenCreateWithoutUserInput = {
    id?: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type RefreshTokenUncheckedCreateWithoutUserInput = {
    id?: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type RefreshTokenCreateOrConnectWithoutUserInput = {
    where: RefreshTokenWhereUniqueInput
    create: XOR<RefreshTokenCreateWithoutUserInput, RefreshTokenUncheckedCreateWithoutUserInput>
  }

  export type LinkEdgeUpsertWithWhereUniqueWithoutUserInput = {
    where: LinkEdgeWhereUniqueInput
    update: XOR<LinkEdgeUpdateWithoutUserInput, LinkEdgeUncheckedUpdateWithoutUserInput>
    create: XOR<LinkEdgeCreateWithoutUserInput, LinkEdgeUncheckedCreateWithoutUserInput>
  }

  export type LinkEdgeUpdateWithWhereUniqueWithoutUserInput = {
    where: LinkEdgeWhereUniqueInput
    data: XOR<LinkEdgeUpdateWithoutUserInput, LinkEdgeUncheckedUpdateWithoutUserInput>
  }

  export type LinkEdgeUpdateManyWithWhereWithoutUserInput = {
    where: LinkEdgeScalarWhereInput
    data: XOR<LinkEdgeUpdateManyMutationInput, LinkEdgeUncheckedUpdateManyWithoutLinksInput>
  }

  export type LinkEdgeScalarWhereInput = {
    AND?: Enumerable<LinkEdgeScalarWhereInput>
    OR?: Enumerable<LinkEdgeScalarWhereInput>
    NOT?: Enumerable<LinkEdgeScalarWhereInput>
    createdAt?: DateTimeFilter | Date | string
    userId?: StringFilter | string
    linkId?: StringFilter | string
  }

  export type RefreshTokenUpsertWithWhereUniqueWithoutUserInput = {
    where: RefreshTokenWhereUniqueInput
    update: XOR<RefreshTokenUpdateWithoutUserInput, RefreshTokenUncheckedUpdateWithoutUserInput>
    create: XOR<RefreshTokenCreateWithoutUserInput, RefreshTokenUncheckedCreateWithoutUserInput>
  }

  export type RefreshTokenUpdateWithWhereUniqueWithoutUserInput = {
    where: RefreshTokenWhereUniqueInput
    data: XOR<RefreshTokenUpdateWithoutUserInput, RefreshTokenUncheckedUpdateWithoutUserInput>
  }

  export type RefreshTokenUpdateManyWithWhereWithoutUserInput = {
    where: RefreshTokenScalarWhereInput
    data: XOR<RefreshTokenUpdateManyMutationInput, RefreshTokenUncheckedUpdateManyWithoutRefreshTokensInput>
  }

  export type RefreshTokenScalarWhereInput = {
    AND?: Enumerable<RefreshTokenScalarWhereInput>
    OR?: Enumerable<RefreshTokenScalarWhereInput>
    NOT?: Enumerable<RefreshTokenScalarWhereInput>
    id?: StringFilter | string
    createdAt?: DateTimeFilter | Date | string
    updatedAt?: DateTimeFilter | Date | string
    userId?: StringFilter | string
  }

  export type UserCreateWithoutRefreshTokensInput = {
    id?: string
    username: string
    hash: string
    createdAt?: Date | string
    updatedAt?: Date | string
    links?: LinkEdgeCreateNestedManyWithoutUserInput
  }

  export type UserUncheckedCreateWithoutRefreshTokensInput = {
    id?: string
    username: string
    hash: string
    createdAt?: Date | string
    updatedAt?: Date | string
    links?: LinkEdgeUncheckedCreateNestedManyWithoutUserInput
  }

  export type UserCreateOrConnectWithoutRefreshTokensInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutRefreshTokensInput, UserUncheckedCreateWithoutRefreshTokensInput>
  }

  export type UserUpsertWithoutRefreshTokensInput = {
    update: XOR<UserUpdateWithoutRefreshTokensInput, UserUncheckedUpdateWithoutRefreshTokensInput>
    create: XOR<UserCreateWithoutRefreshTokensInput, UserUncheckedCreateWithoutRefreshTokensInput>
  }

  export type UserUpdateWithoutRefreshTokensInput = {
    id?: StringFieldUpdateOperationsInput | string
    username?: StringFieldUpdateOperationsInput | string
    hash?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    links?: LinkEdgeUpdateManyWithoutUserInput
  }

  export type UserUncheckedUpdateWithoutRefreshTokensInput = {
    id?: StringFieldUpdateOperationsInput | string
    username?: StringFieldUpdateOperationsInput | string
    hash?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    links?: LinkEdgeUncheckedUpdateManyWithoutUserInput
  }

  export type UserCreateWithoutLinksInput = {
    id?: string
    username: string
    hash: string
    createdAt?: Date | string
    updatedAt?: Date | string
    refreshTokens?: RefreshTokenCreateNestedManyWithoutUserInput
  }

  export type UserUncheckedCreateWithoutLinksInput = {
    id?: string
    username: string
    hash: string
    createdAt?: Date | string
    updatedAt?: Date | string
    refreshTokens?: RefreshTokenUncheckedCreateNestedManyWithoutUserInput
  }

  export type UserCreateOrConnectWithoutLinksInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutLinksInput, UserUncheckedCreateWithoutLinksInput>
  }

  export type LinkCreateWithoutEdgesInput = {
    id?: string
    createdAt?: Date | string
    updatedAt?: Date | string
    canonicalUrl: string
    title?: string | null
    description?: string | null
    image?: string | null
  }

  export type LinkUncheckedCreateWithoutEdgesInput = {
    id?: string
    createdAt?: Date | string
    updatedAt?: Date | string
    canonicalUrl: string
    title?: string | null
    description?: string | null
    image?: string | null
  }

  export type LinkCreateOrConnectWithoutEdgesInput = {
    where: LinkWhereUniqueInput
    create: XOR<LinkCreateWithoutEdgesInput, LinkUncheckedCreateWithoutEdgesInput>
  }

  export type UserUpsertWithoutLinksInput = {
    update: XOR<UserUpdateWithoutLinksInput, UserUncheckedUpdateWithoutLinksInput>
    create: XOR<UserCreateWithoutLinksInput, UserUncheckedCreateWithoutLinksInput>
  }

  export type UserUpdateWithoutLinksInput = {
    id?: StringFieldUpdateOperationsInput | string
    username?: StringFieldUpdateOperationsInput | string
    hash?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    refreshTokens?: RefreshTokenUpdateManyWithoutUserInput
  }

  export type UserUncheckedUpdateWithoutLinksInput = {
    id?: StringFieldUpdateOperationsInput | string
    username?: StringFieldUpdateOperationsInput | string
    hash?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    refreshTokens?: RefreshTokenUncheckedUpdateManyWithoutUserInput
  }

  export type LinkUpsertWithoutEdgesInput = {
    update: XOR<LinkUpdateWithoutEdgesInput, LinkUncheckedUpdateWithoutEdgesInput>
    create: XOR<LinkCreateWithoutEdgesInput, LinkUncheckedCreateWithoutEdgesInput>
  }

  export type LinkUpdateWithoutEdgesInput = {
    id?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    canonicalUrl?: StringFieldUpdateOperationsInput | string
    title?: NullableStringFieldUpdateOperationsInput | string | null
    description?: NullableStringFieldUpdateOperationsInput | string | null
    image?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type LinkUncheckedUpdateWithoutEdgesInput = {
    id?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    canonicalUrl?: StringFieldUpdateOperationsInput | string
    title?: NullableStringFieldUpdateOperationsInput | string | null
    description?: NullableStringFieldUpdateOperationsInput | string | null
    image?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type LinkEdgeCreateWithoutNodeInput = {
    createdAt?: Date | string
    user: UserCreateNestedOneWithoutLinksInput
  }

  export type LinkEdgeUncheckedCreateWithoutNodeInput = {
    createdAt?: Date | string
    userId: string
  }

  export type LinkEdgeCreateOrConnectWithoutNodeInput = {
    where: LinkEdgeWhereUniqueInput
    create: XOR<LinkEdgeCreateWithoutNodeInput, LinkEdgeUncheckedCreateWithoutNodeInput>
  }

  export type LinkEdgeUpsertWithWhereUniqueWithoutNodeInput = {
    where: LinkEdgeWhereUniqueInput
    update: XOR<LinkEdgeUpdateWithoutNodeInput, LinkEdgeUncheckedUpdateWithoutNodeInput>
    create: XOR<LinkEdgeCreateWithoutNodeInput, LinkEdgeUncheckedCreateWithoutNodeInput>
  }

  export type LinkEdgeUpdateWithWhereUniqueWithoutNodeInput = {
    where: LinkEdgeWhereUniqueInput
    data: XOR<LinkEdgeUpdateWithoutNodeInput, LinkEdgeUncheckedUpdateWithoutNodeInput>
  }

  export type LinkEdgeUpdateManyWithWhereWithoutNodeInput = {
    where: LinkEdgeScalarWhereInput
    data: XOR<LinkEdgeUpdateManyMutationInput, LinkEdgeUncheckedUpdateManyWithoutEdgesInput>
  }

  export type LinkEdgeUpdateWithoutUserInput = {
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    node?: LinkUpdateOneRequiredWithoutEdgesInput
  }

  export type LinkEdgeUncheckedUpdateWithoutUserInput = {
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    linkId?: StringFieldUpdateOperationsInput | string
  }

  export type LinkEdgeUncheckedUpdateManyWithoutLinksInput = {
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    linkId?: StringFieldUpdateOperationsInput | string
  }

  export type RefreshTokenUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type RefreshTokenUncheckedUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type RefreshTokenUncheckedUpdateManyWithoutRefreshTokensInput = {
    id?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type LinkEdgeUpdateWithoutNodeInput = {
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: UserUpdateOneRequiredWithoutLinksInput
  }

  export type LinkEdgeUncheckedUpdateWithoutNodeInput = {
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    userId?: StringFieldUpdateOperationsInput | string
  }

  export type LinkEdgeUncheckedUpdateManyWithoutEdgesInput = {
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    userId?: StringFieldUpdateOperationsInput | string
  }



  /**
   * Batch Payload for updateMany & deleteMany & createMany
   */

  export type BatchPayload = {
    count: number
  }

  /**
   * DMMF
   */
  export const dmmf: runtime.DMMF.Document;
}