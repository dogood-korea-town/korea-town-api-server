var express = require('express');
var router = express.Router();

/** 
 * @swagger
 *  /react-answer:
 *    post:
 *      tags:
 *      - 답변 보관소
 *      description: 답변 보관소 - 답변에 공감/신고 하기
 *      requestBody:
 *        description: 답변에 공감/신고
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/ReactAnswer'
 *      responses:
 *       200:
 *        description: 답변에 공감/신고 등록 성공
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/PostSuccess'
 */
router.post('/', function(req, res, next) {
  return res.status(200).json({
    "result": true
  });
});

module.exports = router;
