/* eslint-disable no-underscore-dangle */
import { Page } from 'puppeteer';

type Opts1 = {expected: (string | RegExp)[], page: Page, timeoutMs: number, ignore?: Set<string>};

/**
 *
 * @property expected - A string/RegExp array of console logs to expect.
 * @property page - The pupeteer page.
 * @property timeOutMs - The time period (ms) of how long the function is going to wait for logs before resolving.
 * @property ignore - A set of logs to ignore.
 * @returns - A promise which resolves if expectations were met.
 */
export const expectSequential = (opts: Opts1): Promise<void> => new Promise((resolve, reject) => {
  const {
    expected, page, timeoutMs, ignore,
  } = opts;
  let currentIndex = 0;
  const timeout = setTimeout(() => {
    page.off('console', compare);
    reject(new Error('Timeout waiting for console logs'));
  }, timeoutMs);
  function compare(evt: { text: () => string; }) {
    if (ignore && ignore.has(evt.text())) return;
    const _expected = expected[currentIndex];
    let passes = false;
    if (typeof _expected === 'string' && evt.text() === _expected) passes = true;
    else if (typeof _expected !== 'string' && _expected.test(evt.text())) passes = true;

    if (!passes) {
      page.off('console', compare);
      clearTimeout(timeout);
      reject(new Error(`Non-matching console log (got !== expected) "${evt.text()}" !== "${expected[currentIndex]}"`));
    } else {
      currentIndex += 1;
      if (currentIndex >= expected.length) {
        clearTimeout(timeout);
        page.off('console', compare);
        resolve();
      }
    }
  }
  page.on('console', compare);
});

type Opts2 = { expected: (string | RegExp)[], page: Page, timeoutMs: number }

/**
 *
 * @property expected - A string/RegExp array of console logs to expect.
 * @property page - The pupeteer page.
 * @property timeOutMs - The time period (ms) of how long the function is going to wait for logs before resolving.
 * @returns - A promise which resolves if expectations were met.
 */
export const expectLogs = (opts: Opts2) : Promise<void> => new Promise((resolve, reject) => {
  const { expected, timeoutMs, page } = opts;

  const compare = (evt: { text: () => string }) => {
    const currentPageLog = evt.text();

    for (let i = 0; i < expected.length; i += 1) {
      if (typeof expected[i] === 'string') {
        // Check if that string matches the current console log.
        if (expected[i] === currentPageLog) {
          // If it does match, remove it from the expected logs array.
          expected.splice(i, 1);
        }
        // Attempt matching regex right away. (If it's not a string, it will be a regex)
      } else if (currentPageLog.match(expected[i])) {
        // If it does match, remove it from the expected logs array.
        expected.splice(i, 1);
      }
    }

    // Ran out of messages to compare against, all expected logs have been found.
    if (expected.length === 0) {
      // Stop listening for logs.
      page.off('console', compare);
      // Stop ticking 'out of time'.
      clearTimeout(timeout);
      resolve();
    }
  };

  const outOfTime = () => {
    page.off('console', compare);
    reject(new Error(`Could not find expected console logs: ${expected}`));
  };

  page.on('console', compare);

  const timeout = setTimeout(outOfTime, timeoutMs);
});

export const waitForLogs = async (log: string, page: Page, timeoutMs: number): Promise<void> => new Promise((resolve, reject) => {
  const timeout = setTimeout(() => {
    page.off('console', compare);
    reject(new Error('Timeout waiting for console logs'));
  }, timeoutMs);
  function compare(evt: any) {
    if (evt.text() === log) {
      page.off('console', compare);
      clearTimeout(timeout);
      resolve();
    }
  }
  page.on('console', compare);
});
