import { QuoteResponse } from "@chainflip/sdk/swap";
import { getPrice } from "../exchangeRate";
import { Route, Token } from "../types";
import { ChainflipSdkProvider } from "@/lib/chainflip";
import { QouteThorChain } from "../types/qouteThorchain";

/**
 * Converts a QuoteResponse object to a Route object.
 * @param quote - The QuoteResponse object to convert.
 * @returns A Promise that resolves to a Route object.
 */
export async function convertToRoute(qoute: QuoteResponse,
    sdk: ChainflipSdkProvider
): Promise<Route> {
    const data = qoute.quote;
    const fee = qoute.quote.includedFees
        .map(async (fee) => {
            const tokenData = await sdk.getAwailableAssets(fee.chain);
            const token = tokenData.find((token) => token.asset === fee.asset);
            if (!token) return 0;
            const amount =
                (Number(fee.amount) / 10 ** token.decimals) *
                (await getPrice(fee.asset));
            return amount;
        })
        .reduce(async (a, b) => (await a) + (await b));
    const metadata = {
        gasPrice: await fee,
        time: data.estimatedDurationSeconds,
    };
    const path: {
        amount: number;
        amountInUSD: number;
        token: string;
        chain: string;
    }[] = [];

    for (const [index, pool] of data.poolInfo.entries()) {
        const baseAssetPrice = await getPrice(pool.baseAsset.asset);
        const quoteAssetPrice = await getPrice(pool.quoteAsset.asset);
        const baseAssetTokenData = (
            await sdk.getAwailableAssets(pool.baseAsset.chain)
        ).find((token) => token.asset === pool.baseAsset.asset);
        const quoteAssetTokenData = (
            await sdk.getAwailableAssets(pool.quoteAsset.chain)
        ).find((token) => token.asset === pool.quoteAsset.asset);
        if (baseAssetTokenData && quoteAssetTokenData) {
            const quoteAssetAmount =
                Number(data.intermediateAmount) / 10 ** quoteAssetTokenData.decimals;
            let baseAssetAmount = 0; // Assuming this amount represents the intermediate amount in quote asset
            if (index === 0) {
                baseAssetAmount =
                    Number(qoute.amount) / 10 ** baseAssetTokenData.decimals;
            } else if (index === data.poolInfo.length - 1) {
                baseAssetAmount =
                    Number(data.egressAmount) / 10 ** baseAssetTokenData.decimals;
            }
            if (index % 2 === 0) {
                path.push(
                    {
                        amount: baseAssetAmount,
                        amountInUSD: baseAssetAmount * baseAssetPrice,
                        token: pool.baseAsset.asset,
                        chain: pool.baseAsset.chain,
                    },
                    {
                        amount: quoteAssetAmount,
                        amountInUSD: quoteAssetAmount * quoteAssetPrice,
                        token: pool.quoteAsset.asset,
                        chain: pool.quoteAsset.chain,
                    }
                );
            } else {
                path.push(
                    {
                        amount: Number(quoteAssetAmount),
                        amountInUSD: Number(
                            (quoteAssetAmount * quoteAssetPrice)
                        ),
                        token: pool.quoteAsset.asset,
                        chain: pool.quoteAsset.chain,
                    },
                    {
                        amount: Number(baseAssetAmount),
                        amountInUSD: Number(
                            (baseAssetAmount * baseAssetPrice)
                        ),
                        token: pool.baseAsset.asset,
                        chain: pool.baseAsset.chain,
                    }
                );
            }
        }
    }
    return {
        metadata,
        path: (path),
        sdk: "Chainflip",
    };
}

interface QouteToRouteProps {
    qoute: QouteThorChain;
    toToken: Token;
    fromToken: Token;
    fromAmount: string;
    fromAmountUSD: number;
    fromChain: string;
    toChain: string;
}

export async function thorchainQouteToRoute({qoute,fromToken,toToken,fromChain,toChain,fromAmount,fromAmountUSD}:QouteToRouteProps): Promise<Route | undefined> {
    console.log(qoute)
    if (fromToken && toToken) {
        const gasPrice = (Number(qoute.fees.total) / 1e8) * (await getPrice(qoute.fees.asset.split("-")[0]));
        const metadata = {
            gasPrice: gasPrice,
            time: qoute.total_swap_seconds,
        };
        const usdAmount = ((Number(qoute.expected_amount_out) / 1e8) * (await getPrice(toToken.id)));
        const path = [
            {
                amount: Number(fromAmount),
                amountInUSD: fromAmountUSD,
                token: fromToken.id,
                chain: fromChain,
            },
            {
                amount: Number(qoute.expected_amount_out) / 1e8,
                amountInUSD: usdAmount,
                token: toToken.id,
                chain: toChain,
            },
        ];

        console.log(path)
        return {
            metadata,
            path,
            sdk:"Thorchain"
        }
    }
}
