import globals from "globals";
import pluginJs from "@eslint/js";
import tseslint from "typescript-eslint";
import pluginReact from "eslint-plugin-react";
import pluginReactConfig from "eslint-plugin-react/configs/recommended.js";
import pluginReactJSXRuntime from "eslint-plugin-react/configs/jsx-runtime.js";


/** @type {import('eslint').Linter.Config[]} */
export default [
  {files: ["**/*.{ts,jsx,tsx}"],
    settings: {
      react: {
        version: "detect",
      },
    },
    plugins: {
      pluginReactConfig,
    },
    rules: {
      'react/destructuring-assignment': 'error', // Props などの分割代入を強制
      'react/function-component-definition': [
        // コンポーネントの定義方法をアロー関数に統一
        'error',
        {
          namedComponents: 'arrow-function',
          unnamedComponents: 'arrow-function',
        },
      ],
      'react/hook-use-state': 'error', // useState の返り値の命名を [value, setValue] に統一
      'react/jsx-boolean-value': 'error', // boolean 型の Props の渡し方を統一
      'react/jsx-fragments': 'error', // React Fragment の書き方を統一
      'react/jsx-curly-brace-presence': 'error', // Props と children で不要な中括弧を削除
      'react/jsx-no-useless-fragment': 'error', // 不要な React Fragment を削除
      'react/jsx-sort-props': 'error', // Props の並び順をアルファベット順に統一
      'react/self-closing-comp': 'error', // 子要素がない場合は自己終了タグを使う
      'react/jsx-pascal-case': 'error', // コンポーネント名をパスカルケースに統一
      'react/no-danger': 'error', // dangerouslySetInnerHTML を許可しない
      'react/prop-types': 'off', // Props の型チェックは TS で行う & 誤検知があるため無効化

      "max-len": ["error", { code: 80 }], // 行の文字数制限を 80 文字に設定
      "quotes": ["error", "single", { avoidEscape: true }], // シングルクォーテーションを使用、エスケープを避ける場合は例外
      "semi": ["error", "always"], // セミコロンを必須にする
    },
  },
  {languageOptions: { globals: globals.browser }},
  pluginJs.configs.recommended,
  ...tseslint.configs.recommended,
  pluginReact.configs.flat.recommended,
  pluginReactConfig,
  pluginReactJSXRuntime,
];