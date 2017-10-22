import { CurrencySymbol } from './currency-symbols';

/** Market subscriptions type */
export type MarketSubscriptionType = 'Trade' | 'Current' | 'Aggregated' | undefined;

export const MARKET_SUBSCRIPTION_TYPES = new Map<MarketSubscriptionType, number>()
    .set('Trade', 0)
    .set('Current', 2)
    .set('Aggregated', 5);

/**
 * Market subscription class
 * @class CcMarketSubscription
 */
export class CcMarketSubscription {
    readonly id: number;
    readonly exchangeName: string | undefined;
    readonly fromSymbol: CurrencySymbol;
    readonly toSymbol: CurrencySymbol;
    private _packed: string;
    /**
     * Packed market subscription in format of
     * '{SubscriptionId}~{ExchangeName}~{FromSymbol}~{ToSymbol}'
     */
    get packed() { return this._packed; }

    /**
     * @constructor
     * @param data
     */
    constructor(data: {
        subscriptionType?: MarketSubscriptionType,
        exchangeName?: string,
        fromSymbol: CurrencySymbol,
        toSymbol: CurrencySymbol
    }) {
        this.id = MARKET_SUBSCRIPTION_TYPES.get(data.subscriptionType) || 5;
        this.exchangeName = (this.id === 5) ? 'CCCAGG' : data.exchangeName;
        this.fromSymbol = data.fromSymbol;
        this.toSymbol = data.toSymbol;
        this.packSubscription();
    }

    /**
     * Helper method to generate packed format of subscription
     */
    private packSubscription(): void {
        this._packed = `${this.id}~${this.exchangeName}~${this.fromSymbol}~${this.toSymbol}`;
    }
}
