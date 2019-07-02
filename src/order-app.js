import OrderRepresentation from './output/order-representation';
import OrderItem from './output/order-item';
import DiscountItem from './output/discount-item';
import User from './app/user';
import Product from './app/product';
import Discount from './app/discount';

export default class OrderApp {

  getOrderItems(id, amount) {
    const { productNo, productName, price } = new Product().getProduct(id);
    const subTotal = price * amount;
    return { productNo, productName, price, amount, subTotal };
  }
  getDiscountsItem(id, amount) {
    const { productNo, productName, price, canUseActivity } = new Product().getProduct(id);
    const subTotal = price * amount;
    const { money } = (new Discount()).getLastDiscount({ productNo, productName, price, canUseActivity, amount, subTotal });
    return { productNo, productName, discount: -money };
  }
  getDiscountsName(id, amount) {
    const { productNo, productName, price, canUseActivity } = new Product().getProduct(id);
    const subTotal = price * amount;
    const { activity, money } = (new Discount()).getLastDiscount({ productNo, productName, price, canUseActivity, amount, subTotal });
    return { name: activity.name, type: activity.type, discount: -money };
  }

  checkout(orderCommand) {
    // TODO: 请完成需求指定的功能

    const { orderId, createTime, memberId, items } = JSON.parse(orderCommand);
    // 用户信息
    const { memberNo,memberName, memberPoIncreased, memberPoints: oldPoints, level } = new User(memberId).getUser();
    // 商品列表
    const orderItems = items.map(item => {
      return new OrderItem(this.getOrderItems(item.product, item.amount));
    });
    // 商品总价
    const totalPrice = items.reduce((prev, item) => {
      const cutTotal = this.getOrderItems(item.product, item.amount).subTotal;
      return prev += cutTotal;
    }, 0);
    // 优惠清单
    const discounts = items.map(item => {
      return new DiscountItem(this.getDiscountsItem(item.product, item.amount));
    }).filter(item => {
      return item.discount < 0;
    });
    // 优惠总金额
    const totalDiscountPrice = discounts.reduce((prev, item) => {
      return prev -= item.discount;
    }, 0);
    // 优惠券列表
    const discountCards = items.map(item => {
      return this.getDiscountsName(item.product, item.amount);
    }).filter(item => {
      return item.discount < 0 && item.type == 0;
    }).map(item => {
      return item.name;
    });
    // 实际支付
    const receivables = totalPrice - totalDiscountPrice;
    // 支付方式
    const payments = [
      {
        type: '余额支付',
        amount: receivables
      }
    ];
    // 积分
    const memberPointsIncreased = receivables * level.multiple;
    const memberPoints = Number(oldPoints) + Number(memberPointsIncreased);
    const newMemberType = new User(memberId).getUserLevel(memberPoints).name;

    const data = {
      createTime: new Date(createTime),
      orderId,
      memberNo,
      memberName,
      memberPoIncreased,
      memberPoints,
      newMemberType,
      oldMemberType:level.name,
      orderItems,
      totalPrice,
      totalDiscountPrice,
      discountCards,
      payments,
      memberPointsIncreased,
      receivables,
      discounts
    };
    return (new OrderRepresentation(data)).toString();
  }
}
