import React, { useState } from 'react'
import style from '../assets/styles/Dropdown.module.css'

const Dropdown = ({ currency, setCurrency, currencies }) => {
	const [visible, setVisible] = useState(false);

	const handleItemClick = (currency) => {
		setCurrency(currency);
		setVisible(false);
	}

	const toggleVisible = (e) => {
		setVisible(!visible);
	}

	return (
		<div>
			<div className={style.container} onClick={toggleVisible}>
				{currency?.currency ? 
				<div className={style.tname}>
					<img src={`/currencies/${currency.currency}.svg`} alt='logo' className={style.icon} />
					<span>{currency.currency}</span>
				</div> : 
				<>
					<span>Select</span>
				</>}
				<span className={style.arrow}>▼</span>
			</div>
			<div>
				<div className={`${style.backdrop} ${visible ? style.visible : style.hidden}`} onClick={toggleVisible} />
				<div className={`${style.menu} ${visible ? style.visible : style.hidden}`}>
					{currencies.map((it) =>
						<div key={it.currency} className={style.menuItem} onClick={() => handleItemClick(it)}>
							<img src={`/currencies/${it.currency}.svg`} alt='logo' className={style.icon} />
							<span>{it.currency}</span>
						</div>)}
				</div>
			</div>			
		</div>
	)
}

export default Dropdown