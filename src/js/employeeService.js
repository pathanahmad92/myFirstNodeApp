const request = require('request')
const fetch = require('node-fetch');

const url= "http://localhost:63748/api/"
const todosUrl= "https://jsonplaceholder.typicode.com"

const getAllEmployees = (callBack)=>{
    request({ url : url+"values" },(error,response)=>{
        if(error){
            callBack(error,[])
        }

        callBack(error,JSON.parse(response.body))        
    })
}

const getEmployeeByName = (empName,callBack)=>{
    request({url:url+"/values/"+empName},(error,response)=>{
        if(error){
            callBack(error,JSON.parse(response.body))
        }
        
        callBack(error,JSON.parse(response.body))
    })
}

const getAllEmployeesAsync = (callBack)=>{
    fetch(url+"/values").then((response)=>{
        response.json().then((data)=>{
            console.log(data)
            callBack(data)
        })
    })
}

const getAllTodos=(callBack)=>{
    fetch(todosUrl+'/todos').then((response)=>{
        response.json().then((data)=>{
            callBack(data)
        })
    })
}

module.exports = { 
    getAllEmployees : getAllEmployees , 
    getEmployeeByName : getEmployeeByName,
    getAllEmployeesAsync : getAllEmployeesAsync,
    getAllTodos : getAllTodos
}