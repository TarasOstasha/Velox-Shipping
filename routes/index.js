var express = require('express');
var router = express.Router();

//var cors = require('cors')
const Pallet = require('../models/palletModel');


/* GET home page. */
router.get('/expo', function (req, res, next) {
  res.json({ ok: true })
  res.render('index', { title: 'Express' });
});

router.post('/pallet-data', (req, res) => {
  try {
    let palletData = req.body;
    const pallet = new Pallet({
      name: palletData.name,
      quantity: palletData.quantity,
      date: palletData.date
    })
    pallet.save()
      .then(result => {
        res.status(201).json({
          message: 'New data created',
          result: result,
          ok: true
        });
      })
      .catch(err => {
        res.status(500).json({
          err: err,
          message: 'Error'
        });
      });
    //console.log(req.body)
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: error.message });
  }

});

router.get('/pallet-data', (req, res) => {
  try {
    Pallet.find({})
      .then(pallet => {
        if (!pallet) {
          return res.status(401).json({
            message: 'Not Found'
          });
        }
        res.status(200).json({
          message: 'You successfully fetched data',
          pallet
        });
      })
      .catch(err => {
        res.status(500).json({
          message: 'Error'
        });
      });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }

});


router.delete('/pallet-data/:id', async (req, res) => {
  try {
    const _id = req.params.id;
    Pallet.deleteOne({ _id })
      .then(pallet => {
        console.log(pallet, 'pallet')
        if (!pallet) {
          return res.status(401).json({
            message: 'Not Found'
          });
        }
        res.status(200).json({
          message: 'You successfully fetched data',
          pallet
        });
      })
      //Pallet.save()
      .catch(err => {
        res.status(500).json({
          message: 'Error'
        });
      });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});




//redirect all get request to index.html. Must be the last!!!!!!!!!!!!!!!
router.get('/*', async (req, res, next) => {
  console.log('726', req.user, new Date())
  const html = await pfs.readFile('frontEnd/dist/frontEnd/index.html');
  res.end(html);
  // res.redirect('/index.html');
});

module.exports = router;
