export default class User {

    /**
     * 销售凭证中的订单行
     * @param memberId 产品编号
     */
    constructor(memberId) {
        this.memberId = memberId;
    }

    getUser() {
        return {
            memberNo: '6236609999',
            memberName: '马丁',
            memberPoIncreased: 2,
            memberPoints: 19720,
            newMemberType: '金卡'
        };
    }
}
