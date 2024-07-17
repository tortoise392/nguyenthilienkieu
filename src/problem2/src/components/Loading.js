import React from 'react'
import style from '../assets/styles/Loading.module.css';

const Loading = () => {
	return (
		<div className={style.container}>
			<div className={style.backdrop} />
			<div className={style.content}>
				Loading...
			</div>
		</div>
	)
}

export default Loading