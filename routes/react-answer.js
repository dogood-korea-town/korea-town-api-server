var express = require('express');
var router = express.Router();

/** 
 * @swagger
 *  /react-answer/{answerId}:
 *    post:
 *      tags:
 *      - 오늘의 답장
 *      - 모두의 답장
 *      description: 오늘의 답장 및 모두의 답장 - 답변에 대한 공감/신고 하기
 *      parameters:
 *        - in: path
 *          name: answerId
 *          required: true
 *          schema:
 *            type: integer
 *            description: 답변 ID
 *      requestBody:
 *        description: 답변에 대한 공감/신고
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/ReactAnswer'
 *      responses:
 *       200:
 *        description: 답변에 대한 공감/신고 등록 성공
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/PostSuccess'
 */
router.post('/:answerId', function(req, res, next) {
  return res.status(200).json({
    "result": true
  });
});

module.exports = router;
