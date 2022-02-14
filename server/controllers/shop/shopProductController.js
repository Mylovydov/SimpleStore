const Product = require('../../models/Product');
const Tag = require('../../models/Tag');
const TagType = require('../../models/TagType');

class ShopProductController {

    async getPaginated(request, response) {
        try {
            const {limit, skip, userFilters} = request;
            console.log('getPaginated limit', limit);
            console.log('getPaginated skip', skip);

            console.log('getPaginated Есть фильтры');
            const allProducts = await Product.find({tagsIds: {$all: userFilters}}).limit(limit).skip(skip)

            return response.json(allProducts);
        } catch (error) {
            console.log(error);
        }
    }


    async getAll(request, response) {
        try {
            const {limit, skip, userFilters} = request;
            console.log('getAll limit', limit);
            console.log('getAll skip', skip);

            let allProducts,
                allTagTypes,
                allTags,
                productsTotalCount;

            if (!(userFilters.length)) {
                console.log('Нет фильтров');
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

            if (userFilters.length) {
                console.log('Есть фильтры');
                console.log('userFilters', userFilters);
                allProducts = await Product.find({tagsIds: {$all: userFilters}});
                productsTotalCount = allProducts.length;
                const allProductsTagId = allProducts.map(product => product.tagsIds).flat();
                allTags = await Tag.find(
                    {_id: {$in: allProductsTagId}},
                    {createdDate: false, updatedDate: false}
                );

                const allProductsTagTypeId = allTags.map(tag => tag.tagTypeId);
                allTagTypes = await TagType.find({_id: {$in: allProductsTagTypeId}});
                // productsTotalCount = await Product.find({tagsIds: {$all: userFilters}}).count();
            }

            return response.json({
                allTagTypes,
                allTags,
                allProducts: allProducts.slice(skip, limit),
                productsTotalCount,
                productsLimit: limit
            });
        } catch (error) {
            console.log(error);
        }
    }


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