import { test as base, expect as baseExpect } from '@playwright/test';
import fs from 'fs';
import path from 'path';

export const test = base.extend({
  context: async ({ browser }, use, testInfo) => {
    const videoDir = path.join(testInfo.outputDir, 'videos');
    fs.mkdirSync(videoDir, { recursive: true });

    var context = await browser.newContext({
      //viewport: { width: 1280, height: 720 },
      recordVideo: {
        dir: videoDir,
        size: { width: 1280, height: 720 },
      },
    });

    
    var page = await context.newPage();

    // Get the screen's available width and height dynamically in the browser context
    var screenSize = await page.evaluate(() => {
      const style = document.createElement('style');
     style.textContent = '* { font-display: swap !important; }';
     document.head.appendChild(style);
      return {
        width: window.screen.availWidth,
        height: window.screen.availHeight,
      };
    });

    // Set the viewport size dynamically based on the available screen size
    await page.setViewportSize({
      width: screenSize.width,
      height: screenSize.height,
    });

    await use(context);
    await page.close();
    await context.close(); // This flushes video to disk

    // Wait and attach the video after context is closed
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
        console.warn('Video attachment failed:', err);
      }
    }
  },

  page: async ({ context }, use) => {
    const [page] = context.pages(); // Reuse the page created above
    await use(page);
     },
});

export const expect = baseExpect;
