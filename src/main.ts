import { chromium } from "playwright";

const url = "https://salty-ocean-60407.herokuapp.com/posts/index";

const main = async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  await page.goto(url);
  await page.screenshot({ path: `example.png` });
  await browser.close();
};

main();
