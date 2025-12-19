# 詳細設計書 - TodoリストWebアプリケーション

## 1. アーキテクチャ概要

### 1.1 システム構成図

```
┌─────────────────────────────────────────────────────────────┐
│                        Browser                               │
│  ┌───────────────────────────────────────────────────────┐  │
│  │                    React App                          │  │
│  │  ┌──────────────┐  ┌──────────────┐  ┌────────────┐  │  │
│  │  │   TodoInput  │  │   TodoList   │  │ TodoFilter │  │  │
│  │  └──────────────┘  └──────────────┘  └────────────┘  │  │
│  │         │                  │                 │        │  │
│  │         └──────────────────┼─────────────────┘        │  │
│  │                            │                          │  │
│  │                    ┌───────▼────────┐                 │  │
│  │                    │  TodoContext   │                 │  │
│  │                    │ (State Manager)│                 │  │
│  │                    └───────┬────────┘                 │  │
│  │                            │                          │  │
│  │                    ┌───────▼────────┐                 │  │
│  │                    │ StorageService │                 │  │
│  │                    │  (localStorage)│                 │  │
│  │                    └────────────────┘                 │  │
│  └───────────────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────────┘
```

### 1.2 技術スタック

- **言語**: TypeScript 5.x
- **フレームワーク**: React 18.x
- **ビルドツール**: Vite 5.x
- **スタイリング**: CSS Modules + Vanilla CSS
- **状態管理**: React Context API + useReducer
- **データ永続化**: localStorage (Web Storage API)
- **開発ツール**:
  - ESLint (コード品質)
  - Prettier (コードフォーマッター)
  - TypeScript (型チェック)
- **テストツール**:
  - Vitest (単体テスト)
  - React Testing Library (コンポーネントテスト)

## 2. コンポーネント設計

### 2.1 コンポーネント一覧

| コンポーネント名 | 責務 | 依存関係 |
|-----------------|------|---------|
| App | アプリケーション全体の統合 | TodoProvider, TodoInput, TodoList, TodoFilter |
| TodoProvider | 状態管理とコンテキスト提供 | StorageService |
| TodoInput | タスク追加フォーム | TodoContext |
| TodoList | タスク一覧の表示 | TodoItem, TodoContext |
| TodoItem | 個別タスクの表示・操作 | TodoContext |
| TodoFilter | フィルタボタングループ | TodoContext |
| StorageService | localStorage操作の抽象化 | なし |

### 2.2 各コンポーネントの詳細

#### App

- **目的**: アプリケーション全体のレイアウトとコンポーネント統合
- **公開インターフェース**:
  ```typescript
  export default function App(): JSX.Element;
  ```
- **内部実装方針**:
  - TodoProviderで状態管理をラップ
  - ヘッダー、入力フォーム、フィルター、リストを配置
  - レスポンシブレイアウトの実装

#### TodoProvider

- **目的**: 全てのTodo操作と状態を一元管理
- **公開インターフェース**:
  ```typescript
  interface TodoContextValue {
    todos: Todo[];
    filter: FilterType;
    addTodo: (title: string) => void;
    updateTodo: (id: string, updates: Partial<Todo>) => void;
    deleteTodo: (id: string) => void;
    toggleTodo: (id: string) => void;
    setFilter: (filter: FilterType) => void;
    filteredTodos: Todo[];
  }

  export const TodoProvider: React.FC<{ children: ReactNode }>;
  export const useTodoContext: () => TodoContextValue;
  ```
- **内部実装方針**:
  - useReducerで状態管理
  - useEffectでlocalStorageへの自動保存
  - 初期表示時にlocalStorageから復元
  - フィルタリングロジックの実装

#### TodoInput

- **目的**: 新規タスク追加フォーム
- **公開インターフェース**:
  ```typescript
  export const TodoInput: React.FC = () => JSX.Element;
  ```
- **内部実装方針**:
  - useStateでinput値を管理
  - フォーム送信時にaddTodoを呼び出し
  - 入力後は自動的にフォームをクリア
  - 空文字列の送信を防ぐバリデーション

#### TodoList

- **目的**: タスク一覧の表示
- **公開インターフェース**:
  ```typescript
  export const TodoList: React.FC = () => JSX.Element;
  ```
- **内部実装方針**:
  - filteredTodosを取得して表示
  - 各TodoItemにpropsを渡す
  - 空状態の表示（タスクがない場合）

#### TodoItem

- **目的**: 個別タスクの表示と操作
- **公開インターフェース**:
  ```typescript
  interface TodoItemProps {
    todo: Todo;
  }

  export const TodoItem: React.FC<TodoItemProps>;
  ```
- **内部実装方針**:
  - チェックボックスでtoggleTodoを呼び出し
  - インライン編集機能（ダブルクリックで編集モード）
  - 削除ボタンでdeleteTodoを呼び出し
  - 完了タスクには打ち消し線スタイル

#### TodoFilter

- **目的**: フィルタボタンの表示と切り替え
- **公開インターフェース**:
  ```typescript
  export const TodoFilter: React.FC = () => JSX.Element;
  ```
- **内部実装方針**:
  - 「すべて」「未完了」「完了済み」の3ボタン
  - アクティブなフィルタをハイライト表示
  - クリックでsetFilterを呼び出し

#### StorageService

- **目的**: localStorage操作の抽象化とエラーハンドリング
- **公開インターフェース**:
  ```typescript
  export class StorageService {
    static save(key: string, data: any): void;
    static load<T>(key: string): T | null;
    static remove(key: string): void;
    static clear(): void;
  }
  ```
- **内部実装方針**:
  - JSON.stringify/parseでデータのシリアライズ
  - try-catchでQuotaExceededErrorを処理
  - 存在しないキーの場合はnullを返す

## 3. データモデル

### 3.1 型定義

```typescript
// Todo型
interface Todo {
  id: string;              // UUID
  title: string;           // タスクのタイトル
  completed: boolean;      // 完了状態
  createdAt: number;       // 作成日時（Unix timestamp）
  updatedAt: number;       // 更新日時（Unix timestamp）
}

// フィルタ型
type FilterType = 'all' | 'active' | 'completed';

// State型
interface TodoState {
  todos: Todo[];
  filter: FilterType;
}

// Action型
type TodoAction =
  | { type: 'ADD_TODO'; payload: { title: string } }
  | { type: 'UPDATE_TODO'; payload: { id: string; updates: Partial<Todo> } }
  | { type: 'DELETE_TODO'; payload: { id: string } }
  | { type: 'TOGGLE_TODO'; payload: { id: string } }
  | { type: 'SET_FILTER'; payload: { filter: FilterType } }
  | { type: 'LOAD_TODOS'; payload: { todos: Todo[] } };
```

### 3.2 データフロー

```
User Action
    ↓
Component Event Handler
    ↓
Context API (dispatch)
    ↓
Reducer (state update)
    ↓
useEffect (auto-save to localStorage)
    ↓
Context Provider (re-render consumers)
    ↓
Components (display updated state)
```

### 3.3 localStorage構造

```json
{
  "todos": [
    {
      "id": "uuid-v4-string",
      "title": "サンプルタスク",
      "completed": false,
      "createdAt": 1734566400000,
      "updatedAt": 1734566400000
    }
  ]
}
```

**キー名**: `todos-app-data`

## 4. 状態管理設計

### 4.1 Reducer実装

```typescript
function todoReducer(state: TodoState, action: TodoAction): TodoState {
  switch (action.type) {
    case 'ADD_TODO':
      return {
        ...state,
        todos: [
          ...state.todos,
          {
            id: crypto.randomUUID(),
            title: action.payload.title,
            completed: false,
            createdAt: Date.now(),
            updatedAt: Date.now(),
          },
        ],
      };
    
    case 'TOGGLE_TODO':
      return {
        ...state,
        todos: state.todos.map(todo =>
          todo.id === action.payload.id
            ? { ...todo, completed: !todo.completed, updatedAt: Date.now() }
            : todo
        ),
      };
    
    case 'DELETE_TODO':
      return {
        ...state,
        todos: state.todos.filter(todo => todo.id !== action.payload.id),
      };
    
    case 'UPDATE_TODO':
      return {
        ...state,
        todos: state.todos.map(todo =>
          todo.id === action.payload.id
            ? { ...todo, ...action.payload.updates, updatedAt: Date.now() }
            : todo
        ),
      };
    
    case 'SET_FILTER':
      return {
        ...state,
        filter: action.payload.filter,
      };
    
    case 'LOAD_TODOS':
      return {
        ...state,
        todos: action.payload.todos,
      };
    
    default:
      return state;
  }
}
```

### 4.2 フィルタリングロジック

```typescript
function getFilteredTodos(todos: Todo[], filter: FilterType): Todo[] {
  switch (filter) {
    case 'active':
      return todos.filter(todo => !todo.completed);
    case 'completed':
      return todos.filter(todo => todo.completed);
    case 'all':
    default:
      return todos;
  }
}
```

## 5. UI/UXデザイン

### 5.1 レイアウト構成

```
┌─────────────────────────────────────┐
│         Todo App                     │  ← Header
├─────────────────────────────────────┤
│  [       入力フォーム        ]  [+] │  ← TodoInput
├─────────────────────────────────────┤
│  [すべて] [未完了] [完了済み]       │  ← TodoFilter
├─────────────────────────────────────┤
│  ☐ タスク1              [編集][削除]│  ← TodoItem
│  ☑ タスク2              [編集][削除]│  ← TodoItem (completed)
│  ☐ タスク3              [編集][削除]│  ← TodoItem
└─────────────────────────────────────┘
```

### 5.2 スタイリング方針

- **カラースキーム**:
  - Primary: `#4a90e2` (アクション色)
  - Success: `#4caf50` (完了タスク)
  - Danger: `#f44336` (削除ボタン)
  - Background: `#f5f5f5`
  - Text: `#333333`

- **レスポンシブブレークポイント**:
  - Mobile: `< 640px`
  - Tablet: `640px - 1024px`
  - Desktop: `> 1024px`

- **アニメーション**:
  - タスク追加時: フェードイン + スライドダウン
  - タスク削除時: フェードアウト + スライドアップ
  - チェックボックス: スムーズなトランジション

## 6. エラーハンドリング

### 6.1 エラー分類と対処

| エラータイプ | 原因 | 対処方法 |
|------------|------|---------|
| QuotaExceededError | localStorage容量超過 | ユーザーに警告を表示、古いデータの削除を提案 |
| SecurityError | localStorageアクセス不可 | インメモリモードへフォールバック |
| InvalidStateError | 無効な状態遷移 | エラーログ出力、状態を前回の正常値に戻す |
| ValidationError | 入力値の検証失敗 | ユーザーにエラーメッセージ表示 |

### 6.2 エラー通知戦略

```typescript
interface ErrorBoundaryState {
  hasError: boolean;
  error: Error | null;
}

// エラーバウンダリーコンポーネントで予期しないエラーをキャッチ
// 個別のエラーはToast通知で表示
```

## 7. セキュリティ設計

### 7.1 XSS対策

- Reactの自動エスケープを活用
- dangerouslySetInnerHTMLは使用しない
- ユーザー入力のサニタイゼーション

### 7.2 データ保護

- localStorageに機密情報は保存しない
- 将来的な認証実装時はトークンをhttpOnlyクッキーで管理
- CSP (Content Security Policy)ヘッダーの設定

## 8. テスト戦略

### 8.1 単体テスト

- **カバレッジ目標**: 80%以上
- **テストフレームワーク**: Vitest
- **テスト対象**:
  - Reducerのロジック
  - StorageServiceの各メソッド
  - フィルタリング関数
  - ユーティリティ関数

```typescript
describe('todoReducer', () => {
  it('should add a new todo', () => {
    const state = { todos: [], filter: 'all' };
    const action = { type: 'ADD_TODO', payload: { title: 'Test' } };
    const newState = todoReducer(state, action);
    expect(newState.todos).toHaveLength(1);
    expect(newState.todos[0].title).toBe('Test');
  });
});
```

### 8.2 コンポーネントテスト

- **ツール**: React Testing Library
- **テスト対象**:
  - 各コンポーネントのレンダリング
  - ユーザーインタラクション
  - Props変更時の挙動

```typescript
describe('TodoInput', () => {
  it('should call addTodo when form is submitted', () => {
    const mockAddTodo = vi.fn();
    render(<TodoInput />);
    const input = screen.getByRole('textbox');
    const button = screen.getByRole('button');
    
    fireEvent.change(input, { target: { value: 'New Task' } });
    fireEvent.click(button);
    
    expect(mockAddTodo).toHaveBeenCalledWith('New Task');
  });
});
```

### 8.3 E2Eテスト (オプション)

- **ツール**: Playwright
- **テストシナリオ**:
  - タスクの追加から削除までの一連の流れ
  - リロード後のデータ永続化確認
  - フィルタリング機能の動作確認

## 9. パフォーマンス最適化

### 9.1 想定される負荷

- 同時アクティブユーザー: 1ユーザー（ローカルアプリ）
- タスク数: 最大1000件まで快適に動作
- 操作レスポンス: 100ms以内

### 9.2 最適化方針

1. **メモ化**:
   - `useMemo`でフィルタリング結果をキャッシュ
   - `React.memo`でコンポーネントの再レンダリング抑制

2. **仮想スクロール** (1000件超の場合):
   - react-windowライブラリの導入を検討

3. **遅延読み込み**:
   - Code Splittingは小規模アプリのため不要

4. **localStorage最適化**:
   - デバウンスで保存頻度を制限（300ms）

```typescript
const debouncedSave = useMemo(
  () => debounce((todos: Todo[]) => {
    StorageService.save('todos-app-data', { todos });
  }, 300),
  []
);
```

## 10. ディレクトリ構造

```
todo-app/
├── public/
│   └── favicon.ico
├── src/
│   ├── components/
│   │   ├── TodoInput/
│   │   │   ├── TodoInput.tsx
│   │   │   └── TodoInput.module.css
│   │   ├── TodoList/
│   │   │   ├── TodoList.tsx
│   │   │   └── TodoList.module.css
│   │   ├── TodoItem/
│   │   │   ├── TodoItem.tsx
│   │   │   └── TodoItem.module.css
│   │   └── TodoFilter/
│   │       ├── TodoFilter.tsx
│   │       └── TodoFilter.module.css
│   ├── context/
│   │   ├── TodoContext.tsx
│   │   └── TodoProvider.tsx
│   ├── types/
│   │   └── todo.ts
│   ├── services/
│   │   └── StorageService.ts
│   ├── utils/
│   │   └── helpers.ts
│   ├── hooks/
│   │   └── useTodoContext.ts
│   ├── App.tsx
│   ├── App.css
│   ├── main.tsx
│   └── vite-env.d.ts
├── tests/
│   ├── unit/
│   │   └── reducer.test.ts
│   └── components/
│       └── TodoInput.test.tsx
├── .gitignore
├── package.json
├── tsconfig.json
├── vite.config.ts
└── README.md
```

## 11. デプロイメント

### 11.1 デプロイ構成

- **ホスティング**: Vercel / Netlify / GitHub Pages
- **ビルドコマンド**: `npm run build`
- **出力ディレクトリ**: `dist/`
- **環境**: 静的ホスティング（SPAモード）

### 11.2 CI/CD

```yaml
# .github/workflows/deploy.yml
name: Deploy
on:
  push:
    branches: [main]
jobs:
  build-and-deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
      - run: npm ci
      - run: npm run build
      - run: npm test
      - uses: peaceiris/actions-gh-pages@v3
        with:
          github_token: ${{ secrets.GITHUB_TOKEN }}
          publish_dir: ./dist
```

### 11.3 設定管理

- 環境変数は不要（フロントエンドのみ）
- 必要に応じて`.env`ファイルでAPI URLなどを管理

## 12. 実装上の注意事項

### 12.1 開発のベストプラクティス

- TypeScriptの`strict`モードを有効化
- ESLintルールを厳格に適用
- コンポーネントは単一責任の原則に従う
- Propsの型定義を明確にする
- カスタムフックで共通ロジックを抽出

### 12.2 アクセシビリティ

- セマンティックHTMLの使用
- ARIA属性の適切な設定
- キーボード操作のサポート（Tab, Enter, Escapeキー）
- スクリーンリーダー対応

### 12.3 ブラウザ互換性

- ES2020+の機能を使用（Viteのデフォルト設定）
- crypto.randomUUID()のpolyfillを検討（古いブラウザ対応）
- CSS Grid/Flexboxの使用

### 12.4 パフォーマンス監視

- React DevToolsでレンダリング回数を確認
- Chrome DevToolsでメモリリークをチェック
- Lighthouse でパフォーマンススコアを測定

---

**作成日**: 2025年12月19日  
**バージョン**: 1.0  
**レビュー状態**: 要レビュー
