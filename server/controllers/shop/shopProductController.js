const Product = require('../../models/Product');
const Tag = require('../../models/Tag');
const TagType = require('../../models/TagType');
const generateSearchFilters = require('../../helpers/generateSearchFilters');

class ShopProductController {

    // async getPaginated(request, response) {
    //     try {
    //         const {limit, skip, filters} = request;
    //
    //         const allProducts = filters.length
    //             ?
    //             await Product.find({tagsIds: {$all: filters}}).limit(limit).skip(skip)
    //             :
    //             await Product.find().limit(limit).skip(skip);
    //
    //         return response.json({allProducts});
    //     } catch (error) {
    //         console.log(error);
    //     }
    // }

    async getPaginated(request, response) {
        try {
            const {limit, skip, filters, search} = request;
            const generatedFilters = generateSearchFilters(search, filters);
            console.log('getPaginated filters', filters);
            console.log('generatedFilters', generatedFilters);
            const paginatedProducts = await Product.find(generatedFilters).limit(limit).skip(skip)
            console.log('getPaginated paginatedProducts', paginatedProducts);
            return response.json({allProducts: paginatedProducts});
        } catch (error) {
            console.log(error);
        }
    }



    async getAll(request, response) {
        try {
            const {limit, skip, filters, search} = request;

            console.log('getAll searchFilters', generateSearchFilters(search, filters));

            const generatedFilters = generateSearchFilters(search, filters);
            const products = await Product.find(generatedFilters);
            const productsTagId = products.map(product => product.tagsIds).flat();
            const tags = await Tag.find(
                {_id: {$in: productsTagId}},
                {createdDate: false, updatedDate: false, __v: false}
            );
            const allProductsTagTypeId = tags.map(tag => tag.tagTypeId);
            const tagTypes = await TagType.find(
                {_id: {$in: allProductsTagTypeId}},
                {createdDate: false, updatedDate: false, __v: false}
            );

            const productsTotalCount = products.length;

            return response.json({
                allTagTypes: tagTypes,
                allTags: tags,
                allProducts: products.slice(skip, limit + skip),
                productsTotalCount,
                productsLimit: limit
            });
        } catch (error) {
            console.log(error);
        }
    }

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