import Redis from 'ioredis';
import { ConnectionString } from 'connection-string';
import DataLoader from 'dataloader';
import { Store } from 'keyv';

export class RedisStore implements Store<string> {
  private client: Redis.Redis;
  private loader: DataLoader<string, string | null>;

  constructor(uri: string) {
    const redisCredentials = new ConnectionString(uri);

    this.client = new Redis({
      host: redisCredentials.hosts![0].name,
      port: redisCredentials.hosts![0].port,
      password: redisCredentials.password,
    });

    this.loader = new DataLoader(
      keys => this.client.mget(...keys),
      { cache: false }
    );
  }

  async set(
    key: string,
    value: string,
    ttl?: number,
  ): Promise<void> {
    if (ttl != null) {
      await this.client.set(key, value, 'EX', ttl);
    } else {
      await this.client.set(key, value);
    }
  }

  async get(key: string): Promise<string | undefined> {
    const reply = await this.loader.load(key);
    if (reply !== null) {
      return reply;
    }
    return;
  }

  async delete(key: string): Promise<boolean> {
    return !!(await this.client.del(key));
  }

  async clear(): Promise<void> {
    await this.client.flushdb();
  }
}


