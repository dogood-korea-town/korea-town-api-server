var express = require('express');
var router = express.Router();

/** 
 * @swagger
 *  /everyone-question:
 *    post:
 *      tags:
 *      - 질문 평가소
 *      description: 질문 평가소 - 서브 질문 작성하기
 *      requestBody:
 *        description: 질문 평가소 질문 내용
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/EveryonyQuestion'
 *      responses:
 *       200:
 *        description: 질문 평가소 질문 내용 등록 성공
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/PostItem'
 */
router.post('/', function(req, res, next) {
  return res.status(200).json({
    "id": 7
  });
});

module.exports = router;
