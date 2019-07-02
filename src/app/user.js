export default class User {

    /**
     * @param memberId 客户id
     */
    constructor(memberId) {
        this.memberId = memberId;
    }

    getUser() {
        const members = [
            { id: '6236609999', name: '马丁', point: '9860' },
            { id: '6630009999', name: '王立', point: '48860' },
            { id: '8230009999', name: '李想', point: '98860' },
            { id: '9230009999', name: '张三', point: '198860' }
        ];
        const member = members.filter(item => {
            return item.id == this.memberId;
        })[0] || {};
        return {
            memberNo: member.id,
            memberName: member.name,
            memberPoIncreased: 2,
            memberPoints: member.point,
            level: this.getUserLevel(member.point),
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
        const result = data.filter(item => {
            return point >= item.scope[0] && point < item.scope[1];
        });
        return result[0] || {};
    }
}
