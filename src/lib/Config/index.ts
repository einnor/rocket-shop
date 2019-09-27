/**
 * Get the value of an environment variable, or throw an `Error` if it is not defined.
 *
 * @param variable
 */
export const get = (variable: string) => {
  const configValue = process.env[variable];

  if (typeof configValue !== 'string') {
    throw new Error(`Missing environment variable: ${variable}`);
  }

  return configValue;
};
