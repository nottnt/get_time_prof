const Nightmare = require('nightmare');
const nightmare = Nightmare({ show:false });
var express = require('express')
var app = express()


app.get('/', function (req, res) {
nightmare
  .goto('http://klogic.kmutnb.ac.th:8080/kris/tess/dataQuerySelector.jsp?query=teachTab')
  .wait(1000)
  .select('select[name="facCode"]', '06')
  .wait(1000)
  .select('select[name="lectCode"]', 'AMK')
  .wait(1000)
  .evaluate(function () {
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
  
        res.send({value})
     

  })
  .catch(error => {
    console.error('Search failed:', error)
  })
})