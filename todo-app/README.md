# Todo App

シンプルで使いやすいTodo管理アプリケーションです。React + TypeScript + Viteで構築されています。

## 機能

- ✅ Todoの追加・編集・削除
- ✅ Todoの完了/未完了の切り替え
- ✅ フィルター機能（すべて/アクティブ/完了済み）
- ✅ 残りのアクティブなTodo数の表示
- 🎨 **3つのUIテーマ（モダン/ミニマル/コンパクト）**
- 💾 テーマ設定のローカルストレージ保存
- ✅ レスポンシブデザイン
- ⌨️ キーボードショートカット対応（Enter キーでTodo追加）

詳しいUIテーマの説明は [UI_PATTERNS.md](./UI_PATTERNS.md) をご覧ください。

## 技術スタック

- **フロントエンド**: React 19.2.0
- **言語**: TypeScript 5.9.3
- **ビルドツール**: Vite 7.2.4
- **リンター**: ESLint 9.39.1
- **テスト**: Playwright 1.57.0

## セットアップ

### 前提条件

- Node.js (推奨バージョン: 18以上)
- npm または yarn

### インストール

1. リポジトリをクローン:
```bash
git clone <repository-url>
cd todo-app/todo-app
```

2. 依存関係をインストール:
```bash
npm install
```

## 開発

### 開発サーバーの起動

```bash
npm run dev
```

ブラウザで `http://localhost:5173` を開いてアプリケーションにアクセスできます。

### ビルド

```bash
npm run build
```

ビルドされたファイルは `dist` ディレクトリに出力されます。

### プレビュー

ビルドされたアプリケーションをローカルでプレビュー:

```bash
npm run preview
```

### リンター

コードの品質チェック:

```bash
npm run lint
```

## テスト

このプロジェクトではPlaywrightを使用してE2Eテストを実施しています。

### テストの実行

```bash
npx playwright test
```

### テストをUIモードで実行

```bash
npx playwright test --ui
```

### テストレポートの表示

```bash
npx playwright show-report
```

## プロジェクト構造

```
todo-app/
├── public/           # 静的ファイル
├── src/
│   ├── App.tsx       # メインアプリケーションコンポーネント
│   ├── App.css       # アプリケーションスタイル
│   ├── main.tsx      # エントリーポイント
│   ├── types.ts      # TypeScript型定義
│   └── index.css     # グローバルスタイル
├── tests/            # Playwrightテスト
├── index.html        # HTMLテンプレート
└── package.json      # プロジェクト設定
```

## 使い方

1. **Todoの追加**: 
   - 入力フィールドにテキストを入力し、「追加」ボタンをクリックまたはEnterキーを押します

2. **完了/未完了の切り替え**: 
   - Todoアイテムのチェックボックスをクリック
   - または、Todoのテキストをクリックします

3. **Todoの削除**: 
   - 各Todoアイテムの「削除」ボタンをクリックします

4. **フィルター**: 
   - 「すべて」「アクティブ」「完了済み」ボタンでTodoをフィルタリングできます

5. **テーマ変更**: 
   - 右上の「🎨 テーマ」ボタンをクリックして、好みのUIテーマを選択できます
   - 選択したテーマは自動的に保存され、次回訪問時にも適用されます

## ライセンス

このプロジェクトはプライベートです。
