const Nightmare = require('nightmare');
const nightmare = Nightmare({ show:true });
var express = require('express')
var app = express()
var port = process.env.PORT || 5000;

app.listen(port, function() {
    console.log('Starting node.js on port ' + port)
  })

app.get('/gettime', function gg (req, res) {
  console.log('go to the hell')


nightmare
  
  .goto('http://klogic.kmutnb.ac.th:8080/kris/tess/dataQuerySelector.jsp?query=teachTab')
  .wait(1000)
  .select('select[name="facCode"]', '06')
  .wait(1000)
  .select('select[name="lectCode"]', 'AMK')
  .wait(1000)
  .evaluate(function gg() {
    var data = []
    var x = document.body.getElementsByTagName('table')[6].getElementsByTagName('tr')
    for (var i = 1; i < x.length; i++) {
      data.push(
        {
          id: x[i].getElementsByTagName('td')[0].innerText,
          name: x[i].getElementsByTagName('td')[1].innerText
        }
      )
    }
    
    return data
  })
  
  .end()
  .then(value => {
     res.send(value)
     
    process.exit(0);
    
  })
  
  .catch(error => {
    console.error('Search failed:', error)
  })
  
})