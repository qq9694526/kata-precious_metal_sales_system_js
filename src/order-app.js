import OrderRepresentation from './output/order-representation';
import OrderItem from './output/order-item';
import DiscountItem from './output/discount-item';
import User from './app/user';
import Product from './app/product';
import Discount from './app/discount';

export default class OrderApp {

  getUser(orderCommand) {
    const { memberId } = JSON.parse(orderCommand);
    const { memberName, memberPoIncreased, memberPoints, newMemberType } = new User(memberId).getUser();
    return {
      memberNo: memberId,
      memberName,
      memberPoIncreased,
      memberPoints,
      newMemberType
    };
  }

  getOrderItems(id, amount) {
    const { productNo, productName, price } = new Product().getProduct(id);
    const subTotal = price * amount;
    return { productNo, productName, price, amount, subTotal };
  }

  getDiscountsItem(id, amount) {
    const { productNo, productName, price, canUseActivity } = new Product().getProduct(id);
    const subTotal = price * amount;
    const discount = (new Discount()).getLastDiscount({ productNo, productName, price, canUseActivity, amount, subTotal });
    return { productNo, productName, discount: -discount};
  }

  checkout(orderCommand) {
    // TODO: 请完成需求指定的功能

    const { orderId, createTime, memberId, items } = JSON.parse(orderCommand);
    const { memberName, memberPoIncreased, memberPoints, newMemberType } = this.getUser(memberId);
    // 商品列表
    const orderItems = items.map(item => {
      return new OrderItem(this.getOrderItems(item.product, item.amount));
    });
    
    const totalPrice = items.reduce((prev, item) => {
      const cutTotal = this.getOrderItems(item.product, item.amount).subTotal;
      return prev += cutTotal;
    }, 0);
    // 优惠清单
    const discounts=items.map(item=>{
      return new DiscountItem(this.getDiscountsItem(item.product, item.amount));
    }).filter(item=>{
      return item.discount<0;
    });
  
    const totalDiscountPrice=discounts.reduce((prev,item)=>{
      return prev-=item.discount;
    },0);

    const data = {
      createTime: new Date(createTime),
      orderId,
      memberNo: memberId,
      memberName,
      memberPoIncreased,
      memberPoints,
      newMemberType,
      orderItems,
      totalPrice,
      totalDiscountPrice,
      receivables:totalPrice-totalDiscountPrice,
      discounts
    };
    return (new OrderRepresentation(data)).toString();
  }
}
