require('dotenv').config();

confirmEnvVars = (env, envVars) => {
  if (envVars.length < 1) {
    throw new Error('Your envVars array is empty');
  }

  const ommitted = [];

  envVars.forEach((envVar) => {
    if (!env[envVar]) {
      ommitted.push(envVar);
    }
  });

  return ommitted;
};

module.exports = confirmEnvVars;
