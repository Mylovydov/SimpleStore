import React from 'react';
import { Form } from 'react-bootstrap';

const SearchTableInput = () => {
    return (
        <Form.Control type="search" placeholder="Поиск..." className='mb-3'/>
    );
};

export default SearchTableInput;