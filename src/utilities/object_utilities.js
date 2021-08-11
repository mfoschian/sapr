export function deep_clone( obj ) {
	if( !obj ) return null;
	return JSON.parse(JSON.stringify( obj ));
}