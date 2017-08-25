let cherrio = require("cheerio");
let http = require("http");
let multer = require("nodemailer");
let rootURL = "http://www.zjhospital.com.cn/";
let ralativePath = "hpzp.php";
let url = rootURL + ralativePath;
function decodeTime(dateStr) {
  let arr = dateStr.split("-");
  let month = parseInt(arr[0]);
  let day = parseInt(arr[1]);
  return {
    month: month,
    day: day
  };
}
http.get(url, sres => {
  let chunks = [];
  sres.on("data", chunk => {
    chunks.push(chunk);
  });
  sres.on("end", () => {
    let list = [];
    let html = Buffer.concat(chunks).toString();
    let $ = cherrio.load(html, { decodeEntitis: false });
    $(".news-list").find("li").each((index, element) => {
      let $element = $(element);
      list.push({
        title: $element.find(".fl").text(),
        date: $element.find(".fr").text()
      });
    });
    // console.log(list);
    let latestDate = decodeTime(list[0].date);
    console.log(latestDate);
  });
});

let mailTransport = nodemailer.createTransport({
  host: "smtp.sina.com",
  secureConnection: true, // 使用SSL方式（安全方式，防止被窃取信息）
  auth: {
    user: "你的邮箱地址",
    pass: "你的邮箱密码"
  }
});
