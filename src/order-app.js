import OrderRepresentation from './output/order-representation';
import OrderItem from './output/order-item';

import User from './app/user';
import Product from './app/product';

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

  checkout(orderCommand) {
    // TODO: 请完成需求指定的功能

    const { orderId, createTime, memberId,items } = JSON.parse(orderCommand);
    const { memberName, memberPoIncreased, memberPoints, newMemberType } = this.getUser(memberId);

    const orderItems=items.map(item=>{
      return new OrderItem(this.getOrderItems(item.product,item.amount));
    });

    const data = {
      createTime: new Date(createTime),
      orderId,
      memberNo: memberId,
      memberName,
      memberPoIncreased,
      memberPoints,
      newMemberType,
      orderItems
    };
    return (new OrderRepresentation(data)).toString();
  }
}
