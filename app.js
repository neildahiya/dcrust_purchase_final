const express = require("express"),
  app = express(),
  Department = require("./models/departments"),
  bodyParser = require("body-parser"),
  mongoose = require("mongoose"),
  seedDB = require("./seed"),
  PORT = process.env.PORT || 5000,
  Layouts = require("express-ejs-layouts"),
  authRoutes = require("./routes/auth"),
  session = require("express-session"),
  flash = require("connect-flash"),
  departmentRoutes = require("./routes/department"),
  passport = require("passport"),
  budgetHeadRoutes = require("./routes/budgetHead"),
  Log = require("./models/logs");
(formRoutes = require("./routes/form")), (Form = require("./models/forms"));
require("./config/passport")(passport);
const MongoURI =
  "mongodb+srv://neildahiya:abcdefg@cluster0-cjlhb.mongodb.net/dcrust_final?retryWrites=true&w=majority";

mongoose.connect(MongoURI, { useNewUrlParser: true });

// sessions
app.use(
  session({
    secret: "keysecret",
    resave: true,
    saveUninitialized: true
  })
);

app.use(passport.initialize());
app.use(passport.session());

// flash messages
app.use(flash());

app.set("view engine", "ejs");
// app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(__dirname + "/public"));
app.use(express.urlencoded({ extended: true }));
app.use(Layouts);
//seedDB();

app.use((req, res, next) => {
  res.locals.success_msg = req.flash("success_msg");
  res.locals.error_msg = req.flash("error_msg");
  res.locals.error = req.flash("error");
  res.locals.isAuth = req.isAuthenticated();

  next();
});

app.get("/newForm", function(req, res) {
  res.render("newForm");
});
// app.post("/newForm", function(req, res) {
//   console.log(req.body);
// });

app.get("/existing", function(req, res) {
  res.render("existing");
});
app.use(formRoutes);
app.use(departmentRoutes);
app.use(budgetHeadRoutes);
app.use("/auth", authRoutes);

// //////////////////     Admin Dashboard
app.get("/adminDash", function(req, res) {
  res.render("adminDash");
});

/////////////////      Comments
app.get("/addBudgetHead", function(req, res) {
  res.render("addBudgetHead");
});

app.get("/viewBudgetHeads", function(req, res) {
  res.render("viewBudgetHeads");
});

app.post("/addBudgetHead", function(req, res) {});

app.post("/changeId", function(req, res) {
  const { fileId, newFileId } = req.body;
  Form.findOne({ fileId: fileId }).then(file => {
    console.log(file);
    file.fileId = newFileId;
    file.save(f => {
      console.log(f);
      res.redirect("/");
    });
  });
});

app.get("/viewFormWaitingForApproval/:id/comments/new", function(req, res) {
  Form.findById(req.params.id, function(err, foundForm) {
    if (err) {
      console.log(err);
    } else {
      res.render("newLog", { foundForm: foundForm });
    }
  });
});
app.post("/viewFormWaitingForApproval/:id/comments", function(req, res) {
  Form.findById(req.params.id, function(err, foundForm) {
    console.log("Here");
    if (err) {
      console.log(err);
      res.redirect("/");
    } else {
      Log.create(
        {
          department: req.body.department,
          date: req.body.date,
          comment: req.body.comment
        },
        function(err, comment) {
          if (err) {
            console.log(err);
          } else {
            console.log(comment);
            foundForm.logs.push(comment);
            foundForm.save();
            res.redirect("/");
          }
        }
      );
    }
  });
});

app.get("/", function(req, res) {
  res.render("home");
});

app.listen(PORT, function() {
  console.log(`listening to port:${PORT}`);
});
