## Program/Process/Thread 是作業系統(Operating System)很重要的概念

- 還尚未 load 入記憶體的 code，我們稱之為 Program
- 已經執行並且 load 到記憶體中的 Program ，程序中的每一行程式碼隨時都有可能被 CPU 執行，所產生的執行個體，Program 被執行就會產生 Process，所以如果同時執行同一個 Program 十次，就會產生至少十個 Process。
- CPU 實際運算的部分。Process 是 Thread 的容器，在同一個 Process 中會有很多個 Thread ，每一個 Thread 負責某一項功能。Thread 就像是工廠內的工人，確保工廠的每項功能，並且共享工廠內的每一項資源。

## 選擇排序法 Selection sort

將資料分為" 已排序 " 和 " 未排序 "，在未排序中找出最小(or 最大)值，加入已排序的末端

## 插入排序法 Insertion sort

將資料分為” 已排序 “ 和 “ 未排序 “，將未排序的第一筆值和已排序的資料由右而左相比大小並插入適當位置。

## 氣泡排序法 Bubble Sort

反覆掃描，從左到右，只要目前這個數值比右邊大就交換。

## 合併排序法 Merge sort

將資料分割為左子樹以及右子樹，接著遞迴分割每一次分割後的左子樹以及右子樹，直到每個子樹只剩下一個元素，再將這些子樹依小到大(or 大到小)合併(Merge)。

## 桶子排序法 Bucket Sort

其實就是準備幾個桶子，將要排序的資料分類丟至指定的桶子中，再依序將桶子裡的東西取出。

## 快速排序法 Quick Sort

先找一個基準點，然後派兩個代理人分別從資料的兩邊開始往中間找，如果右邊找到一個值比基準點小，左邊找到一個值比基準點大，就讓他們互換。

## 基數排序法 Radix Sort

非比較性 的排序則是屬於「分配性」的方式，是利用資料裡的值的某些特性來作為排序的依據，而非是用比較的方式。

## 列舉法 Enumeration

就是把所有可能都列出來。

## 循序搜尋 Sequential Search

在已排序的資料中一個一個比對，直到找到為止。

## 二分搜尋 Binary Search

取已排序資料的中間索引的值，來確認是否為要搜尋的數，若不是，則將資料以中間索引分為兩半。此時便比較待搜尋的值與中間索引的值的大小，若比較小，則選擇較小的那一半資料，反之亦然。接著再繼續從一半的資料中取中間索引的值做比較，重複以上的步驟，直到找到為止。

## 插補搜尋 Interpolation Search

在已排序的資料中，將資料視為線性的解，藉由在線上的移動來尋找我們需要的值。

## 深度優先搜尋 Depth-first Search

其實就是遞迴的一種運用沒錯，一層一層地找出所有可能，但程式碼卻會簡潔的多。

## 費氏搜尋 Fibonacci Search

指在一串數字中，每一項是前兩項的和。

## 廣度優先搜尋 Breadth-first Search

和深度優先搜尋不同的是，深度優先是透過函數的遞迴來延伸運算，而廣度優先則是透過「一層一層」擴展的方式來搜尋。

### 佇列 (Queue)的特性就是 先進先出 (First In First Out, FIFO)

### 堆疊 (Stack) 的特性就是 先進後出 (First In Last Out, FILO)

> [ 30 天學演算法和資料結構系列](https://ithelp.ithome.com.tw/articles/10209931) <br>[Program/Process/Thread 差異](https://totoroliu.medium.com/program-process-thread-%E5%B7%AE%E7%95%B0-4a360c7345e5)
