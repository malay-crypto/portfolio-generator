//importing modules

let express=require('express');
let cors=require('cors');
let multer=require('multer')
let mongoose=require('mongoose');

const upload = multer({ dest: 'uploads/' })

let app=express();
app.use(express.json());
app.use(cors());
app.use("/uploads", express.static("uploads"));


//schema
let sch=new mongoose.Schema(
    {

        template: String,

                basic: {
                     name: String,
                    title: String,
                    role: String,
            },

            hero: {
                     tagline: String,
                    profileImage: String,
                    backgroundImage: String,
            },

        about: {
                 bio: String,

                location: String,
                socials: [
                         { name: String, url: String }
                    ]
        },

        skills: [
            { name: String }
        ],

            services: [
                         { title: String, description: String }
                    ],

            projects: [
                     { title: String, image: String, description: String, link: String }
                ],

            testimonials: [
                        { clientName: String, quote: String }
                ],

            blog:
                    { title: String, summary: String, link: String }
                ,

            contact: {
                          message: String,
                        email: String,
                        phone: String
                },


    }
)

//model creation

let Portfolio=mongoose.model('portfolio', sch,'portfolio');

//connect to database
mongoose.connect('mongodb://localhost:27017/portfoliodb');


//rest API calls


//adding records
app.post('/api/add', upload.fields([

    {name:'profileImage'},
    {name:'backgroundImage'},
        {name:'projectImages'},

]) ,
    async (req,res)=>{

    console.log('body=',req.body);
    console.log('files=',req.files);


    let template=req.body.template;
    let basic=JSON.parse(req.body.basic);
    let hero=JSON.parse(req.body.hero);
    let about=JSON.parse(req.body.about);
    let skills=JSON.parse(req.body.skills);
    let services=JSON.parse(req.body.services);
    let projects=JSON.parse(req.body.projects);
    let blog=JSON.parse(req.body.blog);
    let contact=JSON.parse(req.body.contact);

    hero.profileImage=req.files?.profileImage[0]?.filename||'';
    hero.backgroundImage=req.files?.backgroundImage[0]?.filename||'';

    projects.forEach((element,index)=>{
        element.image=req.files?.projectImages[index]?.filename||'';
    })

    let portfolioDataNew={template,basic,about,skills,services,projects,blog,contact,hero};


    await Portfolio.create(portfolioDataNew);
    res.send('successfully saved');
})


//fetching all records
app.get('/api/getAll',async (req,res)=>{

    let r=await Portfolio.find()
    res.send(r)
})

//search on name or title
app.get('/api/search',async (req,res)=>{

    console.log('query string  : ', req.query)

    let {searchData} = req.query;
    //let n={'basic.name':{ $regex: searchData, $options: "i" }}

    let n={
        $or:[
            {'basic.name':{ $regex: searchData, $options: "i" } },
            {'basic.title':{ $regex: searchData, $options: "i" } },


        ]

    }

    let r=await Portfolio.find(n)
    res.send(r)
})

//search on role
app.get('/api/searchRole',async (req,res)=>{

    console.log('query string  : ', req.query)

    let {searchData} = req.query;
    //let n={'basic.name':{ $regex: searchData, $options: "i" }}

    let n={

            'basic.role': searchData ,

    }

    let r=await Portfolio.find(n)
    res.send(r)
})


//search on location
app.get('/api/searchLocation',async (req,res)=>{

    console.log('query string  : ', req.query)

    let {searchData} = req.query;
    //let n={'basic.name':{ $regex: searchData, $options: "i" }}

    let n={

        'about.location': searchData ,

    }

    let r=await Portfolio.find(n)
    res.send(r)
})


//update record
app.put('/api/edit/:id',upload.fields([

    {name:'profileImage'},
    {name:'backgroundImage'},
    {name:'projectImages'},

]) ,
    async (req,res)=>{
    console.log('body =',req.body);
    console.log('id=',req.params.id);

    let template=req.body.template;
    let basic=JSON.parse(req.body.basic);
    let hero=JSON.parse(req.body.hero);
    let about=JSON.parse(req.body.about);
    let skills=JSON.parse(req.body.skills);
    let services=JSON.parse(req.body.services);
    let projects=JSON.parse(req.body.projects);
    let blog=JSON.parse(req.body.blog);
    let contact=JSON.parse(req.body.contact);

    hero.profileImage=req.files?.profileImage?.[0]?.filename||'';
    hero.backgroundImage=req.files?.backgroundImage?.[0]?.filename||'';

    projects.forEach((element,index)=>{
        element.image=req.files?.projectImages?.[index]?.filename||'';
    })

    let portfolioDataNew={template,basic,about,skills,services,projects,blog,contact,hero};

    await Portfolio.findByIdAndUpdate(req.params.id,portfolioDataNew);
    res.send('success')
})


//delete record
app.delete('/api/delete/:id',async (req,res)=>{

    console.log('id=',req.params.id);
    await Portfolio.findByIdAndDelete(req.params.id);
    res.send('success')
})



app.listen(3000,()=>{console.log('Server is running on port 3000')})