/* eslint-disable max-len */
/* eslint-disable no-undef */
import * as util from '../src/index';

jest.setTimeout(30000);

const url = 'http://127.0.0.1:8085/index.html';
describe('tests', () => {
  it('expectConsoleLogs', async () => {
    const page = await browser.newPage();
    page.goto(url);
    await util.expectSequential(
      {
        expected: [
          'log 1',
          'log 2',
          'log 3',
        ],
        page,
        timeoutMs: 30000,
        ignore: new Set([
          '[HMR] Waiting for update signal from WDS...',
          '[WDS] Hot Module Replacement enabled.',
          '[WDS] Live Reloading enabled.',
        ]),
      },
    );
    await new Promise((resolve) => setTimeout(resolve, 1000));
    await page.close();
  });

  it('expectUnorderedLogs', async () => {
    const page = await browser.newPage();
    page.goto(url);
    await util.expectLogs({
      expected: [
        'log 1',
        'log 3',
        'log 2',
      ],
      timeoutMs: 1000,
      page,
    });
    await new Promise((resolve) => setTimeout(resolve, 1000));
    await page.close();
  });

  it('expectUnorderedLogsErrors', async () => {
    const page = await browser.newPage();
    page.goto(url);
    try {
      await util.expectLogs({
        expected: [
          'log 1',
          'log 35',
          'log 2',
        ],
        timeoutMs: 1000,
        page,
      });
    } catch (e) {
      expect(e.message).toEqual('Could not find expected console logs: log 35');
    }
    await new Promise((resolve) => setTimeout(resolve, 1000));
    await page.close();
  });

  it('waitForConsoleLog', async () => {
    const page = await browser.newPage();
    page.goto(url);
    await util.waitForLogs('log 5', page as any, 10000);
    await new Promise((resolve) => setTimeout(resolve, 1000));
    await page.close();
  });
});
