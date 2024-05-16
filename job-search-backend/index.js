const express = require('express');
const puppeteer = require('puppeteer');
const UserAgent = require('user-agents');

const app = express();
const PORT = 5001;

const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

const scrapeJobs = async () => {
  const browser = await puppeteer.launch({ headless: true });
  const page = await browser.newPage();

  const userAgent = new UserAgent();
  await page.setUserAgent(userAgent.toString());

  await page.goto('https://us.jora.com');

  //navigate to jobs in orlando
  await page.waitForSelector('#q');
  await page.type('#q', 'software engineer');

  await page.waitForSelector('#l');
  await page.type('#l', 'Orlando, Fl');

  // Ensure the submit button is in 
  const submitButtonSelector = '.search-jobs-button.rounded-button.-primary.-size-lg.-w-full.-mb-4';
  await page.waitForSelector(submitButtonSelector);
  await page.evaluate((selector) => {
    document.querySelector(selector).scrollIntoView();
  }, submitButtonSelector);

  // Click the submit button and wait for navigation to complete
  await Promise.all([
    page.click(submitButtonSelector), // Click the submit button
    page.waitForNavigation({ waitUntil: 'networkidle0' }), // Wait for the navigation to complete
  ]);

  console.log('Search form submitted');

  // grab jobs
  //   await page.waitForSelector('.jobresults'); 
  await page.waitForSelector('.job-title.heading-large');
  
  const allJobs = await page.evaluate(() => {

    // const jobs = document.querySelectorAll("body > main > div > div:nth-child(3) > section > div > div.tab-panels > div.tab-panel.active > div > a")
    // const jobs = document.querySelectorAll("#jobresults > .job-card result organic-job")
    const jobs = document.querySelectorAll(".job-title.heading-large a");
    const jobTitles = [];

    jobs.forEach(jobElement => {
        // const jobTitle = jobElement.getAttribute('inner');
        // jobTitles.push(jobElement.innerHTML);
        jobTitles.push(jobElement.textContent.trim());
      });

    return jobTitles;
  });
  

  console.log(allJobs)
  await browser.close();
  return allJobs;
};

app.get('/scrape-jobs', async (req, res) => {
  try {
    const jobs = await scrapeJobs();
    res.json(jobs);
    await delay(1000);
  } catch (error) {
    console.error(error);
    res.status(500).send('Error scraping jobs');
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
