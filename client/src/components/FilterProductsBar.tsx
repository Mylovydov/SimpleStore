import {observer} from 'mobx-react-lite';
import React, {FC, useContext, useState} from 'react';
import {Accordion, Form} from 'react-bootstrap';

import {TypeTagType} from '../store/admin/TagTypeStore';
import {TypeTag} from '../store/admin/TagStore';
import {ShopContext} from './PublicRouter';
import {useLocation} from 'react-router-dom';
import {TypeShopTag, TypeShopTagType} from '../store/shop/TagStore';
import {TypePrepareFilterBarData} from '../utils/prepareFilterBarData';

export type FilterProductsBarProps = {
    // selectedCheckboxes: string[]
    tags: TypeShopTag[]
    tagTypes: TypeShopTagType[]
    // onChangeFilter: (title: string, e: React.ChangeEvent<HTMLInputElement>) => void
    onChangeFilter: (typeId: string, tagId: string) => void
    filterBarData: TypePrepareFilterBarData
}

const FilterProductsBar: FC<FilterProductsBarProps> = (
    {
        onChangeFilter,
        tags,
        tagTypes,
        filterBarData
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
                            {filterData.map((tag: TypeShopTag) => {
                                return (
                                    <Form.Check
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
};
export default FilterProductsBar;