import LZString from "lz-string";

const PREFIX = "aksara_";

// Types
interface SetOptions {
  compress?: boolean;
  ttl?: number | null; // milliseconds
}

interface GetOptions {
  compressed?: boolean;
}

interface StoredData<T> {
  value: T;
  expires?: number;
}

export const storage = {
  set<T>(key: string, value: T, options: SetOptions = {}): void {
    const { compress = false, ttl = null } = options;

    try {
      const data: StoredData<T> = { value };

      if (ttl) {
        data.expires = Date.now() + ttl;
      }

      let json = JSON.stringify(data);
      if (compress) {
        json = LZString.compress(json) ?? "";
      }

      localStorage.setItem(PREFIX + key, json);
    } catch (err) {
      console.error("Storage set error:", err);
    }
  },

  get<T>(key: string, options: GetOptions = {}): T | null {
    const { compressed = false } = options;

    try {
      let json = localStorage.getItem(PREFIX + key);
      if (!json) return null;

      if (compressed) {
        json = LZString.decompress(json) ?? "";
      }

      const data: StoredData<T> = JSON.parse(json);

      if (data.expires && Date.now() > data.expires) {
        localStorage.removeItem(PREFIX + key);
        return null;
      }

      return data.value;
    } catch (err) {
      console.error("Storage get error:", err);
      return null;
    }
  },

  remove(key: string): void {
    localStorage.removeItem(PREFIX + key);
  },
};
