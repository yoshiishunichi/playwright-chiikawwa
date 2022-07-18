import { chromium } from "playwright";

const baseUrl = "https://salty-ocean-60407.herokuapp.com";
const postsUrl = `${baseUrl}/posts/index`;

const postIndexItemClassName = ".posts-index-item";

const main = async () => {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage();
  await page.goto(postsUrl);
  const linkDivs = await page.$$(postIndexItemClassName);
  const hrefs = await Promise.all(
    linkDivs.map(async (linkDiv) => {
      const link = await linkDiv.$("a");
      const href = await link?.getAttribute("href");
      return href;
    })
  );
  const filteredHrefs = [...new Set(hrefs)];

  for (let i = 0; i < filteredHrefs.length; i++) {
    const href = filteredHrefs[i];
    await page.goto(`${baseUrl}${href}/edit`);
    const form = (await page.$$(`form`))[1];
    const textarea = await form.$("textarea");
    const button = await form.$("input[type='submit']");
    const content = (await textarea?.innerHTML()) || "";
    const reg = /.*ちいねえ/;
    if (!reg.test(content)) {
      const newContent = content ? `${content}ちいねえ` : "ちいねえ";
      await textarea?.fill(newContent);
      await button?.click({ force: true });
    }
  }
  await browser.close();
};

main();
