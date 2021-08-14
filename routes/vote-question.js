var express = require('express');
var router = express.Router();

/** 
 * @swagger
 *  /vote-question:
 *    get:
 *      tags:
 *      - 질문 평가소
 *      description: 질문 평가소 - 평가할 서브 질문 리스트 조회하기
 *      responses:
 *       200:
 *        description: 평가할 서브 질문 리스트 조회 성공
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/VoteQuestionList'
 */
router.get('/', function(req, res, next) {
  return res.status(200).json({
    "questionList": [
      {"id": 1, "categoryId": 1, "categoryName": "정치", "writeId": 1, "writeNickname": "레빗레빗", "title": "제일 맛있는 과자 이름은?", "likeCnt": 100},
      {"id": 2, "categoryId": 3, "categoryName": "문화", "writeId": 5, "writeNickname": "초코초코", "title": "제일 맛없는 과자 이름은?", "likeCnt": 50}
    ]
  });
});

/** 
 * @swagger
 *  /vote-question/{questionId}:
 *    post:
 *      tags:
 *      - 질문 평가소
 *      description: 질문 평가소 - 서브 질문에 대한 통과/신고 하기
 *      parameters:
 *        - in: path
 *          name: questionId
 *          required: true
 *          schema:
 *            type: integer
 *            description: 평가 할 서브 질문 ID
 *      requestBody:
 *        description: 서브 질문에 대해 통과/신고 
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/VoteQuestion'
 *      responses:
 *       200:
 *        description: 서브 질문에 대한 통과/신고  등록 성공
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/PostSuccess'
 */
 router.post('/:questionId', function(req, res, next) {
  return res.status(200).json({
    "result": true
  });
});

module.exports = router;
