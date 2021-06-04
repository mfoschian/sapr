export function sort_composition( criteria ) {

	if( !criteria || !criteria.length )
		return () => 0;

	return (a,b) => {
		for( let i=0; i < criteria.length; i++ ) {
			let func = criteria[i];
			let res = func(a,b);
			if( res != 0 )
				return res;
		}
		return 0;
	}

}