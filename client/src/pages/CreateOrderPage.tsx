import React from 'react';
import { Button, Card, Col, Form, Row } from 'react-bootstrap';

const CreateOrderPage = () => {
	return (
		<Row className="d-flex flex-column">
			<Col>
				<h2 className="m-auto text-center">Добавить новый заказ</h2>
			</Col>
			<Col className="mt-5">
				<Card style={{ width: 600 }} className="p-5 m-auto">
					<Form>
						<Form.Control
							style={{ height: 50 }}
							placeholder="Введите название типа"
						/>
						<Form.Control
							style={{ height: 50 }}
							className="mt-3"
							placeholder="Введите slug типа"
						/>
					</Form>
					<Button
						className="mt-4"
						variant="outline-success"
						style={{ height: 50 }}
					>
						Добавить
					</Button>
				</Card>
			</Col>
		</Row>
	);
};

export default CreateOrderPage;