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
// var files = [];
exports.getSingleSentForm = (req, res, next) => {
  SentBackForm.findById(req.params.id, function(err, foundForm) {
    if (err) {
      console.log(err);
    } else {
      res.render("viewSentBackForm", { foundForm: foundForm });
    }
  });
};
exports.getQueries = (req, res, next) => {
  res.render("queries", { files: [] });
};
exports.postQueries = (req, res, next) => {
  var { fileId, department, date, cost } = req.body;
  // var files = [];
  var fil = {};

  // if (fileId) {
  //   Form.find({ fileId: fileId })
  //     .then(files => {
  //       return res.render("queries", { files: files });
  //     })
  //     .catch(err => {
  //       // req.flash('error_msg','no file with this id')
  //       console.log(err);
  //       res.redirect("/queries");
  //     });
  // }
  if (fileId) {
    fil.fileId = fileId;
  }
  if (department) {
    fil.departmentOfIndenter = department;
  }
  if (cost) {
    fil.cost = { $lte: cost };
  }
  if (date) {
    fil.date = { $lte: date };
  }

  Form.find(fil).then(files => {
    // console.log(doc);
    console.log(files);
    return res.render("queries", { files: files });
  });
  // console.log(fil);

  // Form.find().then(docs => {
  //   var temp = [];
  //   if (department) {
  //     temp = docs.filter(i => {
  //       return i.departmentOfIndenter.toString() == department.toString();
  //     });
  //   }
  //   if (cost) {
  //     temp = temp.filter(i => {
  //       return i.cost <= cost;
  //     });
  //   }
  //   // console.log("temp= " + temp);
  // });
  // res.render("queries", { files });
};
// exports.postRejected=(req,res,next)=>{
//   var {formId}=req.body;
//   Form.findOne({formId}).then(file=>{
//     file
//   })

// }
