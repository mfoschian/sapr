import djs from 'dayjs'

export function formatDt( dt, format ) {
	return djs( dt ).format( format || 'YYYY/MM/DD' );
}

export function formatDtTm( dt, format ) {
	return djs( dt ).format( format || 'YYYY/MM/DD HH:mm' );
}