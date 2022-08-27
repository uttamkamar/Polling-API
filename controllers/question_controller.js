const Questions = require('../models/question');
const Options = require('../models/option');

//for creating questions
module.exports.create = function (req, res) {
	Questions.create({ title: req.body.title, vote: false }, function (err, question) {
		if (err) {
			return res.status(500).json({
				message: 'Question is not created for error',
				data: err,
			});
		}
		if (question) {
			return res.status(200).json({
				message: 'Question Created',
				data: question,
			});
		} else {
			return res.status(400).json({
				message: 'Invalid request. Question not created',
			});
		}
	});
};
//for deleting a question
module.exports.deleteQuestion = function (req, res) {
	console.log(req.params.id);
	Questions.findByIdAndDelete({ _id: req.params.id }, function (err, deletedQuestion) {
		if (err) {
			return res.status(500).json({
				message: 'Question could not be deleted',
				data: err,
			});
		}

		return res.status(200).json({
			message: 'Question Deleted Successfully',
		});
	});
	// deleting options of deleted question
	Options.deleteMany({ question: req.params.id }, function (err, deleteOption) {
		if (err) {
			return res.status(500).json({
				message: 'Could not delete Option',
				data: err,
			});
		}
		return res.status(200).json({
			message: 'Options are also deleted',
		});
	});
};
//adding option to question
module.exports.addOptions = function (req, res) {
	Questions.findById({ _id: req.params.id }, function (err, question) {
		if (err) {
			return res.status(500).json({
				message: 'Could not find question',
				data: err,
			});
		}
		if (question) {
			const id = question.option.length + 1;
			Options.create(
				{
					id: question.option.length + 1,
					question: req.params.id,
					text: req.body.text,
					votes: 0,
					link: `https://pollingapiuttam.herokuapp.com//option/${id}/add_vote`, //paste your link or localhost link
				},
				function (err, optionCreated) {
					if (err) {
						return res.status(500).json({
							message: 'option not created',
							data: err,
						});
					}
					Questions.updateOne(
						{ _id: req.params.id },
						{
							$push: { option: [optionCreated._id] },
						},
						function (err, QuestionAndOption) {
							if (err) {
								return res.status(500).json({
									message: 'Question not updated',
									data: err,
								});
							}
							return res.status(200).json({
								message: 'Question And Option Updated',
							});
						}
					);
					question.save();
				}
			);
		} else {
			return res.status(404).json({
				message: 'Problem occured',
				data: err,
			});
		}
	});
};

//show all question
module.exports.showAllQuestions = async (req, res) => {
	try {
		// finding all the questions and returning
		let question = await Questions.findById(req.params.id).populate({
			path: 'option',
		});
		//question found
		if (question) {
			return res.status(200).json({
				message: 'Here is the questions',
				data: question,
			});
		} else {
			return res.status(400).json({
				message: 'Question does not does not exists',
			});
		}
	} catch (err) {
		return res.status(500).json({
			message: 'Error from the server ',
			data: err,
		});
	}
};
