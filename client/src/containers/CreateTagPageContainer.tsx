import { observer } from 'mobx-react-lite';
import React, { useContext, useEffect, useState } from 'react';
import { Button, Card, Dropdown, Form } from 'react-bootstrap';
import { Context } from '../components/AdminRouter';
import { getAllTagTypes } from '../http/adminAPI/tagTypesAPI';
import { createTag } from '../http/adminAPI/tagsAPI';

const CreateTagPageContainer = observer(() => {

	const { tagType } = useContext(Context);

	const [title, setTitle] = useState('');
	const [slug, setSlug] = useState('');
	const [type, setType] = useState({ title: '', id: '' });

	useEffect(() => {
		getAllTagTypes()
			.then(data => tagType.setTagTypes(data.tagTypes));
	}, []);

	const setTagType = (title: string, id: string) => {
		setType({ ...type, title, id });
	};

	const addTag = () => {
		createTag({ title, tagTypeId: type.id, slug })
			.then(data => {
				alert(data.message);
				setTitle('');
				setSlug('');
				setType({ ...type, title: '', id: '' });
			})
			.catch(e => alert(e.response.data.message));
	};

	return (
		<Card style={{ width: 600 }} className="p-5 m-auto">
			<Form>
				<Form.Control
					value={title}
					onChange={e => setTitle(e.target.value)}
					style={{ height: 50 }}
					placeholder="Введите название тега"
				/>
				<Dropdown className="mt-3">
					<Dropdown.Toggle
						className="set-type-dropdown"
					>
						{type.title || 'Выберите тип'}
					</Dropdown.Toggle>
					<Dropdown.Menu>
						{tagType.tagTypes.map(item => {
							return (
								<Dropdown.Item
									key={item._id}
									onClick={() => setTagType(item.title, item._id)}
								>
									{item.title}
								</Dropdown.Item>
							);
						})}
					</Dropdown.Menu>
				</Dropdown>
				<Form.Control
					value={slug}
					onChange={e => setSlug(e.target.value)}
					style={{ height: 50 }}
					className="mt-3"
					placeholder="Введите slug тега"
				/>
			</Form>
			<Button
				onClick={addTag}
				className="mt-4"
				variant="outline-success"
				style={{ height: 50 }}
			>
				Добавить
			</Button>
		</Card>
	);
});

export default CreateTagPageContainer;