var mybatisMapper = require('mybatis-mapper');

// notice : start directory is root
mybatisMapper.createMapper(['./common/query/sql_test.xml', './sql/question_box.xml']);

module.exports.mybatisMapper = mybatisMapper;