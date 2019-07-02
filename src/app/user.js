export default class User {

    /**
     * 销售凭证中的订单行
     * @param memberId 产品编号
     */
    constructor(memberId) {
        this.memberId = memberId;
    }

    getUser() {
        const point=19720;
        return {
            memberNo: '6236609999',
            memberName: '马丁',
            memberPoIncreased: 2,
            memberPoints: point,
            newMemberType: this.getUserLevel(point).name
        };
    }

    getUserLevel(point) {
        const data = [{
            name: '普卡',
            scope: [0, 10000],
            multiple: 1
        }, {
            name: '金卡',
            scope: [10000, 50000],
            multiple: 1.5
        }, {
            name: '白金卡',
            scope: [50000, 100000],
            multiple: 1.8
        }, {
            name: '钻石卡',
            scope: [100000, Infinity],
            multiple: 2
        }];
        const result=data.filter(item=>{
            return  point >=item.scope[0]&&point <item.scope[1];
        });
        return result[0]||{};
    }
}
