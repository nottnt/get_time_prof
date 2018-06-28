const Nightmare = require('nightmare');
const nightmare = Nightmare({ show:false });
var express = require('express')
var app = express()
var port = process.env.PORT || 5000;
var http = require('http')
var str
app.listen(port, function() {
    console.log('Starting node.js on port ' + port)
  })

 app.get('/gettime', function(req, res) {
  nightmareProcess().then(value => {
    res.send(value)
  })
}) 

var nightmareProcess = () => { 
   return new Promise(resolve => {
    nightmare
  .wait(1000)
  .goto('http://klogic.kmutnb.ac.th:8080/kris/tess/dataQuerySelector.jsp?query=openSectionTab')
  .wait(1000)//ขึ้น heroku เปลี่ยนเป็น1000
  .select('select[name="facCode"]', '06')
  .wait(1000)
  .select('select[name="deptCode"]', '0602')
  .wait(1000)
  .click('table:nth-child(2) > tbody > tr:nth-child(2) > td:nth-child(1) > table > tbody > tr:nth-child(3) > td:nth-child(2) > input[type="radio"]:nth-child(2)')
  .wait(2000)//ชึ้น heroku เปลี่ยนเป็น2000
  .evaluate(function() {
   
    var data = []
    var expr1 = document.body.getElementsByTagName('table')[5].getElementsByTagName('tr')//หาว่า อ.สอนวันอะไร อ.คนไหน
    var alltr = document.body.getElementsByTagName('table')[5].getElementsByTagName('tr')
    
    var alltr_suc = alltr.length
    var check_h
    var check_space
    var check_h1
    var checktr
    
    
    


        for(var r = 0; r < alltr_suc ; r++){
         
          check_h = alltr[r].getElementsByTagName('td')[0].innerText
          check_h = check_h.substring(0, 1)
          check_space = alltr[r].getElementsByTagName('td')[0].innerHTML
          check_space = check_space.substring(0, 1)
          
          check_h1 = alltr[r].getElementsByTagName('td')[0].innerText
          check_h1 = check_h1.substring(0, 2)

          if(check_h !='0' && check_h !='1' && check_h !='2' && check_h !='3' && check_h !='4' && check_h !='5' && check_h !='6' && check_h !='7' && check_h !='8' && check_h !='9' && check_space != '&' && check_h != ' ' && check_h != 'M' && check_h != 'T' && check_h != 'W' && check_h != 'H' && check_h != 'F' && check_h != 'S' ){//if1
           
              

            checktr = expr1[r].getElementsByTagName('td')[1].getElementsByTagName('table')[0].getElementsByTagName('tr')
            if(checktr.length>0){//if2
                 
              for(var c = 0 ; c < checktr.length ; c++){
                data.push(
                  {
                      
                  
                   day : expr1[r].getElementsByTagName('td')[1].getElementsByTagName('table')[0].getElementsByTagName('tr')[c].getElementsByTagName('td')[0].innerText,
                   time: expr1[r].getElementsByTagName('td')[1].getElementsByTagName('table')[0].getElementsByTagName('tr')[c].getElementsByTagName('td')[1].innerText,
                   prof : expr1[r].getElementsByTagName('td')[1].getElementsByTagName('table')[0].getElementsByTagName('tr')[c].getElementsByTagName('td')[2].innerText.trim().substring(3, 6),
                   count : r,
                   test : 2.1
                    
                      
                      
                  }
                )
                  
                    if(expr1[r].getElementsByTagName('td')[1].getElementsByTagName('table')[0].getElementsByTagName('tr')[0].getElementsByTagName('td')[2].innerText.trim().length > 6){ //แยก อ.ที่สอนวิชาเดียวกัน
              
                      data.push(
                        {
                        
                    
                        day : expr1[r].getElementsByTagName('td')[1].getElementsByTagName('table')[0].getElementsByTagName('tr')[c].getElementsByTagName('td')[0].innerText,
                        time: expr1[r].getElementsByTagName('td')[1].getElementsByTagName('table')[0].getElementsByTagName('tr')[c].getElementsByTagName('td')[1].innerText,
                        prof : expr1[r].getElementsByTagName('td')[1].getElementsByTagName('table')[0].getElementsByTagName('tr')[c].getElementsByTagName('td')[2].innerText.trim().substring(11, 14),
                        count : r,
                        c : expr1[r].getElementsByTagName('td')[1].getElementsByTagName('table')[0].getElementsByTagName('tr')[0].getElementsByTagName('td')[2].innerText,
                        test : 2.2
                        
                        }
                      )
        
                    }
                  }
                }//endif2 
              
          }//endif1
          else if(check_h1 =='S.'){
            
           

            checktr = expr1[r].getElementsByTagName('td')[1].getElementsByTagName('table')[0].getElementsByTagName('tr')
            if(checktr.length>1){
            
              for(var c = 0 ; c < checktr.length ; c++){
                data.push(
                  {
                  
              
                  day : expr1[r].getElementsByTagName('td')[1].getElementsByTagName('table')[0].getElementsByTagName('tr')[c].getElementsByTagName('td')[0].innerText,
                  time: expr1[r].getElementsByTagName('td')[1].getElementsByTagName('table')[0].getElementsByTagName('tr')[c].getElementsByTagName('td')[1].innerText,
                  prof : expr1[r].getElementsByTagName('td')[1].getElementsByTagName('table')[0].getElementsByTagName('tr')[c].getElementsByTagName('td')[2].innerText.trim().substring(3, 6),
                  count : r,
                  test : 3.1,
                  l :checktr.length
              
                
                  
                  
                  }
                )
              }
             
            }
        }
      }
      
     
    return data
  })
  
  .then(value => {
    console.log('Get Data Succeessful')
   resolve(value)
  })
  
  .catch(error => {
    console.error('Search failed:', error)
    nightmareProcess().then(value => {
      resolve(value)
    })
  })
})
} 