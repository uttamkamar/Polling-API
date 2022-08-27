const Questions = require('../models/question');
const Options = require('../models/option');
//function to add vote to option
module.exports.addVote = function (req, res) {
	Options.findById({ _id: req.params.id }, function (err, option) {
		if (err) {
			return res.status(500).json({
				message: 'Error in finding message',
				data: err,
			});
		}

		if (option) {
			const currentvote = option.votes + 1;
			console.log('currentvote', option.votes);
			Options.updateOne({ _id: req.params.id }, { votes: currentvote }, function (err, updatedVotes) {
				if (err) {
					return res.status(500).json({
						message: 'Votes not updated',
						data: err,
					});
				}
				return res.status(200).json({
					message: 'Option votes updated',
				});
			});
			option.save();
		}
	});
};
//for deleting an option
module.exports.deleteOption = function (req, res) {
	Options.findById({ _id: req.params.id }, function (err, option) {
		if (err) {
			return res.status(500).json({
				message: 'option not found',
				data: err,
			});
		}
		Options.findByIdAndDelete({ _id: req.params.id }, function (err, deletedOption) {
			if (err) {
				return res.status(500).json({
					message: 'Option Cannot be deleted',
					message: data,
				});
			}

			return res.status(200).json({
				message: 'Option deleted Successfully',
			});
		});
	});
};
