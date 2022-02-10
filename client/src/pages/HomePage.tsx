import React from 'react';
import {Col, Container, Row, Card, Image} from "react-bootstrap";

const HomePage = () => {
    return (
        <>
            <Container>
                <Row className={'mt-4'}>
                    <Col md={4}>
                        <h1>Категории</h1>
                    </Col>

                    <Col className={'d-flex flex-column'} md={8}>

                        <div className={'position-relative'} style={{overflow: 'hidden', paddingBottom: '60%'}}>
                            {/*<Image src='/assets/banner.jpg' className={'img-fluid'} style={{display: 'block'}}/>*/}
                            <Image src={'/assets/banner.jpg'} style={{
                                position: 'absolute',
                                top: 0,
                                left: 0,
                                width: '100%',
                                height: '100%',
                                objectFit: 'cover'
                            }}/>

                        </div>
                        <h2>Акции</h2>
                        <h2>Новинки</h2>
                        <h2>Популярное</h2>
                    </Col>
                </Row>
            </Container>
        </>
    );
};

export default HomePage