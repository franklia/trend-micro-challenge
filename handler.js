'use strict';
const SecurityGroups = require('./classes/securityGroups');
const confirmEnvVars = require('./helpers/confirmEnvVars');
require('dotenv').config();

const securityGroups = new SecurityGroups();

module.exports.getSecurityGroups = async (event, context, callback) => {
  /* 
    For the purposes of this tech challenge, I am stipulating that the number of security
    groups will always be known for this lambda function. They may increase or decrease over
    time, but they will always be known and entered below. I have written the tests with
    that logic in mind.
  */
  const envVars = ['AWS_SECURITY_GROUP_ID_1', 'AWS_SECURITY_GROUP_ID_2'];

  try {
    // Confirm that id's exist, if not return info about ommitted env vars
    const ommitted = confirmEnvVars(process.env, envVars);

    if (ommitted.length) {
      const envVars = ommitted.join(', ');
      return `The following environment variables are missing: ${envVars}`;
    }
  } catch (err) {
    console.log('Error: ', err);
    return `The following error occurred: ${err}`;
  }

  /*
    Extract business logic into a separate function to make testing easier, and to avoid
    being bound to the FaaS provider
  */
  return securityGroups.listSecurityGroups(envVars);
};
