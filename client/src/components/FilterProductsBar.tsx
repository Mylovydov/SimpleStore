import {observer} from 'mobx-react-lite';
import React, {FC, useContext, useState} from 'react';
import {Accordion, Form} from 'react-bootstrap';

import {TypeTagType} from '../store/admin/TagTypeStore';
import {TypeTag} from '../store/admin/TagStore';
import {ShopContext} from './PublicRouter';
import {useLocation} from 'react-router-dom';
import {TypeShopTag, TypeShopTagType} from '../store/shop/TagStore';

export type FilterProductsBarProps = {
    // selectedCheckboxes: string[]
    tags: TypeShopTag[]
    tagTypes: TypeShopTagType[]
    onChangeFilter: (title: string, e: React.ChangeEvent<HTMLInputElement>) => void
}

const FilterProductsBar: FC<FilterProductsBarProps> = (
    {
        onChangeFilter,
        tags,
        tagTypes,
    }
    ) => {
    return (
        <Accordion alwaysOpen>
            {tagTypes.map((tagType: TypeShopTagType, i) => {
                return (
                    <Accordion.Item
                        eventKey={i.toString()}
                        key={tagType._id}
                    >
                        <Accordion.Header>
                            {tagType.title}
                        </Accordion.Header>
                        <Accordion.Body>
                            {tags.map((tag: TypeShopTag) => {
                                if (tag.tagTypeId === tagType._id) {
                                    return (
                                        <Form.Check
                                            onChange={(e: React.ChangeEvent<HTMLInputElement>) => onChangeFilter(tagType.slug, e)}
                                            key={tag._id}
                                            value={tag.slug}
                                            className="mb-2 mt-2"
                                            type={'checkbox'}
                                            id={tag.title}
                                            label={tag.title}
                                        />
                                    );
                                }
                                return null;
                            })}
                        </Accordion.Body>
                    </Accordion.Item>
                );
            })}

        </Accordion>
    );
};
export default FilterProductsBar;