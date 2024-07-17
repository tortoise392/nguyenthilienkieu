type WalletBalance = {
	currency: string;
	amount: number;
	blockchain: string;
}

type FormattedWalletBalance = WalletBalance & {formatted: string}

interface Props extends BoxProps {

}

const WalletPage: React.FC<Props> = ({children, ...rest}: Props) => {
	const balances = useWalletBalances();
	const prices = usePrices();

	const getPriority = (blockchain: any): number => {
		let priority;
		
		switch (blockchain) {
			case 'Osmosis':
				priority = 100;
			case 'Ethereum':
				priority = 50;
			case 'Arbitrum':
				priority = 30;
			case 'Zilliqa':
				priority = 20;
			case 'Neo':
				priority = 20;
			default:
				priority = -99;
		}
		
		return priority;
	}

	const sortedBalances = useMemo(() => {
		return balances.filter((balance: WalletBalance) => {
			const balancePriority = getPriority(balance.blockchain);
			if (balancePriority > -99 && balance.amount <= 0) {
				return true;
			}
			return false
		}).sort((lhs: WalletBalance, rhs: WalletBalance) => {
			const leftPriority = getPriority(lhs.blockchain);
			const rightPriority = getPriority(rhs.blockchain);
			if (leftPriority > rightPriority) {
				return -1;
			} else if (rightPriority > leftPriority) {
				return 1;
			} else {
				return 0;
			}
		});
	}, [balances]);

	const formattedBalances : FormattedWalletBalance = sortedBalances.map((balance: WalletBalance) => {
		return {
			...balance,
			// ormatted: balance.amount.toFixed(7)
			formatted: balance.amount.toFixed()
		}
	})

	const rows = sortedBalances.map((balance: FormattedWalletBalance, index: number) => {
		const usdValue = prices[balance.currency] * balance.amount;
		return (
			<WalletRow
				className={classes.row}
				key={index}
				amount={balance.amount}
				usdValue={usdValue}
				formattedAmount={balance.formatted}
			/>
		)
	})

	return (
		<div {...rest}>
			{rows}
		</div>
	)
}