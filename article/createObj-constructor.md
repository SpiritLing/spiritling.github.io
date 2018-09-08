JS中可以有许多设计模式，在这些中推荐使用组合构造函数和原型模式；
因为不太善于写文章，所以下面简化文字叙述，直接看代码

## 工厂模式

```js
function person(name,age){
    var obj={}
    obj.name=name;
    obj.age=age;
    obj.sayName=function(){
        console.log(this.name);
    }
    return obj;
}
```

## 构造函数模式

正常情况下我们将函数名起为大写字母开头

```js
function Person(name,age){
    this.name=name;
    this.age=age;
    this.sayName=function(){
        console.log(this.name);
    }
}

var a=new Person("张三",29);
var b=new Person("李四",22);

a.sayName();
b.sayName();
```

构造函数可以通过 `new` 关键字来进行处理，使其实例化，每个都有独有数据，也就是私有变量

## 原型模式

```js
function Person(){
    
}
Person.prototype.name = "Li Si";
Person.prototype.age = 21;
Person.prototype.sayName=function(){
    console.log(this.name);
}

var person1=new Person();
person1.sayName(); //"Li Si"
var person2=new Person();
person2.sayName(); //"Li Si"
```

原型模式所有的都共用同一个数据，相当于公有变量

## 组合模式：构造函数和原型模式结合

通过上面两个例子，两个都有独有的特性，所以我们可以组合两者了来进行处理，一般推荐使用组合模式

```js
function Person(name,age){
    this.name=name;
    this.age=age;
}
Person.prototype.sayName=function(){
    console.log(this.name);
}

var person1=new Person("张三");
person1.sayName(); //"张三"
var person2=new Person("李四");
person2.sayName(); //"李四"
```

这样各自经过实例化后，都有自己的独有数据，但是却有着公共方法；
