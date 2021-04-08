import ms from 'ms';
import Redis from 'ioredis';
import { FastifyInstance, FastifyLoggerInstance } from 'fastify';
import { ConnectionString } from 'connection-string';
import { Store } from 'keyv';

export interface Options {
  uri: string;
  minTtl?: number;
}

export class RedisStore implements Store<string> {
  private client: Redis.Redis;
  private log: FastifyLoggerInstance;
  private minTtl: number;

  constructor(app: FastifyInstance, opts: Options) {
    const redisCredentials = new ConnectionString(opts.uri);
    this.minTtl = opts.minTtl || 0;
    this.log = app.log;

    const additionalOptions = {
      commandTimeout: ms('200ms'),
    } as Redis.RedisOptions;

    this.client = new Redis({
      host: redisCredentials.hosts![0].name,
      port: redisCredentials.hosts![0].port,
      password: redisCredentials.password,
      dropBufferSupport: true,
      enableAutoPipelining: true,
      autoResubscribe: false,
      autoResendUnfulfilledCommands: true,
      enableOfflineQueue: true,
      keepAlive: ms('2min'),
      lazyConnect: true,
      retryStrategy: (times) => Math.min(times * 20, 500),
      reconnectOnError: () => 2 as const,
      ...additionalOptions,
    });

    this.client.on('close', () => {
      this.log.warn('ioredis lost connection');
    });

    this.client.on('reconnecting', (delay: number) => {
      this.log.warn(`ioredis is reconnecting (after ${delay}ms)`);
    });

    this.client.on('error', (error) => {
      this.log.error(`${error}`);
    });

    this.client.on('end', () => {
      this.log.error('ioredis has ended its connection');
      this.client.connect().catch((error) => {
        this.log.error(
          `ioredis could not reestablish its connection: ${error}`
        );
        process.exit(1);
      });
    });
  }

  async set(key: string, value: string, maxTtl?: number): Promise<void> {
    try {
      if (maxTtl != null) {
        const ttl = Math.max(this.minTtl, maxTtl);
        await this.client.set(key, value, 'EX', ttl);
      } else {
        await this.client.set(key, value);
      }
    } catch (error) {
      this.log.error(error.message);
    }
  }

  async get(key: string): Promise<string | undefined> {
    const reply = await this.client.get(key);
    return reply != null ? reply : undefined;
  }

  async delete(key: string): Promise<boolean> {
    return !!(await this.client.del(key));
  }

  async clear(): Promise<void> {
    await this.client.flushdb();
  }
}
