import OrderRepresentation from './output/order-representation';

import User from './app/user';

export default class OrderApp {

  getUser(orderCommand){
    const { memberId } = JSON.parse(orderCommand);
    const {memberName,memberPoIncreased,memberPoints,newMemberType}=new User(memberId).getUser();
    return {
      memberNo:memberId,
      memberName,
      memberPoIncreased,
      memberPoints,
      newMemberType
    };
  }
  
  checkout(orderCommand) {
    // TODO: 请完成需求指定的功能

    const { orderId, createTime,memberId } = JSON.parse(orderCommand);
    const {memberName,memberPoIncreased,memberPoints,newMemberType}=this.getUser(memberId);
    const data = {
      createTime: new Date(createTime),
      orderId,
      memberNo:memberId,
      memberName,
      memberPoIncreased,
      memberPoints,
      newMemberType
    };
    return (new OrderRepresentation(data)).toString();
  }
}
