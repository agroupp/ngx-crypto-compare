import { CurrencySymbol } from './currency-symbols';
import { MarketSubscriptionType } from './cc-market-subscription.class';

/** Market flags type */
export type MarketFlags = 'PriceUp' | 'PriceDown' | 'PriceUnchanged' | undefined;

/**
 * Crypto Compare Response
 * @class CcResponse
 */
export class CcResponse {
    readonly marketSubscriptionType: MarketSubscriptionType;
    readonly market: string;
    readonly fromSymbol: CurrencySymbol;
    readonly toSymbol: CurrencySymbol;
    readonly flag: MarketFlags;
    readonly price: number;
    readonly bid: number;
    readonly offer: number;
    readonly lastUpdate: Date;
    readonly avg: number;
    readonly lastVolume: number;
    readonly lastVolumeTo: number;
    readonly lastTradeId: string;
    readonly volumeHour: number;
    readonly volumeHourTo: number;
    readonly volume24Hour: number;
    readonly volume24HourTo: number;
    readonly openHour: number;
    readonly highHour: number;
    readonly lowHour: number;
    readonly open24Hour: number;
    readonly high24Hour: number;
    readonly low24Hour: number;
    readonly lastMarket: string;

    private _marketSubscriptionTypes: Map<number, MarketSubscriptionType> = new Map()
        .set(0, 'Trade')
        .set(2, 'Current')
        .set(5, 'Aggregated');

    private _flags: Map<number, MarketFlags> = new Map()
        .set(0x1, 'PriceUp')
        .set(0x2, 'PriceDown')
        .set(0x4, 'PriceUnchanged');

    /**
     * @constructor
     * @param packedResponse
     */
    constructor(packedResponse: string) {
        const values = packedResponse.split('~');
        const mask = parseInt(values[values.length - 1], 16);
        this.marketSubscriptionType = this._marketSubscriptionTypes.get(+values[0]);
        this.market = values[1];
        this.fromSymbol = <CurrencySymbol>values[2];
        this.toSymbol = <CurrencySymbol>values[3];
        this.flag = this._flags.get(parseInt(values[4], 16));
        let index = 5;
        if (mask & 0x1) {
            this.price = parseFloat(values[index]);
            index++;
        }
        if (mask & 0x2) {
            this.bid = parseFloat(values[index]);
            index++;
        }
        if (mask & 0x4) {
            this.offer = parseFloat(values[index]);
            index++;
        }
        if (mask & 0x8) {
            this.lastUpdate = new Date(+values[index] * 1000);
            index++;
        }
        if (mask & 0x10) {
            this.avg = parseFloat(values[index]);
            index++;
        }
        if (mask & 0x20) {
            this.lastVolume = parseFloat(values[index]);
            index++;
        }
        if (mask & 0x40) {
            this.lastVolumeTo = parseFloat(values[index]);
            index++;
        }
        if (mask & 0x80) {
            this.lastTradeId = (values[index]);
            index++;
        }
        if (mask & 0x100) {
            this.volumeHour = parseFloat(values[index]);
            index++;
        }
        if (mask & 0x200) {
            this.volumeHourTo = parseFloat(values[index]);
            index++;
        }
        if (mask & 0x400) {
            this.volume24Hour = parseFloat(values[index]);
            index++;
        }
        if (mask & 0x800) {
            this.volume24HourTo = parseFloat(values[index]);
            index++;
        }
        if (mask & 0x1000) {
            this.openHour = parseFloat(values[index]);
            index++;
        }
        if (mask & 0x2000) {
            this.highHour = parseFloat(values[index]);
            index++;
        }
        if (mask & 0x4000) {
            this.lowHour = parseFloat(values[index]);
            index++;
        }
        if (mask & 0x8000) {
            this.open24Hour = parseFloat(values[index]);
            index++;
        }
        if (mask & 0x10000) {
            this.high24Hour = parseFloat(values[index]);
            index++;
        }
        if (mask & 0x20000) {
            this.low24Hour = parseFloat(values[index]);
            index++;
        }
        if (mask & 0x40000) {
            this.lastMarket = (values[index]);
            index++;
        }
    }
}
