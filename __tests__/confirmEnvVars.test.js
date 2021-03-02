const confirmEnvVars = require('../helpers/confirmEnvVars');

describe(`Helper confirmEnvVars`, () => {
  test(`That the envVars is not an empty array`, () => {
    expect.assertions(1);
    const emptyEnvVars = [];
    try {
      confirmEnvVars(process.env, emptyEnvVars);
    } catch (err) {
      expect(err).toEqual(new Error('Your envVars array is empty'));
    }
  });

  test(`Required envVars should exist`, () => {
    const requiredEnvVars = ['AWS_SECURITY_GROUP_ID_1', 'AWS_SECURITY_GROUP_ID_2'];
    const result = confirmEnvVars(process.env, requiredEnvVars);
    expect(result).toEqual([]);
  });

  test(`Reject if an env variable entered does not exist`, () => {
    const incorrectEnvVars = ['DUMMY_VALUE'];
    const result = confirmEnvVars(process.env, incorrectEnvVars);
    expect(result).toEqual(['DUMMY_VALUE']);
  });
});
