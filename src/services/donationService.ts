import { Hospital } from "../models/hospital";

/**
 *  DonationService.ts
 *
 *  @copyright 2024 Digital Aid Seattle
 *
 */
export type Currency = {
    value: string;
    label: string;
    exchange: number;
}

export const CURRENCIES: Currency[] = [
    {
        value: 'USD',
        label: '$',
        exchange: 1.0
    },
    {
        value: 'EUR',
        label: '€',
        exchange: 1.2
    },
    {
        value: 'BTC',
        label: '฿',
        exchange: 0.001
    },
    {
        value: 'JPY',
        label: '¥',
        exchange: 0.01
    },
];


class DonationService {
    donate(opts: {
        hospital: Hospital,
        frequency: string,
        amount: number, 
        currency: Currency, hospitalPercent: number, generalPercent: number
    }) {
        alert(`Donating ${opts.hospitalPercent}% of ${opts.currency.label}${this.convert(opts.amount, opts.currency)} to ${opts.hospital.name} with "${opts.frequency}" frequency.`)
    }

    convert = (amount: number, currency: Currency) => {
        return Math.round(amount / currency.exchange);
    }

}

const donationService = new DonationService();
export { donationService };
