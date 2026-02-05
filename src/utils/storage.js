const STORAGE_PREFIX = "@streakCalendar:"

export const storage = {
  set(key, value) {
    try {
      localStorage.setItem(`${STORAGE_PREFIX}${key}`, String(value))
    } catch (error) {
      console.error('Storage error:', error);
    }
  },
  get(key) {
    try {
      return localStorage.getItem(`${STORAGE_PREFIX}${key}`)
    } catch (error) {
      console.error('Storage error:', error);
      return null
    }
  }
}