/**
 * StorageService
 * localStorage操作を抽象化し、エラーハンドリングを提供
 */
export class StorageService {
  /**
   * データをlocalStorageに保存
   * @param key - ストレージキー
   * @param data - 保存するデータ
   */
  static save(key: string, data: unknown): void {
    try {
      const serialized = JSON.stringify(data);
      localStorage.setItem(key, serialized);
    } catch (error) {
      if (error instanceof DOMException && error.name === 'QuotaExceededError') {
        console.error('localStorage quota exceeded. Please clear old data.');
        throw new Error('Storage quota exceeded');
      } else {
        console.error('Failed to save to localStorage:', error);
        throw error;
      }
    }
  }

  /**
   * localStorageからデータを読み込み
   * @param key - ストレージキー
   * @returns 読み込んだデータ、存在しない場合はnull
   */
  static load<T>(key: string): T | null {
    try {
      const serialized = localStorage.getItem(key);
      if (serialized === null) {
        return null;
      }
      return JSON.parse(serialized) as T;
    } catch (error) {
      console.error('Failed to load from localStorage:', error);
      return null;
    }
  }

  /**
   * localStorageから指定キーのデータを削除
   * @param key - ストレージキー
   */
  static remove(key: string): void {
    try {
      localStorage.removeItem(key);
    } catch (error) {
      console.error('Failed to remove from localStorage:', error);
    }
  }

  /**
   * localStorageの全データをクリア
   */
  static clear(): void {
    try {
      localStorage.clear();
    } catch (error) {
      console.error('Failed to clear localStorage:', error);
    }
  }
}
