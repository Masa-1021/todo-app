import { test, expect } from '@playwright/test';

test('Extract DOM structure', async ({ page }) => {
  // Listen for console messages and errors
  const consoleMessages: string[] = [];
  const pageErrors: string[] = [];
  
  page.on('console', msg => {
    consoleMessages.push(`[${msg.type()}] ${msg.text()}`);
  });
  
  page.on('pageerror', error => {
    pageErrors.push(error.toString());
  });
  
  // Visit the page
  await page.goto('http://localhost:5173');
  
  // Wait for page to load
  await page.waitForLoadState('networkidle');
  
  // Wait a bit more for React to mount
  await page.waitForTimeout(2000);
  
  // Extract the full HTML
  const fullHTML = await page.content();
  
  // Get all headings
  const headings = await page.locator('h1, h2, h3, h4, h5, h6').allTextContents();
  
  // Get all inputs
  const inputs = await page.locator('input').evaluateAll((elements) => {
    return elements.map((el) => ({
      type: el.getAttribute('type'),
      placeholder: el.getAttribute('placeholder'),
      value: el.getAttribute('value'),
      className: el.className,
      id: el.id,
      name: el.getAttribute('name'),
      testId: el.getAttribute('data-testid') || el.getAttribute('data-test-id'),
      outerHTML: el.outerHTML
    }));
  });
  
  // Get all buttons
  const buttons = await page.locator('button').evaluateAll((elements) => {
    return elements.map((el) => ({
      text: el.textContent,
      className: el.className,
      id: el.id,
      testId: el.getAttribute('data-testid') || el.getAttribute('data-test-id'),
      outerHTML: el.outerHTML
    }));
  });
  
  // Get all elements with data-testid or data-test-id
  const testIdElements = await page.locator('[data-testid], [data-test-id]').evaluateAll((elements) => {
    return elements.map((el) => ({
      tagName: el.tagName,
      testId: el.getAttribute('data-testid') || el.getAttribute('data-test-id'),
      text: el.textContent,
      className: el.className,
      outerHTML: el.outerHTML
    }));
  });
  
  // Get the main app container
  const appHTML = await page.locator('#root').innerHTML();
  
  console.log('\n' + '='.repeat(80));
  console.log('DOM STRUCTURE ANALYSIS');
  console.log('='.repeat(80) + '\n');
  
  console.log('CONSOLE MESSAGES:');
  consoleMessages.forEach(msg => console.log(msg));
  console.log('\nPAGE ERRORS:');
  pageErrors.forEach(err => console.log(err));
  
  console.log('\nPAGE TITLE:', await page.title());
  console.log('\n' + '-'.repeat(80));
  console.log('HEADINGS:');
  console.log('-'.repeat(80));
  headings.forEach((h, i) => console.log(`${i + 1}. "${h}"`));
  
  console.log('\n' + '-'.repeat(80));
  console.log('INPUT FIELDS:');
  console.log('-'.repeat(80));
  console.log(JSON.stringify(inputs, null, 2));
  
  console.log('\n' + '-'.repeat(80));
  console.log('BUTTONS:');
  console.log('-'.repeat(80));
  console.log(JSON.stringify(buttons, null, 2));
  
  console.log('\n' + '-'.repeat(80));
  console.log('ELEMENTS WITH TEST IDS:');
  console.log('-'.repeat(80));
  console.log(JSON.stringify(testIdElements, null, 2));
  
  console.log('\n' + '-'.repeat(80));
  console.log('APP CONTAINER HTML (#root):');
  console.log('-'.repeat(80));
  console.log(appHTML);
  
  console.log('\n' + '-'.repeat(80));
  console.log('FULL PAGE HTML:');
  console.log('-'.repeat(80));
  console.log(fullHTML);
  
  console.log('\n' + '='.repeat(80) + '\n');
});
