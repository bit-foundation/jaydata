﻿exports.Test = {
    'Q exists': function (test) {
        test.expect(2);
        
        $data.Class.define('$example.inMemoryQContext', $data.EntityContext, null, {
            Items: {
                type: $data.EntitySet,
                elementType: $data.Entity.extend('$example.inmemoryQEntity', {
                    Id: { type: 'int'},
                    Prop1: {type: 'string'}
                })
            }
        })

        var context = new $example.inMemoryQContext({ name: 'InMemory' });
        context.onReady(function(){
            var promise = context.Items.toArray();
            var q = require('q');
            
            test.equal(q.isPromise(new $data.PromiseHandlerBase().getPromise()), false, '$data.PromiseHandlerBase returns Q promise failed!');
            test.equal(q.isPromise(promise), true, '$data.PromiseHandler returns Q promise failed!');

            test.done();
        });
    },
    'Trace exists': function (test) {

        test.equal(typeof $data.TraceBase, 'function', '$data.TraceBase exists failed');
        test.notEqual(typeof $data.Trace, 'undefined', '$data.Trace exists failed');
        test.equal(typeof $data.Logger, 'function', '$data.Logger exists failed');

        test.done();
    }
}