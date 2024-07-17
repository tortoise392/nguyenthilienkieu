import React from 'react'
import style from '../assets/styles/Input.module.css'

const Input = ({ iref, value, onChange }) => {
	return (
		<input
			ref={iref}
			type="text"
			placeholder='Enter here'
			value={value}
			onChange={onChange}
			className={style.input} />
	)
}

export default Input