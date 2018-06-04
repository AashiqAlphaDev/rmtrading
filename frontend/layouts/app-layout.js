import React        from 'react';
import withRoot     from '../src/withRoot';

export default function(Component){
	return withRoot({

	})(({})=>{
		return <div>
				<Component />
		</div>
	})
}