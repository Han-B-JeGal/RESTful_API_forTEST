var mysql = require ("mysql");

var db_info = {
    /* host: '49.236.146.45',
    port: '13306',
    user: 'dev_test',
    password: 'dev_test',
    database: 'coding_test_db',
    dateStrings: 'date' */
    host: 'localhost',
    port: '3306',
    user: 'root',
    password: 'root',
    database: 'test',
    dateStrings: 'date'
}

module.exports = {
    init: function () {
        return mysql.createConnection(db_info);
    },
    connect: function(conn) {
        conn.connect(function(err) {
            if(err) console.error('mysql connection error : ' + err);
                else console.log('mysql is connected successfully ! \nyour port number is ' + db_info.port);
        });
    }
}