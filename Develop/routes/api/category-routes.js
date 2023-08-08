const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

router.get('/', async (req, res) => {
  // find all categories
  // be sure to include its associated Products
  try {
    const categoryData = await Category.findAll({include: {model:Product}});
    res.status(200).json(categoryData);
  } catch (error) {
    res.status(500).json({err: 'Server error'});
  }
});

router.get('/:id', async (req, res) => {
  // find one category by its `id` value
  // be sure to include its associated Products
  try{
    const categoryId = req.params.id;
    const category = await Category.findOne({
      where: {
        id: categoryId
      },
      include: [Product]
    });

    if (!category) {
      return res.status(202).json({ err: 'Category not found!'});
    }

    res.json(category);
  } catch (err){
    console.error(err);
    res.status(500).json({ err: 'Server not found!'});

  }
});

router.post('/', async (req, res) => {
  // create a new category
  try {
    const categoryData = await Category.create(req.body);
    res.status(200).json(categoryData);
  } catch (err) {
    res.status(400).json(err);
  }
});

router.put('/:id', async (req, res) => {
  // update a category by its `id` value
  const categoryId = req.params.id;
  const { categoryName } = req.body;

  try {
    const updatedCategory = await Category.update(
      { categoryName },
      {
        where: { id: categoryId }
      }
    );
    if (updatedCategory[0] === 0) {
      return res.status(404).json({ err: 'Category not found' });
    }
    res.json({ message: 'Category updated succesfully' });
  }catch (err) {
    console.error('Error updating category:', error);
    res.status(500).json({ error: 'Failed to update category' });
  }
});

router.delete('/:id', async (req, res) => {
  // delete a category by its `id` value
  try {
    const categoryData = await Category.destroy({
      where: { id: req.params.id }
    });
    if (!categoryData) {
      res.status(404).json({ message: 'No category with this id!' });
      return;
    }
    res.status(200).json(categoryData);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
