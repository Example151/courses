const MainModel = require('../schemas/items');

module.exports = {
    create: (item) => {
        return new MainModel(item).save();
    },
    listItems: (params, options) => {
        if (options.task === 'all') {
            return MainModel.find(params).select('id name status');
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
