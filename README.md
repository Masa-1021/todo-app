# 📝 Todo App

シンプルで使いやすいタスク管理Webアプリケーションです。

![Todo App](https://github.com/user-attachments/assets/3feb5755-1326-41ed-9c42-31df53ba3116)

## ✨ 機能

### 必須機能（実装済み）

- ✅ **タスクの追加**: 新しいタスクを簡単に追加
- ✅ **タスクの表示**: 登録されたタスクを一覧表示
- ✅ **タスクの完了/未完了切り替え**: チェックボックスで簡単に切り替え
- ✅ **タスクの削除**: 不要なタスクを削除
- ✅ **タスクの編集**: インライン編集でタスクを更新
- ✅ **データの永続化**: localStorage使用でブラウザリロード後もデータ保持
- ✅ **フィルタリング機能**: すべて/未完了/完了済みでフィルタ表示

## 🛠 技術スタック

- **フレームワーク**: React 18.x
- **言語**: TypeScript 5.x
- **ビルドツール**: Vite 5.x
- **スタイリング**: CSS Modules
- **状態管理**: React Context API + useReducer
- **データ永続化**: localStorage (Web Storage API)

## 📦 セットアップ

### 必要要件

- Node.js 18.x 以上
- npm または yarn

### インストール

\`\`\`bash
# リポジトリをクローン
git clone https://github.com/Masa-1021/todo-app.git
cd todo-app

# 依存パッケージをインストール
npm install
\`\`\`

### 開発サーバーの起動

\`\`\`bash
npm run dev
\`\`\`

ブラウザで \`http://localhost:5173\` にアクセスしてください。

### ビルド

\`\`\`bash
npm run build
\`\`\`

ビルド成果物は \`dist/\` ディレクトリに出力されます。

### プレビュー

\`\`\`bash
npm run preview
\`\`\`

## 🎯 使い方

1. **タスクの追加**: 入力フォームにタスクを入力して「追加」ボタンをクリック
2. **タスクの完了**: チェックボックスをクリックして完了/未完了を切り替え
3. **タスクの編集**: 
   - タスクをダブルクリック、または
   - 「編集」ボタンをクリック
   - Enterキーで保存、Escapeキーでキャンセル
4. **タスクの削除**: 「削除」ボタンをクリック
5. **フィルタリング**: 画面上部のボタンでタスクを絞り込み表示

## 📱 レスポンシブデザイン

- モバイル（< 640px）
- タブレット（640px - 1024px）
- デスクトップ（> 1024px）

すべての画面サイズで快適に使用できます。

## 🏗 プロジェクト構造

\`\`\`
src/
├── components/          # UIコンポーネント
│   ├── TodoInput/      # タスク入力フォーム
│   ├── TodoList/       # タスク一覧
│   ├── TodoItem/       # 個別タスク
│   └── TodoFilter/     # フィルタボタン
├── context/            # 状態管理
│   ├── TodoContext.tsx # Context とProvider
│   └── todoReducer.ts  # Reducer ロジック
├── types/              # TypeScript型定義
│   └── todo.ts
├── services/           # サービス層
│   └── StorageService.ts
├── hooks/              # カスタムフック
│   └── useTodoContext.ts
├── App.tsx             # メインアプリコンポーネント
├── App.css             # アプリスタイル
├── index.css           # グローバルスタイル
└── main.tsx            # エントリーポイント
\`\`\`

## 🎨 デザイン

- **カラースキーム**:
  - Primary: \`#4a90e2\` (青)
  - Success: \`#4caf50\` (緑)
  - Danger: \`#f44336\` (赤)
  - Background: \`#f5f5f5\` (グレー)
  
- **アニメーション**:
  - タスク追加時のスライドイン
  - ホバーエフェクト
  - スムーズなトランジション

## 🔒 セキュリティ

- Reactの自動エスケープによるXSS対策
- ユーザー入力のバリデーション
- localStorageの安全な使用

## 📄 ライセンス

MIT License

## 👤 作成者

Masa-1021

---

© 2025 Todo App
