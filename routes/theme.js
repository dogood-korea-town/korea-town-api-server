var express = require('express');
var router = express.Router();

/** 
 * @swagger
 *  /theme:
 *    get:
 *      tags:
 *      - 테마 리스트 불러오기
 *      description: 테마 리스트 불러오기
 *      parameters:
 *        - in: query
 *          name: userId
 *          required: true
 *          schema:
 *            type: integer
 *            description: 유저아이디
 *      responses:
 *       200:
 *        description: 테마 조회 성공
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/Theme'
 *    post:
 *      tags:
 *      - 테마 구매하기
 *      description: 테마 구매하기
 *      requestBody:
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/User'
 *      responses:
 *       200:
 *        description: 테마 구매 성공
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/Result'
 */

router.get('/', function(req, res, next) {
  return res.status(200).json({
    "themeList": [{
      "themeId": 1,
      "isFree": true,
      "isPurchase" : false,
      "price": 0
    }]
  });
});

router.post('/:themeId', function(req, res, next) {
    return res.status(200).json({
      "result" : true
    });
  });

module.exports = router;
