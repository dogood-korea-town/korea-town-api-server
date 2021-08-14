var express = require('express');
var router = express.Router();

/** 
 * @swagger
 *  /react-question/{questionId}:
 *    post:
 *      tags:
 *      - 오늘의 질문
 *      description: 오늘의 질문 - 서브 질문에 공감하기
 *      parameters:
 *        - in: path
 *          name: questionId
 *          required: true
 *          schema:
 *            type: integer
 *            description: 서브 질문 ID
 *      responses:
 *       200:
 *        description: 서브 질문에 공감 등록 성공
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
