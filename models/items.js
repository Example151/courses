const MainModel = require('../schemas/items');

module.exports = {
    create: (item) => {
        return new MainModel(item).save();
    },
    listItems: (params, options) => {
        let sort = {};
        let objWhere = {};
        if (params.sortField) {
            sort[params.sortField] = params.sortType;
        }

        if (params.keyword) {
            objWhere['name'] = { $regex: params.keyword, $options: 'i' };
        }

        if (options.task === 'all') {
            return MainModel.find(objWhere).select('id name status').sort(sort);
        } else if (options.task == 'one') {
            return MainModel.find({id: params.id}).select('id name status');
        }
    },
    deleteItems: (params, options) => {
        if (options.task === 'one') {
            return MainModel.deleteOne({id: params.id});
        }
    },
    editItem: (params, options) => {
        if (options.task === 'edit') {
            return MainModel.updateOne({id: params.id}, {$set: params.body});
        }
    }
}
