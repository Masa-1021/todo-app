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

  test('should add a todo with a due date', async ({ page }) => {
    await page.goto('/');
    
    // Fill in the todo text and due date
    const input = page.locator('input[type="text"][placeholder*="新しいTodo"]');
    await input.fill('Todo with Deadline');
    
    const dateInput = page.locator('input[type="date"]');
    await dateInput.fill('2025-12-31');
    
    // Click the add button
    await page.getByRole('button', { name: '追加' }).click();
    
    // Verify the todo was added with due date
    await expect(page.getByText('Todo with Deadline')).toBeVisible();
    await expect(page.getByText('期限: 2025/12/31')).toBeVisible();
  });

  test('should add a todo without a due date', async ({ page }) => {
    await page.goto('/');
    
    // Fill in only the todo text
    const input = page.locator('input[type="text"][placeholder*="新しいTodo"]');
    await input.fill('Todo without Deadline');
    
    // Click the add button
    await page.getByRole('button', { name: '追加' }).click();
    
    // Verify the todo was added without showing a due date
    await expect(page.getByText('Todo without Deadline')).toBeVisible();
    const todoItem = page.locator('.todo-list li', { hasText: 'Todo without Deadline' });
    await expect(todoItem.locator('.due-date')).not.toBeVisible();
  });

  test('should display overdue todos with special styling', async ({ page }) => {
    await page.goto('/');
    
    // Add a todo with a past due date
    const input = page.locator('input[type="text"][placeholder*="新しいTodo"]');
    await input.fill('Overdue Todo');
    
    const dateInput = page.locator('input[type="date"]');
    await dateInput.fill('2024-01-01');
    
    await page.getByRole('button', { name: '追加' }).click();
    
    // Verify the todo has the overdue class
    const todoItem = page.locator('.todo-list li', { hasText: 'Overdue Todo' });
    await expect(todoItem).toHaveClass(/overdue/);
  });
});
