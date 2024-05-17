const express = require('express');
const puppeteer = require('puppeteer');
const UserAgent = require('user-agents');
const cors = require('cors');

const app = express();
const PORT = 5001;

// Enable CORS for all routes
app.use(cors());

const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

const scrapeJobs = async () => {
  const browser = await puppeteer.launch({ headless: true });
  const page = await browser.newPage();

  const userAgent = new UserAgent();
  await page.setUserAgent(userAgent.toString());

  await page.goto('https://us.jora.com');

  // Navigate to jobs in Orlando
  await page.waitForSelector('#q');
  await page.type('#q', 'software engineer');

  await page.waitForSelector('#l');
  await page.type('#l', 'Orlando, FL');

  const submitButtonSelector = '.search-jobs-button.rounded-button.-primary.-size-lg.-w-full.-mb-4';
  await page.waitForSelector(submitButtonSelector);
  await page.evaluate((selector) => {
    document.querySelector(selector).scrollIntoView();
  }, submitButtonSelector);

  await Promise.all([
    page.click(submitButtonSelector), // Click the submit button
    page.waitForNavigation({ waitUntil: 'networkidle0' }), // Wait for the navigation to complete
  ]);

  console.log('Search form submitted');

  // Grab jobs
  await page.waitForSelector('.job-title.heading-large');

  const allJobs = await page.evaluate(() => {
    const jobs = document.querySelectorAll('.job-title.heading-large a');
    const jobTitles = [];

    jobs.forEach(jobElement => {
      jobTitles.push(jobElement.textContent.trim());
    });

    // Remove duplicates
    return [...new Set(jobTitles)];
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
