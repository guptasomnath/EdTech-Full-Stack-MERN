import { faker } from "@faker-js/faker";
import puppeteer from "puppeteer";

const getUdemyData = async () => {
  const browser = await puppeteer.launch({headless : false});
  const page = await browser.newPage();

  await page.goto('https://www.udemy.com/courses/search/?q=Project+Manager&ratings=3.0&sort=relevance&src=ukw');

  await page.waitForSelector(".course-card-title-module--course-title--3k0w_");

  const neededDatas = await page.evaluate(() => {
    const titles = document.querySelectorAll(".course-card-title-module--course-title--3k0w_");
    const shortDescriptions : any = document.querySelectorAll(".course-card-module--course-headline--15Esr");
    const ratingNumbers : any = document.querySelectorAll(".star-rating-module--rating-number--2xeHu");
    const thumbnails : any = document.querySelectorAll(".course-card-module--image-container--20x0M");

    return Array.from(titles).slice(0, 10).map((item : any, index) => {
       const title = item.childNodes[0].innerText.split("\n")[0];
       const shortDescription = shortDescriptions[index].textContent;
       const ratingNumber = ratingNumbers[index].textContent;
       const thumbnail = thumbnails[index].childNodes[0].src.replace("240x135", "480x270");

       return { title, shortDescription, ratingNumber, thumbnail };
    })
  })



  await browser.close();

  return neededDatas;

}
   
export const createFakeCoursesData = async () => {
    const udemyDatas = await getUdemyData();

    return udemyDatas.map((item) => {
           return { 
            title : item.title,
            thumbnail : item.thumbnail,
            duration : faker.number.int({min : 2000, max : 100000}),
            categoryName : "Project Manager",
            longDescription : faker.lorem.paragraphs(),
            language : faker.getMetadata().language,
            price : faker.commerce.price({min : 0}),
            createdAt : faker.date.past(),
            shortDescription : item.shortDescription,
            ratings : item.ratingNumber,
            totalRatings : faker.number.int({min : 1, max : 100})
        }
    })
}