import React from 'react';
import {Col, Row} from 'react-bootstrap';
import CreateTagPageContainer from '../containers/CreateTagPageContainer';

const CreateTagPage = () => {
	return (
		<Row className="d-flex flex-column">
			<Col>
				<h2 className="m-auto text-center">Добавить новый тег</h2>
			</Col>
			<Col className="mt-5">
				<CreateTagPageContainer/>
			</Col>
		</Row>
	);
};

export default CreateTagPage;