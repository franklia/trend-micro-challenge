'use strict';
const AWS = require('aws-sdk');
require('dotenv').config();

AWS.config.update({ region: 'us-east-1' });
const ec2 = new AWS.EC2();

module.exports.getSecurityGroups = async (event) => {
  const ec2 = new AWS.EC2({ apiVersion: '2016-11-15' });

  const params = {
    GroupIds: [process.env.AWS_SECURITY_GROUP_ID_1, process.env.AWS_SECURITY_GROUP_ID_2],
  };

  try {
    const response = await ec2.describeSecurityGroups(params).promise();
    console.log('response: ', response);
    // I'm returning the group names only for security reasons since I'm new to serverless and
    // can't be sure of all the security precautions required to protect my data, but if you
    // want to return all data, comment out the line below and enter `response.SecurityGroups`
    // inside JSON.stringify on the 4th line below
    const securityGroups = response.SecurityGroups.map((group) => group.GroupName);
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
