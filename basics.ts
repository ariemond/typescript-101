import { NumericLiteral } from "typescript";

export {};

// Primitives: number, string, booleans
// More complex: arrays, objects
// Function types, parameters

// ------ Primitives ------

let age: number;
age = 12.1;
// age = '12';  throws error

let userName: string;
userName = "Ariana";

let isInstructor: boolean;
isInstructor = false;

// ------ Complex ------

let hobbies: string[];
hobbies = ["Baking", "Coding", "Exercising"];

let person;
// Default type is "any" - fallback type that you should not use. Defeats the point of using typescript in the first place.
person = {
  name: "Ariana",
  age: 29,
};

let person1: {
  name: string;
  age: number;
};

// person1 = {
//     isEmployee: true
// }
// This will throw an error because the object does not contain the correct types.

person1 = {
  name: "Ariana",
  age: 29,
};

let people: {
  name: string;
  age: number;
}[]; // Store an array of objects

// ------ Type Inference ------

let course = "Angular Complete Guide";
// course = 123;   Erorr: TypeScript tries to infer as many types as possible. It has inferred that course is a string, not a number.

// ------ Union Types ------

let dog: string | number = "Marco";
dog = 2;

let dogs: string | string[];
dogs = "Marco";
dogs = ["Marco", "Hendrix"];

// ------ Type Aliases ------

type Human = {
  name: string;
  age: number;
};

let human: Human;

human = {
  name: "Ariana",
  age: 29,
};

// ------ Functions & Types ------

function add(a: number, b: number) {
  return a + b;
}

// Functions don't only use types for the parameters, but also for the return value.
// TypeScript has inferred that the return value here is a number.

function print(value: any) {
  console.log(value);
}

// No return statement, so it has a special return statement called 'void'.
// Similar to null and undefined. Means that this function never returns.

// ------ Generics ------

function insertAtBeginning(array: any[], value: any) {
  const newArray = [value, ...array];
  return newArray;
}

const demoArray = [1, 2, 3];

const updatedArray = insertAtBeginning(demoArray, -1); // [-1, 1, 2, 3]
// updatedArray is inferred to be an array of any type of values
// TypeScript does not pick up that it is an array full of numbers because we declared type: any.
// We want to keep the parameter types as any to keep this utility function more generic.
// However, this eliminates the power of TypeScript.

// For ex.:
updatedArray[0].split("");
// Will not throw an error even though it is not a string.
// You will get a runtime error.

// Need to convert the function to a GENERIC function.

function genericFunction<T>(array: T[], value: T) {
  const newArray = [value, ...array];
  return newArray;
}

// Now TypeScript should know to look at the concrete values of the arguments.
// Telling TS that the type here is not ANY type.

const genericArray = [1, 2, 3];

const updatedGenericArray = genericFunction(genericArray, -1);
// updatedGenericArray[0].split(''); This throws an error since it is expecting numbers.

// ------ Classes ------

class Student {
  firstName: string;
  lastName: string;
  age: number;
  courses: string[];

  constructor(first: string, last: string, age: number, courses: string[]) {
    this.firstName = first;
    this.lastName = last;
    this.age = age;
    this.courses = courses;
  }

  enrol(courseName: string) {
    this.courses.push(courseName);
  }
}

const student = new Student("Ariana", "Emond", 29, ["Angular", "TypeScript"]);
student.enrol("React");

// Can set the properties in advance, rather than just in constructor.
// With TS, you can control whether a property or a method should be publically accessible or if it should be private.
// Private properties and methods can only be used from inside the class.
// Public properties and methods can be accessed from outside the class through the dot notation.
// By default, they are all public.

// Ex. of making it private:

class Student2 {
  firstName: string;
  lastName: string;
  age: number;
  private courses: string[];

  constructor(first: string, last: string, age: number, courses: string[]) {
    this.firstName = first;
    this.lastName = last;
    this.age = age;
    this.courses = courses;
  }

  enrol(courseName: string) {
    this.courses.push(courseName);
  }

  listCourses() {
    return this.courses.slice();
  }
}

const student2 = new Student2("Ariana", "Emond", 29, ["Angular", "TypeScript"]);
student2.enrol("React");
// student2.courses;  This throws an error. You cannot access courses.
student2.listCourses();

// Shorthand notation:

class Student3 {
  constructor(
    public firstName: string,
    public lastName: string,
    public age: number,
    private courses: string[]
  ) {}

  enrol(courseName: string) {
    this.courses.push(courseName);
  }

  listCourses() {
    return this.courses.slice();
  }
}


// ------ Working with Interfaces ------

// In their most basic form, interfaces are just object type definitions.

interface Cat {
    firstName: string;
    age: number;
    
    greet: () => void; // Every Cat should have a greet method which takes no parameters and returns nothing.
}

// Can use this interface as an object type:

let meow: Cat;
// meow = 123;  ERROR
meow = {
    firstName: 'Meow',
    age: 2,
    greet(){
        console.log('Meow!');
    },
};

// Interfaces are an alternate to using the 'type' keyword we saw above when you want to define object types.
// Interfaces can be implemented by classes. When they are, they force classes to have that structure defined by the interface.
// Can be helpful if you are building an application with multiple developers and you want to make sure that a certain class written by another developer has a certain structure because YOU need that class to have a certain structure (or method for ex.).
// You will see this a lot with Angular because it will force you to define certain parts of a class.

// class Instructor implements Cat {
//     // Only if you add all the properties and methods from Cat will you get rid of the error lines.
// }



// ------ Configuring TS Compiler ------

// npx tsc --init
// Will add a tsconfig.json file