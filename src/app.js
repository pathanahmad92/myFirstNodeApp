const express = require('express')
const hbs = require('hbs')
const path = require('path')
const employeeService = require('./js/employeeService.js')

//Initialize app with express server
const app=express()
app.listen(3000,()=>{
    console.log('Server is started 3000 port')
})

//Find absolute path
//const publicPath = path.join(__dirname,'../public')
const viewsPath = path.join(__dirname,'../templates/views')
const partialViewsPath=path.join(__dirname,'../templates/partialviews')

//Use static absolute path
//app.use(express.static(publicPath))

//set view engine
app.set('view engine','hbs')
app.set('views',viewsPath)
hbs.registerPartials(partialViewsPath)

app.get("",(req,res)=>{
    res.render("index",{
        name : "Ahmad",
        qualification:"B-Tech",
        title:"Index"
    })
})
app.get("/aboutus",(req,res)=>{
    res.render("aboutus",{
        address:"Tolichowki, Hyderabad",
        title:"About Us"
    })    
})

app.get('/contactus',(req,res)=>{
    res.render('contactus',{
        title:"Contact Us"
    })
})

app.get("/employees",(req,res)=>{
    debugger;
    if(!req.query.empname){
        employeeService.getAllEmployees((error,response)=>{
            res.send(response)
        })
    }
    if(req.query.empname){
        employeeService.getEmployeeByName(req.query.empname, (error,response)=>{
            res.send(response)
        })
    }
})

app.get("/employees_",(req,res)=>{
    debugger;
    employeeService.getAllEmployeesAsync((response)=>{
        res.send(resonse)
    })
})

app.get('/ouremployees',(req,res)=>{
    employeeService.getAllEmployeesAsync((employeesRes)=>{
        res.render('ouremployees',
            {
                employees : employeesRes,
                title : 'Our Employees'
            }
        )
    })
})

app.get('/todos',(req,res)=>{
    employeeService.getAllTodos((todos)=>{
        res.render('todos',{
            todos:todos,
            title : 'Todos'
        })
    })
})