## ライブスケジュールアプリ
行きたいライブの日付を忘れないように管理できる、シンプルなCRUDアプリです。

---

## 概要
- ライブスケジュールを簡単に管理できるアプリケーションです。
- 新規作成・編集・削除・一覧表示といった基本的なCRUD操作が可能。
- バックエンドでは単体テスト、結合テストを実装し、GitHub ActionsでのCIも実装。
- ローカル環境で連携し、動作確認済み。  

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

## バックエンドでのGitHub ActionsのCIテスト結果

<details>
<summary>CIテスト結果を見る</summary>

### ① 自動化テスト
![スクリーンショット (256)](https://github.com/user-attachments/assets/cb979ed9-0bfc-43a6-8e57-3fee58c9f95f)

### ② codecov
![スクリーンショット (255)](https://github.com/user-attachments/assets/3e7f1e3f-9b78-419a-ac25-63cd1684c2b4)

### ③ checkstyle
![スクリーンショット (257)](https://github.com/user-attachments/assets/663ed345-d75b-429c-85d1-5f8c8f13c80c)

### ④ Discordへの通知
#### ・ 成功時
  ![スクリーンショット (254)](https://github.com/user-attachments/assets/91a741b9-589e-404b-996c-23caf3f226a5)

#### ・ 失敗時
  ![スクリーンショット (251)](https://github.com/user-attachments/assets/2f2a9197-2a9d-4704-8302-d3d869b44531)

</details>

## CIパイプラインでの失敗と修正内容

<details>
<summary>CIテストの失敗と修正内容を見る</summary>
  
<br>

CIパイプライン中に発生した失敗結果とテストに合格する際どのように修正を行ったかについて以下にまとめます。

<details>
<summary><h4>① gradle.ymlからtest.ymlへ変更</h4></summary>
<h4>・エラー内容 <h4>

<h4>gradlewファイルがWindowsの改行スタイル（CRLF）を使用していることが原因でエラーが発生。現在、Windows上でWSLを使用しているため、WSLはLinux環境として動作し、Unixスタイルの改行（LF）が必要。</h4>

![スクリーンショット (263)](https://github.com/user-attachments/assets/9e96c73c-9637-4ece-b30a-e89c46394652)

<h4>・修正内容<h4>
<h4>gradlewファイルの改行コードをLFに変換するためのステップを追加</h4>

![スクリーンショット (264)](https://github.com/user-attachments/assets/bec4fda3-cced-483c-ad42-a152c8af885f)

### コミットリンク
- [Create gradle.yml](https://github.com/kttsu/live_schedule_manager/pull/1/commits/ec9a6e1a86101ba8e679ac5c592916be21d141fd)
- [gradle.yml から test.yml に変更](https://github.com/kttsu/live_schedule_manager/pull/1/commits/7d5e14d27870ed324b8f9f74cca5130595bc4ba4)  
- [gradlew build に変更](https://github.com/kttsu/live_schedule_manager/pull/1/commits/013ea34e22b81dc179dc37b715adfb7b1ddd7e19)

</details>

---

<details>
<summary><h4>② Checkstyle設定ファイルの不具合修正</h4></summary>
<h4>・エラー内容</h4>
<h4>checkstyleMain および checkstyleTest というタスクが適切に設定されていないために発生。</h4>

![スクリーンショット (265)](https://github.com/user-attachments/assets/b9abd3b5-8676-4576-8b05-274ba8f23a0a)
### コミットリンク
- [Checkstyleを追加。](https://github.com/kttsu/live_schedule_manager/pull/1/commits/414418a4367c4ebf1db12dabe0a17285f77a1ab7)

</details>

---

<details>
<summary><h4>③ Checkstyle実行時のパスエラー </h4></summary>
<h4>・エラー内容</h4>
<h4>checkstyleMain というタスクがすでに存在しているにもかかわらず、同じ名前のタスクを再度追加しようとしたために発生。</h4>

![スクリーンショット (274)](https://github.com/user-attachments/assets/953ea4ec-58dd-4170-ad06-e4151f7d1ce7)

<h4>checkstyle設定ファイルで、TreeWalkerはLineLengthの親モジュールとして使用できないのに、TreeWalkerモジュールの下にLineLengthモジュールを配置しようとしたために発生。</h4>

![スクリーンショット (275)](https://github.com/user-attachments/assets/736d3cf3-3ba3-4791-809d-7b9ba7047cea)

### コミットリンク
- [Checkstyleを修正。](https://github.com/kttsu/live_schedule_manager/pull/1/commits/567664a5d795d517f5d84b135b74ef780f5007d2)

</details>

---

<details>
<summary><h4>④ checkstyleMainタスクの重複定義が原因</h4></summary>
<h4>・エラー内容</h4>
<h4>build.gradleファイルの64行目で、すでに存在しているタスク checkstyleMain を再度追加しようとしたために発生。</h4>

![スクリーンショット (276)](https://github.com/user-attachments/assets/8e7775bb-3265-4149-9e12-61af5e3eb19e)

### コミットリンク
- [java -jar でCheckstyleを実行.](https://github.com/kttsu/live_schedule_manager/pull/1/commits/6bfca42f918a8e5bb35c4270ed61de26182da9d5)
  
</details>

---

<details>
<summary><h4>⑤ runCheckstyle タスクがコードスタイル違反で失敗。</h4></summary>
<h4>・エラー内容</h4>
<h4>Gradleで実行した runCheckstyle というタスクが失敗したことを示しており、java コマンドを使ってCheckstyleを実行しようとしたが、Checkstyleによって検出されたコードスタイルに問題があるため、タスクが失敗。</h4>

![スクリーンショット (277)](https://github.com/user-attachments/assets/6428817a-5c32-4e7d-9768-3893bb2ab211)

### コミットリンク
- [build.gradle のカスタムタスクを実行するように修正。](https://github.com/kttsu/live_schedule_manager/pull/1/commits/60ffbdb59e0c299ae070eb9f0dbcf8638b50081d)

</details>

---

<details>
<summary><h4>⑥ Checkstyleの設定不備</h4></summary>
<h4>・エラー内容 <h4>
<h4>checkstyleMain タスクが失敗したことを示しており、特に、Checkstyleの設定ファイル checkstyle.xml を正しく読み込めなかったことが原因。パスが存在しないか、間違っている、XMLの構文や設定内容を確認する必要があります。</h4>

![スクリーンショット (280)](https://github.com/user-attachments/assets/918c1911-2ae8-4bf1-8a3c-e0a57c4885c6)

<h4>checkstyleTest タスクが失敗したことを示しており、特に、Checkstyleの設定ファイル checkstyle.xml を正しく読み込めなかったことが原因。パスが存在しないか、間違っている、XMLの構文や設定内容を確認する必要があります。</h4>

![スクリーンショット (281)](https://github.com/user-attachments/assets/a9057cc4-a78a-4c25-9e10-5009e017f502)

<h4>・修正内容<h4>
パスの再設定。(7008cef) 不要なカスタムタスクの削除。(388a7f9) XMLの構文の修正。(d8136fc) を行い、.github/workflows/test.yml 内を以下のように修正しました。

![スクリーンショット (283)](https://github.com/user-attachments/assets/7026504e-4dc4-42c6-8366-a2d7c5b9819d)

### コミットリンク
- [Checkstyle タスクを実行する処理を修正。](https://github.com/kttsu/live_schedule_manager/pull/1/commits/a2566323968f19115eb1f5c8605f6763fc86d747) 　
- [Checkstyle設定ファイルを確認する処理を追加。](https://github.com/kttsu/live_schedule_manager/pull/1/commits/d9bad554a4743a8417a0f78d79e4872204ee951e)
- [--info オプションを追加。](https://github.com/kttsu/live_schedule_manager/pull/1/commits/5e362fb4aeb4333a76977f9e23ab23d297f2e59e)
 
</details>

</details>

---

## ライブスケジュール管理機能一覧

| 機能                  | 詳細                                                                         | 
|-----------------------|--------------------------------------------------------------------------------|
| ライブ登録（Create） 　| 日時・ライブ名・会場を登録可能。登録後は日付順に自動ソートされ、「ライブを作成しました！」と表示。 |
| ライブ一覧（Read） 　　| 登録されたライブを日時順に表示し、UIは見やすいリスト形式で一覧化。 |
| ライブ更新（Update） 　| 登録済みのライブを選択し、日時・名称・会場を変更可能。同じ内容で更新時は「前回と同じ情報です！」と表示。 |
| ライブ削除（Delete） 　| 削除時に「本当に削除しますか？」と確認ダイアログを表示。「はい」で削除、「いいえ」でキャンセル。「はい」を選択後、「ライブを削除しました！」と表示。 |

---

## 動作確認
#### ライブ登録
https://github.com/user-attachments/assets/b6e8d92a-12a4-4244-a977-4acf850a7d48

#### ライブ一覧表示
![Image](https://github.com/user-attachments/assets/867ec262-61ec-4008-8c88-075fb4c2b33d)

#### ライブ情報更新
https://github.com/user-attachments/assets/a8cd7f7b-3f2d-4dbc-852c-2e28959f7471

#### ライブ削除
https://github.com/user-attachments/assets/c935aa7d-9271-47db-9245-1b3fea0f8154

#### テキストフィールド未入力対策
https://github.com/user-attachments/assets/16c53501-2e3a-4576-ac61-a68c3c2b31bf

</details>

---

##  **力を入れたポイント**

### 1. **フロントエンドとバックエンドの連携**
- ReactとSpring BootのREST APIを連携し、ライブスケジュール管理機能を実装。  
- フロントエンドから **API通信** によってデータを取得・操作可能。

### 2. **日付順の自動ソート機能**
- ライブ一覧が自動で **日付順に並び替えられるように改良。  
- `useEffect` フックでデータ取得後にソート処理を実装。

 ### 3. **CI/CDパイプライン構築**
- GitHub Actions によるCI/CDパイプラインを構築。  
- バックエンドのテストを自動化し、コード品質の維持を実現。  
- ビルド・テスト結果を **Discordに通知** する機能を追加。

### 4. **UX向上のためのメッセージ表示**
- 新規ライブ登録時に **「ライブを作成しました！」** と表示。  
- `Material-UI` の `Alert` コンポーネントで、直感的なUIを提供。

##  **反省点**

### 1. **Docker設定での接続不良**
- Spring BootからMySQLへの接続設定で localhost を指定していたため、コンテナ間通信ができずに接続エラー。
- Docker Compose環境では、サービス名をホスト名として指定する必要があることを再確認。

### 2. **カレンダーUIの直感的操作**
- 日時入力時に「分」を直接指定するUIでは操作性が悪かった。
- ユーザビリティを考慮し、10分単位で選択できるように変更が必要。

### 3. **メール通知機能が必須**
- 本当にライブを忘れないか、日程を間違えないかという点を考えたときにやはりメール通知機能が必須。
- 申し込み締め切り前、ライブ前日に通知をできることが必要。

##  **今後の展望**

### 1. **認証機能の実装**  
- AWSを活用し本番環境の移行やSpring Securityを活用し、安全なログイン機能を追加予定。

### 2. **テストの充実**  
- フロントエンドもGitHub ActionsでのCIを実装し、アプリ全体の動作を自動検証可能に。

### 3. **メール通知機能を実装**
- 忘れる、間違える可能性を少しでも下げるためにメール通知機能を実装。

