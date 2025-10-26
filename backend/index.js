//importing modules

let express=require('express');
let cors=require('cors');
let multer=require('multer')
let mongoose=require('mongoose');

//const upload = multer({ dest: 'uploads/' })

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
app.post('/api/add',async (req,res)=>{
    console.log(req.body);
    await Portfolio.create(req.body);
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
app.put('/api/edit/:id',async (req,res)=>{
    console.log('body =',req.body);
    console.log('id=',req.params.id);
    await Portfolio.findByIdAndUpdate(req.params.id,req.body)
    res.send('success')
})


//delete record
app.delete('/api/delete/:id',async (req,res)=>{

    console.log('id=',req.params.id);
    await Portfolio.findByIdAndDelete(req.params.id);
    res.send('success')
})



app.listen(3000,()=>{console.log('Server is running on port 3000')})