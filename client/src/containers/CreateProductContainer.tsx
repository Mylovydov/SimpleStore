import {observer} from 'mobx-react-lite';
import React, {useContext, useEffect, useState} from 'react';
import {Button, Card, Col, Dropdown, Form, Row} from 'react-bootstrap';
import {Context} from '../components/AdminRouter';
import {getAllTagTypes} from '../http/adminAPI/tagTypesAPI';
import {getAllTags} from '../http/adminAPI/tagsAPI';
import {createProduct} from '../http/adminAPI/productsAPI';

export type TypeInfoStateItem = { typeId: string, tagId: string, number: number }
export type TypeInfoStateItems = TypeInfoStateItem[]


const CreateProductContainer = observer(() => {
	const {tag, tagType} = useContext(Context);

	useEffect(() => {
		getAllTagTypes().then(data => tagType.setTagTypes(data.tagTypes)).catch(e => alert(e.response.data.message));
		getAllTags().then(data => tag.setTags(data.allTags)).catch(e => alert(e.response.data.message));
	}, []);

	const [title, setTitle] = useState('');
	const [description, setDescription] = useState('');
	const [slug, setSlug] = useState('');
	const [price, setPrice] = useState(0);
	const [file, setFile] = useState<any>();

	const [selectedTypeId, setSelectedTypeId] = useState('');
	const [selectedTagId, setSelectedTagId] = useState('');

	const [info, setInfo] = useState<TypeInfoStateItems>([]);

	const addInfo = () => {
		setInfo([...info, {typeId: '', tagId: '', number: Date.now()}]);
	};

	const removeInfo = (number: TypeInfoStateItem['number']) => {
		setInfo(info.filter(item => item.number !== number));
	};

	const changeInfo = (key: string, value: string, number: number) => {
		setInfo(info.map(i => i.number === number ? {...i, [key]: value} : i));
	};

	const selectFile = (e: React.ChangeEvent<HTMLInputElement>) => {
		if (!e.target.files) {
			return;
		}
		setFile(e.target.files[0]);
	};

	const onTypeClick = (key: string, value: string, number: number) => {
		setSelectedTypeId(value);
		changeInfo(key, value, number);
	};

	const onTagClick = (key: string, value: string, number: number) => {
		setSelectedTagId(value);
		changeInfo(key, value, number);
	};

	const addProduct = () => {
		const formData = new FormData();
		formData.append('title', title);
		formData.append('description', description);
		formData.append('price', `${price}`);
		formData.append('image', file);
		formData.append('slug', slug);
		formData.append('tagsIds', JSON.stringify(info.map(infoItem => infoItem.tagId)));
		createProduct(formData)
			.then(data => {
				alert(data.message);
				setTitle('');
				setDescription('');
				setSlug('');
				setPrice(0);
				setTitle('');
				setInfo([]);
			})
			.catch(e => alert(e.response.data.message));
	};


	return (
		<Card style={{width: 600}} className="p-5 m-auto">
			<Form>
				<Form.Control
					value={title}
					onChange={(e) => setTitle(e.target.value)}
					style={{height: 50}}
					placeholder="Название продукта"
				/>
				<Form.Control
					value={description}
					onChange={(e) => setDescription(e.target.value)}
					as="textarea"
					style={{height: 100}}
					className="mt-3"
					placeholder="Описание продукта"
				/>
				<Form.Control
					value={slug}
					onChange={(e) => setSlug(e.target.value)}
					style={{height: 50}}
					className="mt-3"
					placeholder="Slug"
				/>
				<Form.Control
					value={price}
					onChange={(e) => setPrice(Number(e.target.value))}
					type="number"
					style={{height: 50}}
					className="mt-3"
					placeholder="Стоимость"
				/>
				<hr className="mt-4 mb-4"/>

				<Button
					variant="outline-info"
					onClick={addInfo}
				>
					Добавить характеристику
				</Button>
				{info.map((infoItem, i) => {
					return (
						<Row className="mt-4" key={infoItem.number}>
							<Col md={4}>
								<Dropdown>
									<Dropdown.Toggle>
										{info[i].typeId
											?
											tagType.tagTypes.map(tagTypeItem => {
												if (info[i].typeId === tagTypeItem._id) {
													return tagTypeItem.title;
												}
												return null;
											})
											:
											'Выберите тип'
										}
									</Dropdown.Toggle>
									<Dropdown.Menu>
										{tagType.tagTypes.map(item => {
											return (
												<Dropdown.Item
													onClick={() => onTypeClick('typeId', item._id, infoItem.number)}
													key={item._id}
												>
													{item.title}
												</Dropdown.Item>
											);
										})}
									</Dropdown.Menu>
								</Dropdown>
							</Col>
							<Col md={4}>
								<Dropdown>
									<Dropdown.Toggle>
										{info[i].tagId
											?
											tag.tags.map(tagItem => {
												if (info[i].tagId === tagItem._id) {
													return tagItem.title;
												}
												return null;
											})
											:
											'Выберите тег'
										}
									</Dropdown.Toggle>
									<Dropdown.Menu>
										{tag.tags.map(item => {
											if (item.tagTypeId === selectedTypeId) {
												return (
													<Dropdown.Item
														onClick={() => onTagClick('tagId', item._id, infoItem.number)}

														key={item._id}
													>
														{item.title}
													</Dropdown.Item>
												);
											}
											return null;
										})}
									</Dropdown.Menu>
								</Dropdown>
							</Col>
							<Col md={4}>
								<Button
									variant="outline-danger"
									onClick={() => removeInfo(infoItem.number)}
								>
									Удалить
								</Button>
							</Col>
						</Row>
					);
				})}

				<hr className="mt-4 mb-4"/>

				<Form.Control
					onChange={selectFile}
					type="file"
					className="mt-3"
				/>
			</Form>
			<hr className="mt-4"/>
			<Button
				onClick={addProduct}
				className="mt-3"
				variant="outline-success"
				style={{height: 50}}
			>
				Добавить
			</Button>
		</Card>
	);
});

export default CreateProductContainer;