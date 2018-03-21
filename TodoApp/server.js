
const Mod = { 

	Express : require("express"), 

	Session : require('cookie-session') , 

	BodyParser: require('body-parser')

	//Event: require('events').EventEmitter 
}

Object.defineProperty(Mod , "LockDort" , { 

	value : 2525 , 
	writable : false ,
	enumerable : false , 
	configurable : false 
})



let App = Mod.Express() ,session = Mod.Session ;


/*
*
* @prototype
*  
* @namespace __CORE__
* 
 */

const __CORE__ = { 

	Version :"^0.0.1" , 

	Lang    :"Ang" , 

	Engines :['ejs' ,"haml", "jade"] ,  

	setTemplate : (template)=>  { 

			 

	 	  if (~__CORE__.Engines.indexOf(template)){ 

	 	  	 App.set("view engine" ,template)

	 	  	 return __CORE__.Engines[template]

	 	  }else if (!template) { 

	 	  		App.set("view engine" ,"ejs") //default template

	 	  		return __CORE__.Engines[0]
	 	  
	 	  }else { 

	 	       __CORE__.Engines.push(template)

	 	       return __CORE__.Engines[-1]
		  }
	} , 



	MWare :{ 

	 StaticFile : ()=> { 

	 	App.use(Mod.Express.static('Public'))
	 },


	 M_Session : () => { 

	 	 App.use(session({secret :"CodeLovers"}))

	 	 	.use((req,res,next) => { 

	 	 		  if (typeof(req.session.todolist) == 'undefined') {

     				   req.session.todolist = new Array() ; 
   					 }

  				  next();
	 	 })
	 } , 

	 Urlencode : ()=> { 

	 	return Mod.BodyParser.urlencoded({extended : false}) 
	 }

	} , 


	Routes  : { 

		getMainHome  : ()=>  { 

			__CORE__.MWare.StaticFile()

			__CORE__.MWare.M_Session() ;

			const Template  = __CORE__.setTemplate()
			
			App.get('/' , (req , res) => { 

				res.setHeader('Content-type' , "text/html") ; 

				res.render('pages/index', {Data :  req.session.todolist}) 

			
			})
			//@2525
			.listen(Mod.LockDort , ()=> console.log({ info___:'the server is running on @2525' , 
													  Version: __CORE__.Version,
													  Lang___: __CORE__.Lang, 
												      Template: Template   //default 
													}))

			
		} , 

		Post :()=> { 

			App.post("/add" , __CORE__.MWare.Urlencode(),(req, res ) => { 

				 if ( req.body.task != "") { 

				 	 req.session.todolist.push(req.body.task) ;
				 }

				 res.redirect('/')
			})
		} , 
		Delete :()=> { 

		 	App.get("/delete/:index" , (req ,res)=> { 

		 		if( req.params.index != "")req.session.todolist.splice(req.params.index ,1) ; 
		 		
		 		res.redirect("/") ;

		 	})
		} , 

		AutoRedirect: ()=> { 

			App.use((req ,res ,next)=> {  

				res.redirect('/')
			})
		}

	}
		

}

for(let i in __CORE__.Routes) { 

 		__CORE__.Routes[i](); 
 			
	}

