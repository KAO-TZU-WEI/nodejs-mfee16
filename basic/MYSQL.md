# Structured Query Language(SQL)

- 不同底層結構的資料庫之間可使用相同的 SQL 語言作為資料的存取和管理。
- Primary Key(主鍵值) 不允許 null 且不能重複，一個表格只有一個。
- Foreign Key(外來鍵) 是 child 表格，資料型態和大小要完全相同 PK 值。
- Entities (tables) 和 Relations 的集合，建立 ER model。
- 把 DATABASE 和 SCHEMA 當作一樣的。

## 資料庫正規化 database normalization

- 1NF 的去除重複:將資料的欄位單一性以及完整性，也就是一個欄位一筆資料
- 2NF 的部分相依:檢查同個表格內的其他欄位都有跟 PK 值有關係，若如果沒有就表示還可以再分割
- 3NF 的間接相依:說得是 PK 值以外，有相互相依的兩個欄位，就可以再切出去

## 資料定義語言 Data Definition Language(DDL)

- CREATE 建立資料庫的物件，包括資料庫和表格。
- ALTER 變更資料庫的物件結構。
- DROP 刪除資料庫的物件。

## 資料查詢語言 Data Query Language(DQL)

- SELECT 查詢資料庫的表格的內容。

## 資料操作語言 Data Manipulation Language(DML)

- INSERT 新增資料庫表格的資料。
- UPDATE 變更資料庫表格的資料。
- DELETE 刪除資料庫表格的資料。

## 交易控制語言 Transaction Control Language(TCL)

- START TRANSACTION 開始交易。
- COMMIT 資料永久變更。
- ROLLBACK 復原。
- SAVEPOINT 設立儲存點。

## 資料控制語言 Data Control Language (DCL)

- GRANT 授予權限
- ROVOKE 移除權限

## 欄位的資料型態

- TINYINT 預設長度 4
- SMALLINT 預設長度是 6
- MEDIUMINT 預設長度是 9
- INT 預設長度是 11
- BIGINT 預設長度是 20
- FLOAT 浮點數，佔 4bytes，總長度超過 6 位數時，會以科學記號表示
- DOUBLE 佔 8bytes，總長度超過 15 位數時，會以科學記號表示
- DECIMAL 固定小數位數，預設長度為 10
- CHAR 固定長度，預設為 1，未填滿會自動補空白字元
- VARCHAR(n) 變動長度
- TINYCHAR 變動長度
- TEXT 變動長度
- MEDIUMTEXT 變動長度
- LONGTEXT 變動長度
- DATETIME 輸入格式為 YYYY-MM-DD hh:mm:ss
- TIMESTAMP 輸入格式為 YYYY-MM-DD hh:mm:ss
- DATE 輸入格式為 YYYY-MM-DD
- TIME hh:mm:ss

## 敘述語法的順序

SELECT->FROM->WHERE->GROUP BY->HAVINF->ORDER BY->LIMIT

## 日期相關 function

- SYSDATE()傳回正在執行的日期和時間
- NOW()傳回現在執行的日期和時間，是常數值
- CURDATE()傳回現在日期
- CURTIME()傳回現在的時間
- YEAR 傳回 int 值，取得年份
- MONTH 傳回 int 值，取得月份
- DAY 傳回 int 值，取得日期
- 加減運算

```mysql
//加法
SELECT SYSDATE()+interval 5days;
SELECT ADDDATE(CURDATE(),5);
//減法
SELECT SUBDATE(CURDATE(),5);
//傳回差多少天，兩個日期相減，前面若大於後面則正數
DATEDIFF(expr1,expr2);
```

## Control Flow Function

```mysql
SELECT xxx,
  CASE
   WHEN salary>100 THEN 'A'
   WHEN salary BETWEEN 7000 AND 10000 THEN 'B'
   WHEN salary BETWEEN 5000 AND 70000 THEN 'C'
   ELSE 'E'
  END 'GRADE'
FROM yyy;
```

### 特殊運算子

- DISTINCT 關鍵字可以去除重複的資料

```mysql
SELECT DISTINCT deptno FROM xxxx;
```

- BETWEEN...AND 介於兩個值之間，包含頭尾值

```mysql
SELECT yyy FROM xxxx WHERE salary BETWEEN 3000 AND 4000;
```

- IN 必須要在集合(set)的範圍中

```mysql
SELECT yyy FROM xxxx WHERE title IN ('teacher','student');
```

- LIKE '%'表示零至多個字元。'\_'表示一個字元

## 常見函數

- ACS 升冪排序
- DECS 降冪排序
- AVG() 傳回欄位平均值
- SUM() 傳回欄位總和
- COUNT() 傳回欄位的總筆數
- MAX() 傳回欄位的最大值
- MIN() 傳回欄位的最小值

## 資料連結 (join)

```mysql
SELECT table.column,table2.column,
FROM table_name,table2_name
WHERE table.column1=table2.column1;
```

```mysql
SELECT table.column,table2.column,table3.column,
FROM table_name,table2_name,table3_name
WHERE table.column1=table2.column1
AND table2.column2=table3.column2;

```

ANSI 寫法

```mysql
SELECT table.column,table2.column,
FROM table_name JOIN table2_name
ON table.column1=table2.column1;
```

```mysql
SELECT table.column,table2.column,
FROM table_name JOIN table2_name
ON table.column1=table2.column1
JOIN table3_name
ON table2.column2=table3.column2;
```

## 資料異動處理

可新增一筆或多筆

```mysql
INSERT INTO department(dnum,dname,dgrno)
VALUES (300,'Mitusho',1002),(400,'Yamaho',1003)
```

可修改一筆或多筆

```mysql
UPDATE emp
SET salary=4000
WHERE empno=1001;
```

可刪除一筆或多筆

```mysql
DELETE FROM emp
WHERE empno=1000;
```
