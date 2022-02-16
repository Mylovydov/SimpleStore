const Product = require('../../models/Product');
const Tag = require('../../models/Tag');
const TagType = require('../../models/TagType');

class ShopProductController {

    async getPaginated(request, response) {
        try {
            const {limit, skip, filters} = request;

            const allProducts = filters.length
                ?
                await Product.find({tagsIds: {$all: filters}}).limit(limit).skip(skip)
                :
                await Product.find().limit(limit).skip(skip);

            return response.json({allProducts});
        } catch (error) {
            console.log(error);
        }
    }

    async getAll(request, response) {
        try {
            const {limit, skip, filters, search} = request;
            // console.log('getAll limit', limit);
            // console.log('getAll skip', skip);
            console.log('getAll search', search);

            let allProducts,
                allTagTypes,
                allTags,
                productsTotalCount;

            let searchFilters = {};
            const reqExp = search ? new RegExp(search, 'ig') : '';

            if (!(filters.length)) {
                console.log('Нет фильтров');

                if (search) {
                    console.log('isSearch');
                    searchFilters = {title: {$regex: reqExp}};
                    allProducts = await Product.find(searchFilters);
                    productsTotalCount = allProducts.length;
                    const allProductsTagId = allProducts.map(product => product.tagsIds).flat();
                    allTags = await Tag.find(
                        {_id: {$in: allProductsTagId}},
                        {createdDate: false, updatedDate: false, __v: false}
                    );
                    const allProductsTagTypeId = allTags.map(tag => tag.tagTypeId);
                    allTagTypes = await TagType.find({_id: {$in: allProductsTagTypeId}});
                } else {
                    allProducts = await Product.find();
                    allTagTypes = await TagType.find(
                        {},
                        {createdDate: false, updatedDate: false, __v: false}
                    );
                    allTags = await Tag.find(
                        {},
                        {createdDate: false, updatedDate: false, __v: false}
                    );
                    productsTotalCount = allProducts.length;
                }


            }

            if (filters.length) {
                console.log('Есть фильтры');
                if (search) {
                    console.log('isSearch');
                    searchFilters = {
                        $and: [
                            {tagsIds: {$all: filters}},
                            {title: {$regex: reqExp}}
                        ]
                    };
                } else {
                    console.log('nor Search');
                    searchFilters = {tagsIds: {$all: filters}};
                }

                allProducts = await Product.find(searchFilters);
                productsTotalCount = allProducts.length;
                const allProductsTagId = allProducts.map(product => product.tagsIds).flat();
                allTags = await Tag.find(
                    {_id: {$in: allProductsTagId}},
                    {createdDate: false, updatedDate: false, __v: false}
                );

                const allProductsTagTypeId = allTags.map(tag => tag.tagTypeId);
                allTagTypes = await TagType.find({_id: {$in: allProductsTagTypeId}});
            }

            return response.json({
                allTagTypes,
                allTags,
                // allProducts: allProducts.slice(skip, limit + skip),
                allProducts: allProducts,
                productsTotalCount,
                productsLimit: limit
            });
        } catch (error) {
            console.log(error);
        }
    }


    // async getAll(request, response) {
    //     try {
    //         const {limit, skip, filters, search} = request;
    //         // console.log('getAll limit', limit);
    //         // console.log('getAll skip', skip);
    //         console.log('getAll search', search);
    //
    //         let allProducts,
    //             allTagTypes,
    //             allTags,
    //             productsTotalCount;
    //
    //         if (!(filters.length)) {
    //             console.log('Нет фильтров');
    //             allProducts = await Product.find();
    //             allTagTypes = await TagType.find(
    //                 {},
    //                 {createdDate: false, updatedDate: false, __v: false}
    //             );
    //             allTags = await Tag.find(
    //                 {},
    //                 {createdDate: false, updatedDate: false, __v: false}
    //             );
    //             productsTotalCount = allProducts.length;
    //         }
    //
    //         if (filters.length) {
    //             console.log('Есть фильтры');
    //             allProducts = await Product.find({tagsIds: {$all: filters}});
    //             productsTotalCount = allProducts.length;
    //             const allProductsTagId = allProducts.map(product => product.tagsIds).flat();
    //             allTags = await Tag.find(
    //                 {_id: {$in: allProductsTagId}},
    //                 {createdDate: false, updatedDate: false, __v: false}
    //             );
    //
    //             const allProductsTagTypeId = allTags.map(tag => tag.tagTypeId);
    //             allTagTypes = await TagType.find({_id: {$in: allProductsTagTypeId}});
    //         }
    //
    //
    //         return response.json({
    //             allTagTypes,
    //             allTags,
    //             allProducts: allProducts.slice(skip, limit + skip),
    //             productsTotalCount,
    //             productsLimit: limit
    //         });
    //     } catch (error) {
    //         console.log(error);
    //     }
    // }

    async getOne(request, response) {
        try {
            const {slug} = request.params;
            const product = await Product.findOne({slug});
            return response.json(product);
        } catch (error) {
            return response.status(403).json({message: `Продукт ${slug} не найден`});
        }
    }
}

module.exports = new ShopProductController();