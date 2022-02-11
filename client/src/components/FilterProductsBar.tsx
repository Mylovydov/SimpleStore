import {observer} from 'mobx-react-lite';
import React, {FC, useContext, useState} from 'react';
import {Accordion, Form} from 'react-bootstrap';

import {TypeTagType} from '../store/admin/TagTypeStore';
import {TypeTag} from '../store/admin/TagStore';
import {ShopContext} from './PublicRouter';
import {useLocation} from 'react-router-dom';

export type FilterProductsBarProps = {
    // selectedCheckboxes: string[]
    tags: TypeTag[]
    tagTypes: TypeTagType[]
    onChangeFilter: (title: string, e: React.ChangeEvent<HTMLInputElement>) => void
}

const FilterProductsBar: FC<FilterProductsBarProps> = (
    {
        onChangeFilter,
        tags,
        tagTypes,
    }
    ) => {

    // return (
    //     <Accordion alwaysOpen>
    //         {!(shop.allFilteredProducts.length)
    //             ?
    //             shop.allTagTypes.map((tagType: TypeTagType, i) => {
    //                 return (
    //                     <Accordion.Item
    //                         eventKey={i.toString()}
    //                         key={tagType._id}
    //                     >
    //                         <Accordion.Header>
    //                             {tagType.title}
    //                         </Accordion.Header>
    //                         <Accordion.Body>
    //                             {shop.allTags.map((tag: TypeTag) => {
    //                                 if (tag.tagTypeId === tagType._id) {
    //                                     return (
    //                                         <Form.Check
    //                                             onChange={(e: React.ChangeEvent<HTMLInputElement>) => onChangeFilter(tagType.slug, e)}
    //                                             key={tag._id}
    //                                             value={tag.slug}
    //                                             className='mb-2 mt-2'
    //                                             type={'checkbox'}
    //                                             id={tag.title}
    //                                             label={tag.title}
    //                                         />
    //                                     )
    //                                 }
    //                                 return null
    //                             })}
    //                         </Accordion.Body>
    //                     </Accordion.Item>
    //                 )
    //             })
    //             :
    //             shop.allTagTypes.map((tagType:TypeTagType, i: number) => {
    //                 if (tagTypeIdsArr.includes(tagType._id)) {
    //                     return (
    //                         <Accordion.Item
    //                             eventKey={String(i)}
    //                             key={tagType._id}
    //                         >
    //                             <Accordion.Header>{tagType.title}</Accordion.Header>
    //                             <Accordion.Body>
    //                                 {shop.allTags.map((tag: TypeTag) => {
    //                                     if (tagsIdsArr.includes(tag._id) && tag.tagTypeId === tagType._id) {
    //                                         // const checked = selectedCheckboxes.includes(tag.slug)
    //                                         return (
    //                                             <Form.Check
    //                                                 defaultChecked={false}
    //                                                 onChange={(e: React.ChangeEvent<HTMLInputElement>) => onChangeFilter(tagType.slug, e)}
    //                                                 value={tag.slug}
    //                                                 key={tag._id}
    //                                                 className='mb-2 mt-2'
    //                                                 type={'checkbox'}
    //                                                 id={tag.title}
    //                                                 label={tag.title}
    //                                             />
    //                                         )
    //                                     }
    //                                     return null
    //                                 })}
    //                             </Accordion.Body>
    //                         </Accordion.Item>
    //                     )
    //                 }
    //                 return null
    //             })
    //         }
    //
    //     </Accordion>
    // );

    return (
        <Accordion alwaysOpen>
            {tagTypes.map((tagType: TypeTagType, i) => {
                return (
                    <Accordion.Item
                        eventKey={i.toString()}
                        key={tagType._id}
                    >
                        <Accordion.Header>
                            {tagType.title}
                        </Accordion.Header>
                        <Accordion.Body>
                            {tags.map((tag: TypeTag) => {
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