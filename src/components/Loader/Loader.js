import React from 'react';
import { Backdrop, CircularProgress } from '@material-ui/core';


export default function Loader({ loading }) {
	return (
		<Backdrop
			sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
			open={loading}
		>
			<CircularProgress color="inherit" />
		</Backdrop>
	)
}
