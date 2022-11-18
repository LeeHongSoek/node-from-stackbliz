/**
 * https://velog.io/@yesdoing/Node.js-에서-웹-크롤링하기-wtjugync1m
 *
 * Node.js 에서 웹 크롤링하기    # npm install axios cheerio
 *
 */
const axios = require('axios');
const cheerio = require('cheerio');
const log = console.log;

const getHtml = async () => {
  try {
    // 연합뉴스 스포츠
    return await axios.get('https://www.yna.co.kr/sports/all');
  } catch (error) {
    console.error(error);
  }
};

getHtml()
  .then((html) => {
    let ulList = [];
    const $ = cheerio.load(html.data);
    const $bodyList = $('div.list-type038 ul').children('li');

    $bodyList.each(function (i, elem) {
      ulList[i] = {
        date: $(this).find('span.txt-time').text(),
        title: $(this).find('strong.tit-news').text(),
        url: $(this).find('a.tit-wrap').attr('href'),
        image_url: $(this).find('a.img img').attr('src'),
        image_alt: $(this).find('a.img img').attr('alt'),
      };
    });

    const data = ulList.filter((n) => n.title);
    return data;
  })
  .then((res) => log(res));
