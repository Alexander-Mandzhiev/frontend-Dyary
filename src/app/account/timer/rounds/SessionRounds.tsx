import cn from 'clsx'
import { ChevronLeft, ChevronRight } from 'lucide-react'

import { IRoundSessionResponse } from '@/types/session.types'

import styles from './page.module.scss'

interface ISessionRounds {
	rounds: IRoundSessionResponse[] | undefined
	nextRoundHandler: () => void
	prevRoundHandler: () => void
	activeRound: IRoundSessionResponse | undefined
}

export default function SessionRounds({
	rounds,
	nextRoundHandler,
	prevRoundHandler,
	activeRound
}: ISessionRounds) {
	const isCanPrevRound = rounds
		? rounds.some(round => round.isCompleted)
		: false

	const isCanNextRound = rounds ? !rounds[rounds.length - 1].isCompleted : false

	return (
		<div className={styles.container}>
			<button
				className={styles.button}
				disabled={!isCanPrevRound}
				onClick={() => (isCanPrevRound ? prevRoundHandler() : false)}
			>
				<ChevronLeft size={23} />
			</button>
			<div className={styles.roundsContainer}>
				{rounds &&
					rounds.map((round, index) => (
						<div
							key={index}
							className={cn(styles.round, {
								[styles.completed]: round.isCompleted,
								[styles.active]:
									round.id === activeRound?.id && !round.isCompleted
							})}
						/>
					))}
			</div>
			<button
				className={styles.button}
				disabled={!isCanNextRound}
				onClick={() => (isCanNextRound ? nextRoundHandler() : false)}
			>
				<ChevronRight size={23} />
			</button>
		</div>
	)
}
