const SecurityGroups = require('../classes/securityGroups');
const AWSMock = require('aws-sdk-mock');
require('dotenv').config();

const securityGroups = new SecurityGroups();

describe('listSecurityGroups function', () => {
  const envVars = ['AWS_SECURITY_GROUP_ID_1', 'AWS_SECURITY_GROUP_ID_2'];
  let describeSecurityGroupsSpy = jest.fn();

  beforeEach(() => {
    AWSMock.mock('EC2', 'describeSecurityGroups', describeSecurityGroupsSpy);
  });

  afterEach(() => {
    AWSMock.restore('EC2');
    describeSecurityGroupsSpy.mockClear();
  });

  test('promise resolves from AWS', async () => {
    describeSecurityGroupsSpy.mockImplementation(() => {
      return new Promise((resolve, reject) => {
        resolve({
          SecurityGroups: [
            {
              Description: 'Test description 1',
              GroupName: 'SecurityGroup 1',
              IpPermissions: [],
              OwnerId: '111',
              GroupId: 'GroupId1',
              IpPermissionsEgress: [],
              Tags: [],
              VpcId: 'VpcId1',
            },
            {
              Description: 'Test description 2',
              GroupName: 'SecurityGroup 2',
              IpPermissions: [],
              OwnerId: '111',
              GroupId: 'GroupId2',
              IpPermissionsEgress: [],
              Tags: [],
              VpcId: 'VpcId2',
            },
          ],
        });
      });
    });

    const result = await securityGroups.listSecurityGroups(envVars);
    expect(describeSecurityGroupsSpy).toHaveBeenCalledTimes(1);
    expect(result).toEqual({ statusCode: 200, body: '["SecurityGroup 1","SecurityGroup 2"]' });
  });

  test('promise rejected from AWS', async () => {
    describeSecurityGroupsSpy.mockImplementation(() => {
      return new Promise((resolve, reject) => {
        reject('AWS is currently offline');
      });
    });

    const result = await securityGroups.listSecurityGroups(envVars);
    expect(describeSecurityGroupsSpy).toHaveBeenCalledTimes(1);
    expect(result).toEqual({ statusCode: 500, body: '{"Error: ":"AWS is currently offline"}' });
  });
});
