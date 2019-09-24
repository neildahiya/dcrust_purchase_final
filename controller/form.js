const SentBackForm = require("../models/sentBack"),
  Forms = require("../models/forms");

exports.getNewForm = (req, res, next) => {
  res.render("newForm", {});
};
exports.postNewForm = (req, res, next) => {
  console.log("Hey");
  const {
    field1,
    quantity,
    budgetHead,
    cost,
    nameOfIndenter,
    departmentOfIndenter,
    fileId,
    date
  } = req.body;
  console.log(req.body);
  console.log("Hey");
  const newForm = new Forms({
    field1,
    quantity,
    budgetHead,
    cost,
    nameOfIndenter,
    departmentOfIndenter,
    fileId,
    date
  });
  newForm
    .save()
    .then(form => {
      console.log(form);
      console.log("Heyyyyy");
      res.redirect("/dashboard");
    })
    .catch(err => console.log(err));
};
exports.getWaitingForApproval = (req, res, next) => {
  Forms.find({}, function(err, foundForms) {
    console.log(foundForms);
    res.render("waitingForApproval", { foundForms: foundForms });
  });
};
exports.getSingleForm = (req, res, next) => {
  Forms.findById(req.params.id)
    .populate("logs")
    .exec(function(err, foundForm) {
      if (err) {
        console.log(err);
      } else {
        res.render("viewFormWaitingForApproval", { foundForm: foundForm });
        console.log(foundForm);
      }
    });
};
exports.getSentBack = (req, res, next) => {
  SentBackForm.find({}, function(err, foundForms) {
    res.render("sentBack", { foundForms: foundForms });
  });
};
// exports.postSentBack = (req, res, next) => {
//   const {
//     field1,
//     field2,
//     quantity,
//     field3,
//     field4,
//     availBalance,
//     cost,
//     field7,
//     field8,
//     field9,
//     field10,
//     fileId,
//     comments
//   } = req.body;
//   const newSentBackForm = new SentBackForm({
//     field1,
//     field2,
//     quantity,
//     field3,
//     field4,
//     availBalance,
//     cost,
//     field7,
//     field8,
//     field9,
//     field10,
//     fileId,
//     comments
//   });
//   Forms.deleteOne({ fileId: fileId }, function(err) {
//     if (err) {
//       console.log(err);
//     } else {
//       res.redirect("/sentBack");
//     }
//   });
//   newSentBackForm
//     .save()
//     .then(form => {
//       console.log(form);
//     })
//     .catch(err => console.log(err));
// };

exports.getSingleSentForm = (req, res, next) => {
  SentBackForm.findById(req.params.id, function(err, foundForm) {
    if (err) {
      console.log(err);
    } else {
      res.render("viewSentBackForm", { foundForm: foundForm });
    }
  });
};
