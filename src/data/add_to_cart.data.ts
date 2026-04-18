export interface PriceInfo {
    fullPrice: number;
    exTax: number;
}

export interface CartTotalInfo {
    itemCount: number;
    totalPrice: number;
}

export const expectedCartTotalText = (itemCount: number, totalPrice: number) => `${itemCount} item(s) - $${totalPrice.toFixed(2)}`;

export const samplePriceData: PriceInfo[] = [
    { fullPrice: 602.00, exTax: 500.00 },
    { fullPrice: 123.20, exTax: 100.00 }
];

export const sampleCartTotalData: CartTotalInfo[] = [
    { itemCount: 2, totalPrice: 725.20 }
];