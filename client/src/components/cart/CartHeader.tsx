import React, {FC} from 'react';


export type TypeCartHeaderProps = {
    onClearCart: () => void
}

const CartHeader: FC<TypeCartHeaderProps> = ({onClearCart}) => {


    return (
        <div className={'basket-header'}>
            <div className={'basket-header__title'}>
                <h5>Корзина</h5>
            </div>
            <div className={'header-actions'}>
                <div
                    className={'header-actions__clear'}
                    onClick={() => onClearCart()}
                >
                    Очистить корзину
                </div>
            </div>
        </div>
    );
};

export default CartHeader;