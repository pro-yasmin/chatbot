import { test as base, expect as baseExpect } from '@playwright/test';
import fs from 'fs';
import path from 'path';

const filesToCleanup = [];

export const test = base.extend({
  context: async ({ browser }, use, testInfo) => {
    const videoDir = path.join(testInfo.outputDir, 'videos');
    fs.mkdirSync(videoDir, { recursive: true });

    const context = await browser.newContext({
      recordVideo: {
        dir: videoDir,
        size: { width: 1280, height: 720 },
      },
    });

    const page = await context.newPage();

    // Dynamically get screen size
    const screenSize = await page.evaluate(() => {
      const style = document.createElement('style');
      style.textContent = '* { font-display: swap !important; }';
      document.head.appendChild(style);
      return {
        width: window.screen.availWidth,
        height: window.screen.availHeight,
      };
    });

    await page.setViewportSize({
      width: screenSize.width,
      height: screenSize.height,
    });

    // Store the page in context so it can be reused
    context._page = page;

    await use(context);
    await page.close();
    await context.close(); // Ensure video is flushed to disk

    // Attach video after context is closed
    const video = page.video();
    if (video) {
      try {
        const videoPath = await video.path();
        if (fs.existsSync(videoPath)) {
          await testInfo.attach('Full Test Video', {
            path: videoPath,
            contentType: 'video/webm',
          });
          filesToCleanup.push(videoPath);
        }
      } catch (err) {
        console.warn('Video attachment failed:', err);
      }
    }
  },

  page: async ({ context }, use, testInfo) => {
    const page = context._page;

    await use(page);

    // Attach screenshot on failure
    if (testInfo.status !== testInfo.expectedStatus) {
      const screenshotPath = path.join(
        testInfo.outputDir,
        `${testInfo.title.replace(/\s+/g, '_')}-failed.png`
      );

      try {
        await page.waitForTimeout(1000); // Let fonts/rendering settle
        await page.screenshot({
          path: screenshotPath,
          timeout: 10000,
        });

        if (fs.existsSync(screenshotPath)) {
          await testInfo.attach('Failure Screenshot', {
            path: screenshotPath,
            contentType: 'image/png',
          });
          filesToCleanup.push(screenshotPath);
        }
      } catch (err) {
        console.warn('⚠️ Screenshot capture failed:', err);
      }
    }
  },
});

// Optional: cleanup after all tests
test.afterAll(async () => {
  for (const file of filesToCleanup) {
    try {
      fs.unlinkSync(file);
      console.log(`🧹 Deleted: ${file}`);
    } catch (err) {
      console.warn(`⚠️ Could not delete file: ${file}`, err);
    }
  }
});

export const expect = baseExpect;
