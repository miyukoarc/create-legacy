/**
 * @description: Get environment variables
 * @returns:
 */
export function getEnv(): string {
  return import.meta.env.MODE;
}

/**
 * @description: Is it a development mode
 * @returns:
 */
export function isDevMode(): boolean {
  return import.meta.env.DEV;
}

/**
 * @description: Is it a production mode
 * @returns:
 */
export function isProdMode(): boolean {
  return import.meta.env.PROD;
}
