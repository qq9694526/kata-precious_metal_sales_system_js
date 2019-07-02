import assert from 'assert';
import { basename, sep } from 'path';
import OrderApp from '../src/order-app';
import { readFile } from '../src/output/utils';

import User from '../src/app/user';
import Product from '../src/app/product';
import Discount from '../src/app/discount';

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
    const actualRepresentation = (new User('6236609999')).getUser();
    assert.deepEqual(actualRepresentation, {
      memberNo: '6236609999',
      memberName: '马丁',
      memberPoIncreased: 2,
      memberPoints: 19720,
      newMemberType: '金卡'
    });
  });
  // 用户信息相关用例
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
  // 商品信息相关用例
  // it('当调用 Product.getProduct() 方法，入参为001001，期望得到对应产品信息', async () => {
  //   const product = (new Product()).getProduct('001001');
  //   assert.deepEqual(product, { productNo: '001001', productName: '世园会五十国钱币册', price: 998.00, unit: '册' });
  // });
  // it('当调用 Product.getProduct() 方法，入参为00333001，期望得到null', async () => {
  //   const product = (new Product()).getProduct('00333001');
  //   assert.equal(product, null);
  // });
  // it('当调用 Product.getProduct() 方法，入参为002001，期望得到对应产品信息', async () => {
  //   const product = (new Product()).getProduct('002001');
  //   assert.deepEqual(product, { productNo: '002001', productName: '扩之羽比翼双飞4.8g', price: 1080.00, unit: '条' });
  // });


  // 优惠金额测试用例
  it('当调用 Discount.getLastDiscount() 方法,入参002001和2，期望得到对应的最终优惠金额108', async () => {
    const getOrderItems = (id, amount) => {
      const { productNo, productName, price, canUseActivity } = new Product().getProduct(id);
      const subTotal = price * amount;
      return { productNo, productName, price, canUseActivity, amount, subTotal };
    };
    const discount = (new Discount()).getLastDiscount(getOrderItems('002001', 2)).money;
    console.log(discount);
    assert.equal(discount, 108);
  });
  it('当调用 Discount.getLastDiscount() 方法,入参001001和2，期望得到对应的最终优惠金额0', async () => {
    const getOrderItems = (id, amount) => {
      const { productNo, productName, price, canUseActivity } = new Product().getProduct(id);
      const subTotal = price * amount;
      return { productNo, productName, price, canUseActivity, amount, subTotal };
    };
    const discount = (new Discount()).getLastDiscount(getOrderItems('001001', 2)).money;
    console.log(discount);
    assert.equal(discount, 0);
  });
  it('当调用 Discount.getLastDiscount() 方法,入参001002和3，期望得到对应的最终优惠金额414', async () => {
    const getOrderItems = (id, amount) => {
      const { productNo, productName, price, canUseActivity } = new Product().getProduct(id);
      const subTotal = price * amount;
      return { productNo, productName, price, canUseActivity, amount, subTotal };
    };
    const discount = (new Discount()).getLastDiscount(getOrderItems('001002', 3)).money;
    console.log(discount);
    assert.equal(discount, 414);
  });
  it('当调用 Discount.getLastDiscount() 方法,入参002002和1，期望得到对应的最终优惠金额0', async () => {
    const getOrderItems = (id, amount) => {
      const { productNo, productName, price, canUseActivity } = new Product().getProduct(id);
      const subTotal = price * amount;
      return { productNo, productName, price, canUseActivity, amount, subTotal };
    };
    const discount = (new Discount()).getLastDiscount(getOrderItems('002002', 1)).money;
    console.log(discount);
    assert.equal(discount, 0);
  });
  it('当调用 Discount.getLastDiscount() 方法,入参002003和5，期望得到对应的最终优惠金额350', async () => {
    const getOrderItems = (id, amount) => {
      const { productNo, productName, price, canUseActivity } = new Product().getProduct(id);
      const subTotal = price * amount;
      return { productNo, productName, price, canUseActivity, amount, subTotal };
    };
    const discount = (new Discount()).getLastDiscount(getOrderItems('002003', 5)).money;
    console.log(discount);
    assert.equal(discount, 350);
  });
  

});
