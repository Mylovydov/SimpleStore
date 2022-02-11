const Product = require('../../models/Product');
const Tag = require('../../models/Tag');
const TagType = require('../../models/TagType');

class ShopProductController {

    // Новая функция 5
    // async getAll(request, response) {
    //     try {
    //         const {limit, skip, userFilters} = request;
    //         console.log('limit', limit);
    //         console.log('skip', skip);
    //
    //         console.log('controller userFilters', userFilters);
    //
    //         const allProducts = await Product.find();
    //         const productsTotalCount = await Product.find().count();
    //
    //         return response.json({allProducts, productsTotalCount, productsLimit: limit});
    //     } catch (error) {
    //         return response.status(500).json({message: `${error.message}`});
    //     }
    // }


    // Новая функция 4
    async getAll(request, response) {
        try {
            const {limit, skip, userFilters} = request;
            // console.log('limit', limit);
            // console.log('skip', skip);

            console.log('controller userFilters', userFilters);

            let allProducts;
            let allTagTypes;
            let allTags;
            let paginatedProducts
            let productsTotalCount

            if (!(userFilters.length)) {
                console.log('Нет фильтров');
                allProducts = await Product.find();
                allTagTypes = await TagType.find();
                allTags = await Tag.find();
                productsTotalCount = allProducts.length
            }

            if (userFilters.length) {
                console.log('Есть фильтры')
                // Получаем массив продуктов по фильтру и делаем пагинацию
                // paginatedProducts = await Product.find({tagsIds: {$all: userFilters}}).limit(limit).skip(skip)

                // Получаем весь массив продуктов по фильтру
                allProducts = await Product.find({tagsIds: {$all: userFilters}})
                productsTotalCount = allProducts.length
                // Получаем массив id тегов отфильтрованных продуктов
                const allProductsTagId = allProducts.map(product => product.tagsIds).flat()
                allTags = await Tag.find({_id : {$in: allProductsTagId}})

                // Получаем массив id типов всех отфильтрованных продуктов
                const allProductsTagTypeId = allTags.map(tag => tag.tagTypeId)
                allTagTypes = await TagType.find({_id: {$in: allProductsTagTypeId}})

                console.log('allTags', allTags);
                console.log('allProductsTagId', allProductsTagId);
                console.log('allProductsTagTypeId', allProductsTagTypeId);
                console.log('allTagTypes', allTagTypes);
                // Получаем общее кол-во найденных по фильтрам продуктов
                productsTotalCount = await Product.find({tagsIds: {$all: userFilters}}).count()
            }

            return response.json({
                allTagTypes,
                allTags,
                allProducts: allProducts.slice(skip, limit),
                paginatedProducts,
                // filteredProducts,
                productsTotalCount,
                productsLimit: limit
            });
        } catch (error) {
            console.log(error);
        }
    }


    // Новая функция 3
    // async getAll (request, response) {
    //    try {
    //       const { limit, skip, userFilters } = request
    //       console.log('controller userFilters', userFilters)
    //       const allTagTypes = await TagType.find()
    //       const allTags = await Tag.find()
    //       let filteredTagTypesId = []
    //       let filteredTagsId = []
    //       let products
    //       let productsTotalCount
    //       if (!userFilters.length) {
    //          console.log('Нет фильтров')
    //          products = await Product.find().limit(limit).skip(skip)
    //          productsTotalCount = await Product.find().count()
    //       }
    //       if (userFilters.length) {
    //          console.log('Есть фильтры')
    //          // Получаем массив объектов id тегов
    //          const foundTagsIds = await Tag.find({slug: {$in : userFilters}}, {_id: 1})
    //          // Получаем массив id тегов
    //          filteredTagsId = foundTagsIds.map(tagId => tagId._id)
    //          // Получаем массив объектов id типов найденных тегов
    //          const tagTypeIds = await Tag.find({_id: {$in : filteredTagsId}}, {tagTypeId: true, _id: false})
    //          // Получаем массив id типов
    //          filteredTagTypesId = tagTypeIds.map(tagTypeId => tagTypeId.tagTypeId)
    //          // Получаем массив продуктов по фильтру и делаем пагинацию
    //          products = await Product.find({tagsIds: {$in: filteredTagsId}})
    //          // Получаем общее кол-во найденных по фильтрам продуктов
    //          productsTotalCount = await Product.find({tagsIds: {$in: filteredTagsId}}).count()
    //       }
    //       return response.json({ allTagTypes, allTags, filteredTagTypesId, filteredTagsId, products, productsTotalCount, productsLimit: limit })
    //    } catch (error) {
    //       return response.status(500).json({message: `${error.message}`})
    //    }
    // }


    // Новая функция 2
    // async getAll (request, response) {
    //    try {
    //       const { limit, skip, userFilters } = request
    //       console.log('controller userFilters', userFilters)
    //       let allTagTypes
    //       let allTags
    //       let filteredTagTypes
    //       let filteredTags
    //       let products
    //       let productsTotalCount
    //       if (!userFilters.length) {
    //          console.log('Нет фильтров')
    //          allTagTypes = await TagType.find()
    //          allTags = await Tag.find()
    //          filteredTagTypes = []
    //          filteredTags = []
    //          products = await Product.find().limit(limit).skip(skip)
    //          productsTotalCount = await Product.find().count()
    //       }
    //       if (userFilters.length) {
    //          console.log('Есть фильтры')
    //          allTagTypes = await TagType.find()
    //          allTags = await Tag.find()
    //          // Получаем массив объектов id тегов
    //          const foundTagsIds = await Tag.find({slug: {$in : userFilters}}, {_id: 1})
    //          // Получаем массив id тегов
    //          const tagsIdsArr = foundTagsIds.map(tagId => tagId._id)
    //          // Получаем все теги-документы, которые соответствуют массиву id тегов
    //          filteredTags = await Tag.find({_id: {$in: tagsIdsArr}})
    //          // Получаем массив объектов id типов найденных тегов
    //          const tagTypeIds = await Tag.find({_id: {$in : tagsIdsArr}}, {tagTypeId: true, _id: false})
    //          // Получаем массив id типов
    //          const typeIdsArr = tagTypeIds.map(tagTypeId => tagTypeId.tagTypeId)
    //          // Получаем все типы-документы, которые относятся к найденным тегам
    //          filteredTagTypes = await TagType.find({_id: {$in: typeIdsArr}})
    //          // Получаем массив продуктов по фильтру и делаем пагинацию
    //          products = await Product.find({tagsIds: {$in: tagsIdsArr}})
    //          // Получаем общее кол-во найденных по фильтрам продуктов
    //          productsTotalCount = await Product.find({tagsIds: {$in: tagsIdsArr}}).count()
    //          // console.log('Получаем массив объектов с id тегов', foundTagsIds)
    //          // console.log('Получаем массив id тегов', tagsIdsArr)
    //          // console.log('Получаем массив объектов с id типов найденных тегов', tagTypeIds)
    //          // console.log('Получаем массив id типов', typeIdsArr)
    //       }
    //       // console.log('Получаем все теги-документы, которые соответствуют массиву id тегов', tags)
    //       // console.log('Получаем все типы-документы, которые отноятся к найденным тегам', tagTypes)
    //       // console.log('Получаем весь массив продуктов и делаем пагинацию', foundProducts)
    //       // console.log('Получаем общее кол-во продуктов', productsTotalCount)
    //       // console.log('нет фильтроввввввввввв', { allTagTypes, allTags, filteredTagTypes, filteredTags, products, productsTotalCount});
    //       return response.json({ allTagTypes, allTags, filteredTagTypes, filteredTags, products, productsTotalCount, productsLimit: limit })
    //    } catch (error) {
    //       return response.status(500).json({message: `${error.message}`})
    //    }
    // }


    // Новая функция 1
    // async getAll (request, response) {
    //    try {
    //       const { limit, skip, userFilters } = request
    //       console.log('controller userFilters', userFilters)
    //       let filteredTagTypes
    //       let filteredTags
    //       let filteredProducts
    //       let productsTotalCount
    //       if (!userFilters.length) {
    //          console.log('Нет фильтров')
    //          // Получаем массив объектов с id тегов
    //          const foundTagsIds = await Product.find({}, {tagsIds: true, _id: false})
    //          // Получаем массив id тегов
    //          const tagsIdsArr = foundTagsIds.map(tags => tags.tagsIds).flat()
    //          // Получаем все теги-документы, которые соответствуют массиву id тегов
    //          filteredTags = await Tag.find({_id: {$in: tagsIdsArr}})
    //          // Получаем массив объектов с id типов найденных тегов
    //          const tagTypeIds = await Tag.find({_id: {$in : tagsIdsArr}}, {tagTypeId: true, _id: false})
    //          // Получаем массив id типов
    //          const typeIdsArr = tagTypeIds.map(tagTypeId => tagTypeId.tagTypeId)
    //          // Получаем все типы-документы, которые относятся к найденным тегам
    //          filteredTagTypes = await TagType.find({_id: {$in : typeIdsArr}})
    //          // Получаем весь массив продуктов и делаем пагинацию
    //          filteredProducts = await Product.find().limit(limit).skip(skip)
    //          // Получаем общее кол-во продуктов
    //          productsTotalCount = await Product.find().count()
    //          // console.log('Получаем массив объектов с id тегов', foundTagsIds)
    //          // console.log('Получаем массив id тегов', tagsIdsArr)
    //          // console.log('Получаем массив объектов с id типов найденных тегов', tagTypeIds)
    //          // console.log('Получаем массив id типов', typeIdsArr)
    //       }
    //       if (userFilters.length) {
    //          console.log('Есть фильтры')
    //          // Получаем массив объектов с id тегов
    //          const foundTagsIds = await Tag.find({slug: {$in : userFilters}}, {_id: 1})
    //          // Получаем массив id тегов
    //          const tagsIdsArr = foundTagsIds.map(tagId => tagId._id)
    //          // Получаем все теги-документы, которые соответствуют массиву id тегов
    //          filteredTags = await Tag.find({_id: {$in: tagsIdsArr}})
    //          // Получаем массив объектов с id типов найденных тегов
    //          const tagTypeIds = await Tag.find({_id: {$in : tagsIdsArr}}, {tagTypeId: true, _id: false})
    //          // Получаем массив id типов
    //          const typeIdsArr = tagTypeIds.map(tagTypeId => tagTypeId.tagTypeId)
    //          // Получаем все типы-документы, которые относятся к найденным тегам
    //          filteredTagTypes = await TagType.find({_id: {$in: typeIdsArr}})
    //          // Получаем массив продуктов по фильтру и делаем пагинацию
    //          filteredProducts = await Product.find({tagsIds: {$in: tagsIdsArr}})
    //          // Получаем общее кол-во найденных по фильтрам продуктов
    //          productsTotalCount = await Product.find({tagsIds: {$in: tagsIdsArr}}).count()
    //          // console.log('Получаем массив объектов с id тегов', foundTagsIds)
    //          // console.log('Получаем массив id тегов', tagsIdsArr)
    //          // console.log('Получаем массив объектов с id типов найденных тегов', tagTypeIds)
    //          // console.log('Получаем массив id типов', typeIdsArr)
    //       }
    //       // console.log('Получаем все теги-документы, которые соответствуют массиву id тегов', tags)
    //       // console.log('Получаем все типы-документы, которые отноятся к найденным тегам', tagTypes)
    //       // console.log('Получаем весь массив продуктов и делаем пагинацию', foundProducts)
    //       // console.log('Получаем общее кол-во продуктов', productsTotalCount)
    //       return response.json({ filteredTagTypes, filteredTags, filteredProducts, productsTotalCount, productsLimit: limit })
    //    } catch (error) {
    //       return response.status(500).json({message: `${error.message}`})
    //    }
    // }

    // Базовая функция
    // async getAll (request, response) {
    //    try {
    //       const { limit, skip, userFilters } = request

    //       console.log('controller userFilters', userFilters)

    //       let tagTypes
    //       let tags
    //       let foundProducts
    //       let productsTotalCount

    //       if (!userFilters.length) {
    //          console.log('Нет фильтров');

    //          // Получаем массив объектов с id тегов
    //          const foundTagsIds = await Product.find({}, {tagsIds: true, _id: false})
    //          // Получаем массив id тегов
    //          const tagsIdsArr = foundTagsIds.map(tags => tags.tagsIds).flat()

    //          // Получаем все теги-документы, которые соответствуют массиву id тегов
    //          tags = await Tag.find({_id: {$in: tagsIdsArr}})

    //          // Получаем массив объектов с id типов найденных тегов
    //          const tagTypeIds = await Tag.find({_id: {$in : tagsIdsArr}}, {tagTypeId: true, _id: false})
    //          // Получаем массив id типов
    //          const typeIdsArr = tagTypeIds.map(tagTypeId => tagTypeId.tagTypeId)

    //          // Получаем все типы-документы, которые относятся к найденным тегам
    //          tagTypes = await TagType.find({_id: {$in : typeIdsArr}})

    //          // Получаем весь массив продуктов и делаем пагинацию
    //          foundProducts = await Product.find().limit(limit).skip(skip)
    //          // Получаем общее кол-во продуктов
    //          productsTotalCount = await Product.find().count()
    //          // console.log('Получаем массив объектов с id тегов', foundTagsIds)
    //          // console.log('Получаем массив id тегов', tagsIdsArr)
    //          // console.log('Получаем массив объектов с id типов найденных тегов', tagTypeIds)
    //          // console.log('Получаем массив id типов', typeIdsArr)
    //       }

    //       if (userFilters.length) {
    //          console.log('Есть фильтры')

    //          // Получаем массив объектов с id тегов
    //          const foundTagsIds = await Tag.find({slug: {$in : userFilters}}, {_id: 1})
    //          // Получаем массив id тегов
    //          const tagsIdsArr = foundTagsIds.map(tagId => tagId._id)

    //          // Получаем все теги-документы, которые соответствуют массиву id тегов
    //          tags = await Tag.find({_id: {$in: tagsIdsArr}})

    //          // Получаем массив объектов с id типов найденных тегов
    //          const tagTypeIds = await Tag.find({_id: {$in : tagsIdsArr}}, {tagTypeId: true, _id: false})
    //          // Получаем массив id типов
    //          const typeIdsArr = tagTypeIds.map(tagTypeId => tagTypeId.tagTypeId)

    //          // Получаем все типы-документы, которые относятся к найденным тегам
    //          tagTypes = await TagType.find({_id: {$in: typeIdsArr}})

    //          // Получаем массив продуктов по фильтру и делаем пагинацию
    //          foundProducts = await Product.find({tagsIds: {$in: tagsIdsArr}})

    //          // Получаем общее кол-во найденных по фильтрам продуктов
    //          productsTotalCount = await Product.find({tagsIds: {$in: tagsIdsArr}}).count()

    //          // console.log('Получаем массив объектов с id тегов', foundTagsIds)
    //          // console.log('Получаем массив id тегов', tagsIdsArr)
    //          // console.log('Получаем массив объектов с id типов найденных тегов', tagTypeIds)
    //          // console.log('Получаем массив id типов', typeIdsArr)
    //       }

    //       // console.log('Получаем все теги-документы, которые соответствуют массиву id тегов', tags)
    //       // console.log('Получаем все типы-документы, которые отноятся к найденным тегам', tagTypes)
    //       // console.log('Получаем весь массив продуктов и делаем пагинацию', foundProducts)
    //       // console.log('Получаем общее кол-во продуктов', productsTotalCount)


    //       return response.json({ tagTypes, tags, foundProducts, productsTotalCount, productsLimit: limit })
    //    } catch (error) {
    //       return response.status(500).json({message: `${error.message}`})
    //    }
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