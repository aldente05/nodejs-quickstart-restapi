/**
 * Created by f.putra on 2019-05-02.
 * controller
 */
let express = require('express');
let userRouter = express.Router();
let userService = require('./../services/UserServices')
let {authorize, utils, role} = require('./../_helpers')

userRouter.post('/register', (req, res, next) => {
    userService.register(req.body).then(result => {
        utils.doResponse(res, 200, result);
    }).catch(error => {
        console.log(error)
        if (error.errors[0].type === "unique violation") {
            utils.doResponse(res, 403, "Your Identity has exist");
        } else {
            utils.doResponse(res, 401, "your credentials is invalid");
        }
    })
})

userRouter.post('/login', (req, res, next) => {
    const cret = req.headers['authorization'];
    const decode = new Buffer(cret.split(' ')[1], 'base64').toString();
    const user = decode.split(":")[0];
    const pw = decode.split(":")[1];

    userService.login(user, pw).then(result => {
        utils.doResponse(res, result.code, result.message);
    })
})

userRouter.patch('/update', (req, res, next) => {
    userService.updateProfile(req.body)
        .then(result => {
            utils.doResponse(res, 200, result[1][0]);
        }).catch(next)
})

userRouter.get('/offset=:moffset&limit=:mlimit', authorize(), (req, res, next) => {
    userService.getAll(req.params.moffset, req.params.mlimit).then(result => {
        utils.doResponse(res, 200, result)
    }).catch(next)
})

userRouter.get('/s=:param', (req, res, next) => {
    userService.serachByName(req.params.param).then((result, status) =>{
        utils.doResponse(res, 200, result.hits.hits)
    }).catch(error =>{
        utils.doResponse(res, 403, error)
    })
})

userRouter.get('/:mid', authorize(), (req, res, next) => {
    userService.findById(req.params.mid).then(result => {
        utils.doResponse(res, 200, result);
    }).catch(next)
})

userRouter.delete('/:mid', authorize(), (req, res, next) => {
    userService.deleteById(req.params.mid).then(() => {
        utils.doResponse(res, 200, "Success");
    }).catch(next)
})

module.exports = userRouter;
