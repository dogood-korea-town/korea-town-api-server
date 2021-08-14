var express = require('express');
var router = express.Router();
let async = require('async');
let mybatisMapper = require('../common/mybatis').mybatisMapper;

/** 
 * @swagger
 * 
 *  /question-box/{userId}/main:
 *    get:
 *      tags:
 *      - 오늘의 답장
 *      description: 질문 보관서에서 메인 질문들 가져오기
 *      parameters:
 *        - in: path
 *          name: userId
 *          description: 유저의 id값
 *          required: true
 *          schema:
 *            type: integer
 *            example: 1
 *      responses:
 *       200:
 *        description: "successful main question-box"
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/MainQuestions'
 */

/**
 * @swagger
 *  /question-box/{userId}/sub:
 *    get:
 *      tags:
 *      - 모두의 답장
 *      description: 질문 보관서에서 서브 질문들 가져오기
 *      parameters:
 *        - in: path
 *          name: categoryId
 *          required: true
 *          schema:
 *            type: integer
 *            description: 카테고리의 ID
 *            example: 1
 *      responses:
 *       200:
 *        description: "successful sub question-box "
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/SubQuestions'
 * 
 */

/**
 * @swagger
 *  /question-box/main/{mainQuestionId}/answerList:
 *    get:
 *      tags:
 *      - 오늘의 답장
 *      description: 메인 질문에 대한 답변 리스트 가져오기
 *      parameters:
 *        - in: path
 *          name: mainQuestionId
 *          required: true
 *          schema:
 *            type: integer
 *        - in: query
 *          name: contry
 *          required: true
 *          type: string
 *          description: 두글자의 국가 코드를 넘겨주세요
 *      responses:
 *       200:
 *        description: "successful main answer list"
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/MainAnswerList'
 * 
 */

/**
 * @swagger
 *  /question-box/sub/{subQuestionId}/answerList:
 *    get:
 *      tags:
 *      - 모두의 답장
 *      description: 서브 질문에 대한 답변 리스트 가져오기
 *      parameters:
 *        - in: path
 *          name: subQuestionId
 *          required: true
 *          schema:
 *            type: integer
 *        - in: query
 *          name: contry
 *          required: true
 *          type: string
 *          description: 두글자의 국가 코드를 넘겨주세요
 *      responses:
 *       200:
 *        description: "successful sub answer list"
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/SubAnswerList'
 * 
 */
  router.get('/:userId/main', function(req, res, next) {
   let userId = parseInt(req.params.userId)
   function getConnection(callback) {
     req.database.getConnection(function (err, connection) {
       if (err) {
         callback(err);
       } else {
         callback(null, connection);
       }
     });
   }

   function selectMainQuestionList(connection, callback) {
      var param;
      let query;
      try {
        params = {
          userId : userId
        }
        query = mybatisMapper.getStatement('question_box', 'selMainQuestionList', params, {language: 'sql', indent: '  '});
  
      } catch (err) {
        connection.release();
        callback(err);
      }

      connection.query(query, function (err, results) {
        connection.release();
        if (err) {
          callback(err);
        } else {
          callback(null, results);
        }
      });
   }

   async.waterfall([getConnection, selectMainQuestionList], function (err, result) {
    if (err) {
      let new_err = new Error('main question list 조회에 실패하였습니다.');
      new_err.status = err.status;
      next(new_err);
      //next(err)
    } else {
      res.json({'mainQuestionList' : result});
    }
   });
  });

  router.get('/:userId/sub', function(req, res, next) {
    return res.status(200).json({
      "wordCloud": "http://drive.google.com/uc?export=view&id=13BGLkCkauK_OhVU9QWlOfUSY3pgp-8gX",
      "subQuestionList": [{
        "id": 1,
        "number": 1,
        "title":"우리 동네 찐 맛집은 어디인가요?",
        "agreeCnt": 100,
        "modified": "2021-07-10 14:00:00"
      }]
    });
  });

  router.get('/main/:mainQuestionId/answerList', function(req, res, next) {
    let questionId = parseInt(req.params.mainQuestionId)
    let contry = req.query.contry.toUpperCase()

    function getConnection(callback) {
      req.database.getConnection(function (err, connection) {
        if (err) {
          callback(err);
        } else {
          callback(null, connection);
        }
      });
    }

    function selectMainAnswerList(connection, callback) {
      var param;
      let query;
      try {
        params = {
          mainQuestId : questionId,
          contry : contry
        }
        query = mybatisMapper.getStatement('question_box', 'selMainAnswerList', params, {language: 'sql', indent: '  '});
  
      } catch (err) {
        connection.release();
        callback(err);
      }

      connection.query(query, function (err, results) {
        connection.release();
        if (err) {
          callback(err);
        } else {
          callback(null, results);
        }
      });
   }

   async.waterfall([getConnection, selectMainAnswerList], function (err, result) {
    if (err) {
      let new_err = new Error('main answer list 조회에 실패하였습니다.');
      new_err.status = err.status;
      next(new_err);
      //next(err)
    } else {
      res.json({'mainAnswerList' : result});
    }
   });

  }); 

  router.get('/sub/:subQuestionId/answerList', function(req, res, next) {
    return res.status(200).json({
      "subAnswerList": [{
        "answerId": 2,
        "userId": 1,
        "nickname" : "코리안",
        "themeId" : 1,
        "content": "어디게~~?",
        "agreeCnt": 100,
        "modified": "2021-07-10 14:00:00"
      }]
    });
  }); 
 module.exports = router;