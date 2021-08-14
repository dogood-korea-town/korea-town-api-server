var express = require('express');
var router = express.Router();
let async = require('async');
let mybatisMapper = require('../common/mybatis').mybatisMapper;
let countryIso = require('country-iso');

/** 
 * @swagger
 *  /today-question/main:
 *    get:
 *      tags:
 *      - 오늘의 질문
 *      description: 오늘의 질문 - 메인 질문 가져오기
 *      parameters:
 *        - in: query
 *          name: userId
 *          required: true
 *          schema:
 *            type: integer
 *            default: 0
 *            description: 유저 ID (dummy 0)
 *      responses:
 *       200:
 *        description: 메인 질문 가져오기 성공
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/TodayMainQuestion'
 */
router.get('/main', function(req, res, next) {
  let user_id = req.query.userId;

  if (user_id == 0) {
    return res.status(200).json({
      "id": 1,
      "title": "당신은 지금 어디에 살고 있나요??",
      "number": 3
    });
  }
  
  function getConnection(callback) {
    req.database.getConnection(function (err, connection) {
      if (err) {
        callback(err);
      } else {
        callback(null, connection);
      }
    });
  }

  function checkNotComplete(connection, callback) {
    let param;
    let query;
    try {
      param = {
        user_id: user_id
      };
      query = mybatisMapper.getStatement('apiMapper', 'checkNotComplete', param, {language: 'sql', indent: '  '});

    } catch (err) {
      connection.release();
      callback(err);
    }

    connection.query(query, function (err, isNotCompleteResult) {
      if (err) {
        connection.release();
        callback(err);
      } else {
        if (!(isNotCompleteResult[0].is_not_complete)) {
          connection.release();

          let new_err = new Error('오늘 메인 질문을 이미 완료하였습니다.');
          new_err.status = 410;
          return callback(new_err);
        }

        callback(null, connection);
      }
    });
  }
  
  function selMainQuestion(connection, callback) {
    let param;
    let query;
    try {
      param = {
        user_id: user_id
      };
      query = mybatisMapper.getStatement('apiMapper', 'selMainQuestion', param, {language: 'sql', indent: '  '});

    } catch (err) {
      connection.release();
      callback(err);
    }

    connection.query(query, function (err, mainQuestionResult) {
      connection.release();
      if (err) {
        callback(err);
      } else {
        callback(null, mainQuestionResult);
      }
    });
  }

  function resultJSON(mainQuestionResult, callback) {
    let result = {}
    if (mainQuestionResult.length > 0) {
      result = mainQuestionResult[0]
    }
    callback(null, result);
  }

  async.waterfall([getConnection, checkNotComplete, selMainQuestion, resultJSON], function (err, result) {
    if (err) {
      let new_err = new Error('메인 질문 조회에 실패하였습니다.');
      new_err.status = err.status;
      new_err.message += ' 상세:' + err.message;
      next(new_err);
    } else {
      res.json(result);
    }
  });
});

/** 
 * @swagger
 *  /today-question/main/{mainQuestionId}/answer:
 *    post:
 *      tags:
 *      - 오늘의 질문
 *      description: 오늘의 질문 - 메인 질문 답변하기
 *      parameters:
 *        - in: path
 *          name: mainQuestionId
 *          required: true
 *          schema:
 *            type: integer
 *            description: 메인 질문 ID
 *      requestBody:
 *        description: 메인 질문 답변 내용
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/MainAnswer'
 *      responses:
 *       200:
 *        description: 메인 질문 답변 등록 성공
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/PostItem'
 */
 router.post('/main/:mainQuestionId/answer', function(req, res, next) {
    let mainQuestionId = parseInt(req.params.mainQuestionId);
    let userId = req.body.userId;
    let themeId = req.body.themeId;
    let content = req.body.content;
    let latitude = req.body.latitude;
    let longitude = req.body.longitude;

    if (userId == 0) {
      return res.status(200).json({
        "id": 3
      });
    }

    function getConnection(callback) {
      req.database.getConnection(function (err, connection) {
        if (err) {
          callback(err);
        } else {
          callback(null, connection);
        }
      });
    }

    function getCountry(connection, callback) {
      let countryCodes = countryIso.get(latitude, longitude);
      let country = 'ETC'
      if (countryCodes.length > 0) {
        country = countryCodes[0]
      }
      callback(null, connection, country);
    }
  
    function insertMainAnswer(connection, country, callback) {
      let param;
      let query;
      try {
        param = {
          mainQuestionId: mainQuestionId,
          userId: userId,
          themeId: themeId,
          content: content,
          country: country,
        };
        query = mybatisMapper.getStatement('apiMapper', 'insertMainAnswer', param, {language: 'sql', indent: '  '});
  
      } catch (err) {
        connection.release();
        callback(err);
      }
  
      connection.query(query, function (err, insertResult) {
        connection.release();
        if (err) {
          callback(err);
        } else {
          callback(null, insertResult);
        }
      });
    }
  
    function resultJSON(insertResult, callback) {
      let result = {
        'id': insertResult.insertId
      };
      callback(null, result);
    }
  
    async.waterfall([getConnection, getCountry, insertMainAnswer, resultJSON], function (err, result) {
      if (err) {
        let new_err = new Error('메인 질문 답변 등록에 실패하였습니다.');
        new_err.status = err.status;
        new_err.message += ' 상세:' + err.message;
        next(new_err);
      } else {
        res.json(result);
      }
    });

  });

/** 
 * @swagger
 *  /today-question/sub-category-list:
 *    get:
 *      tags:
 *      - 오늘의 질문
 *      description: 오늘의 질문 - 서브 질문 카테고리 나열
 *      responses:
 *       200:
 *        description: 서브 질문 카테고리 조회 성공
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/SubCategoryList'
 */
 router.get('/sub-category-list', function(req, res, next) {
    return res.status(200).json({
        "categoryList": [
          {"id": 1, "categoryName": "정치"},
          {"id": 2, "categoryName": "사회"},
          {"id": 3, "categoryName": "상식"},
          {"id": 4, "categoryName": "문화"},
          {"id": 5, "categoryName": "역사"},
          {"id": 6, "categoryName": "음식"},
          {"id": 7, "categoryName": "여행"},
          {"id": 8, "categoryName": "의료"},
          {"id": 9, "categoryName": "종교"}
        ]
      });
  });


/** 
 * @swagger
 *  /today-question/sub:
 *    get:
 *      tags:
 *      - 오늘의 질문
 *      description: 오늘의 질문 - 서브 질문 가져오기
 *      parameters:
 *        - in: query
 *          name: userId
 *          required: true
 *          schema:
 *            type: integer
 *            description: 유저 ID
 *        - in: query
 *          name: categoryId
 *          required: true
 *          schema:
 *            type: integer
 *            description: 카테고리 ID
 *      responses:
 *       200:
 *        description: 서브 질문 가져오기 성공
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/TodaySubQuestion'
 */
 router.get('/sub', function(req, res, next) {
    return res.status(200).json({
        "categoryName": "영화",
        "title": "좋아하는 영화 제목은 무엇인가요?"
      });
  });

/** 
 * @swagger
 *  /today-question/sub/{subQuestionId}/answer:
 *    post:
 *      tags:
 *      - 오늘의 질문
 *      description: 오늘의 질문 - 서브 질문 답변하기
 *      parameters:
 *        - in: path
 *          name: subQuestionId
 *          required: true
 *          schema:
 *            type: integer
 *            description: 서브 질문 ID
 *      requestBody:
 *        description: 서브 질문 답변 내용
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/SubAnswer'
 *      responses:
 *       200:
 *        description: 서브 질문 답변 등록 성공
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/PostItem'
 */
router.post('/sub/:subQuestionId/answer', function(req, res, next) {
  return res.status(200).json({
      "id": 7
    });
});

module.exports = router;
