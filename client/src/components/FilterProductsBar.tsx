import {observer} from 'mobx-react-lite';
import React, {FC, useContext} from 'react';
import {Accordion, Form} from 'react-bootstrap';
import {ShopContext} from './PublicRouter';
import {TypePrepareTagsDataItem} from '../utils/prepareFilterBarData';

export type FilterProductsBarProps = {
	onChangeFilter: (typeId: string, tagId: string) => void
}

const FilterProductsBar: FC<FilterProductsBarProps> = observer((
	{
		onChangeFilter,
	}
) => {

	const {shopTags} = useContext(ShopContext);
	return (
		<Accordion alwaysOpen>
			{Object.values(shopTags.filterBarData).map(([tagType, filterData], i) => {
				return (
					<Accordion.Item
						eventKey={i.toString()}
						key={tagType._id}
					>
						<Accordion.Header>
							{tagType.title}
						</Accordion.Header>
						<Accordion.Body>
							{filterData.map((tag: TypePrepareTagsDataItem) => {
								return (
									<Form.Check
										checked={tag.isChecked}
										onChange={() => onChangeFilter(tagType._id, tag._id)}
										key={tag._id}
										value={tag.slug}
										className="mb-2 mt-2"
										type={'checkbox'}
										id={tag.title}
										label={tag.title}
									/>
								);
							})}
						</Accordion.Body>
					</Accordion.Item>
				);
			})}
		</Accordion>
	);
});
export default FilterProductsBar;