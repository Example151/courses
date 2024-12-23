var express = require('express');
const MainModel = require('../models/items');

var router = express.Router();

router.get('/', async (req, res) => {
    try {
        const data = await MainModel.listItems({}, { 'task': 'all' });

        res.status(200).json({
            success: true,
            message: 'Items fetched successfully',
            data: data
        });
    } catch (error) {
        res.status(400).json({
            success: false,
            message: 'Items fetched failed'
        });
    }
});

router.get('/:id', async (req, res) => {
    const data = await MainModel.listItems({'id': req.params.id}, { 'task': 'one' });

    res.status(200).json({
        success: true,
        message: 'Item fetched successfully',
        data: data
    });
});

router.post('/add', async (req, res) => {
    let param = [];
    param.id = makeId(8);
    param.name = req.body.name;
    param.status = req.body.status;

    const data = await MainModel.create(param);

    res.status(201).json({
        success: true,
        message: 'Item added successfully',
        data: data
    });
});

router.put('/edit/:id', async (req, res) => {
    try {
        let body = req.body;
        const data = await MainModel.editItem({'id': req.params.id, 'body': body}, { 'task': 'edit' });

        res.status(200).json({
            success: true,
            message: 'Item deleted successfully',
            data: data
        });
    } catch (error) {
        res.status(400).json({
            success: false,
            message: 'Item deleted failed'
        });
    }
});

router.delete('/delete/:id', async (req, res) => {
    try {
        const data = await MainModel.deleteItems({'id': req.params.id}, { 'task': 'one' });

        res.status(200).json({
            success: true,
            message: 'Item deleted successfully',
            data: data
        });
    } catch (error) {
        res.status(400).json({
            success: false,
            message: 'Item deleted failed'
        });
    }
});

makeId = (number) => {
    let text = "";
    let possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

    for (let i = 0; i < number; i++) {
        text += possible.charAt(Math.floor(Math.random() * possible.length));
    }

    return text;
}

module.exports = router;

