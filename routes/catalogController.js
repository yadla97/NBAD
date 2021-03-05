var express = require('express');
var router = express.Router();
var itemDb = require('../utility/ItemDB');
const { check, validationResult } = require('express-validator/check')
var bodyParser= require('body-parser');
var urlencodedParser= bodyParser.urlencoded({extended:false});



router.get('/',function(req, res){
	  var userSession=req.session.theUser;
		//var userId=req.session.theUser[0].UserId;
		  if(userSession==undefined){
	res.render('index', {login:[]});
}
else {
		res.render('index',{firstname:req.session.theUser[0].UserId,login:[1]})
}
});



router.get('/categories',function(req, res){
	  var userSession=req.session.theUser;
    var itemData = itemDb.getItems();
		itemData = itemData.exec();
		if(Object.keys(req.query).length!=0){
  		catalogCategory=req.query.catalogCategory;
  		var specCateg=itemDb.specCateg(catalogCategory);
  		specCateg=specCateg.exec();
  		if(userSession==undefined){
    		specCateg.then(function(docs){
      	Items=docs
				if(docs.length!=0){
        res.render('categories',{data:docs,alert:'',firstname:'', login:[]});
      }
      else{
          res.render('categories',{data:docs,alert:'Sorry!! The Category you are looking for is not available.',firstname:'', login:[]});
      }
    });
	}
	else{
  	specCateg.then(function(docs){
    Items=docs
		if(docs.length!=0){
	  res.render('categories',{data:docs,alert:'',firstname:req.session.theUser[0].UserId, login:[1]});
	}
	else{
			res.render('categories',{data:docs,alert:'Sorry!! The Category you are looking for is not available.',firstname:req.session.theUser[0].UserId, login:[1]});
	}

  	})
  }
}
else {
	if(userSession==undefined){
		itemData.then(function(docs){
			console.log("likki", docs);
res.render('categories',{data:docs,alert:'', login:[]});
		});
}
else {
	itemData.then(function(docs){
		res.render('categories',{data:docs,alert:'', firstname:req.session.theUser[0].UserId, login:[1]});
			});
}
}
});


router.get('/categories/viewCatalog/:itemCode',urlencodedParser,[
      check('itemCode').isAlpha().not().isEmpty(),
],function(req, res){
	const errors = validationResult(req);
	if(!errors.isEmpty()){
				return res.status(422).json({errors: errors.array() });
	}
	else{
  var itemCode = req.params.itemCode;
	var userSession=req.session.theUser;
    var item = itemDb.getItem(itemCode);
		var myBooks=itemDb.getItems();
		item = item.exec();
		myBooks=myBooks.exec();
    var data= {
        title:'Item',
        path: req.url,
        item: item
    }
		if(item == "error" ){
			//test
		}
else{
	   if(userSession==undefined){
			 item.then(function(docs){
				 test = docs;
				 if(docs.length!=0){
					 res.render('item',{data:docs,myBooks:myBooks, alert:'', login:[]});
				 }
				 else{
					 myBooks.then(function(docs){
				 		console.log("likki", docs);
				 res.render('categories',{data:docs, alert:'Sorry!! The book you are looking for is not available', login:[]});
			 });
				}
			 });
	}
	else {
		item.then(function(docs){
			console.log("likki", docs);
			if(docs.length!=0){
res.render('item',{data:docs,myBooks:myBooks, alert:'', firstname:req.session.theUser[0].UserId, login:[1]});
}
else {
	myBooks.then(function(docs){
	 console.log("likki", docs);
res.render('categories',{data:docs, alert:'Sorry!! The book you are looking for is not available', firstname:req.session.theUser[0].UserId, login:[1]});
});
}
		});
	}
	}
// 	if(itemCode.length===0){
// 		  if(userSession==undefined){
// 				myBooks.then(function(docs){
// 					console.log("likki", docs);
// 		res.render('categories',{data:docs, login:[]});
// 				});
// 	}
// 	else {
// 		itemData.then(function(docs){
// 			console.log("likki", docs);
// res.render('categories',{data:docs,  firstname:userId, login:[1]})
// 		});
// 	}
// 	}
	// else if(item.length===0){
	// 	res.render('categories','We cannot find the item you ar looking for')
	// }
}
});



router.get('/contact',function(req, res){
	var userSession=req.session.theUser;
	if(req.url == '/' || req.url == '/contact')
	if(userSession==undefined){
    res.render('contact', {alert:'', login:[]});
}
else {
res.render('contact', {firstname:req.session.theUser[0].UserId, login:[1], alert:''});
}
});


router.get('/about',function(req, res){
	var userSession=req.session.theUser;
	if(req.url == '/' || req.url == '/about')
	if(userSession==undefined){
    res.render('about', { login:[]});
	}
	else {
		res.render('about', {firstname:req.session.theUser[0].UserId, login:[1]});
	}
});

router.get('/store',function(req, res){
	var userSession=req.session.theUser;
	if(req.url == '/' || req.url == '/store')
	if(userSession==undefined){
  	res.render('store', { login:[]});
	}
	else {
		res.render('store', {firstname:req.session.theUser[0].UserId, login:[1]});
	}
});

router.get('/profile',function(req, res){
	var userSession=req.session.theUser;
	if(req.url == '/' || req.url == '/profile')
	if(userSession==undefined){
    	res.render('feedback', {login:[]});
	}
	else {
		res.render('feedback', {firstname:req.session.theUser[0].UserId, login:[1]});
	}
});

// router.get('/bishaap',function(req, res){
// 	var userSession=req.session.theUser;
// 	var userId="lsuram";
// 	if(req.url == '/' || req.url == '/bishaap')
// 	if(userSession==undefined){
//   	res.render('bishaap', { login:[]});
// 	}
// 	else {
// 		res.render('bishaap', {firstname:userId, login:[1]});
// 	}
// });


router.get('/*',function(req, res){
	var userSession=req.session.theUser;
	if(userSession==undefined){
		res.render('sessionerror', { login:[]});
}
else {
		res.render('sessionerror', {firstname:req.session.theUser[0].UserId, login:[1]});
}
});



// var categories = [];
//
// let getCategories = function() {
//     var data = itemDb.getItems();
//     data.forEach(function (item) {
//         if(!categories.includes(item.catalogCategory)){
//             categories.push(item.catalogCategory);
//         }
//
//     });
//     return categories;
// };

module.exports = router;
