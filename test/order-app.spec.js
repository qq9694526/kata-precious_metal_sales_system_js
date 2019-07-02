import assert from 'assert';
import { basename, sep } from 'path';
import OrderApp from '../src/order-app';
import { readFile } from '../src/output/utils';

import User from '../src/app/user';
describe('OrderApp', () => {
  const resourcesDir = `${__dirname}${sep}resources${sep}`;
  const parameters = [
    { inputFile: `${resourcesDir}simple_command.json`, outputFile: `${resourcesDir}sample_result.txt` }
  ];

  parameters.forEach((param) => {
    it(`如果输入的文件为${basename(param.inputFile)}，当调用 OrderApp.checkout() 方法，则得到期望的结果${basename(param.outputFile)} 文件中的字符串`, async () => {
      const inputStr = await readFile(param.inputFile, 'utf8');
      const actualRepresentation = (new OrderApp()).checkout(inputStr);

      const expectedResult = await readFile(param.outputFile, 'utf8');
      assert.equal(actualRepresentation, expectedResult.trim());
    });
  });

  it('当调用 OrderApp.getUser() 方法，期望得到关于用户信息', async () => {
    const inputStr = await readFile(`${resourcesDir}simple_command.json`, 'utf8');
    const actualRepresentation = (new OrderApp()).getUser(inputStr);
    assert.deepEqual(actualRepresentation, {
      memberNo: '6236609999',
      memberName: '马丁',
      memberPoIncreased: 2,
      memberPoints: 19720,
      newMemberType: '金卡'
    });
  });
  it('当调用 User.getUserLevel() 方法，入参为1922，期望得到用户等级为普卡', async () => {
    const actualRepresentation = (new User()).getUserLevel(1922);
    assert.deepEqual(actualRepresentation, {
      name: '普卡',
      scope: [0, 10000],
      multiple: 1
    });
  });
  it('当调用 User.getUserLevel() 方法，入参为10000，期望得到用户等级为金卡', async () => {
    const actualRepresentation = (new User()).getUserLevel(10000);
    assert.deepEqual(actualRepresentation, {
      name: '金卡',
      scope: [10000, 50000],
      multiple: 1.5
  });
  });
  it('当调用 User.getUserLevel() 方法，入参为9999999，期望得到用户等级为钻石卡', async () => {
    const actualRepresentation = (new User()).getUserLevel(9999999);
    assert.deepEqual(actualRepresentation, {
      name: '钻石卡',
      scope: [100000, Infinity],
      multiple: 2
    });
  });

});
