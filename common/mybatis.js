var mybatisMapper = require('mybatis-mapper');

// notice : start directory is root
mybatisMapper.createMapper(['./common/query/sql_test.xml', './common/query/sql_today-question.xml']);

module.exports.mybatisMapper = mybatisMapper;