var express = require('express');
var router = express.Router();

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
 *            description: 유저 ID
 *      responses:
 *       200:
 *        description: 메인 질문 가져오기 성공
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/TodayMainQuestion'
 */
router.get('/main', function(req, res, next) {
  return res.status(200).json({
    "title": "당신은 지금 어디에 살고 있나요??",
    "number":3
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
    return res.status(200).json({
        "id": 3
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
