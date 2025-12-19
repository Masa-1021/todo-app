# Todo App

シンプルで使いやすいTodo管理アプリケーションです。React + TypeScript + Viteで構築され、3つの異なるUIテーマを提供しています。

![Todo App](https://img.shields.io/badge/React-19.2.0-61dafb?style=flat-square&logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-5.9.3-3178c6?style=flat-square&logo=typescript)
![Vite](https://img.shields.io/badge/Vite-7.2.4-646cff?style=flat-square&logo=vite)
![License](https://img.shields.io/badge/license-Private-red?style=flat-square)

## ✨ 機能

- ✅ Todoの追加・編集・削除
- ✅ Todoの完了/未完了の切り替え
- ✅ フィルター機能（すべて/アクティブ/完了済み）
- ✅ 残りのアクティブなTodo数の表示
- 🎨 **3つのUIテーマ（モダン/ミニマル/コンパクト）**
- 💾 テーマ設定のローカルストレージ保存
- 📱 フルレスポンシブデザイン
- ⌨️ キーボードショートカット対応（Enter キーでTodo追加）

## 🎨 UIテーマ

このアプリは3つの異なるUIテーマを提供しています。右上の「🎨 テーマ」ボタンから簡単に切り替えられます。

### 1. モダン（デフォルト）
- グラデーションとアニメーションを使用した華やかなデザイン
- カードベースのレイアウト
- 視覚的に豊かな体験

### 2. ミニマル
- シンプルでクリーンなフラットデザイン
- モノクロームカラースキーム
- 高い可読性と集中力向上

### 3. コンパクト
- ダークテーマの高密度レイアウト
- 等幅フォント使用
- 多くのタスクを効率的に管理

詳細は [UI_PATTERNS.md](./todo-app/UI_PATTERNS.md) をご覧ください。

## 🛠️ 技術スタック

- **フロントエンド**: React 19.2.0
- **言語**: TypeScript 5.9.3
- **ビルドツール**: Vite 7.2.4
- **リンター**: ESLint 9.39.1
- **テスト**: Playwright 1.57.0
- **スタイリング**: CSS3（CSS Modules不使用、純粋なCSS）

## 📦 セットアップ

### 前提条件

- Node.js 18以上
- npm または yarn

### インストール

1. リポジトリをクローン:
```bash
git clone https://github.com/Masa-1021/todo-app.git
cd todo-app/todo-app
```

2. 依存関係をインストール:
```bash
npm install
```

## 🚀 開発

### 開発サーバーの起動

```bash
npm run dev
```

ブラウザで `http://localhost:5173` を開いてアプリケーションにアクセスできます。

### ビルド

本番環境用にアプリケーションをビルド:

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

## 🧪 テスト

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

### テスト内容

- アプリケーションの読み込み確認
- Todoの追加機能
- Todoの完了/未完了切り替え機能
- Todoの削除機能
- フィルター機能（すべて/アクティブ/完了済み）

## 📁 プロジェクト構造

```
todo-app/
├── .github/              # GitHub設定・ワークフロー
├── todo-app/             # メインアプリケーション
│   ├── public/           # 静的ファイル
│   ├── src/
│   │   ├── assets/       # 画像などのアセット
│   │   ├── themes/       # UIテーマのCSSファイル
│   │   │   ├── minimal.css
│   │   │   └── compact.css
│   │   ├── App.tsx       # メインアプリケーションコンポーネント
│   │   ├── App.css       # モダンテーマスタイル
│   │   ├── ThemeSwitcher.tsx  # テーマ切り替えコンポーネント
│   │   ├── ThemeSwitcher.css  # テーマ切り替えスタイル
│   │   ├── types.ts      # TypeScript型定義
│   │   ├── main.tsx      # エントリーポイント
│   │   └── index.css     # グローバルスタイル
│   ├── tests/            # Playwrightテスト
│   │   ├── todo.spec.ts
│   │   └── extract-dom.spec.ts
│   ├── index.html        # HTMLテンプレート
│   ├── package.json      # プロジェクト設定
│   ├── vite.config.ts    # Vite設定
│   ├── playwright.config.ts  # Playwright設定
│   ├── README.md         # 詳細なREADME
│   └── UI_PATTERNS.md    # UIパターンガイド
└── README.md             # このファイル
```

## 💡 使い方

1. **Todoの追加**: 
   - 入力フィールドにテキストを入力
   - 「追加」ボタンをクリック または Enterキーを押す

2. **完了/未完了の切り替え**: 
   - チェックボックスをクリック
   - または、Todoのテキストをクリック

3. **Todoの削除**: 
   - 各Todoアイテムの「削除」ボタンをクリック

4. **フィルター**: 
   - 「すべて」: すべてのTodoを表示
   - 「アクティブ」: 未完了のTodoのみ表示
   - 「完了済み」: 完了したTodoのみ表示

5. **テーマ変更**: 
   - 右上の「🎨 テーマ」ボタンをクリック
   - 好みのテーマを選択

## 🔧 カスタマイズ

### 新しいテーマの追加

1. `src/themes/` ディレクトリに新しいCSSファイルを作成
2. `ThemeSwitcher.tsx` のテーマ配列に新しいテーマを追加
3. `ThemeSwitcher.tsx` の `ThemeType` に新しいテーマ名を追加
4. `App.tsx` で新しいテーマのCSSをインポート
5. `App.tsx` の `validThemes` 配列に新しいテーマ名を追加

### スタイルのカスタマイズ

各テーマのCSSファイルを編集することで、色やレイアウトをカスタマイズできます：
- モダンテーマ: `src/App.css`
- ミニマルテーマ: `src/themes/minimal.css`
- コンパクトテーマ: `src/themes/compact.css`

## 📝 ライセンス

このプロジェクトはプライベートです。

## 👤 作成者

Masa-1021

## 🤝 貢献

プルリクエストを歓迎します。大きな変更の場合は、まずissueを開いて変更内容を議論してください。

## 📮 お問い合わせ

質問や提案がある場合は、[Issues](https://github.com/Masa-1021/todo-app/issues)を作成してください。
