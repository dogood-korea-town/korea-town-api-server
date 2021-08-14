var express = require('express');
var router = express.Router();

/** 
 * @swagger
 * 
 *  /question-box/{userId}/main:
 *    get:
 *      tags:
 *      - "질문 보관서에서 메인 질문 가져오기"
 *      description: question-box/main
 *      parameters:
 *        - in: path
 *          name: userId
 *          description: 유저의 id값
 *          required: true
 *          type: integer
 *          example: 1
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
 *      - "질문 보관서에서 서브 질문 가져오기"
 *      description: /question-box/{userId}/sub
 *      parameters:
 *        - in: query
 *          name: categoryId
 *          required: true
 *          type: integer
 *          description: 카테고리의 ID
 *          example: 1
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
 *      - 메인 질문에 대한 답변 리스트 가져오기
 *      description: question-box/main/{mainQuestionId}/answerList
 *      parameters:
 *        - in: path
 *          name: mainQuestionId
 *          required: true
 *          type: integer
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
 *      - 서브 질문에 대한 답변 리스트 가져오기
 *      description: question-box/sub/{subQuestionId}/answerList
 *      parameters:
 *        - in: path
 *          name: subQuestionId
 *          required: true
 *          type: integer
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
 router.get(':userId/main', function(req, res, next) {
    return res.status(200).json({
      "mainQuestionList": [{
        "id": 1,
        "number": 1,
        "title":"당신은 지금 어디에 살고 있나요?",
        "modified": "2021-07-10 14:00:00"
      }]
    });
  });

  router.get(':userId/sub', function(req, res, next) {
    return res.status(200).json({
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
    return res.status(200).json({
      "mainAnswerList": [{
        "answerId": 1,
        "userId": 1,
        "nickname" : "코리안",
        "themeId" : 1,
        "content": "어디게~~?",
        "agreeCnt": 100,
        "modified": "2021-07-10 14:00:00"
      }]
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