import assert from 'assert';
import { basename, sep } from 'path';
import OrderApp from '../src/order-app';
import { readFile } from '../src/output/utils';

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

});
