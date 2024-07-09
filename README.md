## liveメモアプリ
RaiseTech 24年11月度 最終課題Spring Boot RestAPIのCRUDアプリケーション

---
## 概要
行きたいライブの日付を忘れないようにメモしておけるCRUDアプリです。  
READ・CREATE・UPDATE・DELETE機能を実装。  
単体テスト、結合テストを実装し、GitHub ActionsでのCIも実装予定。


<details>
<summary><h4>アプリケーション概要図</h4></summary>

![Untitled - learning_task_10 (2)](https://github.com/kttsu/learning_task_10/assets/150462533/25c38833-684c-47a1-93cd-7b9e63662695)
</details>

---
## 構成要件
* Java 17
* Spring Boot 3.2.4
* MySQL 8.0
* Docker 24.0.7 
* JUnit 5.8.1
* Mockito
  
---
## 機能一覧

| 機能 | 詳細 | URL |
| ------------ | ------------- | ------------- |
| 全件取得 | live一覧を返す | /live |
| 絞り込み検索 | idを指定して検索 | /live/{id} |
| 新規登録 | 新しいliveを登録する | /live |
| liveの更新 | 指定したidのliveを変更する | /live/{id} |
| 削除 | 指定したidのliveを削除する | /live/{id} |

---
## DBテーブル
テーブル名：live

| カラム名 | データ型 | NotNull | キー | 備考 |
| ------------ | ------------- | ------------- | ------------- | ------------- |
| id | int | NOT NULL | 主キー | ID、自動生成 |
| schedule | DATETIME  | NOT NULL || 開催日時 |
| name | VARCHAR(100) | NOT NULL || 行きたいライブの名前 |
| location | VARCHAR(100)  | NOT NULL || 開催施設名 |

---
## 実行結果

<details>
<summary><h4> 1-1. GET /live 一覧表示 </h4></summary>
  
![スクリーンショット (220)](https://github.com/kttsu/learning_task_10/assets/150462533/b3332213-deef-4a80-b1be-35f84b104020)
</details>
<details>
<summary><h4> 1-2. GET /live/{id} idを指定して検索 </h4></summary>

![スクリーンショット (221)](https://github.com/kttsu/learning_task_10/assets/150462533/94a5b259-c4d0-403e-b5ef-6a3a665fe828)
</details>
<details>
<summary><h4> 1-3. GETの例外・エラー処理  </h4></summary>

<h4>1-3-1. /live/{id} 存在しないliveのidを指定したとき</h4>

![スクリーンショット (222)](https://github.com/kttsu/learning_task_10/assets/150462533/b7c5b364-fe0f-41e8-a6b2-263d9a8cdedb)
</details>
<details>
<summary><h4> 2-1. POST /live 新規登録</h4></summary>
<h5>ResponseBody</h5>
  
![スクリーンショット (227)](https://github.com/kttsu/learning_task_10/assets/150462533/312047a5-2f2a-4314-947a-bada1ceeb190)
<h5>ResponseHeader</h5>

![スクリーンショット (225)](https://github.com/kttsu/learning_task_10/assets/150462533/2e05f644-edb8-49b3-b8a9-7ad43a9b0428)
</details>
<details>
<summary><h4> 3-1. PATCH /live/{id} 更新</h4></summary>

![スクリーンショット (228)](https://github.com/kttsu/learning_task_10/assets/150462533/a2213052-6218-4367-b2fa-225a26e15d59)
</details>
<details>
<summary><h4> 3-2. PATCHの例外・エラー処理</h4></summary>
<h4> 3-2-1. PATCH /live/{id} 存在しないliveのidを指定したとき</h4>

![スクリーンショット (230)](https://github.com/kttsu/learning_task_10/assets/150462533/f79d3d65-c791-460a-9451-1e32d677f2b4)
<h4> 3-2-2. PATCH /drama/{id} 同じliveの情報を登録したとき</h4>

![スクリーンショット (229)](https://github.com/kttsu/learning_task_10/assets/150462533/8f04d022-3e9e-44b0-b954-485efb46f7c0)
</details>

<details>
<summary><h4>4-1. DELETE /live/{id} 削除</h4></summary>

![スクリーンショット (231)](https://github.com/kttsu/learning_task_10/assets/150462533/a6b8fadb-ff04-4965-9151-3e971da3184b)
</details>
<details>
<summary><h4>4-2. DELETEの例外・エラー処理</h4></summary>
<h4>4-2-1. /live/{id} 存在しないliveのidを指定したとき</h4>

![スクリーンショット (232)](https://github.com/kttsu/learning_task_10/assets/150462533/013bd670-b7c7-4025-b027-3725c5434bbc)
</details>
