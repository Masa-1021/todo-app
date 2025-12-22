import { test, expect } from '@playwright/test';

test.describe('Todo App', () => {
  test('should load the app', async ({ page }) => {
    await page.goto('/');
    await expect(page).toHaveTitle('todo-app');
    await expect(page.getByRole('heading', { name: 'Todo App' })).toBeVisible();
  });

  test('should add a new todo', async ({ page }) => {
    await page.goto('/');
    
    // Find and fill the input field
    const input = page.locator('input[type="text"][placeholder*="新しいTodo"]');
    await input.fill('Test Todo Item');
    
    // Click the add button
    await page.getByRole('button', { name: '追加' }).click();
    
    // Verify the todo was added
    await expect(page.getByText('Test Todo Item')).toBeVisible();
  });

  test('should mark a todo as complete', async ({ page }) => {
    await page.goto('/');
    
    // Add a todo first
    const input = page.locator('input[type="text"][placeholder*="新しいTodo"]');
    await input.fill('Todo to Complete');
    await page.getByRole('button', { name: '追加' }).click();
    
    // Find and click the checkbox
    const checkbox = page.locator('.todo-list input[type="checkbox"]').first();
    await checkbox.check();
    
    // Verify the todo is marked as complete
    await expect(checkbox).toBeChecked();
    await expect(page.locator('.todo-list li').first()).toHaveClass(/completed/);
  });

  test('should delete a todo', async ({ page }) => {
    await page.goto('/');
    
    // Add a todo first
    const input = page.locator('input[type="text"][placeholder*="新しいTodo"]');
    await input.fill('Todo to Delete');
    await page.getByRole('button', { name: '追加' }).click();
    
    // Wait for todo to appear
    await expect(page.getByText('Todo to Delete')).toBeVisible();
    
    // Find and click the delete button
    await page.getByRole('button', { name: '削除' }).first().click();
    
    // Verify the todo was deleted
    await expect(page.getByText('Todo to Delete')).not.toBeVisible();
  });

  test('should filter todos', async ({ page }) => {
    await page.goto('/');
    
    // Add multiple todos
    const input = page.locator('input[type="text"][placeholder*="新しいTodo"]');
    
    await input.fill('Active Todo');
    await page.getByRole('button', { name: '追加' }).click();
    
    await input.fill('Completed Todo');
    await page.getByRole('button', { name: '追加' }).click();
    
    // Mark second todo as complete
    await page.locator('.todo-list input[type="checkbox"]').last().check();
    
    // Filter to show only active todos
    await page.getByRole('button', { name: 'アクティブ' }).click();
    await expect(page.getByText('Active Todo')).toBeVisible();
    await expect(page.getByText('Completed Todo')).not.toBeVisible();
    
    // Filter to show only completed todos
    await page.getByRole('button', { name: '完了済み' }).click();
    await expect(page.getByText('Active Todo')).not.toBeVisible();
    await expect(page.getByText('Completed Todo')).toBeVisible();
    
    // Show all todos
    await page.getByRole('button', { name: 'すべて' }).click();
    await expect(page.getByText('Active Todo')).toBeVisible();
    await expect(page.getByText('Completed Todo')).toBeVisible();
  });

  test('should display creator name when provided', async ({ page }) => {
    await page.goto('/');
    
    // Fill in creator name
    const creatorInput = page.getByRole('textbox', { name: '登録者名:' });
    await creatorInput.fill('田中太郎');
    
    // Add a todo
    const todoInput = page.locator('input[type="text"][placeholder*="新しいTodo"]');
    await todoInput.fill('Test Todo with Creator');
    await page.getByRole('button', { name: '追加' }).click();
    
    // Verify the creator badge is displayed
    await expect(page.getByText('by 田中太郎')).toBeVisible();
  });

  test('should not display creator badge when name is not provided', async ({ page }) => {
    await page.goto('/');
    
    // Leave creator name empty and add a todo
    const todoInput = page.locator('input[type="text"][placeholder*="新しいTodo"]');
    await todoInput.fill('Todo without Creator');
    await page.getByRole('button', { name: '追加' }).click();
    
    // Verify the todo text is visible
    await expect(page.getByText('Todo without Creator')).toBeVisible();
    
    // Verify no creator badge is displayed (check that "by " text doesn't exist)
    const creatorBadges = page.locator('.creator-badge');
    await expect(creatorBadges).toHaveCount(0);
  });

  test('should support multiple different creators', async ({ page }) => {
    await page.goto('/');
    
    // Add first todo with creator 1
    const creatorInput = page.getByRole('textbox', { name: '登録者名:' });
    await creatorInput.fill('田中太郎');
    const todoInput = page.locator('input[type="text"][placeholder*="新しいTodo"]');
    await todoInput.fill('First Todo');
    await page.getByRole('button', { name: '追加' }).click();
    
    // Add second todo with creator 2
    await creatorInput.fill('佐藤花子');
    await todoInput.fill('Second Todo');
    await page.getByRole('button', { name: '追加' }).click();
    
    // Verify both creators are displayed
    await expect(page.getByText('by 田中太郎')).toBeVisible();
    await expect(page.getByText('by 佐藤花子')).toBeVisible();
  });
});
