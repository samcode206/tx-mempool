# Mempool

- uses either a heap or doubly linked list see ```mempool.config.yaml``` to choose
- adjustable capacity see ```mempool.config.yaml``` to adjust
- can optionally save dropped transactions from the mempool  ```mempool.config.yaml``` to choose

## how to run 
- clone this repository
- install NodeJs preferabbly LTS version
- at the root of the working directory type ```npm install``` to install the dependacies required to run the project
- to run the project type ```npm run start``` the output will be in the ```/transactions/out``` folder 
- to run the tests you can type ```npm run test``` the test outputs will appear in the terminal

## Requirments
As the requirements state, the mempool must be in sorted order based on the fee that a transaction will pay, and the higher the fee is the higher it will need to be in the mempool in order for it to be proccessed faster. 

The Mempool will also need to have a set capacity and start ejecting transactions when that capacity is reached. The ejected transactions will be the ones with the least priority in the mempool as they will be least profitable, but we must keep in mind that they can't just be dropped into thin air as they are transactions so even when we remove them from the mempool we need to figure out a way to place them somewhere else where they can later be proccessed. This will be outside the scope of this project but there needs to be some basic instuctions to handle the dropped transactions from the mempool. 

- the mempool must be effiecnt at removing transactions when running at full capacity.
- the mempool must always be sorted based on a given critera. 
- the mempool must allow effiecent insertion of new transactions, while still maintaining its sorted order. 

## Data Structure Choices 
there are numerous data structures that can be use to implement the mempool & each data structure will have its own advantages & disadvantages. The ones that quickly came to mind were the following: 
- Sorted Array 
- Sorted Linked List 
- Heap Based Priority Queue 

the first one that I quickly eliminated due to performance was the sorted array, although searching an array will be very fast when using Binary Search, in order for us to insert a new transaction we will most likely have to inert somewhere in the middle which means that every single element will need to be reindexed, and that will not be the most effiecnt solution. 
Linked List will do a bit better when it comes to insertion because we wouldn't have to reindex as there are no indices, all we would need to do to insert a new transaction will be to update some neighboring pointers, however the problem with a standard linked list will be around searching for the insertion location, we must iterate through the chain of transactions for each insert, although this can be optimized since the linked list is sorted and we have the size of the linked list, and it could also be improved by using a skip list which allows O(log (n)) time complxity for searching, we will only be looking at the standard linked list.

![Linked List](https://i.ibb.co/Vm6Tgby/linked-List.png)

A Heap based priority Queue will be offering the best time complexity for insertion O(log(n)) and will keep things in sorted order at all times. the use of a Heap will offer the best performance for structuring our transactions in the mempool. 

![Heap](https://i.ibb.co/XFQp4NG/heap.png)
Markdown is a lightweight markup language based on the formatting conventions
that people naturally use in email.
As [John Gruber] writes on the [Markdown site][df1]

I built this mempool with both a Heap or a Linked List and you can optionally use either one by adjusting the config file. 

## Things to add 
- add more thorough tests 
- create a heap thats optimized for this problem (currently using an external library that doesn't support least priority leaf removal so I am hacking it by using a MIn Heap)
- add a way to handle invalid transactions (I must first know what an invalid transaction looks like)
- add a way to broadcase rejected transactions to other nodes in the network 