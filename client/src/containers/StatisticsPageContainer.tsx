import { observer } from 'mobx-react-lite';
import React, { useContext } from 'react';
import { Context } from '../components/AdminRouter';
import StatisticsPage from '../pages/StatisticsPage';

const StatisticsPageContainer = observer(() => {
	const { tag, tagType, product, admin } = useContext(Context);
	// const [loading, setLoading] = useState(true)


	// if (loading) {
	//    return <Spinner animation='border'
	//       style={{position: 'relative', top: '50%', left: '50%'}}/>
	//  }

	return (
		<StatisticsPage/>
	);
});

export default StatisticsPageContainer;