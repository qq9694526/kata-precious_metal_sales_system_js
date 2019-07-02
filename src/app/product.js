export default class Product {

    /**
     * @param productId 产品编号
     */
    constructor(productId) {
        this.productId = productId;
    }

    getProduct(productId) {
        const goodList = [
            { productNo: '001001', productName: '世园会五十国钱币册', price: 998.00, unit: '册' },
            { productNo: '001002', productName: '2019北京世园会纪念银章大全40g', price: 1380.00, unit: '盒' },
            { productNo: '003001', productName: '招财进宝', price: 1580.00, unit: '条' },
            { productNo: '003002', productName: '水晶之恋', price: 980.00, unit: '条' },
            { productNo: '002002', productName: '中国经典钱币套装', price: 998.00, unit: '套' },
            { productNo: '002001', productName: '扩之羽比翼双飞4.8g', price: 1080.00, unit: '条' },
            { productNo: '002003', productName: '中国银象棋12g', price: 698.00, unit: '套' }
        ];
        const result = goodList.filter(item => {
            return item.productNo === productId;
        });
        return result[0] || null;
    }

}
