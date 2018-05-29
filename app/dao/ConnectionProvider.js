'use strict'

const oracledb = require('oracledb')
const dbAtt    = require('../../config/')

function error(err, response, cnx) {
    if(err) {
        console.log(err);
        if (cnx != null) {
            close(cnx);
        }
        return -1
    }
    else {
        return 0
    }
}

function open(sql, binds, dml, of, response, callback, errorCallback) {
    oracledb.getConnection(dbAtt, function(err, cnx) {
        if (error(err, response, null) == -1) {
            errorCallback(err)
            return
        }

        cnx.execute(sql, binds, {autoCommit: dml, outFormat: of}, function(err, result) {
            if (error(err, response, cnx) == -1) {
                errorCallback(err)
                return
            }
            close(cnx)
            callback(result)
        })
    })
}

function close(cnx) {
    cnx.release(
        function (err) {
            if(err) {
                console.error(err.message)
            }
        }
    )
}

exports.open = open
exports.close = close
