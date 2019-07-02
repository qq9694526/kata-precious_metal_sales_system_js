export default class Discount {

    /**
     * @param procuct 产品对象
     */
    constructor(procuct) {
        this.procuct = procuct;
    }
    getLastDiscount(procuct) {
        const discountList = [
            { id: '1', type: '0', name: '95折券', num: 0.95, desc: '打折商品' },
            { id: '2', type: '0', name: '9折券', num: 0.9, desc: '打折商品' },
            { id: '3', type: '1', name: '满3000元减350', condition: 3000, money: 350, desc: '满减商品' },
            { id: '4', type: '1', name: '满2000元减30', condition: 2000, money: 30, desc: '满减商品' },
            { id: '5', type: '1', name: '满1000元减10', condition: 1000, money: 10, desc: '满减商品' },
            { id: '6', type: '2', name: '满3件半价', condition: 3, num: 0.5, desc: '满送商品' },
            { id: '7', type: '2', name: '满3送1', condition: 3, num: 1, desc: '满送商品' },
        ];
        // 获取每个活动的优惠金额
        const activityDiscounts = procuct.canUseActivity.map(activityId => {
            let result = 0;
            const discount = discountList.filter(discount => {
                return discount.id === activityId;
            })[0];
            console.log('discount=======');
            console.log(discount);
            if (discount.type == 0) {
                result = this.getDiscountMoneyType0(discount, procuct);
            } else if (discount.type == 1) {
                result = this.getDiscountMoneyType1(discount, procuct);
            } else if (discount.type == 2) {
                result = this.getDiscountMoneyType2(discount, procuct);
            }
            console.log(result);
            return procuct.subTotal - result;
        });
        // 返回最大优惠金额
        if (activityDiscounts.length <= 0) {
            return 0;
        } else {
            return activityDiscounts.sort(function (a, b) {
                return b - a;
            })[0];
        }
    }

    getDiscountMoneyType0(discount, procuct) { // 打折
        return discount.num * procuct.subTotal;
    }

    getDiscountMoneyType1(discount, procuct) { //满减
        let result = procuct.subTotal;
        if (procuct.subTotal >= discount.condition) {
            result -= discount.money;
        }
        return result;
    }

    getDiscountMoneyType2(discount, procuct) { //满送
        let result = procuct.subTotal;
        if (procuct.amount >= discount.condition) {
            result -= procuct.price * discount.money;
        }
        return result;
    }
}
