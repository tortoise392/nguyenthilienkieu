import React from 'react';
import style from '../assets/styles/Box.module.css';

const Box = ({ text, children, istyle }) => {
	return (
		<div className={style.container} style={istyle}>
			<div className={style.header}>
				<span className={style.label}>{text}</span>
			</div>
			<div className={style.content}>
				{children}
			</div>
		</div>
	)
}

export default Box