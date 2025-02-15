## ライブスケジュールアプリ
行きたいライブの日付を忘れないように管理できる、シンプルなCRUDアプリです。

---

## 概要
ライブスケジュールを簡単に管理できるアプリケーションです。
新規作成・編集・削除・一覧表示といった基本的なCRUD操作が可能。
バックエンドでは単体テスト、結合テストを実装し、GitHub ActionsでのCIも実装。

<details>
<summary><h4>アプリケーション概要図</h4></summary>

![Image](https://github.com/user-attachments/assets/62a4bcaf-bbbd-4070-92f6-90eb5508bd59)
</details>

---

## 構成要件
#### フロントエンド
* React 18
* Node.js 22.13.1
  
#### バックエンド
* Java 17
* Spring Boot 3.2.4
* Docker 24.0.7 
* JUnit 5.8.1
* Mockito
  
#### データベース
* MySQL 8.0

#### 使用ツール
* Docker 27.2.0
* GitHub Actions

---

## ライブスケジュール管理機能一覧

| 機能 | 詳細 | 
| ------------ | ------------- | 
| ライブ登録（Create） | 日時、ライブ名、会場を登録可能。登録完了後に「ライブを作成しました！」とメッセージ表示。 | 
| ライブ一覧表示（Read） | 登録されたライブが日時順で表示し、UIはわかりやすいリスト形式で表示。| 
| ライブ情報更新（Update） | 登録済みのライブを選択し、日時・名称・会場を変更可能。同じ内容を再度登録しようとすると「前回と同じ情報です！」と表示。 | 
| ライブ削除（Delete） | 削除時には「本当に削除しますか？」という確認ダイアログを表示。「はい」選択で削除、「いいえ」選択でキャンセル。 | 

---

## 動作確認
#### ライブ登録
https://github.com/user-attachments/assets/12c8eeb4-b259-4a4f-968c-78a3a949104a

#### ライブ一覧表示
![Image](https://github.com/user-attachments/assets/0a6c8f2d-d2f3-4a0b-9b87-377e786acfd5)

#### ライブ情報更新
https://github.com/user-attachments/assets/679c8312-9b9e-42d2-9db7-44de1fac113b

#### ライブ削除
https://github.com/user-attachments/assets/e637f5d2-99b4-41a9-ae64-18c2c3aad1bd


<details>
<summary><h2>バックエンドでのGitHub ActionsのCIテスト結果はこちら</h2></summary>

## CIテスト結果

<details>
<summary><h3>①自動化テスト</h3></summary>

![スクリーンショット (256)](https://github.com/user-attachments/assets/cb979ed9-0bfc-43a6-8e57-3fee58c9f95f)

</details>
<details>
<summary><h3>②codecov</h3></summary>

![スクリーンショット (255)](https://github.com/user-attachments/assets/3e7f1e3f-9b78-419a-ac25-63cd1684c2b4)

</details>
<details>
<summary><h3>③checkstyle</h3></summary>

![スクリーンショット (257)](https://github.com/user-attachments/assets/663ed345-d75b-429c-85d1-5f8c8f13c80c)

</details>
<details>
<summary><h3>④discordへの通知</h3></summary>
<h4>成功時<h4>

![スクリーンショット (254)](https://github.com/user-attachments/assets/91a741b9-589e-404b-996c-23caf3f226a5)

<h4>失敗時<h4>

![スクリーンショット (251)](https://github.com/user-attachments/assets/2f2a9197-2a9d-4704-8302-d3d869b44531)

</details>

## 失敗結果
CIパイプライン中に発生した失敗結果とテストに合格する際どのように修正を行ったかについて以下にまとめます。

① [Create gradle.yml](https://github.com/kttsu/live_schedule_manager/pull/1/commits/ec9a6e1a86101ba8e679ac5c592916be21d141fd)　

　[gradle.yml から test.yml に変更。](https://github.com/kttsu/live_schedule_manager/pull/1/commits/7d5e14d27870ed324b8f9f74cca5130595bc4ba4)　
　
　[gradlew buildに変更。](https://github.com/kttsu/live_schedule_manager/pull/1/commits/013ea34e22b81dc179dc37b715adfb7b1ddd7e19)

<details>
<summary><h4>エラー内容とその修正内容</h4></summary>
<h4>・エラー内容 <h4>
<h4>・Build With Gradle Wrapper</h4><h4>
<h4>gradlewファイルがWindowsの改行スタイル（CRLF）を使用していることが原因でエラーが発生。現在、Windows上でWSLを使用しているため、WSLはLinux環境として動作し、Unixスタイルの改行（LF）が必要。</h4>

![スクリーンショット (263)](https://github.com/user-attachments/assets/9e96c73c-9637-4ece-b30a-e89c46394652)

<h4>・修正内容<h4>
<h4>gradlewファイルの改行コードをLFに変換するためのステップを追加。</h4>

![スクリーンショット (264)](https://github.com/user-attachments/assets/bec4fda3-cced-483c-ad42-a152c8af885f)

</details>

---

② [Checkstyleを追加。](https://github.com/kttsu/live_schedule_manager/pull/1/commits/414418a4367c4ebf1db12dabe0a17285f77a1ab7)

<details>
<summary><h4>エラー内容</h4></summary>
<h4>・Run Checkstyle</h4>
<h4>checkstyleMain および checkstyleTest というタスクが適切に設定されていないために発生。</h4>

![スクリーンショット (265)](https://github.com/user-attachments/assets/b9abd3b5-8676-4576-8b05-274ba8f23a0a)

</details>

---

③ [Checkstyleを修正。](https://github.com/kttsu/live_schedule_manager/pull/1/commits/567664a5d795d517f5d84b135b74ef780f5007d2)

<details>
<summary><h4>エラー内容</h4></summary>
<h4>・Build With Gradle Wrapper</h4>
<h4>checkstyleMain というタスクがすでに存在しているにもかかわらず、同じ名前のタスクを再度追加しようとしたために発生。</h4>

![スクリーンショット (274)](https://github.com/user-attachments/assets/953ea4ec-58dd-4170-ad06-e4151f7d1ce7)

<h4>・Run Checkstyle</h4>
<h4>checkstyle設定ファイルで、TreeWalkerはLineLengthの親モジュールとして使用できないのに、TreeWalkerモジュールの下にLineLengthモジュールを配置しようとしたために発生。</h4>

![スクリーンショット (275)](https://github.com/user-attachments/assets/736d3cf3-3ba3-4791-809d-7b9ba7047cea)

</details>

---

④ [java -jar でCheckstyleを実行.](https://github.com/kttsu/live_schedule_manager/pull/1/commits/6bfca42f918a8e5bb35c4270ed61de26182da9d5)

<details>
<summary><h4>エラー内容</h4></summary>
<h4>・Build With Gradle Wrapper</h4>

<h4>build.gradleファイルの64行目で、すでに存在しているタスク checkstyleMain を再度追加しようとしたために発生。</h4>

![スクリーンショット (276)](https://github.com/user-attachments/assets/8e7775bb-3265-4149-9e12-61af5e3eb19e)

</details>

---

⑤ [build.gradle のカスタムタスクを実行するように修正。](https://github.com/kttsu/live_schedule_manager/pull/1/commits/60ffbdb59e0c299ae070eb9f0dbcf8638b50081d)

<details>
<summary><h4>エラー内容</h4></summary>
<h4>・Run Checkstyle for main code</h4>
<h4>Gradleで実行した runCheckstyle というタスクが失敗したことを示しており、java コマンドを使ってCheckstyleを実行しようとしたが、Checkstyleによって検出されたコードスタイルに問題があるため、タスクが失敗。</h4>

![スクリーンショット (277)](https://github.com/user-attachments/assets/6428817a-5c32-4e7d-9768-3893bb2ab211)

</details>

---

⑥ [Checkstyle タスクを実行する処理を修正。](https://github.com/kttsu/live_schedule_manager/pull/1/commits/a2566323968f19115eb1f5c8605f6763fc86d747) 　　　
　
　[Checkstyle設定ファイルを確認する処理を追加。](https://github.com/kttsu/live_schedule_manager/pull/1/commits/d9bad554a4743a8417a0f78d79e4872204ee951e)
　
　[--info オプションを追加。](https://github.com/kttsu/live_schedule_manager/pull/1/commits/5e362fb4aeb4333a76977f9e23ab23d297f2e59e)

<details>
<summary><h4>エラー内容とその修正内容</h4></summary>
<h4>・エラー内容 <h4>
<h4>・Run Checkstyle</h4>
<h4>1: Task failed with an exception.</h4>
<h4>checkstyleMain タスクが失敗したことを示しており、特に、Checkstyleの設定ファイル checkstyle.xml を正しく読み込めなかったことが原因。パスが存在しないか、間違っている、XMLの構文や設定内容を確認する必要があります。</h4>

![スクリーンショット (280)](https://github.com/user-attachments/assets/918c1911-2ae8-4bf1-8a3c-e0a57c4885c6)

<h4>2: Task failed with an exception.</h4>
<h4>checkstyleTest タスクが失敗したことを示しており、特に、Checkstyleの設定ファイル checkstyle.xml を正しく読み込めなかったことが原因。パスが存在しないか、間違っている、XMLの構文や設定内容を確認する必要があります。</h4>

![スクリーンショット (281)](https://github.com/user-attachments/assets/a9057cc4-a78a-4c25-9e10-5009e017f502)

<h4>・修正内容<h4>
パスの再設定。(7008cef) 不要なカスタムタスクの削除。(388a7f9) XMLの構文の修正。(d8136fc) を行い、.github/workflows/test.yml 内を以下のように修正しました。

![スクリーンショット (283)](https://github.com/user-attachments/assets/7026504e-4dc4-42c6-8366-a2d7c5b9819d)


</details>
