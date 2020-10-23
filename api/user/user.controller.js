'use strict';

var users = require('../../database/users').users;

exports.getUserList = function(req, res){
    res.setHeader('Content-Type', 'application/json;charset=utf-8');
    return res.status(200).json({users});
};

exports.addUser = function(req, res){
    res.setHeader('Content-Type', 'application/json;charset=utf-8');
    users[req.body.id] = req.body;
    return res.status(200).json({status:"success", message:"add user success"});
};

exports.destroy = function(req, res){
    res.setHeader('Content-Type', 'application/json;charset=utf-8');
    delete users[req.params.id];
    return res.status(200).send({status:"success", message:"delete user success"});
};

exports.updateUser = function(req, res){
    res.setHeader('Content-Type', 'application/json;charset=utf-8');
    users[req.body.id] = req.body;
    return res.status(200).json({status:"success", message:"update user success"});
};


