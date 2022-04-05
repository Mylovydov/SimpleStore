import { observer } from 'mobx-react-lite';
import React, { FC, useContext, useState } from 'react';
import { Button, Card, Container, Form, Spinner } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { Context } from '../components/AdminRouter';
import { login } from '../http/adminAPI/authAPI';
import { ADMIN_ROUTE, STATISTICS_ROUTE } from '../utils/consts';

const Auth: FC = observer(() => {
	const { admin } = useContext(Context);
	const navigate = useNavigate();
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');

	const [loading, setLoading] = useState(false);

	const signIn = async () => {
		setLoading(true);
		try {
			const _id: string = await login(email, password);
			admin.setIsAuth(true);
			admin.setAdmin({ _id });
			setLoading(false);
			navigate(`${ADMIN_ROUTE}${STATISTICS_ROUTE}`);
		} catch (e: any) {
			alert(e.response.data.message);
			setLoading(false);
		}
	};
	return (
		<Container
			className="d-flex justify-content-center align-items-center"
			style={{ height: '100vh' }}
		>
			<Card style={{ width: 600 }} className="p-5">
				<h2 className="m-auto">Авторизация</h2>
				<Form className="d-flex flex-column">
					<Form.Control
						type="email"
						className="mt-3"
						style={{ height: 50 }}
						value={email}
						onChange={e => setEmail(e.target.value)}
						placeholder={'Введите email...'}
					/>
					<Form.Control
						type="password"
						className="mt-3"
						style={{ height: 50 }}
						value={password}
						onChange={e => setPassword(e.target.value)}
						placeholder={'Введите пароль...'}
					/>
					{loading
						?
						<Button
							style={{ height: 50 }}
							className="mt-3"
							variant="success"
							disabled
						>
							<Spinner
								as="span"
								animation="border"
								variant="light"
							/>
						</Button>
						:
						<Button
							className="mt-3"
							variant="outline-success"
							style={{ height: 50 }}
							onClick={signIn}
						>
							Войти
						</Button>
					}
				</Form>
			</Card>
		</Container>
	);
});

export default Auth;