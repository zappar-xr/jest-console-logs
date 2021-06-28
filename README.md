# jest-console-logs

![Build](https://github.com/zappar-xr/jest-console-logs/workflows/Build/badge.svg)

This library contains some handy console functions which aid jest-puppeteer tests.

You can find some examples in action over at <https://github.com/zappar-xr/jest-console-logs/tree/master/tests>

## Table Of Contents

<details>
<summary>Click to expand table of contents</summary>

<!--ts-->
   * [jest-console-logs](#jest-console-logs)
      * [Table Of Contents](#table-of-contents)
      * [Starting Development](#starting-development)
         * [NPM](#npm)
      * [Usage](#usage)
         * [Expecting Console Logs (Sequential)](#expecting-console-logs-sequential)
         * [Expecting Console Logs (Unordered)](#expecting-console-logs-unordered)
         * [Waiting for console logs](#waiting-for-console-logs)

<!-- Added by: zapparadmin, at: Mon Jun 28 13:55:46 BST 2021 -->

<!--te-->
</details>

## Starting Development

You can use this library by installing from NPM for use in a jest-puppeteer project.

### NPM

Run the following NPM command inside your project directory:

```bash
npm install --save-dev @zappar/jest-console-logs
```

Then import the library into your tests:

```ts
import * as util from '@zappar/jest-console-logs';
```

## Usage

### Expecting Console Logs (Sequential)

`util.expectSequential` resolves once provided logs are detected before the timeout. You may provide a set of logs to be ignored.

```ts
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
```

### Expecting Console Logs (Unordered)

`util.expectLogs` resolves once provided logs are detected before the timeout.

```ts
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
  });
```

Catching errors:

```ts
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
  });
```

### Waiting for console logs

`util.waitForConsoleLog` takes a log to wait for, the page and a timeout.

```ts
 it('waitForConsoleLog', async () => {
    const page = await browser.newPage();
    page.goto(url);
    await util.waitForConsoleLog('log 5', page, 10000);
  });
```
