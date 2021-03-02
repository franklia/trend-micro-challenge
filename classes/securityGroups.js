const AWS = require('aws-sdk');
AWS.config.update({ region: 'us-east-1' });

class SecurityGroups {
  listSecurityGroups = async (envVars) => {
    const ec2 = new AWS.EC2({ apiVersion: '2016-11-15' });

    try {
      const groupIds = envVars.map((envName, index) => {
        return process.env[envName];
      });

      const params = {
        GroupIds: groupIds,
      };

      const response = await ec2.describeSecurityGroups(params).promise();

      // server log
      console.log('Raw response: ', response);

      // I'm returning the group names only for security reasons since I'm new to serverless and
      // can't be sure of all the security precautions required to protect my data, but if you
      // want to return all data, comment out the line below and enter `response.SecurityGroups`
      // inside JSON.stringify on the 4th line below
      const securityGroups = response.SecurityGroups.map((group) => group.GroupName);

      // server log
      console.log('securityGroups: ', securityGroups);

      return {
        statusCode: 200,
        body: JSON.stringify(securityGroups),
      };
    } catch (err) {
      return {
        statusCode: 500,
        body: JSON.stringify({ 'Error: ': err }),
      };
    }
  };
}

module.exports = SecurityGroups;
