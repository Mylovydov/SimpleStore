import React, { useState } from 'react';
import { Button, Card, Form } from 'react-bootstrap';
import { createTagType } from '../http/adminAPI/tagTypesAPI';

const CreateTagTypeContainer = () => {
   const [typeTitle, setTypeTitle] = useState('')
   const [typeSlug, setTypeSlug] = useState('')

   const addTagType = () => {
      createTagType({title: typeTitle, slug: typeSlug}).then(data => {
         setTypeTitle('')
         setTypeSlug('')
         alert(data.message)
      })
   }

   return (
      <Card style={{width: 600}} className='p-5 m-auto'>
         <Form>
            <Form.Control
               value={typeTitle}
               onChange={e => setTypeTitle(e.target.value)}
               style={{height: 50}}
               placeholder='Введите название типа'
            />
            <Form.Control
               value={typeSlug}
               onChange={e => setTypeSlug(e.target.value)}
               style={{height: 50}}
               className='mt-3'
               placeholder='Введите slug типа'
            />
         </Form>
         <Button
            onClick={addTagType}
            className='mt-4'
            variant='outline-success'
            style={{height: 50}}
         >
            Добавить
         </Button>
      </Card>
   );
};

export default CreateTagTypeContainer