let hd = {name:"houdunren"}
let edu = hd;

// 此时我们引用了俩次该内存地址，引用次数为2

let set = new WeakSet();
set.add(hd)

// 再将该内存地址的数据加入WeakSet类型中，引用次数不会增加，我们将这种方式成为弱引用类型,Set的迭代方法等等都无法使用

console.log(set);

// 如果此时我们将hd和edu清空,那么该内存地址的数据将会被当作垃圾处理
hd = null;
edu = null;
