import { observer } from 'mobx-react-lite';
import React, { FC, useContext } from 'react';
import { Pagination } from 'react-bootstrap';
import { ShopContext } from './PublicRouter';

export type TypePagesProps = {
	pages: number[]
	currentPage?: number
	onChangePage: (currentPage: number) => void
}

const Pages: FC<TypePagesProps> = observer(({ pages, currentPage, onChangePage }) => {
	const { shopProducts } = useContext(ShopContext);
	return (
		<Pagination className="mt-2">
			{pages.map(page => {
				return (
					<Pagination.Item
						active={shopProducts.currentPage == page}
						key={page}
						style={{ color: '#198754' }}
						onClick={() => onChangePage(page)}
					>
						{page}
					</Pagination.Item>
				);
			})}
		</Pagination>
	);
});

export default Pages;