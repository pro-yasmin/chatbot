import { test as base, expect as baseExpect } from '@playwright/test';
import fs from 'fs';
import path from 'path';

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

    // Dynamically set viewport based on screen size
    /*const screenSize = await page.evaluate(() => {
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
    });*/

    await use(context);

    await page.close();
    await context.close(); // This flushes the video to disk

    // Attach video to test report
    const video = page.video();
    if (video) {
      try {
        const videoPath = await video.path();
        if (fs.existsSync(videoPath)) {
          await testInfo.attach('Full Test Video', {
            path: videoPath,
            contentType: 'video/webm',
          });
        }
      } catch (err) {
        console.warn('⚠️ Video attachment failed:', err);
      }
    }
  },

  page: async ({ context }, use, testInfo) => {
    const [page] = context.pages(); // Reuse the created page
    await use(page);

    // Attach screenshot if the test fails
   /* if (testInfo.status !== testInfo.expectedStatus) {
      try {
        await page.waitForTimeout(3000); // Wait for rendering
        const screenshotPath = path.join(
          testInfo.outputDir,
          `${testInfo.title.replace(/\s+/g, '_')}-failure.png`
        );
        await page.screenshot({
          path: screenshotPath,
          fullPage: true,
          timeout: 10000, // Increase timeout for CI
        });
        await testInfo.attach('Failure Screenshot', {
          path: screenshotPath,
          contentType: 'image/png',
        });
      } catch (err) {
        console.warn('⚠️ Screenshot capture failed:', err);
      }
    }*/
  },
});

export const expect = baseExpect;
