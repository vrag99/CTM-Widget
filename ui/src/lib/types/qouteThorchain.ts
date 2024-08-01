

type Fees = {
    asset: string;
    affiliate: string;
    outbound: string;
    liquidity: string;
    slippage_bps: number;
    total: string;
    total_bps: number;
};

export type QouteThorChain = {
    inbound_address: string;
    inbound_confirmation_blocks: number;
    inbound_confirmation_seconds: number;
    outbound_delay_blocks: number;
    outbound_delay_seconds: number;
    fees: Fees;
    slippage_bps: number;
    streaming_slippage_bps: number;
    router: string;
    expiry: number;
    expected_amount_out: string;
    expected_amount_out_streaming: string;
    gas_rate_units: string;
    max_streaming_quantity: number;
    notes: string;
    recommended_gas_rate: string;
    recommended_min_amount_in: string;
    streaming_swap_blocks: number;
    total_swap_seconds: number;
    warning: string;
};