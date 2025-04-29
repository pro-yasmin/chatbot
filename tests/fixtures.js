import { test as base, expect as baseExpect } from '@playwright/test';
import fs from 'fs';
import path from 'path';

const filesToCleanup = [];

export const test = base.extend({
  context: async ({ browser }, use, testInfo) => {
    // Use the default test-results location for Playwright videos
    const videoDir = path.join(testInfo.outputDir, 'videos');
    fs.mkdirSync(videoDir, { recursive: true });

    const context = await browser.newContext({
      recordVideo: {
        dir: videoDir,
        size: { width: 1280, height: 720 },
      },
    });

    await use(context);
    await context.close();
  },

  page: async ({ context }, use, testInfo) => {
    const page = await context.newPage();

    // Run the test with the page
    await use(page);

    // If test failed, take a screenshot
   /* if (testInfo.status !== 'passed') {
      const screenshotPath = path.join(
        testInfo.outputDir,
        `${testInfo.title.replace(/\s+/g, '_')}-failed.png`
      );
      await page.screenshot({ path: screenshotPath });
      if (fs.existsSync(screenshotPath)) {
        await testInfo.attach('Failure Screenshot', {
          path: screenshotPath,
          contentType: 'image/png',
        });
        filesToCleanup.push(screenshotPath);
      }
    }*/

    // Attach the video
    const video = page.video();
    if (video) {
      const videoPath = await video.path();
      if (fs.existsSync(videoPath)) {
        await testInfo.attach('Test Video', {
          path: videoPath,
          contentType: 'video/webm',
        });
        filesToCleanup.push(videoPath);
      } else {
        console.warn('⚠️ Video path does not exist!');
      }
    }
  },
});

// Optional: clean up video & screenshot files after all tests
test.afterAll(async () => {
  for (const file of filesToCleanup) {
    try {
      fs.unlinkSync(file);
      console.log(`🧹 Deleted file: ${file}`);
    } catch (err) {
      console.warn(`⚠️ Failed to delete file: ${file}`, err);
    }
  }
});

export const expect = baseExpect;
